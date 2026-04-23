function createPreviewGui(player, pkg) {
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(GIT_LOADER_PREVIEW_GUI_ID, 540, 310, false, player);
    gui.addLabel(1, "Downloaded Package Preview", 10, 10, 240, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 520, 34, 0x5C8DFF, 1.5);

    gui.addLabel(10, "Files", 10, 42, 80, 14, 0xE0E0E0);
    gui.addScroll(GIT_LOADER_PREVIEW_SCROLL_ID, 10, 58, 190, 206, buildPreviewEntries(pkg));
    gui.addScroll(GIT_LOADER_PREVIEW_BACK_SCROLL_ID, 10, 272, 190, 24, ["Back"]);

    gui.addLabel(11, "Code", 210, 42, 80, 14, 0xE0E0E0);
    gui.addTextArea(GIT_LOADER_PREVIEW_STATUS_ID, 210, 58, 320, 28);
    gui.addTextArea(GIT_LOADER_PREVIEW_CODE_ID, 210, 92, 320, 204);

    renderPreviewState(gui, pkg, 0);
    return gui;
}

function handlePreviewScroll(player, gui, scroll) {
    if (scroll != null && scroll.getID() == GIT_LOADER_PREVIEW_BACK_SCROLL_ID) {
        var item = getHeldLoaderItemForSession(player, getActiveSession(player));
        if (item != null && !item.isEmpty()) {
            player.showCustomGui(createGui(player, item));
        }
        return;
    }

    var sessionId = getActiveSession(player);
    var item = getHeldLoaderItemForSession(player, sessionId);
    var pkg = getCurrentDownloadedPackage(player, item, sessionId);
    if (pkg == null) {
        setPreviewStatus(gui, "No downloaded package.");
        setPreviewCode(gui, "");
        return;
    }
    renderPreviewState(gui, pkg, getSelectedIndex(scroll));
}

function buildPreviewEntries(pkg) {
    var files = getPreviewFiles(pkg);
    var entries = [];
    for (var i = 0; i < files.length; i++) {
        entries.push(buildPreviewEntryLabel(files[i]));
    }
    return entries.length > 0 ? entries : ["No files"];
}

function getPreviewFiles(pkg) {
    var files = [];
    if (pkg == null) return files;
    appendPreviewFiles(files, pkg.supportedFiles, "hook");
    appendPreviewFiles(files, pkg.sharedFiles, "shared");
    appendPreviewFiles(files, pkg.ignoredFiles, "ignored");
    return files;
}

function appendPreviewFiles(out, files, kind) {
    if (files == null) return;
    for (var i = 0; i < files.length; i++) {
        if (files[i] == null) continue;
        out.push({
            kind: kind,
            hook: files[i].hook || "",
            relativePath: files[i].relativePath || files[i].path || "",
            body: files[i].body || ""
        });
    }
}

function buildPreviewEntryLabel(file) {
    var cleanPath = hasText(file.relativePath) ? file.relativePath : "(no path)";
    if (file.kind == "hook") return "[" + (hasText(file.hook) ? file.hook : "?") + "] " + cleanPath;
    if (file.kind == "shared") return "[shared] " + cleanPath;
    return "[ignored] " + cleanPath;
}

function renderPreviewState(gui, pkg, selectedIndex) {
    var files = getPreviewFiles(pkg);
    if (files.length === 0) {
        setPreviewStatus(gui, "Preview is empty.");
        setPreviewCode(gui, "");
        return;
    }

    var index = selectedIndex;
    if (index < 0 || index >= files.length) index = 0;
    var file = files[index];
    setPreviewStatus(gui, buildPreviewMetaText(file));
    setPreviewCode(gui, limitPreviewText(file.body, 12000));
}

function buildPreviewMetaText(file) {
    var code = file == null || file.body == null ? "" : ("" + file.body);
    var lines = code.length === 0 ? 0 : code.split(/\r?\n/).length;
    return file.kind + " | " + file.relativePath + " | lines=" + lines + " | chars=" + code.length;
}

function limitPreviewText(text, maxChars) {
    var code = text == null ? "" : ("" + text);
    if (code.length <= maxChars) return hasText(code) ? code : "// Empty file";
    var tail = "\n\n// --- preview truncated ---\n// Total chars: " + code.length + "\n";
    return code.substring(0, Math.max(0, maxChars - tail.length)) + tail;
}
