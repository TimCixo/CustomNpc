# Respawn Clock

Технический NPC "часы", который показывает статус другого NPC:

- `Жив` зелёным, если цель активна
- красный таймер `00:00:00`, если цель мертва и идёт отсчёт до респавна

## Роли

- `clock`
  - основной NPC часов
  - выдаёт linker
  - принимает обратно linker с целью
  - показывает текущее состояние на своём title
- `target`
  - script-side helper для отслеживаемого NPC
  - принимает linker
  - запоминает UUID часов
  - пишет в часы состояние `жив/мёртв`

## Hooks

### Clock NPC

- `clock/init.js` -> `init`
- `clock/interact/interact.js` -> `interact`
- `clock/timer.js` -> `timer`

### Target NPC

- `target/init.js` -> `init`
- `target/interact/interact.js` -> `interact`
- `target/died.js` -> `died`

## Как использовать

1. Поставь скрипты `clock/*` на NPC-часов.
2. Поставь скрипты `target/*` на NPC, которого нужно отслеживать.
3. Оператор делает `Shift + ПКМ` по часам и получает linker.
4. Этим linker делается ПКМ по целевому NPC.
5. Потом linker возвращается часам обычным ПКМ.

## Важное

- Target-script старается взять время респавна из API NPC, если метод доступен.
- Если getter респавна в этой сборке недоступен, используется fallback из `storeddata`:
  - `respawn_clock_respawn_seconds`
- По умолчанию fallback равен `300` секунд.
