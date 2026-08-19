# Constitución de brand

**Los principios que el agente obedece** al tocar el sistema de identidad de Atril. El *porqué* de
cada uno vive en `docs/adr/` y en `atril-meta/reference/rulebook-desarrollo.md`. Esto es
deliberadamente **delgado**: duplicar el rulebook aquí lo condena a despegarse.

**Versión:** 1.0.0 · **Ratificada:** 2026-08-19 · **Última enmienda:** 2026-08-19

## Principios

### I. La spec es la unidad de trabajo
Todo cambio significativo del sistema empieza por una spec. Corregir un typo o un valor obviamente
mal escrito, no. *La significancia decide* — rulebook §2. El issue apunta a la spec; **nunca la copia**.

### II. Público significa sin credenciales, en ningún lugar
Este es **el único repo público de Atril**, y eso es plomería, no ideología: lo consumen stacks
distintos y habilita CI sin secretos. La consecuencia es dura: ni un token, ni una URL firmada, ni un
path de la máquina de nadie — **ni en el código ni en un issue ni en un commit**. Lo que entra aquí
es visible para siempre, incluso si se borra después.

### III. El consumidor trae el archivo, no sus valores
Nada de copiar y pegar. Una copia de `tokens.css` en otro repo **es un bug, no un atajo** — pasó y
costó: el prototipo perdió todos sus estilos al graduar. Si aparece un `#hex` en el CSS de un
producto, el sistema está roto.

### IV. Un nombre de token es una API
Renombrar o borrar una variable rompe a quien la consume, en silencio y en otro repo. Agregar es
seguro; **renombrar y borrar son cambios de contrato**: llevan ADR y aviso a los consumidores.

### V. Ninguna marca se fija sin verla a 16px físicos reales
No a 16 CSS px en una pantalla Retina: a 16 **físicos**, ampliados para poder juzgarlos. Es la
prueba que rechazó dos rondas de logo y validó las dos que quedaron — ver
[`docs/adr/0002`](../../docs/adr/0002-toda-marca-se-verifica-a-16px-reales.md).

### VI. Cada marca es su objeto, desde su vista canónica
En masa, centrada, radial, con contraforma calada. **No hay una gramática de trazo compartida** — se
intentó y falló. Ver [`docs/adr/0001`](../../docs/adr/0001-cada-marca-es-su-objeto.md).

### VII. Nunca a `main`
Rama → PR → checks → **squash**. Aquí no es solo disciplina: `brand` es público, así que es el
**único** repo de Atril donde GitHub hace cumplir el ruleset de verdad.

### VIII. La documentación viaja con el código
En el mismo PR. Un ADR si la decisión fue estructural; el `README` si cambió lo que se consume o
cómo. Un cambio que deja la doc atrás **no está hecho** — rulebook §5.

## Gobernanza

Esta constitución **manda sobre cualquier otra práctica de este repo**. Enmendarla es un PR que dice
qué cambia y por qué; si el cambio es estructural, además lleva un ADR.

**Lo que NO se decide aquí:** el flujo, el DoD y dónde viven las tareas viven en el
[rulebook](https://github.com/atril-audio/meta/blob/main/reference/rulebook-desarrollo.md), que es
cross-repo. Si algo se contradice, **manda el rulebook**.
