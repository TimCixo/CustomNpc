var GuiUtils_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");

function createGui(id, width, height, player) {
    return GuiUtils_NpcAPI.Instance().createCustomGui(id, width, height, false, player);
}

function getSelectedIndex(scroll) {
    try {
        var selection = scroll.getSelection();
        if (selection != null && selection.length > 0) return selection[0];
    } catch (e1) {}

    try {
        if (scroll.selection != null && scroll.selection.length > 0) return scroll.selection[0];
    } catch (e2) {}

    return -1;
}

function setGuiText(gui, id, text) {
    try {
        var component = gui.getComponent(id);
        if (component != null && component.setText != null) component.setText(text == null ? "" : "" + text);
    } catch (e) {}
}

function safeUpdate(gui) {
    try {
        gui.update();
    } catch (e) {}
}

module.exports = {
    createGui: createGui,
    getSelectedIndex: getSelectedIndex,
    setGuiText: setGuiText,
    safeUpdate: safeUpdate
};
