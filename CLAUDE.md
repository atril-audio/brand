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
- **Commits en español, imperativo, con el PORQUÉ en el cuerpo.**
- **La documentación viaja en el mismo PR** (DoD, punto 4).

⚠️ **Las skills de Spec Kit solo se cargan si la sesión está rooteada en este repo** (`.claude/skills/`).
Desde el hub no existen, y es fácil escribir la spec a mano sin notar que había un ciclo.
