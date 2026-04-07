# Pokemon Catch Coordinator

Система ивента на CustomNPCs Unofficial 1.21.1:
- `main` регистрирует игроков, выдает билеты, принимает сдачу покемонов и ведет счет
- `configurator` хранит конфиг и шаблон билета
- `command` управляет режимами, таймером и лидербордом

## Состав

- `main/init.js`
- `main/timer.js`
- `main/interact/interact.js`
- `configurator/interact.js`
- `command/interact.js`
- `items/ticket/init.js`
- `items/ticket/interact.js`
- `items/ticket/tick.js`

## Зависимости

- Minecraft `1.21.1`
- CustomNPCs Unofficial
- Cobblemon-предметы в формате `cubixcobblemon:pokemon`
- Диалог с правилами `ID 54`
- Один шаблонный item `pokemon_catch_ticket`

## Что кому нужно прокинуть

### 1. Main NPC

Нужно:
- script `main/init.js` в `init`
- script `main/timer.js` в `timer`
- script `main/interact/interact.js` в `interact`

Хранит у себя:
- список участников
- очки участников
- количество сданных покемонов
- состояния регистрации и подсчета
- ссылки на `configurator` и `command`

### 2. Configurator NPC

Нужно:
- script `configurator/interact.js` в `interact`

Через него задаются:
- таймер события
- интервал оповещений
- режим чата `local/global`
- debug-флаг
- whitelist операторов
- список целевых покемонов и их множителей
- шаблон билета

Важно:
- оператор ПКМ-ит шаблонным `ticket` по `configurator`
- `configurator` копирует его в свою память как шаблон
- в шаблоне не должен храниться персональный прогресс игрока

### 3. Command NPC

Нужно:
- script `command/interact.js` в `interact`

Через него делается:
- выдача linker
- запуск/пауза таймера
- включение/выключение регистрации
- включение/выключение подсчета
- телепорт участников
- вывод лидерборда
- сброс состояния

### 4. Ticket item

Нужно:
- `items/ticket/init.js` в `init`
- `items/ticket/interact.js` в `interact`
- `items/ticket/tick.js` в `tick`

Билет умеет:
- хранить `main_uuid`, `owner_uuid`, `owner_name`
- показывать правила по ПКМ через диалог `54`, но только когда у `main` не идет регистрация или подсчет
- обновлять lore и прогресс игрока
- показывать остаток времени через durability

## Связка NPC

Система использует linker `pokemon_catch_linker`.

Порядок:
1. На `command` нажать `Linker`
2. ПКМ linker по `configurator`
3. ПКМ linker по `command`
4. Вернуть linker на `main`

После этого `main` знает UUID обоих дочерних NPC.

## Базовая настройка

1. Поставить 3 NPC:
- `main`
- `configurator`
- `command`

2. Назначить нужные scripts по hooks.

3. Создать или взять шаблонный `ticket` с item-scripts из `items/ticket`.

4. Связать NPC через linker.

5. На `configurator` оператором заполнить:
- `Timer`
- `Interval`
- `Chat`
- `Debug`
- `Whitelist`
- `Pokemon`

Формат поля `Pokemon`:
```text
pikachu: 1
bulbasaur: 1.5
charmander: 2
```

6. ПКМ шаблонным `ticket` по `configurator`, чтобы загрузить шаблон билета в память.

## Как использовать

### Перед стартом

Оператор на `command`:
- включает регистрацию

Игрок на `main`:
- регистрируется
- получает персональный билет

### Что видит игрок в билете

Билет показывает:
- имя `Билет события игрока <Ник>`
- подсказку про ПКМ для правил
- текущий результат игрока `очки / покемоны`
- список целевых покемонов и множители

### Во время события

Оператор на `command`:
- запускает таймер
- при необходимости включает режим подсчета

Игрок:
- ловит нужных покемонов
- приносит их на `main`
- ПКМ своим билетом по `main` в режиме подсчета

`main`:
- проверяет, что билет принадлежит этому игроку
- ищет в инвентаре только настроенных покемонов
- прибавляет очки по IV и множителю
- увеличивает счетчик сданных покемонов
- удаляет засчитанные предметы покемонов из инвентаря

### После события

Оператор на `command`:
- открывает `Leaders`
- получает лидерборд в чат
- при необходимости делает `Finish`, `Reset` или `Clear`

## Логика режимов

### Когда `main` открывает обычный диалог

Обычный диалог `main` открывается, когда:
- регистрация выключена
- режим подсчета выключен

### Когда `main` не открывает обычный диалог

- при активной регистрации `main` обрабатывает регистрацию
- при активном подсчете `main` ждет билет для сдачи результата

### Когда билет открывает диалог `54`

Билет открывает правила, если:
- это не операторская конфигурация через `configurator`
- у связанного `main` сейчас не включены регистрация и подсчет

## Данные и состояние

### Main storeddata

Основное:
- `pokemon_catch_linked_config_uuid`
- `pokemon_catch_linked_command_uuid`
- `pokemon_multiplier_cycle_*`
- `pokemon_multiplier_counting_mode`
- `pokemon_multiplier_registration_mode`

### Configurator storeddata

Конфиг:
- `pokemon_multiplier_config_timer`
- `pokemon_multiplier_config_interval`
- `pokemon_multiplier_config_chat_mode`
- `pokemon_multiplier_config_debug`
- `pokemon_multiplier_config_whitelist`
- `pokemon_multiplier_config_count`
- `pokemon_multiplier_config_species_<n>`
- `pokemon_multiplier_config_multiplier_<n>`

### Configurator tempdata

Шаблон билета:
- `pokemon_catch_ticket_template_stack`

### Ticket custom_data

- `item_type = pokemon_catch_ticket`
- `main_uuid`
- `owner_uuid`
- `owner_name`

## Важные ограничения

- Без загруженного шаблона билета `main` все равно может выдать билет, но возьмет простой `minecraft:paper`
- Шаблон билета хранится в `tempdata` у `configurator`, после полного перезапуска мира его надо загрузить заново
- Диалог `54` открывается через `showDialog`, поэтому не надо завязывать критичную логику ивента на `dialogOption` этого принудительного открытия
- Лидерборд берется из сохраненных значений `score` и `pcount`, а не пересчитывается по инвентарям игроков

## Короткий чеклист

- `main`, `configurator`, `command` стоят в мире
- hooks назначены правильно
- linker выполнен
- whitelist операторов заполнен
- список покемонов и множителей заполнен
- шаблонный билет загружен в `configurator`
- диалог правил существует под `ID 54`
