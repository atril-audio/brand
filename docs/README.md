# `docs/` — el sistema documentado

**La regla de oro:** *lo que describe el estado actual **vive**; lo que registra un cambio se
**acumula** y es inmutable.* Mezclarlos es lo que pudre la documentación.

| carpeta | qué guarda | vida |
|---|---|---|
| [`adr/`](adr/) | qué se decidió sobre la identidad y por qué | **inmutable** · se supersede |
| [`rfc/`](rfc/) | una propuesta de cambio al sistema · el debate | vivo en revisión → archivado |
| [`specs/`](specs/) | specs SDD de ejecución, con criterios de aceptación | inmutable |
| [`prd/`](prd/) | qué problema resuelve una pieza nueva del sistema, y para quién | vivo en discovery → congelado |

El [`README`](../README.md) es el documento **vivo** que dice qué hay y cómo se consume: hace aquí el
papel que el `PRD.md` hace en `pedalera`.

Los ADR que **cruzan repos** no van aquí: van a
[`atril-meta/why/`](https://github.com/atril-audio/meta/tree/main/why). Que `brand` sea su propio
repo y sea público es una decisión de esas — vive allá, en el ADR-0001 del `meta`.

## Por qué existe esta carpeta, dicho de frente

Hasta el 2026-08-19 el *porqué* de cada elección de identidad vivía **solo** en el
`DECISIONES.md` del taller, en el hub de Marco. Los archivos de aquí lo citaban como fuente.

Eso funcionaba para una persona y rompía para todas las demás: **quien clona este repo no puede leer
ese archivo.** Un repo público cuyas decisiones son inaccesibles es un repo que se re-discute solo.
Lo que se decide sobre el sistema se registra **aquí**; el taller queda como lo que es, el **historial
de exploración** (las direcciones descartadas, las versiones que no fueron).

## Cuál de los cuatro, y cuándo

`prd/` es el más delgado de los cuatro, a propósito: casi todo el trabajo de este repo es
**ejecución sobre un sistema ya decidido**, y va directo a `specs/`. Un PRD aquí se justifica cuando
aparece una pieza que **cambia lo que un consumidor puede hacer** — un tema claro, una salida iOS,
un set de iconos nuevo — no cuando se agrega un token.

```
1  docs/prd/     solo si la pieza es nueva y cambia lo que se puede consumir
2  hub: taller/  se explora e itera — aquí no llega lo descartado
3  docs/rfc/     si hay debate técnico (¿qué formato? ¿qué build?)
4  docs/adr/     lo que se decidió · inmutable · el porqué que sobrevive
5  docs/specs/   la spec de ejecución + el código, en el mismo PR
6  README        se actualiza si cambió qué hay o cómo se consume
```

**No todo cambio lleva los cuatro documentos.** La significancia decide — rulebook §2.
