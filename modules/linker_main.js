var LinkerMain = {
    createLinkerItem: function(npc, linkerType, name, loreLines) {
        try {
            var itemType = PM_BuiltInRegistries.ITEM.get(PM_ResourceLocation.parse("minecraft:tripwire_hook"));
            if (itemType == null) return null;

            var mcStack = new PM_MCItemStack(itemType);
            var tag = new PM_CompoundTag();
            tag.putString("linker_type", linkerType);
            tag.putString("main_uuid", this.getNpcUuid(npc));
            tag.putString("config_uuid", "");
            tag.putString("coord_uuid", "");

            mcStack.set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
            mcStack.set(PM_DataComponents.CUSTOM_NAME, PM_Component.literal(name == null ? "Linker" : ("" + name)));
            mcStack.set(PM_DataComponents.LORE, new PM_ItemLore(this.buildLore(loreLines == null ? [] : loreLines)));

            var item = PM_NpcAPI.Instance().getIItemStack(mcStack);
            if (item == null || item.isEmpty()) return null;
            item.setStackSize(1);
            return item;
        } catch (e) {
            return null;
        }
    },

    isLinkerForMain: function(item, npc, linkerType) {
        var tag = this.getCustomTag(item);
        if (tag == null) return false;
        return this.safeTag(tag, "linker_type") == linkerType
            && this.safeTag(tag, "main_uuid") == this.getNpcUuid(npc);
    },

    bindFromLinker: function(npc, item, configKey, coordKey) {
        var tag = this.getCustomTag(item);
        if (tag == null) return false;

        var configUuid = this.safeTag(tag, "config_uuid");
        var coordUuid = this.safeTag(tag, "coord_uuid");
        var data = npc.getStoreddata();

        if (this.hasText(configUuid)) data.put(configKey, configUuid);
        if (this.hasText(coordUuid)) data.put(coordKey, coordUuid);
        return true;
    },

    resolveLinkedNpc: function(mainNpc, linkKey) {
        var linkedUuid = "" + mainNpc.getStoreddata().get(linkKey);
        if (!this.hasText(linkedUuid)) return null;

        try {
            return mainNpc.getWorld().getEntity(linkedUuid);
        } catch (e) {
            return null;
        }
    },

    buildLore: function(lines) {
        var lore = new PM_ArrayList();
        for (var i = 0; i < lines.length; i++) {
            lore.add(PM_Component.literal(lines[i]));
        }
        return lore;
    },

    getCustomTag: function(item) {
        if (item == null || item.isEmpty()) return null;
        try {
            var customData = item.getMCItemStack().get(PM_DataComponents.CUSTOM_DATA);
            if (customData == null) return null;
            return customData.copyTag();
        } catch (e) {
            return null;
        }
    },

    safeTag: function(tag, key) {
        try {
            return "" + tag.getString(key);
        } catch (e) {
            return "";
        }
    },

    getNpcUuid: function(entity) {
        try {
            return "" + entity.getUUID();
        } catch (e) {
            return "";
        }
    },

    giveItemToPlayer: function(player, item) {
        var given = false;
        try {
            given = player.giveItem(item);
        } catch (e) {}
        if (given) return true;

        try {
            var inv = player.getInventory();
            var size = inv == null ? 0 : inv.getSize();
            for (var i = 0; i < size; i++) {
                var slot = inv.getSlot(i);
                if (slot == null || slot.isEmpty()) {
                    inv.setSlot(i, item);
                    return true;
                }
            }
        } catch (e2) {}

        return false;
    },

    consumeMainhandItem: function(player, item) {
        try {
            var size = item.getStackSize();
            if (size > 1) {
                item.setStackSize(size - 1);
            } else {
                player.getMCEntity().setItemInHand(
                    PM_InteractionHand.MAIN_HAND,
                    new PM_MCItemStack(PM_Items.AIR)
                );
            }
            player.updatePlayerInventory();
        } catch (e) {}
    },

    hasText: function(value) {
        return value != null && ("" + value).replace(/^\s+|\s+$/g, "").length > 0;
    },

    orDash: function(value) {
        return this.hasText(value) ? ("" + value) : "-";
    }
};
