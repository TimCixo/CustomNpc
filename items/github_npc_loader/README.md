# GitHub NPC Loader

Scripted item для підвантаження NPC hook-коду з GitHub.

Поточна поведінка:
- ПКМ не по NPC відкриває GUI.
- В GUI можна вставити URL репо або URL папки виду `https://github.com/<owner>/<repo>/tree/<branch>/<path>`.
- Код `.js` стягується з GitHub API і кешується в `player.getTempdata()` по `session_id` предмета.
- ПКМ по NPC записує bundle у `Scripts[0].Script` через `getEntityNbt()` / `setEntityNbt()`.

Поточні підтримані hook-файли:
- `init.js`
- `interact.js`
- `timer.js`
- `attack.js`
- `target.js`
- `damaged.js`
- `died.js`
- `kills.js`
- `killed.js`
- `collide.js`
- `meleeAttack.js`

Простір для майбутньої стандартизації:
- окремий NPC-пакет в окремій папці
- один hook-файл на одне ім'я hook-а
- додаткові `.js`, які не є підтриманими hook-файлами, зараз ігноруються
- після стабілізації можна зафіксувати layout на кшталт `npc/<stage>/<npc_name>/...`
