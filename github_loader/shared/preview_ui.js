function createPreviewGui(player, pkg) {
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(GIT_LOADER_PREVIEW_GUI_ID, 520, 300, false, player);
    gui.addLabel(1, "Превью кода GitHub Loader", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 500, 34, 0x5C8DFF, 1.5);

    gui.addLabel(10, "Файлы", 10, 42, 80, 14, 0xE0E0E0);
    gui.addScroll(GIT_LOADER_PREVIEW_SCROLL_ID, 10, 58, 180, 232, buildPreviewEntries(pkg));

    gui.addLabel(11, "Превью", 200, 42, 80, 14, 0xE0E0E0);
    gui.addTextArea(GIT_LOADER_PREVIEW_STATUS_ID, 200, 58, 310, 18);
    gui.addTextArea(GIT_LOADER_PREVIEW_CODE_ID, 200, 80, 310, 210);

    renderPreviewState(gui, pkg, 0);
    return gui;
}

function handlePreviewScroll(player, gui, scroll) {
    var sessionId = getActiveSession(player);
    if (!hasText(sessionId)) {
        setPreviewStatus(gui, "Нет активной сессии предмета.");
        setPreviewCode(gui, "");
        return;
    }

    var pkg = getCachedPackage(player, getHeldLoaderItemForSession(player, sessionId), sessionId);
    if (pkg == null) {
        setPreviewStatus(gui, "Сначала загрузи пакет.");
        setPreviewCode(gui, "");
        return;
    }

    renderPreviewState(gui, pkg, getSelectedIndex(scroll));
}

function buildPreviewEntries(pkg) {
    var entries = [];
    var previewFiles = getPreviewFiles(pkg);

    for (var i = 0; i < previewFiles.length; i++) {
        entries.push(buildPreviewEntryLabel(previewFiles[i]));
    }

    if (entries.length === 0) {
        entries.push("Нет файлов");
    }
    return entries;
}

function getPreviewFiles(pkg) {
    var files = [];
    if (pkg == null) return files;

    var hookFiles = pkg.supportedFiles == null ? [] : pkg.supportedFiles;
    var sharedFiles = pkg.sharedFiles == null ? [] : pkg.sharedFiles;

    for (var i = 0; i < hookFiles.length; i++) {
        if (hookFiles[i] == null) continue;
        files.push({
            kind: "hook",
            hook: hookFiles[i].hook,
            relativePath: hookFiles[i].relativePath,
            body: hookFiles[i].body
        });
    }

    for (var j = 0; j < sharedFiles.length; j++) {
        if (sharedFiles[j] == null) continue;
        files.push({
            kind: sharedFiles[j].isCoordinator ? "shared_coordinator" : "shared",
            hook: "",
            relativePath: sharedFiles[j].relativePath,
            body: sharedFiles[j].body
        });
    }

    return files;
}

function buildPreviewEntryLabel(file) {
    var cleanPath = hasText(file.relativePath) ? file.relativePath : "(без пути)";
    if (file.kind == "hook") {
        return "[" + (hasText(file.hook) ? file.hook : "?") + "] " + cleanPath;
    }
    if (file.kind == "shared_coordinator") {
        return "[shared*] " + cleanPath;
    }
    return "[shared] " + cleanPath;
}

function renderPreviewState(gui, pkg, selectedIndex) {
    if (pkg == null) {
        setPreviewStatus(gui, "Превью пусто. Сначала загрузи пакет.");
        setPreviewCode(gui, "");
        return;
    }

    var previewFiles = getPreviewFiles(pkg);
    if (previewFiles.length === 0) {
        setPreviewStatus(gui, "В пакете нет preview-файлов.");
        setPreviewCode(gui, "");
        return;
    }

    var index = selectedIndex;
    if (index < 0 || index >= previewFiles.length) index = 0;

    var file = previewFiles[index];
    setPreviewStatus(gui, buildPreviewMetaText(file));
    setPreviewCode(gui, buildPreviewCodeText(file));
}

function buildPreviewMetaText(file) {
    var pathText = hasText(file.relativePath) ? file.relativePath : "(без пути)";
    var code = file.body == null ? "" : ("" + file.body);
    var lines = code.length === 0 ? 0 : code.split(/\r?\n/).length;
    var kindText = "hook";

    if (file.kind == "shared") kindText = "shared";
    if (file.kind == "shared_coordinator") kindText = "shared coordinator";

    return "Тип: " + kindText + " | Путь: " + pathText + " | Строк: " + lines + " | Символов: " + code.length;
}

function buildPreviewCodeText(file) {
    var code = file == null || file.body == null ? "" : ("" + file.body);
    if (!hasText(code)) return "// Файл пуст";
    return limitPreviewText(code, 12000);
}

function limitPreviewText(text, maxChars) {
    var code = text == null ? "" : ("" + text);
    if (code.length <= maxChars) return code;

    var tail = "\n\n// --- preview truncated ---\n// Total chars: " + code.length + "\n";
    return code.substring(0, Math.max(0, maxChars - tail.length)) + tail;
}

module.exports = {
    createPreviewGui: createPreviewGui,
    handlePreviewScroll: handlePreviewScroll,
    buildPreviewEntries: buildPreviewEntries,
    getPreviewFiles: getPreviewFiles,
    buildPreviewEntryLabel: buildPreviewEntryLabel,
    renderPreviewState: renderPreviewState,
    buildPreviewMetaText: buildPreviewMetaText,
    buildPreviewCodeText: buildPreviewCodeText,
    limitPreviewText: limitPreviewText
};
