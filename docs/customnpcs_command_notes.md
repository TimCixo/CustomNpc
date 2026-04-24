# CustomNPCs Command Notes

## Recommended Command Path

For scripted command execution in this environment, prefer the real server command dispatcher path:

1. get the Minecraft server from the NPC or player entity
2. create a command source stack
3. set the required permission level
4. run the command through `performPrefixedCommand(...)`

This is more reliable than old wrapper-style execution methods.

## Basic Pattern

```js
function runServerCommand(npc, command) {
    try {
        var server = npc.getMCEntity().level().getServer();
        var source = server.createCommandSourceStack().withPermission(4);
        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
        return true;
    } catch (e) {
        return false;
    }
}

function stripLeadingSlash(command) {
    var text = ("" + command).replace(/^\s+|\s+$/g, "");
    return text.indexOf("/") === 0 ? text.substring(1) : text;
}
```

## Capturing Command Output

If you need command output, create a custom `CommandSource` and capture system messages.

Use this only when you actually need returned text.
Do not build output-capturing sources for every hot-path command.

## Clickable Chat Messages

For clickable messages, use `tellraw` JSON with `clickEvent`.

Typical use:

```json
[
  {"text":"Аркеус возродился ","color":"yellow"},
  {
    "text":"[Телепортироваться]",
    "color":"green",
    "underlined":true,
    "clickEvent":{"action":"run_command","value":"/warp arceus_coliseum"},
    "hoverEvent":{"action":"show_text","contents":"Телепортироваться к Аркеусу"}
  }
]
```

Important:

- `run_command` is executed by the clicking player
- this is suitable for player-triggered warp links
- do not use server-side broadcast commands to force all players to run the same action

## Operator Checks

Technical or admin actions should be gated explicitly.

Typical safe check order:

1. `player.getMCEntity().hasPermissions(level)`
2. server op list access if available
3. `player.hasPermission(level)` if exposed by wrappers

Use a constant permission level, for example:

```js
var OP_PERMISSION_LEVEL = 2;
```

## Command Context Rules

- use NPC/server source for administrative and system commands
- use clickable `run_command` for player-triggered chat actions
- do not assume `npc.executeCommand(...)` is reliable
- do not assume command block settings allow wrapper command execution
