# GitHub NPC Loader

Scripted Item для загрузки hook-скриптов NPC напрямую из GitHub-папки.

## Структура loader-пакета

Теперь пакет разделён на две роли:

- `init.js` и `interact.js` — тонкий bootstrap/installer предмета
- `runtime.js` — основной runtime loader, который bootstrap подтягивает из репозитория

Внутри `github_loader/` также есть папка `shared/`:

- `shared/main_ui.js` — главное окно loader-а
- `shared/preview_ui.js` — отдельное окно preview
- `shared/git_runtime.js` — GitHub URL parsing, HTTP и сборка пакета
- `shared/__shared.js` — карта модулей для дальнейшей унификации структуры

Практический нюанс:

- bootstrap остаётся маленьким и живёт прямо в item hook
- основной функционал loader-а больше не обязан лежать внутри installer-скрипта
- runtime кэшируется у игрока после первого использования и периодически обновляется с `github_loader/runtime.js`
- `shared/` используется как source-разбиение по ответственности для поддержки runtime-кода

## Что изменено

Теперь предмет ориентирован не на "любую папку с любыми `.js`", а на один явный NPC-пакет.

- URL в GUI должен указывать на папку одного NPC.
- Для каждого hook допускается только один файл.
- Если в папке найдено несколько файлов для одного и того же hook, loader останавливается с ошибкой.
- Приоритет layout теперь детерминированный:
  - `hooks/<hook>.js` — рекомендованный формат
  - `<hook>.js` — совместимость
  - `<hook>/<hook>.js` — совместимость со старым layout

## Рекомендуемая структура папки

Рекомендуемый layout пакета, который нужно отдавать предмету:

```text
<npc_package>/
  README.md
  hooks/
    init.js
    interact.js
    timer.js
    target.js
    attack.js
    damaged.js
    meleeAttack.js
    killed.js
    kills.js
    died.js
    collide.js
```

Можно хранить только нужные hooks. Пустые hooks не обязательны.

Если нужен старый layout, loader всё ещё понимает:

```text
<npc_package>/
  init.js
  timer.js
  interact/
    interact.js
```

Но смешивать несколько вариантов для одного hook не надо. Например, нельзя одновременно держать:

- `hooks/init.js`
- `init.js`
- `init/init.js`

Это считается дублем `init`.

## Какой URL вставлять в предмет

Нужно вставлять URL именно папки NPC-пакета, а не всего репозитория, если внутри репозитория несколько NPC.

Примеры:

```text
https://github.com/<owner>/<repo>/tree/main/npc/technical/respawn_clock/clock
https://github.com/<owner>/<repo>/tree/main/npc/finished/arceus_boss
```

Если вставить слишком широкую папку, где лежат скрипты нескольких NPC или ролей, loader теперь корректно свалится на дублях hook-файлов вместо случайного выбора.

## Порядок hooks в NPC

При записи в NPC предмет раскладывает hooks в таком порядке:

1. `init`
2. `interact`
3. `timer`
4. `target`
5. `attack`
6. `damaged`
7. `meleeAttack`
8. `killed`
9. `kills`
10. `died`
11. `collide`

Именно в таком порядке лучше мыслить структуру пакета и проверять итоговый набор скриптов в NPC.

## Как пользоваться

1. Дай предмету `init.js` и `interact.js` из этой папки.
2. ПКМ по воздуху открой GUI.
3. Вставь URL GitHub-папки одного NPC-пакета.
4. Нажми `Load`.
5. Проверь summary: loader покажет layout, выбранные hook-файлы и итоговый порядок.
6. ПКМ по NPC этим предметом, чтобы записать scripts в NBT NPC.

## Практическая рекомендация по репозиторию

Если в проекте у одного механизма несколько ролей NPC, лучше хранить их раздельно:

```text
npc/
  technical/
    respawn_clock/
      clock/
        hooks/
          init.js
          interact.js
          timer.js
      target/
        hooks/
          init.js
          interact.js
          died.js
```

Тогда на каждый URL loader получает ровно один NPC-пакет без конфликтов.

## Ограничения

- Loader загружает только поддерживаемые NPC hook-файлы.
- Вспомогательные `.js`, которые не являются hook-файлами, попадают в ignored.
- Если итоговый bundle превышает лимит hook-вкладки CustomNPCs, загрузка будет остановлена.
- Диалоговые файлы вроде `dialog.js` и `dialogOption.js` этот предмет не раскладывает в NPC hooks.
