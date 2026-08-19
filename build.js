/**
 * Genera `tokens.css` desde `tokens.json` (DTCG) con Style Dictionary.
 *
 *   npm run build       reescribe tokens.css
 *   npm run verificar   falla si tokens.css no coincide con lo que produce el JSON
 *
 * Por qué un formato propio y no `css/variables`:
 *  1 · los NOMBRES no llevan el grupo. `superficie.fondo` sale como `--fondo`, no como
 *      `--superficie-fondo`. El contrato con los consumidores es el nombre de hoy, y un
 *      renombre masivo rompería la app y el prototipo por cero beneficio — el principio IV de
 *      la constitución dice que un nombre de token es una API.
 *  2 · las `$description` de GRUPO se emiten como encabezados de sección. El argumento de
 *      cada decisión es lo que hace mantenible este archivo, y un generador ingenuo lo borra.
 *  3 · el degradado se arma a mano: DTCG `gradient` no tiene ángulo (ver docs/adr/0003) y las
 *      paradas tienen que salir como `var(--pico-*)`, no como hex, para que cada color siga
 *      definido una sola vez.
 */
import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync } from 'node:fs';

const CRUDO = JSON.parse(readFileSync('tokens.json', 'utf8'));
const SALIDA = 'tokens.css';
const ANCHO = 78;

/* `superficie.fondo` → `fondo` · el último segmento, que es el contrato público */
StyleDictionary.registerTransform({
  name: 'name/atril',
  type: 'name',
  transform: (token) => token.path[token.path.length - 1],
});

/* las familias genéricas y las `ui-*` del sistema NO se citan: son keywords */
const GENERICAS = new Set([
  'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'math',
  'ui-serif', 'ui-sans-serif', 'ui-monospace', 'ui-rounded', 'emoji', 'fangsong',
]);

const ref = (v) => String(v).replace(/\{([^}]+)\}/g, (_, p) => `var(--${p.split('.').pop()})`);

/** `--escala-pico` a mano: paradas por referencia + el ángulo de `$extensions`. */
function gradiente(token) {
  const ang = token.$extensions?.['audio.atril']?.angulo ?? '90deg';
  const stops = token.original?.$value ?? token.$value;
  const pos = (p) => (p === 0 ? '0' : `${+(p * 100).toFixed(4)}%`);
  const partes = [];
  for (let i = 0; i < stops.length; i++) {
    const color = ref(stops[i].color);
    /* dos paradas seguidas del mismo color se colapsan en `color a b`, que es
       cómo se escribe una zona plana en CSS y cómo estaba escrito a mano */
    if (i + 1 < stops.length && ref(stops[i + 1].color) === color) {
      partes.push(`${color} ${pos(stops[i].position)} ${pos(stops[i + 1].position)}`);
      i++;
    } else {
      partes.push(`${color} ${pos(stops[i].position)}`);
    }
  }
  const sangria = ' '.repeat(`  --escala-pico:  linear-gradient(${ang}, `.length);
  return `linear-gradient(${ang}, ${partes.join(`,\n${sangria}`)})`;
}

function valor(token) {
  if (token.$type === 'gradient') return gradiente(token);
  /* DTCG guarda una curva como los cuatro números sueltos. Si salieran así, el
     consumidor tendría que escribir `cubic-bezier(var(--curva))` — o sea saber
     que el token no es una curva sino sus coordenadas. Un token que obliga a
     envolverlo no ahorra nada: sale ya usable. */
  if (token.$type === 'cubicBezier') {
    const p = token.original?.$value ?? token.$value;
    return `cubic-bezier(${p.join(', ')})`;
  }
  if (token.$type === 'fontFamily') {
    const fams = token.original?.$value ?? token.$value;
    /* Se citan TODAS las familias reales y ninguna palabra clave. Citar una
       familia de una sola palabra no es opcional por prolijidad: la protege de
       colisionar con una keyword que CSS agregue después. */
    return fams.map((f) => (GENERICAS.has(f) || f.startsWith('-') ? f : `"${f}"`)).join(', ');
  }
  return ref(token.original?.$value ?? token.$value);
}

function bloque(texto, ancho = ANCHO) {
  const palabras = String(texto).split(/\s+/);
  const lineas = [];
  let l = '';
  for (const p of palabras) {
    if ((l + ' ' + p).trim().length > ancho) { lineas.push(l.trim()); l = p; }
    else l += ' ' + p;
  }
  if (l.trim()) lineas.push(l.trim());
  return lineas;
}

StyleDictionary.registerFormat({
  name: 'atril/css',
  format: ({ dictionary }) => {
    const porRuta = new Map(dictionary.allTokens.map((t) => [t.path.join('.'), t]));
    const barra = '═'.repeat(ANCHO - 3);
    const out = [`/* ${barra}`];
    for (const l of bloque(CRUDO.$description, ANCHO - 3)) out.push(`   ${l}`);
    out.push(`   ${barra} */`, '', ':root {', '');

    for (const [grupo, cuerpo] of Object.entries(CRUDO)) {
      if (grupo.startsWith('$')) continue;
      /* convención de `$description` de grupo: «TÍTULO — cuerpo». El título
         lleva los guiones a los lados, como en el archivo escrito a mano. */
      const [titulo, ...resto] = String(cuerpo.$description ?? '').split(' — ');
      const cuerpoTxt = resto.join(' — ');
      if (!cuerpoTxt) {
        const g = '─'.repeat(Math.max(3, ANCHO - 12 - titulo.length));
        out.push(`  /* ─── ${titulo} ${g} */`);
      } else {
        const g = '─'.repeat(Math.max(3, ANCHO - 9 - titulo.length));
        out.push(`  /* ─── ${titulo} ${g}`);
        const ls = bloque(cuerpoTxt, ANCHO - 5);
        ls.forEach((l, i) => out.push(`     ${l}${i === ls.length - 1 ? ' */' : ''}`));
      }

      const nombres = Object.keys(cuerpo).filter((k) => !k.startsWith('$'));
      const pad = Math.max(...nombres.map((n) => n.length));
      for (const n of nombres) {
        const t = porRuta.get(`${grupo}.${n}`);
        if (!t) throw new Error(`token sin resolver: ${grupo}.${n}`);
        const decl = `  --${n}:${' '.repeat(pad - n.length + 2)}${valor(t)};`;
        const d = t.$description ?? t.original?.$description;
        out.push(d && !decl.includes('\n') ? `${decl}   /* ${d} */` : decl);
      }
      out.push('');
    }
    out.push('}', '');
    return out.join('\n');
  },
});

const sd = new StyleDictionary({
  source: ['tokens.json'],
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/atril', 'color/css'],
      files: [{ destination: SALIDA, format: 'atril/css' }],
    },
  },
  log: { verbosity: 'silent', warnings: 'disabled' },
});

const [{ output }] = (await sd.formatPlatform('css'));

if (process.argv.includes('--verificar')) {
  const actual = readFileSync(SALIDA, 'utf8');
  if (actual !== output) {
    console.error(`✗ ${SALIDA} no coincide con tokens.json. Corré \`npm run build\`.`);
    process.exit(1);
  }
  console.log(`✓ ${SALIDA} está en sync con tokens.json`);
} else {
  writeFileSync(SALIDA, output);
  console.log(`✓ ${SALIDA} generado desde tokens.json`);
}
