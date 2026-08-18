# marca — los artefactos de identidad

**Graduados del taller el 2026-08-18.** Vienen de
`~/dev/hub/contextos/amass/work/pedalera/taller/` — ahí está el historial de exploración (las
direcciones descartadas, las versiones de cada marca) y en `../../DECISIONES.md` de ese workstream
está el *porqué* de cada elección.

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
intentó y no funcionó (ver `DECISIONES.md`, 2026-08-17).

## Dos cosas que NO hay que "corregir"

1. El anillo del hexágono de Pedalera es **más grueso en los vértices que en las caras**. Es lo que
   hace una tuerca real, que tiene más material en las esquinas.
2. Los iconos de `../iconos.svg` **no tienen un peso**: tienen peso por tamaño (`.ico.chico` = 2.8),
   porque los botones del nodo corren a 10.5px y un trazo de 2.0 mide 0.9px ahí.

## Estado: INERTE

Ninguno de estos archivos está referenciado todavía por `index.html`. **Aterrizar no es cablear** —
el cableado es código y va después del gate del `meta`. La tarea completa (este cableado + 3
correcciones de rol + 2 gradientes + 17 `rgba()` + reemplazar los glifos) está inventariada en
`work/pedalera/taller/03-sistema-en-la-app/INFORME.md`.
