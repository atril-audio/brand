# Spec 002 · Las tipografías viven en brand

**Épica:** [`B2`](https://github.com/atril-audio/brand/issues/3) · **Rama:** `feat/tipografias-empaquetadas`
**Creada:** 2026-08-19 · **Estado:** aceptada · **Ruta:** SDD (sin ADR: no cambia cómo se consume el sistema, agrega un archivo más)

## El problema

`tokens.css` nombra `"Chivo"` y `"Roboto Mono"`, y **nadie las provee**. Hoy las trae un `<link>` a
`fonts.googleapis.com` desde el HTML.

**Pedalera corre dentro de Live, y adentro de Live puede no haber internet.** Un músico sin conexión
abre el plugin y lo ve con la tipografía del sistema: los números del gain staging dejan de ser
monoespaciados y se mueven al cambiar, las versalitas pierden el tracking, y **no se ve como
Pedalera**. Es un fallo silencioso: nada rompe, todo se ve peor.

Además, un `<link>` externo en un plugin de audio es una **petición de red que el usuario no pidió**.

## Qué tiene que ser verdad al terminar

### P1 · Sin red, se ve igual

- **Dado** un documento que incluye `fuentes.css` y **ninguna** conexión, **cuando** se renderiza,
  **entonces** Chivo y Roboto Mono cargan **del repo** y `document.fonts.check()` da `true`.
- **Dado** el mismo documento, **cuando** se mide el ancho del texto, **entonces** **no** coincide con
  el del fallback genérico.

### P2 · Un archivo por familia cubre todo el rango de peso

El sistema usa `--peso-tit: 600` y el prototipo pide `wght@200..900`. Un archivo por peso serían ocho.

- **Dado** el `woff2` **variable**, **cuando** se pide peso 200 y peso 900, **entonces** el resultado
  es **distinto** — el eje responde.
- **Para el mono, el ancho no sirve como métrica**: todos sus glifos tienen el mismo avance. Se mide
  **tinta** (píxeles pintados del mismo texto).

### P3 · Redistribuir es legal y queda dicho

- **Dado** que las dos familias son OFL 1.1, **cuando** el repo las redistribuye, **entonces** las
  licencias están incluidas y su README dice que **borrarlas convierte el repo en una infracción**.

## Requisitos

| # | requisito |
|---|---|
| R1 | Los `woff2` **variables** de las dos familias, subsets `latin` y `latin-ext` |
| R2 | `fuentes.css` con los `@font-face` y **el mismo `unicode-range` que sirve Google**, para que el particionado siga funcionando |
| R3 | `OFL-Chivo.txt` y `LICENSE-RobotoMono.txt` incluidos, con la obligación explicada |
| R4 | Una **sonda** verificable, no una promesa: carga real + eje de peso, medido |
| R5 | El `README` dice que hay un contrato nuevo (`fuentes.css`) y cómo se consume |
| R6 | `tokens.json` **no cambia**: `--sans` y `--mono` siguen nombrando familias, no archivos |

## Fuera de alcance

- **Cablearlo en el plugin.** Copiar `fuentes/` y `fuentes.css` en el build es la épica `F0` de
  `pedalera`. Hasta entonces esto está **disponible pero no consumido** — igual que las marcas.
- **Quitar el `<link>` de Google de los HTML del taller** (`pedalera.html`, `panorama.html`,
  `roadmap.html`). Viven en `pedalera` y son **documentos**, no el producto: que un doc necesite red
  para verse perfecto no es el fallo que esta épica arregla.
- **Los glifos de teclado** (`⌘ ⇧ ⌥ ⏎ ⋯ ↗`). No están en estos subsets **ni estaban** en lo que servía
  Google: caen al font del sistema hoy y antes. Es deuda vieja, inventariada aparte.
- **Correr la sonda en CI.** Necesita un navegador; que valga la pena o no lo decide `B3`.

## Criterios de aceptación

1. Los cuatro `woff2` tienen firma `wOF2` y su longitud declarada coincide con el archivo. ✅
2. En un navegador sin red hacia Google, las dos familias cargan del repo. ✅
3. El eje de peso responde en las dos: Chivo por ancho **y** tinta, Roboto Mono por tinta. ✅
4. Las dos licencias están en `fuentes/`, y el README dice que no se borran. ✅
5. `tokens.css` y `tokens.json` salen **sin cambios** de esta épica.
