# ADR-0001 · Cada marca es su objeto, en masa, desde su vista canónica

**Fecha:** 2026-08-17 · **Estado:** aceptado
**Reemplaza:** la «gramática de marca» (fino 1.7u · a filo · trazo · normal), que nunca llegó a ADR

## Contexto

Atril necesitaba dos marcas hermanas —una para la casa, una para Pedalera— y la primera idea de
cómo hermanarlas fue una **gramática compartida**: un peso de trazo, un tratamiento de esquina, una
regla de proporción. Falló dos veces, y las dos fallas enseñaron algo distinto.

**Falla 1 · la categoría.** Se propusieron tres pictogramas de trazo fino. Se rechazaron enteros, y
la investigación dio dos causas medibles:

1. **El rubro no usa pictogramas.** FabFilter, Valhalla, Soundtoys, oeksound, Softube, Goodhertz,
   Arturia, Eventide: todos son **logotipos** — la palabra bien dibujada. Donde hay símbolo, es un
   monograma en masa, chico, para el slot de ícono. Proponer pictogramas equivocaba la categoría
   antes del primer trazo.
2. **El trazo fino uniforme se lee amateur, y es medible.** Un stroke matemáticamente constante
   *parece más fino en las curvas*; el oficio consiste en engrosarlo justo ahí (corrección óptica).
   Sin eso se lee «primer borrador», y en negativo las líneas finas se cierran.

La causa raíz fue el origen de la gramática: venía de los **iconos de interfaz**, donde es correcta,
y se aplicó a una marca, donde no.

**Falla 2 · la vista.** Con la marca de Pedalera ya elegida (un footswitch), se dibujó Atril **de
frente y de perfil**. Ninguna de las cuatro propuestas hacía juego, y el motivo era simple y se
había pasado por alto: **Pedalera es un footswitch visto desde arriba** — porque es la vista de quien
lo pisa. Un atril desde arriba no es un atril: es un **trípode**, centrado y radial. Esa era la rima.

## Decisión

> **Cada marca es su objeto, en masa, desde su vista canónica.**

Pedalera es su footswitch desde arriba; Atril es su trípode desde arriba. Las dos comparten lo que
salió de aplicar la regla, no un parámetro impuesto: **masa centrada, radial, con contraforma calada
en el centro**. El logotipo es tipográfico y va aparte (mono espaciado); el símbolo resuelve el slot
de ícono.

**No hay una gramática de trazo compartida entre marcas.** La que existe sigue vigente, pero solo
donde nació: los iconos de interfaz de `iconos.css`, con peso por tamaño.

## Consecuencias

**A favor**

- La familia **se ve sin declararla.** Puestas una al lado de la otra se leen como par; no hace falta
  un documento que explique el parentesco.
- **No hay parámetro compartido que mantener.** Una marca nueva no obliga a re-verificar las otras.
- Cada marca puede corregirse ópticamente **por separado**, que es como se corrige de verdad.

**En contra, y hay que decirlo**

- **La regla no dice cuál es la vista canónica de un objeto.** Eso es juicio, y hay que **renderizar
  para saberlo**: a Atril le costó una ronda entera descubrir que la suya era desde arriba.
- **Un producto cuyo objeto no tenga una vista reconocible no tiene marca por esta vía.** La regla se
  quedaría corta y habría que ampliarla — mejor un ADR nuevo ese día que forzar el caso.
- **La corrección óptica es trabajo a mano por marca**, no un token. No se automatiza y no se hereda.

**El regalo que no se forzó:** a 16px el trípode **se lee como una `A`**. La coincidencia con el
nombre llegó por la vista de arriba, no por dibujar una letra — de hecho la versión que *era* una A
(el triángulo hueco de frente) fue una de las rechazadas.

## Lo que NO hay que «corregir»

El anillo del hexágono de Pedalera es **más grueso en los vértices (3.6) que en las caras (2.26)**.
No es un error de trazo: es lo que hace una tuerca real, que tiene más material en las esquinas.
