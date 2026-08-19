# ADR-0002 · Ninguna marca se fija sin verla a 16px físicos reales

**Fecha:** 2026-08-17 · **Estado:** aceptado

## Contexto

El destino real de estos símbolos es chico y no negociable: el **ícono del `.vst3`**, el **favicon** y
el **avatar de la organización**. Todos viven alrededor de **16px**. Un símbolo que se juzga a 400px
en una página de presentación **miente**: los detalles que lo hacen interesante en grande son los
primeros que se cierran en chico.

Y hay una trampa dentro de la trampa: **16 CSS px en una pantalla Retina no son 16px**. El navegador
los dibuja con el doble de información y el resultado se ve mejor de lo que va a verse nunca en un
sistema operativo.

## Decisión

**Verificar a 16px físicos reales es un gate, no una revisión opcional.** Ninguna variante se fija
sin pasarlo.

El método: renderizar con **device-scale 1** y ampliar **10×** con `image-rendering: pixelated`, para
poder juzgar píxel por píxel lo que el ojo no alcanza a ver a tamaño real.

## Qué produjo, concretamente

No es una precaución teórica: **cambió el resultado cinco veces.**

| descartó | por qué |
|---|---|
| Pedalera **E** · botón hundido | a 16px el centro calado se cierra y queda idéntica a la base: el detalle solo existía en grande |
| Pedalera **04** · la tabla | se lee como un gráfico de barras |
| Atril **C** · la rejilla | las varillas se cierran en una mancha diagonal |

| validó | qué se creía |
|---|---|
| Pedalera **B** · botón adelante | el anillo queda de **1.36** en las caras y estaba marcado como riesgo. **Aguantó**: el hexágono se lee y el botón queda claro. No se corrigió nada |
| la **familia** completa | las tres patas y el cubo de Atril se leen, y el hueco del cubo sobrevive como un pixel |

El caso de **B** es el que justifica el gate en las dos direcciones: sin la prueba se habría
«corregido» un problema que no existía, engordando el anillo y perdiendo la lectura de la tuerca.

## Consecuencias

- **Cuesta un render por variante.** Es el precio, y es bajo.
- **Descartar por 16px es descartar por el uso real**, no por gusto — lo que hace la conversación
  discutible con evidencia y no con adjetivos.
- ⚠️ **Deuda conocida:** el disparador que produce estas capturas vive en el hub de Marco
  (`work/pedalera/taller/scripts/disparar.py`), **no en este repo**. Quien clone `brand` no puede
  re-verificar una marca. **Gatillo:** el día que haya que tocar una marca o agregar una nueva, el
  disparador gradúa acá y esta línea se borra.
