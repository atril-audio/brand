# brand — la identidad de Atril, en formato consumible

El sistema de diseño y las marcas de **Atril**, en archivos que un build puede leer sin
traducción. No hay código de producto acá: solo tokens, marcas y assets.

> **Este repo es el único PÚBLICO de Atril**, y por una razón de plomería, no ideológica: lo van a
> consumir stacks distintos (C++/CMake, web) y público significa **sin credenciales en ninguno**.
> Habilita además CI sin secretos y CDN el día que haya una landing.

## Qué hay

| | qué es |
|---|---|
| `tokens.css` | **el sistema**: color, tipografía, y las escalas de espacio y forma. Un bloque, sin `[data-*]` |
| `iconos.svg` | el sprite de 20 iconos de línea, un `<symbol>` cada uno |
| `iconos.css` | el contrato del set: `.ico` + los tres pesos |
| `marca/` | símbolo e ícono de cada producto, y el lockup del logotipo |
| `marca/NOTAS.md` | la regla de familia y **las dos cosas que no hay que "corregir"** |

## Cómo se consume

Nada de copiar y pegar: **el que consume trae el archivo, no sus valores.**

| consumidor | mecanismo |
|---|---|
| **Pedalera** (CMake / C++) | el build trae `tokens.css`, `iconos.svg` e `iconos.css` a `UI/` |
| una web futura | `npm i` del repo, o por CDN |

El mecanismo exacto se decide cuando exista remoto — ver `../atril-meta/why/`.

## La regla que lo mantiene sano

> **Ninguna regla de la interfaz escribe un color a mano.** Todo sale de `tokens.css` por
> `var(--...)`.

Si aparece un `#hex` en el CSS de un producto, el sistema está roto. La app de hoy tiene 40 hex
sueltos y 17 `rgba()` con valores viejos inlineados: es deuda conocida e inventariada, no un permiso.

## De dónde salió todo esto

Del taller, en el hub: `work/pedalera/taller/`. Ahí vive el **historial de exploración** (las
direcciones descartadas, las versiones de cada marca, lo que no funcionó y por qué). Acá solo llega
lo aprobado.

El **porqué** de cada elección está en `work/pedalera/DECISIONES.md`.
