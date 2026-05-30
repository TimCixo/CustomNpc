# Tournament Registration NPC

CustomNPCs Unofficial 1.21.1 prototype for Cobblemon tournament registration.

## Behavior

- `Shift + Right Click` by an operator opens the admin GUI.
- Admin GUI uses safe scroll pseudo-buttons:
  - `Start: Open registration`
  - `Stop: Close registration`
  - `Clear: Clear registered list`
- Normal right click registers or updates the player while registration is open.
- The admin text area shows the registered players as JSON.

Each registered player entry contains:

- player name
- player UUID
- party Pokemon from slot 1 to 6
- Pokemon display name and species id
- IV values
- EV values
- attacks
- ability
- held item id

## Structure

```text
tournament_registration/
  README.md
  jsconfig.json
  hooks/
    init.js
    interact.js
    customGuiScroll.js
    customGuiClosed.js
  shared/
    __shared.js
    registration.js
    gui.js
    npc.js
```

## Stored Data

- `tournament_registration_open`
  - `1` means registration is open.
  - `0` or empty means registration is closed.
- `tournament_registration_players_json`
  - JSON array with registered player snapshots.

## Notes

The GUI intentionally uses `addScroll(...)` as three pseudo-buttons because button components are unsafe in this CustomNPCs build. The JSON text area is a display/copy surface; registration data is owned by NPC `storeddata`.
