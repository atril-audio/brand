# ADR-0003 · El `tokens.css` generado se commitea, y el puente temporal no entra a la fuente

**Fecha:** 2026-08-19 · **Estado:** aceptado
**Contexto de ejecución:** [spec 001](../specs/001-tokens-dtcg/spec.md) · épica `B1`

## Contexto

`tokens.json` en formato [DTCG](https://tr.designtokens.org/format/) pasa a ser la fuente de verdad y
`tokens.css` pasa a ser un **artefacto generado** con Style Dictionary. Eso abre tres preguntas que
no tienen respuesta obvia, y las tres afectan a otros repos.

## Decisión 1 · El CSS generado se commitea

**Se commitea.** `tokens.css` sigue existiendo en el repo, versionado, igual que hoy.

El argumento es el consumidor real: **`pedalera` es un plugin C++/JUCE cuyo `CMakeLists.txt` copia
`tokens.css`**. Si el CSS no estuviera en el repo, ese build necesitaría Node y npm para compilar un
plugin de audio. Eso es hacerle pagar a un consumidor el costo de una decisión de otro repo, y por
cero beneficio: el archivo pesa 4 KB.

**El costo que sí tiene, dicho de frente:** un artefacto generado dentro de git **puede quedar
desincronizado** de su fuente. Alguien edita `tokens.json`, olvida `npm run build`, y el repo queda
mintiendo. Hoy eso lo sostiene la disciplina; **la garantía es `B3`** (el CI que verifica que
regenerar no produzca diff). Es deuda con dueño y con fecha, no un hueco.

**Rechazado: solo commitear el JSON.** Es más puro y es peor. Rompe el build de `pedalera` hoy, y el
día que haya CI en `pedalera` lo obliga a instalar una toolchain de JS para compilar C++.

## Decisión 2 · El puente de nombres temporal no entra a `tokens.json`

`tokens.css` termina hoy con un bloque marcado «PUENTE DE NOMBRES · TEMPORAL»: tres alias
(`--panel2`, `--panel3`, `--oro`) que existen **solo** para que la app vieja se vea con el sistema
nuevo sin renombrar nada, y que su propio comentario manda **borrar**.

**No entran a la fuente de verdad.** Se mudan a `compat/puente-nombres.css`, escrito a mano, con su
gatillo de borrado en el encabezado.

Dos razones, y la segunda es la que decide:

1. **No son el sistema.** Son una capa de compatibilidad con un consumidor concreto en un estado
   concreto. Meterlos en `tokens.json` los volvería tokens de primera clase y **cualquier consumidor
   futuro los heredaría** — un Storybook nuevo no tiene ninguna razón para conocer `--panel2`.
2. **Uno de ellos no es expresable en DTCG.** `--panel3` es
   `color-mix(in srgb, var(--panel-alto) 88%, var(--texto) 12%)`. DTCG no tiene mezcla de colores ni
   referencias con operación: solo alias (`{grupo.token}`). Forzarlo obligaría a hornear el resultado
   a un hex, que es justo la copia-de-valores que el sistema prohíbe.

Que el único token inexpresable sea del puente **no es casualidad**: el puente existe para hablar el
idioma viejo, y el idioma viejo no es el del sistema.

## Decisión 3 · El ángulo del degradado va en `$extensions`

`--escala-pico` es un `linear-gradient(90deg, …)` con tres paradas. DTCG **tiene** tipo `gradient`,
pero su valor es solo la lista de paradas: **no tiene ángulo ni dirección**. Es un hueco conocido de
la especificación, no un descuido nuestro.

Se modela como `$type: gradient` con las tres paradas —cada una referenciando su token de color, así
que sigue habiendo una sola definición de cada rojo— y el ángulo va en

```json
"$extensions": { "audio.atril": { "angulo": "90deg" } }
```

**Por qué así y no un token de texto plano:** un `gradient` con paradas tipadas conserva la relación
con `--pico-bajo/medio/alto`. Un string `"linear-gradient(90deg, #5aa06f 0 55%, …)"` la rompe y
duplica tres colores. `$extensions` es el mecanismo que la propia spec DTCG define para esto, y un
consumidor que no lo entienda **ignora el ángulo, no el token**.

## Consecuencias

- **Editar el sistema es editar `tokens.json`.** Editar `tokens.css` a mano se pierde en el próximo
  build. El `README` lo dice y el encabezado del archivo generado lo repite.
- **Los comentarios pasan a ser `$description`**, o sea que el argumento de cada token se vuelve
  **dato**: cualquier herramienta que lea DTCG lo recibe, y el CSS lo sigue mostrando.
- **`brand` gana una toolchain de Node** (`package.json`, `node_modules/` ignorado). Es el primer
  repo de Atril con una, y es el correcto para tenerla: es público y no compila audio.
- **Hasta `B3`, la sincronía es disciplina.** Es el único punto flojo de esta decisión y es explícito.
- ⚠️ **Las dimensiones se escriben como string (`"7px"`), no como objeto (`{"value":7,"unit":"px"}`).**
  El draft más nuevo de DTCG prefiere el objeto; Style Dictionary 4 consume el string de forma nativa.
  Se elige el string porque es lo que la herramienta lee hoy sin preprocesador. **Gatillo:** si algún
  consumidor futuro exige la forma objeto, la conversión es mecánica y va con su propio ADR.
