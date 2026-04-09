# Arceus Boss

Прототип босса Аркеуса под CustomNPCs Unofficial 1.21.1.

## Hooks

- `init.js` -> `init`
- `damaged.js` -> `damaged`
- `attack.js` -> `attack`
- `timer.js` -> `timer`
- `interact/interact.js` -> `interact`

## Что делает

- 3 стадии по HP:
  - стадия 2 на `66%`
  - стадия 3 на `33%`
- при смене стадии:
  - входящий удар отменяется
  - босс лечится до заданного процента
  - короткое время не получает урон
- стадия 2 и 3 дают пассивный реген
- стадия 2 и 3 усиливают урон босса
- смертельный удар на стадии 3 не убивает сразу:
  - запускается кастомная death-последовательность
  - через таймер босс проговаривает линии
  - потом умирает через `npc.kill()`

## Настройка через StoredData

Все ключи создаются автоматически в `init`:

- `arceus_phase2_threshold`
- `arceus_phase3_threshold`
- `arceus_phase2_heal_to`
- `arceus_phase3_heal_to`
- `arceus_transition_ticks`
- `arceus_phase2_regen_interval`
- `arceus_phase3_regen_interval`
- `arceus_phase2_regen_percent`
- `arceus_phase3_regen_percent`
- `arceus_phase2_damage_mult`
- `arceus_phase3_damage_mult`
- `arceus_phase3_flat_bonus`
- `arceus_custom_death_ticks`

## Быстрый тест

- обычный ПКМ по NPC: показывает текущую стадию и состояние
- ПКМ в шифте: полный reset босса
