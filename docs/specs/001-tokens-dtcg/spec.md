# Spec 001 · Tokens en formato DTCG

**Épica:** [`B1`](https://github.com/atril-audio/brand/issues/2) · **Rama:** `feat/tokens-dtcg`
**Creada:** 2026-08-19 · **Estado:** aceptada · **Ruta:** SDD + ADR ([`0003`](../../adr/0003-el-css-generado-se-commitea.md))

> **Nota de convención:** Spec Kit numera la carpeta (`001-…`) y querría una rama igual. La rama
> sigue al [rulebook §4](https://github.com/atril-audio/meta/blob/main/reference/rulebook-desarrollo.md#4--el-flujo-rama--pr--merge)
> (`<tipo>/<slug>`), que es la autoridad. **El número de spec y el nombre de rama están desacoplados**
> a propósito, así que `create-new-feature.sh` no se usa tal cual.

## El problema

`tokens.css` es **la fuente de verdad y el artefacto de consumo a la vez**. Eso funciona mientras el
único consumidor sea CSS, y ya sabemos que no va a serlo: el roadmap tiene Storybook (`P0`) y el PRD
no descarta una salida nativa. Cada consumidor nuevo que no lea CSS obliga a **transcribir 50
valores a mano**, que es exactamente el modo de falla que el sistema existe para evitar.

Además, hoy el *significado* de cada token vive en comentarios de CSS: legibles para una persona,
invisibles para cualquier herramienta.

## Qué tiene que ser verdad al terminar

### P1 · El consumidor de hoy no se entera (prioridad máxima)

`pedalera` trae `tokens.css` desde su `CMakeLists.txt`. **Ese contrato no se toca.**

- **Dado** un clon limpio de `brand` sin Node instalado, **cuando** el build de `pedalera` copia
  `tokens.css`, **entonces** encuentra el archivo y su contenido es válido.
- **Dado** el `tokens.css` de antes y el de después, **cuando** se comparan los pares
  `--nombre: valor`, **entonces** son **idénticos**: los mismos **50** nombres del sistema, con los mismos valores.
  Los otros 3 del archivo de hoy (`--panel2`, `--panel3`, `--oro`) son el puente temporal y **se mudan**
  a `compat/` — ver R4.

*Prueba independiente:* un diff normalizado de los pares nombre/valor entre `main` y la rama tiene
que salir vacío. Si sale algo, es un bug — esta spec **no cambia el sistema**, cambia de dónde sale.

### P2 · El sistema se edita en un solo lugar y es portable

- **Dado** `tokens.json` en formato [DTCG](https://tr.designtokens.org/format/), **cuando** se corre
  `npm run build`, **entonces** se regenera `tokens.css` sin intervención manual.
- **Dado** que alguien cambia un valor en `tokens.json` y **no** regenera, **entonces** hay una forma
  de detectarlo (ver *fuera de alcance*: el check es de `B3`).
- **Dado** una herramienta cualquiera que lea DTCG, **cuando** abre `tokens.json`, **entonces**
  entiende tipos (`color`, `dimension`, `fontFamily`, `fontWeight`, `duration`…) sin conocer a Atril.

### P3 · El porqué sobrevive a la generación

Los comentarios de `tokens.css` cargan el argumento de cada decisión (*«el degradado vive en el riel
porque el riel ES la escala»*). Un generador ingenuo los borra.

- **Dado** un token con `$description` en el JSON, **cuando** se genera el CSS, **entonces** la
  descripción aparece como comentario junto a la variable.
- **Dado** el encabezado del archivo (la cadena de decisiones que produjo el sistema), **cuando** se
  regenera, **entonces** sigue estando y **apunta a `docs/adr/`**, no al `DECISIONES.md` del hub.

## Requisitos

| # | requisito |
|---|---|
| R1 | `tokens.json` es DTCG válido: `$type` y `$value` en cada token, grupos con `$description` |
| R2 | `tokens.css` **se commitea**, generado — ver [ADR-0003](../../adr/0003-el-css-generado-se-commitea.md) |
| R3 | El generador es **Style Dictionary** (lo fija el roadmap) vía `npm run build` |
| R4 | El bloque «PUENTE DE NOMBRES · TEMPORAL» **no entra a `tokens.json`** y se muda a un archivo aparte con su gatillo de borrado |
| R5 | `--escala-pico` se modela como `$type: gradient`; el ángulo va en `$extensions` porque DTCG no lo tiene |
| R6 | `node_modules/` y nada generado-fuera-de-`tokens.css` entra al repo |
| R7 | El `README` dice cómo se edita el sistema ahora (editar el JSON, no el CSS) |

## Fuera de alcance

- **El check de CI que verifica que el CSS esté en sync** → es `B3`, y hasta que exista la garantía es
  disciplina. Está dicho en el ADR, no escondido.
- **Empaquetar las tipografías** → es `B2`. `--sans` y `--mono` siguen nombrando familias, no archivos.
- **Cablear el sistema en la app** → es `F0` de `pedalera`.
- **Salidas que no sean CSS** (JSON plano, Swift, Kotlin). El punto de DTCG es que *se puedan* agregar
  sin re-decidir nada; agregarlas ahora sería construir para un consumidor que no existe.

## Criterios de aceptación

1. `npm ci && npm run build` en un clon limpio produce un `tokens.css` **idéntico** al commiteado.
2. El diff normalizado de pares `--nombre: valor` contra `main` está **vacío** para los 50 del
   sistema, y los 3 del puente aparecen en `compat/puente-nombres.css` sin cambio de valor.
   **Con una única normalización, declarada:** el citado de las familias tipográficas. El archivo
   escrito a mano era inconsistente —citaba `"Chivo"` (que no tiene espacios) pero no `Menlo`— y no
   hay una regla que reproduzca las dos. El generado cita **todas las familias reales y ninguna
   keyword**, que además protege de que CSS agregue una keyword que colisione. En CSS es idéntico.
3. `tokens.json` valida como DTCG y cada token tiene `$type`.
4. El puente temporal sigue funcionando para quien lo incluya, y su archivo dice cuándo se borra.
5. Ningún archivo del repo escribe un color a mano fuera de `tokens.json`.
