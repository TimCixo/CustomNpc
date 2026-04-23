function createGui(player, item) {
    var sessionId = getSessionId(item);
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(GIT_LOADER_GUI_ID, 380, 286, false, player);
    var pkg = getCurrentDownloadedPackage(player, item, sessionId);
    var url = getInitialUrl(player, item, sessionId);

    gui.addLabel(1, "GitHub NPC Loader", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 360, 34, 0x5C8DFF, 1.5);

    gui.addLabel(10, "GitHub URL", 10, 42, 100, 14, 0xE0E0E0);
    gui.addTextField(GIT_LOADER_URL_FIELD_ID, 10, 58, 360, 20);

    gui.addLabel(13, "GitHub Token", 10, 84, 100, 14, 0xE0E0E0);
    gui.addTextField(GIT_LOADER_TOKEN_FIELD_ID, 10, 100, 360, 20);

    gui.addLabel(11, "Actions", 10, 130, 80, 14, 0xE0E0E0);
    gui.addScroll(GIT_LOADER_ACTION_SCROLL_ID, 10, 146, 104, 82, GIT_LOADER_ACTIONS);

    gui.addLabel(12, "Status", 124, 130, 80, 14, 0xE0E0E0);
    gui.addTextArea(GIT_LOADER_STATUS_ID, 124, 146, 246, 112);

    setGuiText(gui, GIT_LOADER_URL_FIELD_ID, url);
    setGuiText(gui, GIT_LOADER_TOKEN_FIELD_ID, getInitialGithubToken(player));
    setStatus(gui, buildDownloadedStatusText(pkg, url));
    return gui;
}

function handleMainActionScroll(player, gui, sessionId, scroll) {
    var selectedIndex = getSelectedIndex(scroll);
    if (selectedIndex === 0) {
        handleDownloadAction(player, gui, sessionId);
        return;
    }
    if (selectedIndex === 1) {
        openPreviewGui(player, gui, sessionId);
        return;
    }
    if (selectedIndex === 2) {
        clearDownloadedPackage(player, sessionId);
        setStatus(gui, "Downloaded package cleared.");
        try {
            player.message("GitHub Loader: downloaded package cleared.");
        } catch (e) {}
        return;
    }
    setStatus(gui, "Unknown action index: " + selectedIndex);
}

function handleDownloadAction(player, gui, sessionId) {
    var repoUrl = trimString(getGuiText(gui, GIT_LOADER_URL_FIELD_ID));
    var githubToken = trimString(getGuiText(gui, GIT_LOADER_TOKEN_FIELD_ID));
    if (!hasText(repoUrl)) {
        setStatus(gui, "Paste a GitHub repository or package URL.");
        return;
    }

    var item = getHeldLoaderItemForSession(player, sessionId);
    if (item == null || item.isEmpty()) {
        setStatus(gui, "Loader item is not in main hand or off hand.");
        return;
    }

    persistMainFields(player, gui, sessionId);

    try {
        var pkg = loadGithubPackage(repoUrl, githubToken);
        validateNpcPackage(pkg);
        writeDownloadedPackageToItem(player, item, pkg, repoUrl);
        cacheDownloadedPackage(player, sessionId, pkg);
        setStatus(gui, buildDownloadedStatusText(pkg, repoUrl));
        player.message("GitHub Loader: downloaded " + pkg.owner + "/" + pkg.repo + "@" + pkg.ref + ".");
    } catch (e) {
        setStatus(gui, "Download error: " + shortError(e));
        try {
            player.message("GitHub Loader download error: " + shortError(e));
        } catch (ignored) {}
    }
}

function openPreviewGui(player, gui, sessionId) {
    var item = getHeldLoaderItemForSession(player, sessionId);
    var pkg = getCurrentDownloadedPackage(player, item, sessionId);
    if (pkg == null) {
        setStatus(gui, "Download a package first.");
        return;
    }

    try {
        player.showCustomGui(createPreviewGui(player, pkg));
    } catch (e) {
        setStatus(gui, "Preview error: " + shortError(e));
    }
}

function persistMainFields(player, gui, sessionId) {
    try {
        player.getStoreddata().put(GIT_LOADER_GUI_URL_PREFIX + sessionId, trimString(getGuiText(gui, GIT_LOADER_URL_FIELD_ID)));
        player.getStoreddata().put(GIT_LOADER_GUI_LAST_URL_KEY, trimString(getGuiText(gui, GIT_LOADER_URL_FIELD_ID)));
        player.getStoreddata().put(GIT_LOADER_GUI_TOKEN_KEY, trimString(getGuiText(gui, GIT_LOADER_TOKEN_FIELD_ID)));
    } catch (e) {}
}
