var GuiScrollMenu = {
    getSelectedIndex: function(scroll) {
        try {
            var selection = scroll.getSelection();
            if (selection != null && selection.length != null && selection.length > 0) {
                return selection[0];
            }
        } catch (e) {}

        try {
            var selection2 = scroll.selection;
            if (selection2 != null && selection2.length != null && selection2.length > 0) {
                return selection2[0];
            }
        } catch (e2) {}

        return -1;
    },

    getText: function(gui, componentId) {
        try {
            var comp = gui.getComponent(componentId);
            if (comp == null) return "";

            try {
                if (comp.getText != null) {
                    return "" + comp.getText();
                }
            } catch (e1) {}

            try {
                if (comp.text != null) {
                    return "" + comp.text;
                }
            } catch (e2) {}

            return "";
        } catch (e) {
            return "";
        }
    },

    setText: function(gui, componentId, text) {
        try {
            var comp = gui.getComponent(componentId);
            if (comp != null && comp.setText != null) {
                comp.setText(text);
                return true;
            }
        } catch (e) {}

        return false;
    },

    getStoredValue: function(player, key, fallback) {
        try {
            var value = player.getStoreddata().get(key);
            if (value == null) return fallback;

            value = "" + value;
            if (value == "null" || value == "undefined") return fallback;

            return value;
        } catch (e) {
            return fallback;
        }
    },

    putStoredValue: function(player, key, value) {
        try {
            player.getStoreddata().put(key, value == null ? "" : ("" + value));
            return true;
        } catch (e) {
            return false;
        }
    },

    saveTextFieldsToStored: function(player, gui, bindings) {
        if (bindings == null) return;

        for (var i = 0; i < bindings.length; i++) {
            var binding = bindings[i];
            if (binding == null) continue;

            var key = binding.key;
            var componentId = binding.componentId;
            if (key == null) continue;

            this.putStoredValue(player, key, this.getText(gui, componentId));
        }
    },

    hydrateTextFieldsFromStored: function(player, gui, bindings) {
        if (bindings == null) return;

        for (var i = 0; i < bindings.length; i++) {
            var binding = bindings[i];
            if (binding == null) continue;

            var key = binding.key;
            var componentId = binding.componentId;
            var fallback = binding.fallback == null ? "" : ("" + binding.fallback);
            if (key == null) continue;

            this.setText(gui, componentId, this.getStoredValue(player, key, fallback));
        }
    },

    isSameGui: function(gui, guiId) {
        try {
            return gui != null && gui.getID() == guiId;
        } catch (e) {
            return false;
        }
    },

    isSameScroll: function(scroll, scrollId) {
        try {
            return scroll != null && scroll.getID() == scrollId;
        } catch (e) {
            return false;
        }
    },

    safeUpdate: function(gui) {
        try {
            gui.update();
            return true;
        } catch (e) {
            return false;
        }
    }
};
