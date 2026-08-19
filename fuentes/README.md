# `fuentes/` — las tipografías, servidas desde acá

**Chivo** y **Roboto Mono** empaquetadas, no traídas de Google Fonts. El contrato de consumo es
[`../fuentes.css`](../fuentes.css): quien lo incluya obtiene las dos familias sin red.

| archivo | qué es |
|---|---|
| `chivo-latin.woff2` · `chivo-latin-ext.woff2` | Chivo **variable** · `wght 200–900` · v21 |
| `roboto-mono-latin.woff2` · `roboto-mono-latin-ext.woff2` | Roboto Mono **variable** · `wght 200–600` · v31 |
| `OFL-Chivo.txt` · `LICENSE-RobotoMono.txt` | **las licencias · no se borran** (ver abajo) |
| `sonda.html` | la verificación: abrila y decí si las cuatro filas se ven distintas |

**Variables, o sea un archivo por familia y subset** en vez de uno por peso. 114 KB los cuatro.

## Las licencias no son decoración

Las dos familias son **SIL Open Font License 1.1**. La OFL permite redistribuirlas —que es
exactamente lo que hace este repo— **con la condición de incluir la licencia**. Borrar esos dos `.txt`
convierte un repo público en una infracción. No se toca.

## Qué subsets, y qué queda afuera

Solo **`latin`** y **`latin-ext`**. `latin` (U+0000–00FF) ya cubre todos los acentos del español, los
signos de apertura `¿¡` y las flechas `↑↓` de la interfaz. **No** se empaquetan griego, cirílico ni
vietnamita: nadie los usa y son ~50 KB más.

🔔 **Gatillo:** si Atril se localiza a un idioma que los necesite, se re-empaquetan acá.

⚠️ **Los glifos de teclado (`⌘ ⇧ ⌥ ⏎ ⋯ ↗`) están afuera de estos subsets** — igual que estaban afuera
de lo que servía Google. Caen al font del sistema, hoy y antes: **no es una regresión de este cambio**.
Está inventariado como «reemplazar los glifos» en el informe del taller.

## Cómo se verifica

`sonda.html` mide tres cosas y las imprime: que las familias **carguen del archivo local** (no del
fallback), y que **el eje de peso responda**. Para el mono el ancho no sirve como métrica —todos sus
glifos tienen el mismo avance— así que mide **tinta**: cuántos píxeles pinta el mismo texto a peso 200
y a peso 600.

Verificado el 2026-08-19 en Chromium headless:

| | 200 | máximo |
|---|---|---|
| Chivo · ancho | 396.67 px | 413.09 px (900) |
| Chivo · tinta | 5.354 px | 10.581 px (900) |
| Roboto Mono · ancho | 408.08 px | 408.08 px (600) · *igual, es mono* |
| Roboto Mono · tinta | 4.038 px | 8.113 px (600) |

El fallback serif medía 345.39 px, así que **no es el fallback**.

## De dónde salieron

De la API de Google Fonts (`fonts.gstatic.com`) el **2026-08-19**, con el mismo `unicode-range` que
sirve Google — así que el particionado por idioma sigue funcionando igual. `fuentes.css` guarda en su
encabezado la fecha y las versiones.
