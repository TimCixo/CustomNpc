# CustomNPCs Command Notes

## Broadcast Commands

In this project, global announcements for NPC scripts should prefer the server command dispatcher path:

1. Create a custom `CommandSource`
2. Build a source stack from `server.createCommandSourceStack()`
3. Run the command through `server.getCommands().performPrefixedCommand(...)`

Why:

- `npc.executeCommand(...)` and similar direct execution paths can fail with:
  - `Cant run commands if CommandBlocks are disabled`
- The server dispatcher path works reliably in this environment for commands such as `bc ...`
- This is the same working pattern already used in the economy-related scripts

## Recommended Pattern

Use:

```js
var ArrayList = Java.type("java.util.ArrayList");
var CommandSource = Java.type("net.minecraft.commands.CommandSource");

function tryServerCommand(npc, command) {
    try {
        var outputs = new ArrayList();
        var CapturingSource = Java.extend(CommandSource, {
            sendSystemMessage: function(component) {
                try {
                    outputs.add(component.getString());
                } catch (e1) {
                    outputs.add("" + component);
                }
            },
            acceptsSuccess: function() {
                return true;
            },
            acceptsFailure: function() {
                return true;
            },
            shouldInformAdmins: function() {
                return false;
            }
        });

        var server = npc.getMCEntity().level().getServer();
        var source = server.createCommandSourceStack()
            .withSource(new CapturingSource())
            .withPermission(4);

        server.getCommands().performPrefixedCommand(source, stripLeadingSlash(command));
        return outputs.isEmpty() ? "" : "" + outputs.get(0);
    } catch (e) {
        return null;
    }
}
```

## When To Use

- Global chat announcements
- Economy commands
- Any scripted server command that should not depend on command block execution being enabled
