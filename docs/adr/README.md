# `adr/` — las decisiones del sistema de identidad

Un ADR por decisión. **Inmutable:** no se edita para cambiar de opinión — se escribe uno nuevo que
lo **supersede** y se marca el viejo. Lo que vale es el argumento, no el veredicto.

Acá van las decisiones de **este** repo: forma de las marcas, formato de los tokens, cómo se empaqueta
el sistema. Las que **cruzan repos** (por qué `brand` es su propio repo, cómo lo consume `pedalera`)
viven en [`atril-meta/why/`](https://github.com/atril-audio/meta/tree/main/why).

| | decisión | fecha |
|---|---|---|
| [0001](0001-cada-marca-es-su-objeto.md) | Cada marca es su objeto, en masa, desde su vista canónica — no hay gramática de trazo compartida | 2026-08-17 |
| [0002](0002-toda-marca-se-verifica-a-16px-reales.md) | Ninguna marca se fija sin verla a 16px físicos reales | 2026-08-17 |
| [0003](0003-el-css-generado-se-commitea.md) | El `tokens.css` generado se commitea · el puente temporal no entra a la fuente · el ángulo del degradado va en `$extensions` | 2026-08-19 |

**Formato:** `NNNN-slug-en-kebab.md`, numeración corrida. Título, fecha, estado
(`aceptado` · `superseded por NNNN`), el contexto, la decisión, y **las consecuencias — incluidas las
incómodas**. Un ADR que solo dice lo bueno no sirve para revisarlo en un año.
