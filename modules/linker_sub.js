var LinkerSub = {
    bindSelfToLinker: function(npc, player, item, linkerType, roleKey) {
        var tag = this.getCustomTag(item);
        if (tag == null) return "Invalid linker.";
        if (this.safeTag(tag, "linker_type") != linkerType) return "Invalid linker.";
        if (!this.hasText(this.safeTag(tag, "main_uuid"))) return "Invalid linker.";

        tag.putString(roleKey, this.getNpcUuid(npc));
        if (!this.writeHeldTag(player, item, tag)) return "Bind write failed.";
        return "Linked.";
    },

    isLinker: function(item, linkerType) {
        var tag = this.getCustomTag(item);
        return tag != null && this.safeTag(tag, "linker_type") == linkerType;
    },

    saveFieldsToStored: function(npc, gui, bindings) {
        var data = npc.getStoreddata();
        for (var i = 0; i < bindings.length; i++) {
            var binding = bindings[i];
            if (binding == null) continue;
            data.put(binding.key, this.getGuiText(gui, binding.id));
        }
    },

    hydrateFieldsFromStored: function(npc, gui, bindings) {
        var data = npc.getStoreddata();
        for (var i = 0; i < bindings.length; i++) {
            var binding = bindings[i];
            if (binding == null) continue;

            var fallback = binding.fallback == null ? "" : ("" + binding.fallback);
            var value = "" + data.get(binding.key);
            if (!this.hasText(value)) value = fallback;
            this.setGuiText(gui, binding.id, value);
        }
    },

    getSelectedIndex: function(scroll) {
        try {
            var selection = scroll.getSelection();
            if (selection != null && selection.length > 0) return selection[0];
        } catch (e) {}
        try {
            if (scroll.selection != null && scroll.selection.length > 0) return scroll.selection[0];
        } catch (e2) {}
        return -1;
    },

    getGuiText: function(gui, id) {
        try {
            var comp = gui.getComponent(id);
            if (comp != null && comp.getText != null) return "" + comp.getText();
        } catch (e1) {}
        try {
            var comp2 = gui.getComponent(id);
            if (comp2 != null && comp2.text != null) return "" + comp2.text;
        } catch (e2) {}
        return "";
    },

    setGuiText: function(gui, id, text) {
        try {
            var comp = gui.getComponent(id);
            if (comp != null && comp.setText != null) comp.setText(text == null ? "" : ("" + text));
        } catch (e) {}
    },

    safeUpdate: function(gui) {
        try {
            gui.update();
        } catch (e) {}
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

    writeHeldTag: function(player, item, tag) {
        try {
            item.getMCItemStack().set(PM_DataComponents.CUSTOM_DATA, PM_CustomData.of(tag));
            player.updatePlayerInventory();
            return true;
        } catch (e) {
            return false;
        }
    },

    safeTag: function(tag, key) {
        try {
            return "" + tag.getString(key);
        } catch (e) {
            return "";
        }
    },

    getNpcUuid: function(npc) {
        try {
            return "" + npc.getUUID();
        } catch (e) {
            return "";
        }
    },

    hasText: function(value) {
        return value != null && ("" + value).replace(/^\s+|\s+$/g, "").length > 0;
    }
};
