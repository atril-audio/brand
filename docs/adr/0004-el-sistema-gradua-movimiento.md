# ADR-0004 · El sistema gradúa movimiento

**Fecha**: 2026-08-19 · **Estado**: Aceptado
**Decide**: qué tokens de movimiento define el sistema, y cuáles no
**Cruza**: `pedalera` — lo pidió [`F0 · el marco`](https://github.com/atril-audio/pedalera/issues/7) · [`brand#15`](https://github.com/atril-audio/brand/issues/15)

## El problema

Al planear `F0` se cruzaron los tokens que usa el CSS del cromo del prototipo contra los que este repo
define:

```
tokens que define atril-brand:            50
tokens que usa el cromo del prototipo:    19
NO los define brand:                       1  →  --curva
```

**No faltaba un token: faltaba la categoría entera.** El sistema gradúa color, tipografía, espacio y
forma. De movimiento, nada.

Y el detalle que lo volvió urgente: **se podía colar por el hueco de la letra.** El principio III de
Pedalera prohíbe escribir *un color, un tamaño o un radio* a mano, y una curva no está en esa lista. O
sea que F0 podía escribirla sin violar ninguna regla escrita — y `F1` copiarla, y `F2` copiarla, hasta
tener cinco curvas distintas y ningún lugar donde cambiarlas.

> Un sistema al que le falta una categoría no se parchea desde el consumidor.

## Lo que dijo la evidencia

No se eligieron valores por gusto. Se midieron **todas** las transiciones y animaciones del prototipo:

| duración | usos | | duración | usos |
|---|---|---|---|---|
| `.14s` | **15** | | `.12s` | 2 |
| `.16s` | 6 | | `.07s` | 2 |
| `.18s` | 6 | | `.3s` `.25s` `.22s` `.7s` `.8s` | 1 c/u |
| `.2s` | 5 | | | |

**Once duraciones, y 32 de 41 usos entre `.14s` y `.2s`.** Eso no son cuatro decisiones: es **una
decisión tecleada cuatro veces** — el mismo patrón que F0 encontró con los radios, donde 17 valores
sueltos resultaron ser 3.

Y de curvas hay **exactamente una**: `cubic-bezier(.22,.61,.36,1)`, usada una vez. El resto es `linear`.

## La decisión

**Una curva de carácter y dos duraciones.**

| token | valor | para qué |
|---|---|---|
| `--curva` | `cubic-bezier(.22,.61,.36,1)` | la única curva del sistema. Arranca rápido y frena suave |
| `--rapido` | `.14s` | lo que **responde a ti**: hover, foco, estado de un control |
| `--calmo` | `.2s` | lo que **aparece y se va**: el aviso, una capa, algo que entra |

`.12s` y `.16s` colapsan en `--rapido`; `.18s` y `.22s` en `--calmo`. Ninguna de esas diferencias es
perceptible ni fue decidida: son ruido de tecleo.

### Y la regla que el `linear` reveló

Se miró **para qué** se usa `linear`, en vez de descartarlo como descuido. Los tres usos son el mismo:

```css
transition: width .07s linear;   /* medidor */
transition: width .07s linear;   /* medidor */
transition: width .25s linear;   /* medidor */
```

**Lo que mide no se anima con carácter.** Una curva le pone aceleración a un valor que no la tiene: el
ojo lee «subió de golpe y frenó» cuando el número subió parejo. **Suavizar una medición le miente al ojo
sobre el dato**, que es exactamente lo que el principio V evita con el color.

Queda escrito como regla del sistema, no como token: los medidores usan `linear` y **su propia duración**,
porque esa duración es una decisión de la medición (cuánto promedia el ojo), no del sistema.

## Lo que NO se gradúa

- **Las animaciones nombradas** (`destello`, `fluir`). Son de un componente y de una sola situación. Un
  sistema que gradúa un keyframe gradúa la implementación de una pieza, no un valor compartido.
- **Duraciones de medición.** Ver arriba: pertenecen a quien mide.
- **Retardos, `will-change`, curvas de entrada y salida separadas.** Ninguno tiene hoy la cosa que
  vigila. Si aparece una pieza que de verdad necesite entrar distinto de como sale, **eso** es el
  gatillo, y este ADR se enmienda con la evidencia delante.

## Lo que se descartó

| descartado | por qué |
|---|---|
| **Escribir la curva en Pedalera** | se colaba por la letra del principio III y rompía su espíritu. Es el consumidor parchando el sistema |
| **Graduar las cuatro duraciones tal cual** | congelaría el ruido como si fuera diseño. La razón de que existan cuatro es que se tecleó cuatro veces, no que alguien decidiera cuatro ritmos |
| **Una sola duración** | tentador y equivocado: lo que responde a tu mano y lo que aparece solo **no** se leen igual a la misma velocidad. La evidencia agrupa en dos, no en uno |
| **Curvas separadas de entrada y salida** | no hay ninguna pieza hoy que las pida. Sería la ceremonia que el §7 del rulebook manda evitar |
| **Borrar `ico-plantillas` en este mismo PR** | borrar rompe consumidores en silencio y en otro repo: la tabla del `CLAUDE.md` pide **SDD + ADR** para eso. Queda marcado como muerto, no borrado |


## El icono de «más acciones», y lo que no está verificado

Va en el mismo PR porque lo pide la misma épica y el mismo issue. Los tres puntos se dibujan **como
trazos de longitud casi cero con remate redondo** (`M5 12h.01`), que es el recurso que `ico-trabajo` ya
usaba: la clase `.ico` declara `fill:none`, así que unos círculos con relleno serían **invisibles**.

⚠️ **No se verificó a tamaño real.** Y hay una razón geométrica para mirarlo cuando exista la cabecera:
con este recurso **el diámetro del punto es igual al peso del trazo** — `2.3` a 13px, según
`iconos.css`. El prototipo dibujaba círculos de radio `1.7`, o sea **3.4 de diámetro** en la misma
grilla. **Los puntos del sistema van a leerse más livianos que los del prototipo.**

Es la misma clase de diferencia que la lupa (`ico-buscar` no es el SVG inline del prototipo) y se
resuelve igual: **manda el sistema**, y la diferencia queda escrita para que nadie la «corrija» volviendo
a un inline. Si al verlo en `F0` no lee, el arreglo correcto es **el peso por tamaño en `iconos.css`**,
no un icono con su propio grosor — eso rompería la regla de que el peso no vive en el sprite.
