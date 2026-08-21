# brand — la identidad de Atril, en formato consumible

El sistema de diseño y las marcas de **Atril**, en archivos que un build puede leer sin
traducción. No hay código de producto aquí: solo tokens, marcas y assets.

> **Este repo es el único PÚBLICO de Atril**, y por una razón de plomería, no ideológica: lo van a
> consumir stacks distintos (C++/CMake, web) y público significa **sin credenciales en ninguno**.
> Habilita además CI sin secretos y CDN el día que haya una landing.

## Qué hay

| | qué es |
|---|---|
| `tokens.json` | ⭐ **la fuente de verdad** — el sistema en formato [DTCG](https://tr.designtokens.org/format/): 51 tokens tipados, cada uno con su porqué en `$description` |
| `tokens.css` | **generado** de `tokens.json` con `npm run build`. Es lo que consumen los builds. **No se edita a mano** |
| `compat/` | el puente de nombres **temporal** para la app vieja, con su gatillo de borrado. No es el sistema |
| `fuentes.css` | los `@font-face` de Chivo y Roboto Mono, servidas desde **este** repo |
| `fuentes/` | los `woff2` **variables** + **las licencias OFL** (no se borran) + la sonda de verificación |
| `iconos.svg` | el sprite de 22 iconos de línea, un `<symbol>` cada uno |
| `iconos.css` | el contrato del set: `.ico` + los tres pesos |
| `marca/` | símbolo e ícono de cada producto, y el lockup del logotipo |
| `marca/NOTAS.md` | la regla de familia y **las dos cosas que no hay que "corregir"** |
| [`docs/`](docs/) | **el sistema documentado**: qué se decidió y por qué (`adr/`), y cómo se trabaja aquí |

## Cómo se consume

Nada de copiar y pegar: **el que consume trae el archivo, no sus valores.**

| consumidor | mecanismo |
|---|---|
| **Pedalera** (CMake / C++) | el build trae `tokens.css`, `fuentes.css`, `fuentes/`, `iconos.svg` e `iconos.css` a `UI/` |
| una web futura | `npm i` del repo, o por CDN |

⚠️ **`fuentes.css` no es opcional si quieres que se vea como Pedalera.** Nombrar `"Chivo"` en
`tokens.css` no la provee: sin `fuentes.css` (o sin red, con un `<link>` a Google) el texto cae al font
del sistema y el gain staging deja de ser monoespaciado. Ver [`fuentes/`](fuentes/).

El mecanismo exacto está en
[`atril-meta/why/0002-como-se-consume-brand.md`](https://github.com/atril-audio/meta/blob/main/why/0002-como-se-consume-brand.md).

## Cómo se edita el sistema

**Se edita `tokens.json`, nunca `tokens.css`.** Un cambio a mano en el CSS se pierde en el próximo
build.

```bash
npm ci
# editas tokens.json
npm run build       # regenera tokens.css
npm run verificar   # falla si el CSS no coincide con el JSON
```

`tokens.css` **se commitea igual**, generado y versionado: `pedalera` es un plugin C++/JUCE que lo
copia desde su `CMakeLists.txt`, y no debe necesitar Node para compilar audio. El costo —que un
artefacto generado dentro de git puede desincronizarse— lo cierra el CI: el workflow
[`verificar`](.github/workflows/verificar.yml) corre `npm run verificar` **en cada PR**, así que un CSS
que no coincida con su JSON no se puede mergear. El porqué de commitearlo está en el
[ADR-0003](docs/adr/0003-el-css-generado-se-commitea.md).

Todo lo que el CI corre, corre igual en tu máquina:

```bash
npm run verificar:todo   # el sync del CSS + las reglas del repo
```

**Agregar un token** es agregarlo al grupo que le corresponde con su `$type` y su `$description`. La
descripción no es adorno: es el argumento de por qué el token existe, sale como comentario en el CSS
y la recibe cualquier herramienta que lea DTCG.

## La regla que lo mantiene sano

> **Ninguna regla de la interfaz escribe un color a mano.** Todo sale de `tokens.css` por
> `var(--...)`.

Si aparece un `#hex` en el CSS de un producto, el sistema está roto. La app de hoy tiene 40 hex
sueltos y 17 `rgba()` con valores viejos inlineados: es deuda conocida e inventariada, no un permiso.

## Cómo se trabaja aquí

| | dónde |
|---|---|
| qué se decidió sobre la identidad, y **por qué** | [`docs/adr/`](docs/adr/) |
| los principios que un agente obedece en este repo | [`.specify/memory/constitution.md`](.specify/memory/constitution.md) |
| el flujo (rama → PR → merge), el DoD y dónde viven las tareas | [`meta` · rulebook](https://github.com/atril-audio/meta/blob/main/reference/rulebook-desarrollo.md) |
| qué sigue | el [Project `Pedalera`](https://github.com/orgs/atril-audio/projects/1), vista *Orden de ejecución* |

**La spec es la unidad de trabajo:** todo cambio significativo empieza por una spec
(`/speckit-specify`) y sus tareas bajan a issues. Un typo, no — *la significancia decide*.

## De dónde salió todo esto

Del taller, en el hub: `work/pedalera/taller/`. Ahí vive el **historial de exploración** (las
direcciones descartadas, las versiones de cada marca, lo que no funcionó y por qué). Aquí solo llega
lo aprobado — y desde el 2026-08-19, **también su porqué**: vive en [`docs/adr/`](docs/adr/), donde
quien clona el repo puede leerlo.
