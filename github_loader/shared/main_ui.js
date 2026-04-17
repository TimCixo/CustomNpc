function createGui(player, item) {
    var sessionId = getSessionId(item);
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(GIT_LOADER_GUI_ID, 360, 278, false, player);
    var cachedPkg = getCachedPackage(player, item, sessionId);

    gui.addLabel(1, "Загрузчик NPC из GitHub", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 340, 34, 0x5C8DFF, 1.5);

    gui.addLabel(10, "GitHub URL", 10, 42, 100, 14, 0xE0E0E0);
    gui.addTextField(GIT_LOADER_URL_FIELD_ID, 10, 58, 340, 20);

    gui.addLabel(13, "GitHub Token", 10, 84, 100, 14, 0xE0E0E0);
    gui.addTextField(GIT_LOADER_TOKEN_FIELD_ID, 10, 100, 340, 20);

    gui.addLabel(11, "Действия", 10, 130, 80, 14, 0xE0E0E0);
    gui.addScroll(GIT_LOADER_ACTION_SCROLL_ID, 10, 146, 90, 78, GIT_LOADER_ACTIONS);

    gui.addLabel(12, "Статус", 110, 130, 80, 14, 0xE0E0E0);
    gui.addTextArea(GIT_LOADER_STATUS_ID, 110, 146, 240, 108);

    setGuiText(gui, GIT_LOADER_URL_FIELD_ID, getInitialUrl(player, item, sessionId));
    setGuiText(gui, GIT_LOADER_TOKEN_FIELD_ID, getInitialGithubToken(player));
    setStatus(gui, buildLoadedStatusText(cachedPkg, getInitialUrl(player, item, sessionId)));
    return gui;
}

function customGuiClosed(event) {
    try {
        var gui = event.gui;
        var player = event.player;
        if (gui == null || gui.getID() != GIT_LOADER_GUI_ID) return;

        var sessionId = getActiveSession(player);
        if (!hasText(sessionId)) return;

        player.getStoreddata().put(
            GIT_LOADER_GUI_URL_PREFIX + sessionId,
            trimString(getGuiText(gui, GIT_LOADER_URL_FIELD_ID))
        );
        player.getStoreddata().put(
            GIT_LOADER_GUI_LAST_URL_KEY,
            trimString(getGuiText(gui, GIT_LOADER_URL_FIELD_ID))
        );
        player.getStoreddata().put(
            GIT_LOADER_GUI_TOKEN_KEY,
            trimString(getGuiText(gui, GIT_LOADER_TOKEN_FIELD_ID))
        );
    } catch (e) {}
}

function handleActionScroll(player, gui, sessionId, scroll) {
    var selectedIndex = getSelectedIndex(scroll);
    var selected = normalizeActionSelection(selectedIndex);
    if (selected == "load") {
        handleLoadAction(player, gui, sessionId);
    } else if (selected == "preview") {
        var pkg = getCachedPackage(player, getHeldLoaderItemForSession(player, sessionId), sessionId);
        if (pkg == null) {
            setStatus(gui, "Сначала загрузи пакет.");
            return;
        }

        try {
            player.showCustomGui(createPreviewGui(player, pkg));
        } catch (e) {
            setStatus(gui, "Ошибка открытия preview: " + shortError(e));
        }
    } else if (selected == "clear") {
        clearCachedPackage(player, sessionId);
        clearLoadedFieldsOnHeldItem(player, sessionId);
        setStatus(gui, "Кэш кода очищен.");
        player.message("GitHub Loader: кэш кода очищен.");
    } else {
        setStatus(gui, "Не удалось определить действие. Индекс: " + selectedIndex);
        player.message("GitHub Loader: неизвестный индекс scroll: " + selectedIndex);
    }
}

module.exports = {
    createGui: createGui,
    customGuiClosed: customGuiClosed,
    handleActionScroll: handleActionScroll
};
