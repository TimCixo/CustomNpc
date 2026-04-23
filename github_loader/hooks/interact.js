var GitLoader_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var GitLoader_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var GitLoader_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var GitLoader_URL = Java.type("java.net.URL");
var GitLoader_URLEncoder = Java.type("java.net.URLEncoder");
var GitLoader_InputStreamReader = Java.type("java.io.InputStreamReader");
var GitLoader_BufferedReader = Java.type("java.io.BufferedReader");
var GitLoader_StringBuilder = Java.type("java.lang.StringBuilder");
var GitLoader_System = Java.type("java.lang.System");
var GitLoader_Thread = Java.type("java.lang.Thread");
var GitLoader_Base64 = Java.type("java.util.Base64");
var GitLoader_StandardCharsets = Java.type("java.nio.charset.StandardCharsets");

var GIT_LOADER_ITEM_TYPE = "github_npc_loader_tool";
var GIT_LOADER_SESSION_KEY = "github_npc_loader_session_id";
var GIT_LOADER_LAST_URL_KEY = "github_npc_loader_last_url";
var GIT_LOADER_MODE_KEY = "github_loader_mode";
var GIT_LOADER_ACTIVE_SESSION_KEY = "github_npc_loader_active_session";
var GIT_LOADER_ACTIVE_ITEM_KEY = "github_npc_loader_active_item";
var GIT_LOADER_GUI_URL_PREFIX = "github_npc_loader_url_";
var GIT_LOADER_GUI_LAST_URL_KEY = "github_npc_loader_last_url";
var GIT_LOADER_GUI_TOKEN_KEY = "github_npc_loader_github_token";
var GIT_LOADER_DOWNLOADED_PACKAGE_KEY = "github_loader_downloaded_package";
var GIT_LOADER_DOWNLOADED_SIGNATURE_KEY = "github_loader_downloaded_signature";
var GIT_LOADER_TEMP_PACKAGE_KEY = "github_loader_downloaded_package_temp_";

var GIT_LOADER_HTTP_RETRIES = 4;
var GIT_LOADER_HTTP_RETRY_DELAY_MS = 350;
var GIT_LOADER_MAX_SCRIPT_CHARS = 65000;

var GIT_LOADER_GUI_ID = 9321;
var GIT_LOADER_ACTION_SCROLL_ID = 9322;
var GIT_LOADER_URL_FIELD_ID = 9323;
var GIT_LOADER_STATUS_ID = 9324;
var GIT_LOADER_TOKEN_FIELD_ID = 9326;
var GIT_LOADER_ACTIONS = ["Download", "Preview", "Clear"];

var GIT_LOADER_PREVIEW_GUI_ID = 9331;
var GIT_LOADER_PREVIEW_SCROLL_ID = 9332;
var GIT_LOADER_PREVIEW_CODE_ID = 9333;
var GIT_LOADER_PREVIEW_STATUS_ID = 9334;
var GIT_LOADER_PREVIEW_BACK_SCROLL_ID = 9335;

var GIT_LOADER_HOOK_ORDER = [
    "init", "interact", "timer", "target", "attack", "damaged",
    "meleeAttack", "killed", "kills", "died", "collide"
];

function interact(event) {
    var item = event.item;
    var player = event.player;
    var target = event.target;
    if (!isLoaderItem(item)) return;

    rememberActiveSession(player, getSessionId(item));
    rememberActiveItem(player, item);

    if (target != null && isNpcTarget(target)) {
        applyPackageToNpc(player, target, item);
        event.setCanceled(true);
        return;
    }

    try {
        player.showCustomGui(createGui(player, item));
    } catch (e) {
        player.message("GitHub Loader: GUI error. " + shortError(e));
    }
    event.setCanceled(true);
}

function customGuiScroll(event) {
    try {
        if (event == null || event.gui == null || event.player == null) return;
        var gui = event.gui;
        var player = event.player;
        var scroll = event.scroll;

        if (gui.getID() == GIT_LOADER_GUI_ID) {
            if (scroll == null || scroll.getID() != GIT_LOADER_ACTION_SCROLL_ID) return;
            var sessionId = resolveActiveSession(player);
            if (!hasText(sessionId)) {
                setStatus(gui, "No active loader item session.");
                safeUpdate(gui);
                return;
            }
            handleMainActionScroll(player, gui, sessionId, scroll);
            safeUpdate(gui);
            return;
        }

        if (gui.getID() == GIT_LOADER_PREVIEW_GUI_ID) {
            handlePreviewScroll(player, gui, scroll);
            safeUpdate(gui);
        }
    } catch (e) {
        try {
            event.player.message("GitHub Loader: " + shortError(e));
        } catch (ignored) {}
    }
}

function customGuiClosed(event) {
    try {
        var gui = event.gui;
        var player = event.player;
        if (gui == null || gui.getID() != GIT_LOADER_GUI_ID) return;
        var sessionId = resolveActiveSession(player);
        if (hasText(sessionId)) persistMainFields(player, gui, sessionId);
    } catch (e) {}
}

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
    } else if (selectedIndex === 1) {
        openPreviewGui(player, gui, sessionId);
    } else if (selectedIndex === 2) {
        clearDownloadedPackage(player, sessionId);
        setStatus(gui, "Downloaded package cleared.");
        player.message("GitHub Loader: downloaded package cleared.");
    } else {
        setStatus(gui, "Unknown action index: " + selectedIndex);
    }
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
        player.message("GitHub Loader download error: " + shortError(e));
    }
}

function openPreviewGui(player, gui, sessionId) {
    var item = getHeldLoaderItemForSession(player, sessionId);
    var pkg = getCurrentDownloadedPackage(player, item, sessionId);
    if (pkg == null) {
        setStatus(gui, "Download a package first.");
        return;
    }
    player.showCustomGui(createPreviewGui(player, pkg));
}

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
        if (item != null && !item.isEmpty()) player.showCustomGui(createGui(player, item));
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

function loadGithubPackage(url, githubToken) {
    var parsed = parseGithubTarget(url);
    var ref = resolveGithubRef(parsed, githubToken);
    var tree = fetchRepoTree(parsed.owner, parsed.repo, ref, githubToken);
    var rootPath = resolveNpcPackageRoot(parsed.path, tree);
    var files = collectGithubFiles(parsed.owner, parsed.repo, ref, rootPath, tree, githubToken);
    var supported = selectHookFiles(files);
    var shared = selectSharedFiles(files);
    var ignored = collectIgnoredFiles(files, supported, shared);

    return {
        sourceUrl: url,
        owner: parsed.owner,
        repo: parsed.repo,
        ref: ref,
        rootPath: rootPath,
        files: files,
        supportedFiles: supported,
        sharedFiles: shared,
        ignoredFiles: ignored,
        supportedHooks: extractHooks(supported),
        loadedAt: "" + GitLoader_System.currentTimeMillis()
    };
}

function validateNpcPackage(pkg) {
    if (pkg == null) throw "Package is empty";
    if (pkg.supportedFiles == null || pkg.supportedFiles.length === 0) throw "Package has no supported hook files";
    for (var i = 0; i < pkg.supportedFiles.length; i++) {
        var file = pkg.supportedFiles[i];
        if (!hasText(file.body)) throw "Hook file is empty: " + file.relativePath;
        validateScriptSource(file.body, file.relativePath);
        if (file.body.length > GIT_LOADER_MAX_SCRIPT_CHARS) throw "Hook `" + file.hook + "` is larger than the script tab limit";
    }
    buildSharedFactorySource(pkg.sharedFiles);
}

function applyPackageToNpc(player, target, item) {
    if (!isNpcTarget(target)) {
        player.message("GitHub Loader: right click an NPC to apply the downloaded package.");
        return false;
    }

    var pkg = getCurrentDownloadedPackage(player, item, getSessionId(item));
    if (pkg == null) {
        player.message("GitHub Loader: download a package first.");
        return false;
    }

    validateNpcPackage(pkg);
    var data = target.getStoreddata();
    data.put("__github_loader_package", JSON.stringify(buildStoredPackageMeta(pkg)));
    data.put("__shared", buildSharedFactorySource(pkg.sharedFiles));
    writeStoredFiles(data, "github_loader_hook", pkg.supportedFiles);
    writeStoredFiles(data, "github_loader_shared", pkg.sharedFiles);

    var scriptResult = tryWriteNpcScriptTabs(target, pkg.supportedFiles);
    try {
        target.updateClient();
    } catch (e) {}

    player.message("GitHub Loader: loaded " + pkg.supportedFiles.length + " hook(s) and " + pkg.sharedFiles.length + " shared file(s) into NPC.");
    if (!scriptResult.ok) player.message("GitHub Loader: script tabs were not directly updated; durable copies were written to storeddata.");
    return true;
}

function tryWriteNpcScriptTabs(npc, hookFiles) {
    try {
        var mcNpc = null;
        try {
            mcNpc = npc.getMCEntity();
        } catch (e1) {
            mcNpc = npc.mCEntity;
        }
        if (mcNpc == null || mcNpc.script == null || mcNpc.script.scripts == null) return { ok: false };
        var scripts = mcNpc.script.scripts;

        for (var i = 0; i < hookFiles.length; i++) {
            var file = hookFiles[i];
            var index = hookSortIndex(file.hook);
            var container = null;
            try {
                container = scripts[index];
            } catch (e2) {}
            if (container == null && scripts.get != null) {
                try {
                    container = scripts.get(index);
                } catch (e3) {}
            }
            if (container == null) continue;
            container.script = file.body || "";
            container.fullscript = file.body || "";
            try {
                container.errored = false;
            } catch (e4) {}
        }
        try {
            mcNpc.script.enabled = true;
        } catch (e5) {}
        return { ok: true };
    } catch (e) {
        return { ok: false, error: shortError(e) };
    }
}

function buildSharedFactorySource(sharedFiles) {
    var files = sharedFiles == null ? [] : sharedFiles;
    var entries = [];
    for (var i = 0; i < files.length; i++) {
        var rel = normalizeSlashes(files[i].relativePath);
        if (rel == "shared/__shared.js") continue;
        entries.push({ id: rel.substring("shared/".length), body: files[i].body || "" });
    }

    var source = "(function(event){\n";
    source += "var __modules={};\n";
    source += "function __define(id,fn){__modules[id]={fn:fn,exports:{},loaded:false};}\n";
    source += "function __require(id){var m=__modules[id];if(!m)throw 'Missing shared module '+id;if(!m.loaded){m.loaded=true;var module={exports:m.exports};m.fn(module,module.exports,__require,event);m.exports=module.exports;}return m.exports;}\n";
    for (var j = 0; j < entries.length; j++) {
        source += "__define(" + JSON.stringify(entries[j].id) + ",function(module,exports,require,event){\n";
        source += entries[j].body + "\n});\n";
    }
    source += "var shared={};\n";
    for (var k = 0; k < entries.length; k++) {
        source += "shared[" + JSON.stringify(moduleNameFromPath(entries[k].id)) + "]=__require(" + JSON.stringify(entries[k].id) + ");\n";
    }
    source += "return shared;\n})";

    validateScriptSource(source, "__shared");
    return source;
}

function writeStoredFiles(data, prefix, files) {
    var oldCount = parseIntSafe(data.get(prefix + "_count"), 0);
    for (var i = 0; i < oldCount; i++) {
        data.remove(prefix + "_" + i + "_path");
        data.remove(prefix + "_" + i + "_hook");
        data.remove(prefix + "_" + i + "_body");
    }
    var list = files == null ? [] : files;
    for (var j = 0; j < list.length; j++) {
        data.put(prefix + "_" + j + "_path", list[j].relativePath || "");
        data.put(prefix + "_" + j + "_hook", list[j].hook || "");
        data.put(prefix + "_" + j + "_body", list[j].body || "");
    }
    data.put(prefix + "_count", "" + list.length);
}

function buildStoredPackageMeta(pkg) {
    return {
        sourceUrl: pkg.sourceUrl,
        owner: pkg.owner,
        repo: pkg.repo,
        ref: pkg.ref,
        rootPath: pkg.rootPath,
        loadedAt: pkg.loadedAt,
        supportedHooks: pkg.supportedHooks,
        hookCount: pkg.supportedFiles == null ? 0 : pkg.supportedFiles.length,
        sharedCount: pkg.sharedFiles == null ? 0 : pkg.sharedFiles.length
    };
}

function writeDownloadedPackageToItem(player, item, pkg, repoUrl) {
    var tag = getCustomTag(item);
    if (tag == null) throw "Item custom data is missing";
    tag.putString(GIT_LOADER_LAST_URL_KEY, trimString(repoUrl));
    tag.putString(GIT_LOADER_DOWNLOADED_PACKAGE_KEY, encodeBundle(JSON.stringify(pkg)));
    tag.putString(GIT_LOADER_DOWNLOADED_SIGNATURE_KEY, buildDownloadedSignature(pkg));
    if (!writeHeldTag(player, item, tag)) throw "Failed to write downloaded package into item";
}

function getCurrentDownloadedPackage(player, item, sessionId) {
    var cached = getCachedDownloadedPackage(player, sessionId);
    if (cached != null) return cached;

    var pkg = getDownloadedPackageFromItem(item);
    if (pkg != null) cacheDownloadedPackage(player, sessionId, pkg);
    return pkg;
}

function getDownloadedPackageFromItem(item) {
    try {
        var tag = getCustomTag(item);
        if (tag == null) return null;
        var decoded = decodeBundle(readTag(tag, GIT_LOADER_DOWNLOADED_PACKAGE_KEY));
        if (!hasText(decoded)) return null;
        return JSON.parse(decoded);
    } catch (e) {
        return null;
    }
}

function cacheDownloadedPackage(player, sessionId, pkg) {
    try {
        player.getTempdata().put(GIT_LOADER_TEMP_PACKAGE_KEY + sessionId, pkg);
    } catch (e) {}
}

function getCachedDownloadedPackage(player, sessionId) {
    try {
        var pkg = player.getTempdata().get(GIT_LOADER_TEMP_PACKAGE_KEY + sessionId);
        return pkg == null ? null : pkg;
    } catch (e) {
        return null;
    }
}

function clearDownloadedPackage(player, sessionId) {
    try {
        player.getTempdata().remove(GIT_LOADER_TEMP_PACKAGE_KEY + sessionId);
    } catch (e) {}
    var item = getHeldLoaderItemForSession(player, sessionId);
    if (item == null || item.isEmpty()) return;
    var tag = getCustomTag(item);
    if (tag == null) return;
    tag.putString(GIT_LOADER_DOWNLOADED_PACKAGE_KEY, "");
    tag.putString(GIT_LOADER_DOWNLOADED_SIGNATURE_KEY, "");
    writeHeldTag(player, item, tag);
}

function buildDownloadedSignature(pkg) {
    if (pkg == null) return "";
    return [pkg.owner, pkg.repo, pkg.ref, pkg.rootPath, pkg.loadedAt].join("@");
}

function buildDownloadedStatusText(pkg, url) {
    if (pkg == null) {
        return [
            "Ready item: yes",
            "URL: " + (hasText(url) ? url : "-"),
            "Downloaded: no",
            "Use Download, then Preview or right click an NPC."
        ].join("\n");
    }
    return [
        "Downloaded: yes",
        "Repo: " + pkg.owner + "/" + pkg.repo + "@" + pkg.ref,
        "Path: " + (hasText(pkg.rootPath) ? pkg.rootPath : "/"),
        "Hooks: " + joinHookNames(pkg.supportedHooks),
        "Shared: " + (pkg.sharedFiles == null ? 0 : pkg.sharedFiles.length),
        "Ignored: " + (pkg.ignoredFiles == null ? 0 : pkg.ignoredFiles.length)
    ].join("\n");
}

function buildPreviewEntries(pkg) {
    var files = getPreviewFiles(pkg);
    var entries = [];
    for (var i = 0; i < files.length; i++) entries.push(buildPreviewEntryLabel(files[i]));
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

function parseGithubTarget(url) {
    var clean = trimString(url).replace(/^https?:\/\/www\.github\.com\//i, "https://github.com/");
    clean = clean.replace(/\/+$/, "");
    var match = clean.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/(.*))?$/i);
    if (match == null) throw "Only github.com URLs are supported";

    var owner = trimString(match[1]);
    var repo = trimString(match[2]).replace(/\.git$/i, "");
    var tail = trimString(match[3]);
    var parts = hasText(tail) ? tail.split("/") : [];
    var ref = "";
    var path = "";

    if (parts.length > 0) {
        if (parts[0] == "tree" || parts[0] == "blob") {
            if (parts.length < 2) throw "GitHub URL is missing a branch or tag";
            ref = trimString(parts[1]);
            path = parts.slice(2).join("/");
        } else {
            path = parts.join("/");
        }
    }
    return { owner: owner, repo: repo, ref: ref, path: normalizeSlashes(path) };
}

function resolveGithubRef(parsed, githubToken) {
    var ref = trimString(parsed.ref);
    if (hasText(ref)) return ref;
    var repoInfo = fetchJson("https://api.github.com/repos/" + parsed.owner + "/" + parsed.repo, githubToken);
    ref = trimString(repoInfo == null ? "" : repoInfo.default_branch);
    return hasText(ref) ? ref : "main";
}

function fetchRepoTree(owner, repo, ref, githubToken) {
    var treeUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + encodeQuery(ref) + "?recursive=1";
    var payload = fetchJson(treeUrl, githubToken);
    return payload != null && isArray(payload.tree) ? payload.tree : [];
}

function resolveNpcPackageRoot(requestedPath, tree) {
    var requested = normalizeSlashes(requestedPath);
    if (hasText(requested)) return requested;
    var roots = {};
    for (var i = 0; i < tree.length; i++) {
        var entry = tree[i];
        if (entry == null || trimString(entry.type) != "blob") continue;
        var root = inferRootFromHookPath(normalizeSlashes(entry.path));
        if (hasText(root)) roots[root] = true;
    }
    var keys = objectKeys(roots);
    if (keys.length === 1) return keys[0];
    if (keys.length > 1) throw "Repository has multiple NPC packages. Use a nested package URL.";
    return "";
}

function collectGithubFiles(owner, repo, ref, rootPath, tree, githubToken) {
    var files = [];
    var cleanRoot = normalizeSlashes(rootPath);
    for (var i = 0; i < tree.length; i++) {
        var entry = tree[i];
        if (entry == null || trimString(entry.type) != "blob") continue;
        var path = normalizeSlashes(entry.path);
        if (!isJsPath(path)) continue;
        if (hasText(cleanRoot) && path != cleanRoot && path.indexOf(cleanRoot + "/") !== 0) continue;
        files.push({
            name: path.substring(path.lastIndexOf("/") + 1),
            path: path,
            relativePath: toRelativePath(path, cleanRoot),
            body: fetchBlobText(owner, repo, trimString(entry.sha), githubToken)
        });
    }
    files.sort(compareRelativePath);
    return files;
}

function selectHookFiles(files) {
    var selected = [];
    var byHook = {};
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var hook = detectHookName(file.relativePath);
        if (!hasText(hook)) continue;
        if (byHook[hook] != null) throw "Duplicate hook `" + hook + "`: " + byHook[hook].relativePath + " and " + file.relativePath;
        file.hook = hook;
        byHook[hook] = file;
        selected.push(file);
    }
    selected.sort(function(a, b) { return hookSortIndex(a.hook) - hookSortIndex(b.hook); });
    return selected;
}

function selectSharedFiles(files) {
    var selected = [];
    for (var i = 0; i < files.length; i++) {
        var rel = normalizeSlashes(files[i].relativePath);
        if (rel.indexOf("shared/") === 0 && isJsPath(rel)) selected.push(files[i]);
    }
    selected.sort(compareRelativePath);
    return selected;
}

function collectIgnoredFiles(files, hooks, shared) {
    var used = {};
    markUsed(used, hooks);
    markUsed(used, shared);
    var ignored = [];
    for (var i = 0; i < files.length; i++) {
        if (!used[files[i].relativePath]) ignored.push(files[i]);
    }
    return ignored;
}

function markUsed(used, files) {
    if (files == null) return;
    for (var i = 0; i < files.length; i++) {
        if (files[i] != null) used[files[i].relativePath] = true;
    }
}

function detectHookName(relativePath) {
    var rel = normalizeSlashes(relativePath);
    var match = rel.match(/^hooks\/([^\/]+)\.js$/i);
    if (match != null) return normalizeHookName(match[1]);
    match = rel.match(/^([^\/]+)\.js$/i);
    if (match != null) return normalizeHookName(match[1]);
    match = rel.match(/^([^\/]+)\/\1\.js$/i);
    if (match != null) return normalizeHookName(match[1]);
    return "";
}

function normalizeHookName(name) {
    var clean = trimString(name);
    for (var i = 0; i < GIT_LOADER_HOOK_ORDER.length; i++) {
        if (clean.toLowerCase() == GIT_LOADER_HOOK_ORDER[i].toLowerCase()) return GIT_LOADER_HOOK_ORDER[i];
    }
    return "";
}

function hookSortIndex(name) {
    for (var i = 0; i < GIT_LOADER_HOOK_ORDER.length; i++) {
        if (GIT_LOADER_HOOK_ORDER[i] == name) return i;
    }
    return 999;
}

function extractHooks(files) {
    var hooks = [];
    for (var i = 0; i < files.length; i++) {
        if (files[i] != null && hasText(files[i].hook)) hooks.push(files[i].hook);
    }
    return hooks;
}

function inferRootFromHookPath(path) {
    var clean = normalizeSlashes(path);
    var index = clean.indexOf("/hooks/");
    if (index >= 0 && isJsPath(clean)) return clean.substring(0, index);
    var parts = clean.split("/");
    if (parts.length >= 2 && detectHookName(parts[parts.length - 1]) != "") return parts.slice(0, parts.length - 1).join("/");
    return "";
}

function fetchJson(url, githubToken) {
    var text = fetchText(url, githubToken);
    try {
        return JSON.parse(text);
    } catch (e) {
        throw "GitHub returned invalid JSON";
    }
}

function fetchBlobText(owner, repo, sha, githubToken) {
    if (!hasText(sha)) throw "GitHub tree entry is missing blob sha";
    var payload = fetchJson("https://api.github.com/repos/" + owner + "/" + repo + "/git/blobs/" + encodeQuery(sha), githubToken);
    var encoding = trimString(payload == null ? "" : payload.encoding).toLowerCase();
    var content = payload == null ? "" : trimString(payload.content);
    if (encoding == "base64") return decodeBase64Text(content.replace(/\s+/g, ""));
    if (hasText(content)) return content;
    throw "GitHub blob is empty or unsupported";
}

function fetchText(url, githubToken) {
    var lastError = null;
    for (var attempt = 1; attempt <= GIT_LOADER_HTTP_RETRIES; attempt++) {
        try {
            return fetchTextOnce(url, githubToken);
        } catch (e) {
            lastError = e;
            if (!shouldRetryHttpError(e, attempt)) break;
            sleepMs(GIT_LOADER_HTTP_RETRY_DELAY_MS * attempt);
        }
    }
    throw lastError == null ? "Unknown HTTP error" : lastError;
}

function fetchTextOnce(url, githubToken) {
    var conn = null;
    var reader = null;
    var errorReader = null;
    try {
        conn = new GitLoader_URL(url).openConnection();
        var resolvedToken = resolveGithubToken(githubToken);
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 CustomNpc-GitHubLoader");
        conn.setRequestProperty("Accept", "application/vnd.github+json");
        if (hasText(resolvedToken) && url.indexOf("https://api.github.com/") === 0) conn.setRequestProperty("Authorization", "Bearer " + resolvedToken);
        conn.setRequestProperty("Connection", "close");
        conn.setUseCaches(false);
        conn.setConnectTimeout(10000);
        conn.setReadTimeout(20000);

        reader = new GitLoader_BufferedReader(new GitLoader_InputStreamReader(conn.getInputStream(), "UTF-8"));
        var out = new GitLoader_StringBuilder();
        var line;
        while ((line = reader.readLine()) != null) out.append(line).append("\n");
        return "" + out.toString();
    } catch (e) {
        var code = "";
        var errorText = "";
        try {
            code = "" + conn.getResponseCode();
        } catch (e2) {}
        try {
            if (conn != null && conn.getErrorStream() != null) {
                errorReader = new GitLoader_BufferedReader(new GitLoader_InputStreamReader(conn.getErrorStream(), "UTF-8"));
                var errorOut = new GitLoader_StringBuilder();
                var errorLine;
                while ((errorLine = errorReader.readLine()) != null) errorOut.append(errorLine).append("\n");
                errorText = trimString("" + errorOut.toString());
            }
        } catch (e3) {}
        if (hasText(code)) {
            if (code == "401") throw "HTTP 401: invalid GitHub token";
            if (code == "403" && errorText.toLowerCase().indexOf("rate limit") >= 0) throw "HTTP 403: GitHub API rate limit exceeded";
            throw hasText(errorText) ? ("HTTP " + code + ": " + shortError(errorText)) : ("HTTP " + code);
        }
        throw "" + e;
    } finally {
        try {
            if (reader != null) reader.close();
        } catch (e4) {}
        try {
            if (errorReader != null) errorReader.close();
        } catch (e5) {}
    }
}

function shouldRetryHttpError(errorText, attempt) {
    if (attempt >= GIT_LOADER_HTTP_RETRIES) return false;
    var text = trimString("" + errorText).toLowerCase();
    return text.indexOf("connection reset") >= 0
        || text.indexOf("unexpected end of file") >= 0
        || text.indexOf("read timed out") >= 0
        || text.indexOf("connect timed out") >= 0
        || text.indexOf("http 429") >= 0
        || text.indexOf("http 500") >= 0
        || text.indexOf("http 502") >= 0
        || text.indexOf("http 503") >= 0
        || text.indexOf("http 504") >= 0;
}

function resolveGithubToken(explicitToken) {
    var token = trimString(explicitToken);
    if (hasText(token)) return token;
    try {
        token = trimString(GitLoader_System.getenv("GITHUB_TOKEN"));
    } catch (e) {
        token = "";
    }
    return token;
}

function validateScriptSource(source, label) {
    try {
        (1, eval)("(function(){\n" + (source == null ? "" : ("" + source)) + "\n})");
    } catch (e) {
        throw "Invalid script `" + label + "`: " + shortError(e);
    }
}

function persistMainFields(player, gui, sessionId) {
    try {
        player.getStoreddata().put(GIT_LOADER_GUI_URL_PREFIX + sessionId, trimString(getGuiText(gui, GIT_LOADER_URL_FIELD_ID)));
        player.getStoreddata().put(GIT_LOADER_GUI_LAST_URL_KEY, trimString(getGuiText(gui, GIT_LOADER_URL_FIELD_ID)));
        player.getStoreddata().put(GIT_LOADER_GUI_TOKEN_KEY, trimString(getGuiText(gui, GIT_LOADER_TOKEN_FIELD_ID)));
    } catch (e) {}
}

function getInitialUrl(player, item, sessionId) {
    var tag = getCustomTag(item);
    var itemUrl = tag == null ? "" : readTag(tag, GIT_LOADER_LAST_URL_KEY);
    if (hasStoredValue(itemUrl)) return itemUrl;
    try {
        var stored = trimString(player.getStoreddata().get(GIT_LOADER_GUI_URL_PREFIX + sessionId));
        if (hasStoredValue(stored)) return stored;
    } catch (e) {}
    try {
        var lastUrl = trimString(player.getStoreddata().get(GIT_LOADER_GUI_LAST_URL_KEY));
        return hasStoredValue(lastUrl) ? lastUrl : "";
    } catch (e1) {
        return "";
    }
}

function getInitialGithubToken(player) {
    try {
        var stored = trimString(player.getStoreddata().get(GIT_LOADER_GUI_TOKEN_KEY));
        return hasStoredValue(stored) ? stored : "";
    } catch (e) {
        return "";
    }
}

function isLoaderItem(item) {
    var tag = getCustomTag(item);
    return tag != null && readTag(tag, "item_type") == GIT_LOADER_ITEM_TYPE;
}

function isNpcTarget(target) {
    if (target == null) return false;
    try {
        return target.getStoreddata() != null;
    } catch (e) {
        return false;
    }
}

function getSessionId(item) {
    var tag = getCustomTag(item);
    return tag == null ? "" : readTag(tag, GIT_LOADER_SESSION_KEY);
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;
    try {
        var customData = item.getMCItemStack().get(GitLoader_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
    }
}

function writeHeldTag(player, item, tag) {
    try {
        var mcStack = item.getMCItemStack();
        if (mcStack == null || mcStack.isEmpty()) return false;
        mcStack.set(GitLoader_DataComponents.CUSTOM_DATA, GitLoader_CustomData.of(tag));
        player.updatePlayerInventory();
        return true;
    } catch (e) {
        return false;
    }
}

function rememberActiveSession(player, sessionId) {
    try {
        player.getTempdata().put(GIT_LOADER_ACTIVE_SESSION_KEY, sessionId);
    } catch (e) {}
}

function rememberActiveItem(player, item) {
    try {
        player.getTempdata().put(GIT_LOADER_ACTIVE_ITEM_KEY, item);
    } catch (e) {}
}

function getActiveSession(player) {
    try {
        return trimString(player.getTempdata().get(GIT_LOADER_ACTIVE_SESSION_KEY));
    } catch (e) {
        return "";
    }
}

function resolveActiveSession(player) {
    var sessionId = getActiveSession(player);
    if (hasText(sessionId)) return sessionId;
    var item = getCurrentLoaderItem(player);
    if (item != null && !item.isEmpty()) {
        sessionId = getSessionId(item);
        if (hasText(sessionId)) rememberActiveSession(player, sessionId);
    }
    return sessionId;
}

function getCurrentLoaderItem(player) {
    var item = getActiveLoaderItem(player);
    if (item != null && !item.isEmpty()) return item;
    try {
        item = player.getMainhandItem();
        if (isLoaderItem(item)) return item;
    } catch (e1) {}
    try {
        item = player.getOffhandItem();
        if (isLoaderItem(item)) return item;
    } catch (e2) {}
    return null;
}

function getActiveLoaderItem(player) {
    try {
        var item = player.getTempdata().get(GIT_LOADER_ACTIVE_ITEM_KEY);
        if (item == null || item.isEmpty()) return null;
        return isLoaderItem(item) ? item : null;
    } catch (e) {
        return null;
    }
}

function getHeldLoaderItemForSession(player, sessionId) {
    try {
        var mainhand = player.getMainhandItem();
        if (isLoaderItem(mainhand) && getSessionId(mainhand) == sessionId) return mainhand;
    } catch (e1) {}
    try {
        var offhand = player.getOffhandItem();
        if (isLoaderItem(offhand) && getSessionId(offhand) == sessionId) return offhand;
    } catch (e2) {}
    return getActiveLoaderItem(player);
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

function getGuiText(gui, id) {
    try {
        var comp = gui.getComponent(id);
        if (comp != null && comp.getText != null) return "" + comp.getText();
    } catch (e1) {}
    try {
        var comp2 = gui.getComponent(id);
        if (comp2 != null && comp2.text != null) return "" + comp2.text;
    } catch (e2) {}
    return "";
}

function setGuiText(gui, id, text) {
    try {
        var comp = gui.getComponent(id);
        if (comp != null && comp.setText != null) comp.setText(text == null ? "" : ("" + text));
    } catch (e) {}
}

function setStatus(gui, text) {
    setGuiText(gui, GIT_LOADER_STATUS_ID, text);
}

function setPreviewStatus(gui, text) {
    setGuiText(gui, GIT_LOADER_PREVIEW_STATUS_ID, text);
}

function setPreviewCode(gui, text) {
    setGuiText(gui, GIT_LOADER_PREVIEW_CODE_ID, text);
}

function safeUpdate(gui) {
    try {
        gui.update();
    } catch (e) {}
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function encodeBundle(text) {
    try {
        var raw = new java.lang.String(text == null ? "" : ("" + text)).getBytes(GitLoader_StandardCharsets.UTF_8);
        return "" + GitLoader_Base64.getEncoder().encodeToString(raw);
    } catch (e) {
        return "";
    }
}

function decodeBundle(text) {
    try {
        var clean = trimString(text);
        if (!hasStoredValue(clean)) return "";
        var bytes = GitLoader_Base64.getDecoder().decode(clean);
        return "" + new java.lang.String(bytes, GitLoader_StandardCharsets.UTF_8);
    } catch (e) {
        return "";
    }
}

function decodeBase64Text(text) {
    var bytes = GitLoader_Base64.getDecoder().decode(trimString(text));
    return "" + new java.lang.String(bytes, GitLoader_StandardCharsets.UTF_8);
}

function encodePath(path) {
    var parts = normalizeSlashes(path).split("/");
    var encoded = [];
    for (var i = 0; i < parts.length; i++) {
        if (hasText(parts[i])) encoded.push(encodeQuery(parts[i]));
    }
    return encoded.join("/");
}

function encodeQuery(value) {
    return ("" + GitLoader_URLEncoder.encode("" + value, "UTF-8")).replace(/\+/g, "%20");
}

function toRelativePath(path, rootPath) {
    var cleanPath = normalizeSlashes(path);
    var cleanRoot = normalizeSlashes(rootPath);
    if (!hasText(cleanRoot)) return cleanPath;
    if (cleanPath == cleanRoot) return cleanPath.substring(cleanPath.lastIndexOf("/") + 1);
    if (cleanPath.indexOf(cleanRoot + "/") === 0) return cleanPath.substring(cleanRoot.length + 1);
    return cleanPath;
}

function compareRelativePath(a, b) {
    var left = a == null ? "" : a.relativePath;
    var right = b == null ? "" : b.relativePath;
    if (left < right) return -1;
    if (left > right) return 1;
    return 0;
}

function moduleNameFromPath(path) {
    var name = normalizeSlashes(path);
    name = name.substring(name.lastIndexOf("/") + 1).replace(/\.js$/i, "");
    return name.replace(/[^A-Za-z0-9_]/g, "_");
}

function joinHookNames(hooks) {
    if (hooks == null || hooks.length === 0) return "-";
    return hooks.join(", ");
}

function sleepMs(ms) {
    try {
        GitLoader_Thread.sleep(ms);
    } catch (e) {}
}

function objectKeys(obj) {
    var keys = [];
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) keys.push(key);
    }
    return keys;
}

function isArray(value) {
    try {
        return Object.prototype.toString.call(value) == "[object Array]";
    } catch (e) {
        return false;
    }
}

function normalizeSlashes(value) {
    return trimString(value).replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
}

function isJsPath(path) {
    return /\.js$/i.test(trimString(path));
}

function parseIntSafe(value, def) {
    var parsed = parseInt(trimString(value), 10);
    return isNaN(parsed) ? def : parsed;
}

function shortError(e) {
    return trimString(("" + e).replace(/\r?\n+/g, " "));
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}

function hasStoredValue(value) {
    var text = trimString(value);
    return text.length > 0 && text != "null" && text != "undefined";
}
