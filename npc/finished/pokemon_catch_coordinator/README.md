# Pokemon Catch Coordinator

Система ивента для CustomNPCs Unofficial 1.21.1.

Теперь схема такая:
- `main` NPC хранит весь runtime и весь конфиг
- `pokemon_catch_configurator` это отдельный Scripted Item
- `pokemon_catch_command` это отдельный Scripted Item
- `pokemon_catch_ticket` это билет участника

## Состав

- `main/init.js`
- `main/timer.js`
- `main/interact/interact.js`
- `items/pokemon_catch_configurator/init.js`
- `items/pokemon_catch_configurator/interact.js`
- `items/pokemon_catch_command/init.js`
- `items/pokemon_catch_command/interact.js`
- `items/ticket/init.js`
- `items/ticket/interact.js`
- `items/ticket/tick.js`

## Что делает main

- регистрирует игроков
- выдает билеты
- принимает сдачу покемонов
- считает очки
- хранит конфиг и состояние цикла

## Что делает configurator item

- привязывается к `main` простым ПКМ по нему
- открывает GUI настройки
- пишет конфиг прямо в `main.getStoreddata()`
- грузит шаблон билета из предмета в оффхэнде
- импортирует список покемонов из шалкера в оффхэнде

## Что делает command item

- привязывается к `main` простым ПКМ по нему
- открывает GUI управления
- запускает и ставит на паузу таймер
- включает и выключает регистрацию
- включает и выключает подсчет
- телепортирует участников
- показывает лидерборд
- делает `Finish`, `Reset`, `Clear`

## Настройка

1. Поставить только `main` NPC.
2. Назначить ему:
- `main/init.js` в `init`
- `main/timer.js` в `timer`
- `main/interact/interact.js` в `interact`

3. Создать Scripted Item:
- configurator с hook `items/pokemon_catch_configurator/init.js` в `init`
- configurator с hook `items/pokemon_catch_configurator/interact.js` в `interact`
- command с hook `items/pokemon_catch_command/init.js` в `init`
- command с hook `items/pokemon_catch_command/interact.js` в `interact`
- ticket с hook из `items/ticket/*`

4. Дать оператору configurator и command item.
5. ПКМ configurator item по `main`.
6. ПКМ command item по `main`.
7. Открыть configurator item и заполнить:
- `Timer`
- `Interval`
- `Chat`
- `Debug`
- `Whitelist`
- `Pokemon`

Формат `Pokemon`:
```text
pikachu: 1
bulbasaur: 1.5
charmander: 2
```

8. Положить шаблонный `ticket` в offhand и в GUI configurator нажать `Ticket`.
9. Если нужно, положить шалкер с `cubixcobblemon:pokemon` в offhand и нажать `Import`.

## Использование

Перед стартом:
- оператор через `command` включает `Register`
- игрок идет к `main` и получает персональный билет

Во время ивента:
- оператор через `command` запускает таймер
- оператор при необходимости включает `Counting`
- игрок приносит нужных покемонов на `main`
- игрок ПКМ своим билетом по `main` в режиме подсчета

После ивента:
- оператор через `command` открывает `Leaders`
- при необходимости делает `Finish`, `Reset` или `Clear`

## Данные

### Main storeddata

- `pokemon_multiplier_config_*`
- `pokemon_multiplier_cycle_*`
- `pokemon_multiplier_counting_mode`
- `pokemon_multiplier_registration_mode`

### Main tempdata

- `pokemon_catch_ticket_template_stack`

### Command item custom_data

- `item_type = pokemon_catch_command_tool`
- `main_uuid`

### Configurator item custom_data

- `item_type = pokemon_catch_configurator_tool`
- `main_uuid`

### Ticket custom_data

- `item_type = pokemon_catch_ticket`
- `main_uuid`
- `owner_uuid`
- `owner_name`

## Ограничения

- если шаблон билета не загружен, `main` все равно выдаст билет, но это будет обычная `minecraft:paper`
- шаблон билета лежит в `main.getTempdata()`, после полного перезапуска мира его надо загрузить заново
- диалог правил `54` открывается через `showDialog`, поэтому критичную логику нельзя вешать на `dialogOption`
- старые `configurator` NPC и `command` NPC больше не используются, их скрипты оставлены только как заглушки
