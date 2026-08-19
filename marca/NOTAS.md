# marca — los artefactos de identidad

**Graduados del taller el 2026-08-18.** El **porqué** de cada elección vive en
[`../docs/adr/`](../docs/adr/) — aquí, en el repo, legible por quien clone. El **historial de
exploración** (las direcciones descartadas, las versiones de cada marca) se queda en el taller:
`~/dev/hub/contextos/amass/work/pedalera/taller/`.

| archivo | qué es |
|---|---|
| `pedalera-simbolo.svg` | el interruptor: tuerca hexagonal + botón, desde arriba |
| `pedalera-icono.svg` | el símbolo calado en un bloque · ícono del `.vst3` · favicon |
| `atril-simbolo.svg` | el trípode desde arriba: tres patas + cubo anillado |
| `atril-icono.svg` | ídem en bloque · **avatar de github.com/atril-audio** |
| `logotipo.css` | el lockup: mono espaciado, medido en **alturas del símbolo** |

## La regla de familia

> **Cada marca es su objeto, en masa, desde su vista canónica.**

Pedalera es su footswitch desde arriba; Atril es su trípode desde arriba. Las dos: masa centrada,
radial, con contraforma calada en el centro. **No hay una gramática de trazo compartida** — se
intentó y falló dos veces, con el argumento completo en
[`ADR-0001`](../docs/adr/0001-cada-marca-es-su-objeto.md).

## Dos cosas que NO hay que "corregir"

1. El anillo del hexágono de Pedalera es **más grueso en los vértices que en las caras**. Es lo que
   hace una tuerca real, que tiene más material en las esquinas —
   [`ADR-0001`](../docs/adr/0001-cada-marca-es-su-objeto.md).
2. Los iconos de `../iconos.svg` **no tienen un peso**: tienen peso por tamaño (`.ico.chico` = 2.8),
   porque los botones del nodo corren a 10.5px y un trazo de 2.0 mide 0.9px ahí.

## Antes de tocar cualquiera de estos archivos

Ninguna marca se fija sin verla a **16px físicos reales**: es un gate, no una revisión opcional, y
descartó tres variantes y validó dos. Ver
[`ADR-0002`](../docs/adr/0002-toda-marca-se-verifica-a-16px-reales.md) — incluida la deuda de que el
disparador que produce esas capturas todavía vive en el hub.

## Estado: INERTE

Ninguno de estos archivos está referenciado todavía por `index.html`. **Aterrizar no es cablear** —
el cableado es código, y vive del otro lado: es la épica **`F0 · el marco`** de `pedalera`, que
depende de que `B1` y `B2` estén hechas primero.

El gate del `meta` que lo frenaba **está abierto** desde el 2026-08-18. Lo que falta ahora es orden,
no permiso — ver el [Project `Pedalera`](https://github.com/orgs/atril-audio/projects/1). El
inventario de la tarea completa (este cableado + 3 correcciones de rol + 2 gradientes + 17 `rgba()` +
reemplazar los glifos) está en `work/pedalera/taller/03-sistema-en-la-app/INFORME.md`.
