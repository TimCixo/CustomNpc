---
name: customnpcs-custom-item
description: Build, refactor, and debug custom items for CustomNPCs Unofficial 1.21.1 in this repository. Use when creating scripted items that need a display name, lore for user-facing description, and metadata in CUSTOM_DATA for technical fields such as markers, owner UUIDs, session ids, role ids, or workflow state.
---

# CustomNPCs Custom Item

Use this skill for custom item creation in this repository.

This project targets CustomNPCs Unofficial on Minecraft 1.21.1, where item logic should be built around `MCItemStack` and data components, not older direct NBT helper assumptions.

## Item Model

Treat every custom item as three layers:

- display name
  - user-facing title
  - store in `DataComponents.CUSTOM_NAME`
- lore
  - user-facing description or usage notes
  - store in `DataComponents.LORE`
- metadata
  - technical fields for scripts
  - store in `DataComponents.CUSTOM_DATA`

Do not mix technical metadata into lore unless the user explicitly wants visible debug info.

## Required Pattern

Default flow:

1. Resolve vanilla item type with:
   - `BuiltInRegistries.ITEM.get(ResourceLocation.parse(itemId))`
2. Create `MCItemStack`
3. Create `CompoundTag`
4. Put technical fields into the tag
5. Set data components:
   - `CUSTOM_DATA`
   - `CUSTOM_NAME`
   - `LORE`
6. Wrap with:
   - `NpcAPI.Instance().getIItemStack(mcStack)`

## Recommended Technical Fields

Use explicit keys in `CUSTOM_DATA`, for example:

- `item_type`
- `owner_uuid`
- `main_uuid`
- `session_id`
- `role`
- `state`
- `config_id`
- `coord_id`

Use string values by default unless there is a strong reason to use another primitive.

## Lore Rule

Lore should describe:

- what the item is
- how to use it
- what role it belongs to

Examples:

- `Use this to bind Configurator and Coordinator.`
- `Return this item to Main to finalize linking.`
- `Whitelist only.`

Do not use lore as the primary storage for technical data.

## Avoid These Patterns

Do not rely on:

- old direct `setNbt(...)` style assumptions
- display name checks for identity
- lore parsing for critical technical state
- `getItemName()` as a stable item id

For identity and workflow logic, always read `CUSTOM_DATA`.

## Minimal Creation Template

```js
var NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var BuiltInRegistries = Java.type("net.minecraft.core.registries.BuiltInRegistries");
var ResourceLocation = Java.type("net.minecraft.resources.ResourceLocation");
var DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var Component = Java.type("net.minecraft.network.chat.Component");
var MCItemStack = Java.type("net.minecraft.world.item.ItemStack");
var CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var ArrayList = Java.type("java.util.ArrayList");

function createCustomItem() {
    var itemType = BuiltInRegistries.ITEM.get(ResourceLocation.parse("minecraft:paper"));
    if (itemType == null) return null;

    var mcStack = new MCItemStack(itemType);
    var tag = new CompoundTag();
    tag.putString("item_type", "example_item");
    tag.putString("state", "new");

    mcStack.set(DataComponents.CUSTOM_DATA, CustomData.of(tag));
    mcStack.set(DataComponents.CUSTOM_NAME, Component.literal("Example Item"));
    mcStack.set(DataComponents.LORE, new ItemLore(buildLore([
        "Example description.",
        "Technical metadata is hidden in custom data."
    ])));

    var item = NpcAPI.Instance().getIItemStack(mcStack);
    if (item != null && !item.isEmpty()) item.setStackSize(1);
    return item;
}
```

## Reading Metadata

When reading technical data back:

1. get `item.getMCItemStack()`
2. get `DataComponents.CUSTOM_DATA`
3. `copyTag()`
4. read fields from the tag

Do not infer workflow state from lore or display name if `CUSTOM_DATA` already exists.

## Role Split

When items belong to linked NPC workflows, prefer:

- `main` creates and validates the item
- `sub` writes only its own role-specific metadata into the item

This keeps ownership clear and avoids ad hoc item mutations.

## Validation Checklist

When a custom item fails, check:

1. Did item type resolve from `BuiltInRegistries.ITEM`?
2. Was `CUSTOM_DATA` actually written?
3. Was the item wrapped through `NpcAPI.Instance().getIItemStack(mcStack)`?
4. Is the technical check reading `CUSTOM_DATA`, not lore or display name?
5. Is lore only user-facing text?

If the user asks for implementation, prefer a full ready-to-paste item factory or full script, not partial fragments.
