# brand — instrucciones para el agente

**Este repo es PÚBLICO.** Es lo primero que tienes que saber y lo que más consecuencias tiene.

## La autoridad está en `meta`, no en este archivo

| qué | dónde |
|---|---|
| el flujo, el DoD, cuándo SDD, dónde viven las tareas | [`meta/reference/rulebook-desarrollo.md`](https://github.com/atril-audio/meta/blob/main/reference/rulebook-desarrollo.md) |
| los principios que obedeces aquí | [`.specify/memory/constitution.md`](.specify/memory/constitution.md) |
| qué se decidió sobre la identidad, y por qué | [`docs/adr/`](docs/adr/) |
| qué sigue | el [Project `Pedalera`](https://github.com/orgs/atril-audio/projects/1) |

**Si algo de aquí contradice al rulebook, manda el rulebook.**

## Público significa sin credenciales, en ningún lugar

Ni un token, ni una URL firmada, ni un path de la máquina de nadie — **ni en el código, ni en un
issue, ni en un mensaje de commit.** Lo que entra aquí es visible para siempre, incluso si se borra
después.

Es también el **único** repo de Atril donde GitHub hace cumplir el ruleset de verdad, y el único con
un check obligatorio: **`verificar`**.

## El sistema se edita en el JSON, nunca en el CSS

```bash
pnpm i     # o npm ci — hoy el lockfile es de npm
# editas tokens.json
npm run build        # regenera tokens.css
npm run verificar:todo   # el sync + las reglas del repo
```

**`tokens.css` es un artefacto generado y commiteado.** Editarlo a mano se pierde en el próximo build,
y el CI lo detecta. El porqué de commitear el generado está en
[`docs/adr/0003`](docs/adr/0003-el-css-generado-se-commitea.md).

**Un nombre de token es una API.** Agregar es seguro; **renombrar y borrar rompen a quien consume**, en
silencio y en otro repo: llevan ADR y aviso.

## Lo que no se toca

- **Las licencias `OFL` de `fuentes/`.** Redistribuir esas tipografías **exige** incluirlas: borrarlas
  convierte este repo en una infracción. El CI lo verifica.
- **Las dos cosas de `marca/NOTAS.md`** que parecen errores y no lo son (el anillo del hexágono más
  grueso en los vértices; los iconos sin un peso único).
- **`compat/puente-nombres.css`** no es el sistema: es compatibilidad temporal, con gatillo de borrado.
  **No lo metas a `tokens.json`.**

## Reglas duras

- **Nunca a `main`.** Rama → PR → check verde → **squash**.
- **Ninguna marca se fija sin verla a 16px físicos reales** — [`docs/adr/0002`](docs/adr/0002-toda-marca-se-verifica-a-16px-reales.md).
  Es un gate, no una revisión opcional: descartó tres variantes y validó dos.
- **Español de México, forma "tú".** Nunca voseo argentino. Aplica a las `$description` de
  `tokens.json`, que **salen al CSS generado y a un repo público**. Ya se rompió cuatro veces.
- **[Conventional Commits](https://github.com/atril-audio/meta/blob/main/reference/convenciones.md#commits)**,
  resumen en español e imperativo, con el PORQUÉ en el cuerpo. El **tipo** es del estándar y va en inglés
  (`feat` `fix` `docs` `refactor` `perf` `test` `build` `ci` `chore`); el **alcance** va en español:
  `feat(tokens):`, `docs(adr):`, `fix(fuentes):`. **El tipo no es el alcance.**
- **La documentación viaja en el mismo PR** (DoD, punto 4).

## El flujo SDD

### ¿Lleva spec o no? La significancia decide — y aquí casi nada la lleva

Este repo es **ejecución sobre un sistema ya decidido**, así que la mayoría del trabajo va sin spec.
La tabla del rulebook §2, traducida a lo que de verdad pasa aquí:

| lo que estás por hacer | ruta |
|---|---|
| corregir un valor obviamente mal, un typo, una descripción | **rama → PR → merge.** Sin spec |
| **agregar** un token a un grupo que ya existe | **rama → PR → merge.** Agregar es seguro |
| **renombrar o borrar** un token | **SDD + ADR** — rompe a quien consume, en silencio y en otro repo |
| cambiar **cómo se genera** o **cómo se consume** el sistema | **SDD + ADR** |
| tocar una marca, o agregar una nueva | **SDD**, y pasa por el gate de los 16px ([ADR-0002](docs/adr/0002-toda-marca-se-verifica-a-16px-reales.md)) |
| una pieza nueva que cambia lo que un consumidor puede hacer *(tema claro, salida iOS)* | **PRD + SDD** |

**Regla de bolsillo:** *si al terminar alguien pudiera preguntar «¿por qué así?», hay spec.* Y el
corolario: **escribir una spec para un typo también está mal** (§6 del rulebook).

### El ciclo, cuando sí lleva

```
/speckit-specify   → la spec          docs/specs/NNN-<slug>/spec.md
/speckit-clarify   → preguntas antes de planear (opcional, recomendada)
/speckit-plan      → el plan técnico
/speckit-tasks     → las tareas
/speckit-taskstoissues  → ⭐ las tareas bajan a issues, como SUB-ISSUES de su épica
/speckit-implement → ejecuta
```

### Las trampas, aprendidas corriéndolo

⚠️ **Las skills solo se cargan si la sesión está rooteada en este repo** (`.claude/skills/`). Desde el
hub **no existen**, y es fácil escribir la spec a mano sin notar que había un ciclo. **Pasó el
2026-08-19 con las specs 001 y 002 de este repo.**

⚠️ **Las specs van en `docs/specs/`, no en `specs/`**, y las skills lo respetan solo si
`/speckit-specify` escribió `.specify/feature.json` con la ruta resuelta.

⚠️ **La rama NO sigue a Spec Kit:** manda el rulebook §4 (`<tipo>/<slug>`). El número de spec y el
nombre de rama están desacoplados, así que `create-new-feature.sh` **no se usa tal cual**.

⚠️ **La checklist de calidad del paso 7 se CORRE, no se marca.** Si sale toda en verde a la primera, no
la corriste.

⚠️ **No inventes los artefactos que no aplican** — sin modelo de datos no hay `data-model.md`, y en el
Constitution Check «no aplica» es una respuesta válida. Fingir que aplica, no.

⚠️ **Máximo 3 `[NEEDS CLARIFICATION]`**. Si hacen falta más, la feature no está entendida.
