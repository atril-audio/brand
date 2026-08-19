/**
 * Verificaciones del repo que no son el build. Corre igual en tu máquina que en CI:
 *
 *   npm run verificar:repo
 *
 * Cada chequeo existe porque hay una regla escrita que lo pide, y está anotado con cuál.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const fallos = [];
const ok = [];
const chequear = (nombre, fn) => {
  try { const d = fn(); ok.push(`✓ ${nombre}${d ? ` · ${d}` : ''}`); }
  catch (e) { fallos.push(`✗ ${nombre}\n    ${e.message}`); }
};

/* Principio II de la constitución: público significa sin credenciales.
   Las licencias OFL son la otra cara: redistribuir EXIGE incluirlas, y borrarlas
   convierte este repo en una infracción. Es lo más caro que puede romperse acá. */
chequear('las licencias de las tipografías están', () => {
  const necesarias = ['fuentes/OFL-Chivo.txt', 'fuentes/LICENSE-RobotoMono.txt'];
  const faltan = necesarias.filter((f) => !existsSync(f) || statSync(f).size < 1000);
  if (faltan.length) throw new Error(`faltan o están vacías: ${faltan.join(', ')}`);
  for (const f of necesarias) {
    if (!readFileSync(f, 'utf8').includes('SIL OPEN FONT LICENSE'))
      throw new Error(`${f} no parece la OFL`);
  }
  return `${necesarias.length} presentes y con su texto`;
});

/* Un woff2 corrupto o convertido por un filtro de git se ve igual en el diff y
   rompe el render en silencio. La firma y la longitud declarada lo detectan. */
chequear('los woff2 son válidos', () => {
  const fs_ = readdirSync('fuentes').filter((f) => f.endsWith('.woff2'));
  if (fs_.length !== 4) throw new Error(`esperaba 4 woff2, hay ${fs_.length}`);
  for (const f of fs_) {
    const b = readFileSync(join('fuentes', f));
    if (b.subarray(0, 4).toString() !== 'wOF2') throw new Error(`${f}: firma incorrecta`);
    if (b.readUInt32BE(8) !== b.length)
      throw new Error(`${f}: longitud declarada ${b.readUInt32BE(8)} ≠ ${b.length} reales`);
  }
  return `${fs_.length} archivos, firma y longitud correctas`;
});

/* Principio III: el consumidor trae el archivo, no sus valores. Un color a mano
   en cualquier CSS que no sea el generado significa que el sistema se está
   esquivando. `tokens.css` se excluye porque ES la salida del generador. */
chequear('ningún CSS escribe un color a mano', () => {
  const cssS = ['fuentes.css', ...readdirSync('compat').map((f) => join('compat', f))]
    .filter((f) => f.endsWith('.css'));
  const sucios = [];
  for (const f of cssS) {
    const sinComentarios = readFileSync(f, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    const hex = sinComentarios.match(/#[0-9a-fA-F]{3,8}\b/g);
    if (hex) sucios.push(`${f}: ${[...new Set(hex)].join(' ')}`);
  }
  if (sucios.length) throw new Error(sucios.join('\n    '));
  return `${cssS.length} archivos limpios (tokens.css se excluye: es la salida del build)`;
});

/* El sistema es la fuente; el CSS es su salida. Si el JSON tiene un token que el
   CSS no nombra, alguien editó a mano o el build no corrió. */
chequear('los tokens del JSON están todos en el CSS', () => {
  const json = JSON.parse(readFileSync('tokens.json', 'utf8'));
  const css = readFileSync('tokens.css', 'utf8');
  const esperados = Object.entries(json)
    .filter(([g]) => !g.startsWith('$'))
    .flatMap(([, grupo]) => Object.keys(grupo).filter((k) => !k.startsWith('$')));
  const faltan = esperados.filter((n) => !new RegExp(`--${n}\\s*:`).test(css));
  if (faltan.length) throw new Error(`no están en tokens.css: ${faltan.join(', ')}`);
  return `${esperados.length} tokens`;
});

console.log(ok.join('\n'));
if (fallos.length) { console.error('\n' + fallos.join('\n')); process.exit(1); }
console.log(`\n✓ ${ok.length} verificaciones del repo, todas en verde`);
