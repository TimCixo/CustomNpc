# Tournament Coordinator NPC

CustomNPCs Unofficial 1.21.1 prototype for coordinating Cobblemon tournament duels.

## Behavior

- Right click by an operator opens the coordinator GUI.
- Non-operators receive a denial message.
- The GUI has two pages:
  - `Manage`
  - `JSON`
- Page switching uses safe scroll pseudo-buttons.

## Management Page

The management page has three columns:

- `First Player`
  - player selector loaded from saved JSON
  - check
  - teleport to arena
  - teleport to balcony
  - teleport to stands
  - announce as winner
- `Shared`
  - check both selected players
  - teleport both players to their arena points
  - teleport both players to their balcony points
  - teleport both players to the common stands point
  - announce duel
- `Second Player`
  - mirrors the first player column

## JSON Page

Paste the JSON produced by `tournament_registration` into the text area and press `Save`.

## Config

The NPC stores config in `storeddata` key:

- `tournament_coordinator_config_json`

Default shape:

```json
{
  "arena": {
    "first": { "x": 0, "y": 80, "z": 0 },
    "second": { "x": 10, "y": 80, "z": 0 }
  },
  "balcony": {
    "first": { "x": 0, "y": 90, "z": 10 },
    "second": { "x": 10, "y": 90, "z": 10 }
  },
  "stands": {
    "common": { "x": 5, "y": 85, "z": 25 }
  },
  "messages": {
    "winner": "§6Победитель: §e{player}§6!",
    "duel": "§bДуэль: §e{first} §fvs §e{second}§b!"
  }
}
```

Placeholders:

- `{player}` in winner message
- `{first}` and `{second}` in duel message

## Stored Data

- `tournament_coordinator_registration_json`
  - saved registration JSON array from `tournament_registration`
- `tournament_coordinator_config_json`
  - arena, balcony, stands, and announcement config

## Structure

```text
tournament_coordinator/
  README.md
  jsconfig.json
  hooks/
    init.js
    interact.js
    customGuiScroll.js
    customGuiClosed.js
  shared/
    __shared.js
    config.js
    registrations.js
    gui.js
    npc.js
```
