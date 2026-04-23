var GitLoader_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var GitLoader_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var GitLoader_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var GitLoader_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var GitLoader_URL = Java.type("java.net.URL");
var GitLoader_URLEncoder = Java.type("java.net.URLEncoder");
var GitLoader_InputStreamReader = Java.type("java.io.InputStreamReader");
var GitLoader_BufferedReader = Java.type("java.io.BufferedReader");
var GitLoader_StringBuilder = Java.type("java.lang.StringBuilder");
var GitLoader_Base64 = Java.type("java.util.Base64");
var GitLoader_StandardCharsets = Java.type("java.nio.charset.StandardCharsets");

var ITEM_TYPE = "github_npc_loader_tool";
var ITEM_LAST_URL_KEY = "github_loader_last_url";
var ITEM_DOWNLOADED_PACKAGE_KEY = "github_loader_downloaded_package";
var PLAYER_ACTIVE_ITEM_KEY = "github_loader_active_item";
var PLAYER_TOKEN_KEY = "github_loader_token";

var GUI_ID = 9321;
var ACTION_SCROLL_ID = 9322;
var URL_FIELD_ID = 9323;
var STATUS_ID = 9324;
var TOKEN_FIELD_ID = 9326;
var ACTIONS = ["Download", "Preview", "Clear"];

var PREVIEW_GUI_ID = 9331;
var PREVIEW_SCROLL_ID = 9332;
var PREVIEW_CODE_ID = 9333;
var PREVIEW_STATUS_ID = 9334;
var PREVIEW_BACK_ID = 9335;

var HOOK_ORDER = ["init", "interact", "timer", "target", "attack", "damaged", "meleeAttack", "killed", "kills", "died", "collide"];

function interact(event) {
    var item = event.item;
    var player = event.player;
    if (!isLoaderItem(item)) return;

    rememberActiveItem(player, item);

    if (isNpcTarget(event.target)) {
        applyPackageToNpc(player, event.target, item);
        event.setCanceled(true);
        return;
    }

    player.showCustomGui(createMainGui(player, item));
    event.setCanceled(true);
}

function customGuiScroll(event) {
    var gui = event.gui;
    if (gui == null) return;

    if (gui.getID() == GUI_ID) {
        var shouldUpdateMain = handleMainScroll(event.player, gui, event.scroll);
        if (shouldUpdateMain !== false) safeUpdate(gui);
        return;
    }

    if (gui.getID() == PREVIEW_GUI_ID) {
        var shouldUpdatePreview = handlePreviewScroll(event.player, gui, event.scroll);
        if (shouldUpdatePreview !== false) safeUpdate(gui);
    }
}

function customGuiClosed(event) {
    if (event.gui == null || event.gui.getID() != GUI_ID) return;
    var item = getActiveLoaderItem(event.player);
    if (item == null || item.isEmpty()) return;

    writeLastUrl(item, trimString(getGuiText(event.gui, URL_FIELD_ID)));
    event.player.getStoreddata().put(PLAYER_TOKEN_KEY, trimString(getGuiText(event.gui, TOKEN_FIELD_ID)));
}

function createMainGui(player, item) {
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(GUI_ID, 380, 286, false, player);
    var pkg = getDownloadedPackage(item);

    gui.addLabel(1, "GitHub NPC Loader", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 360, 34, 0x5C8DFF, 1.5);
    gui.addLabel(10, "GitHub URL", 10, 42, 100, 14, 0xE0E0E0);
    gui.addTextField(URL_FIELD_ID, 10, 58, 360, 20);
    gui.addLabel(11, "GitHub Token", 10, 84, 100, 14, 0xE0E0E0);
    gui.addTextField(TOKEN_FIELD_ID, 10, 100, 360, 20);
    gui.addLabel(12, "Actions", 10, 130, 80, 14, 0xE0E0E0);
    gui.addScroll(ACTION_SCROLL_ID, 10, 146, 104, 82, ACTIONS);
    gui.addLabel(13, "Status", 124, 130, 80, 14, 0xE0E0E0);
    gui.addTextArea(STATUS_ID, 124, 146, 246, 112);

    setGuiText(gui, URL_FIELD_ID, readTag(getTag(item), ITEM_LAST_URL_KEY));
    setGuiText(gui, TOKEN_FIELD_ID, trimString(player.getStoreddata().get(PLAYER_TOKEN_KEY)));
    setStatus(gui, buildPackageStatus(pkg));
    return gui;
}

function handleMainScroll(player, gui, scroll) {
    if (scroll == null || scroll.getID() != ACTION_SCROLL_ID) return true;
    var item = getActiveLoaderItem(player);
    if (item == null || item.isEmpty()) {
        setStatus(gui, "Loader item is missing.");
        return true;
    }

    var selected = getSelectedIndex(scroll);
    if (selected === 0) {
        downloadNpcPackage(player, item, gui);
        return true;
    } else if (selected === 1) {
        return openPreviewGui(player, item, gui);
    } else if (selected === 2) {
        clearDownloadedPackage(item, player);
        setStatus(gui, "Downloaded package cleared.");
        return true;
    }
    return true;
}

function downloadNpcPackage(player, item, gui) {
    var url = trimString(getGuiText(gui, URL_FIELD_ID));
    var token = trimString(getGuiText(gui, TOKEN_FIELD_ID));
    if (!hasText(url)) {
        setStatus(gui, "Paste a GitHub URL.");
        return;
    }

    var pkg = loadNpcPackage(url, token);
    writeDownloadedPackage(item, pkg, url);
    player.getStoreddata().put(PLAYER_TOKEN_KEY, token);
    setStatus(gui, buildPackageStatus(pkg));
    player.message("GitHub Loader: package downloaded.");
}

function openPreviewGui(player, item, gui) {
    var pkg = getDownloadedPackage(item);
    if (pkg == null) {
        setStatus(gui, "Download a package first.");
        return true;
    }
    player.showCustomGui(createPreviewGui(player, pkg));
    return false;
}

function createPreviewGui(player, pkg) {
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(PREVIEW_GUI_ID, 540, 310, false, player);
    gui.addLabel(1, "Package Preview", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 520, 34, 0x5C8DFF, 1.5);
    gui.addLabel(10, "Files", 10, 42, 80, 14, 0xE0E0E0);
    gui.addScroll(PREVIEW_SCROLL_ID, 10, 58, 190, 206, buildPreviewEntries(pkg));
    gui.addScroll(PREVIEW_BACK_ID, 10, 272, 190, 24, ["Back"]);
    gui.addLabel(11, "Code", 210, 42, 80, 14, 0xE0E0E0);
    gui.addTextArea(PREVIEW_STATUS_ID, 210, 58, 320, 28);
    gui.addTextArea(PREVIEW_CODE_ID, 210, 92, 320, 204);
    renderPreview(gui, pkg, 0);
    return gui;
}

function handlePreviewScroll(player, gui, scroll) {
    if (scroll == null) return true;
    if (scroll.getID() == PREVIEW_BACK_ID) {
        var item = getActiveLoaderItem(player);
        if (item != null && !item.isEmpty()) player.showCustomGui(createMainGui(player, item));
        return false;
    }
    if (scroll.getID() != PREVIEW_SCROLL_ID) return true;

    var item = getActiveLoaderItem(player);
    var pkg = item == null ? null : getDownloadedPackage(item);
    if (pkg == null) {
        setPreviewStatus(gui, "No downloaded package.");
        setPreviewCode(gui, "");
        return true;
    }
    renderPreview(gui, pkg, getSelectedIndex(scroll));
    return true;
}

function renderPreview(gui, pkg, index) {
    var files = getPreviewFiles(pkg);
    if (files.length === 0) {
        setPreviewStatus(gui, "Preview is empty.");
        setPreviewCode(gui, "");
        return;
    }

    if (index < 0 || index >= files.length) index = 0;
    var file = files[index];
    var code = file.body == null ? "" : "" + file.body;
    setPreviewStatus(gui, file.kind + " | " + file.relativePath + " | chars=" + code.length);
    setPreviewCode(gui, code.length > 12000 ? code.substring(0, 12000) + "\n\n// --- preview truncated ---" : (hasText(code) ? code : "// Empty file"));
}

function buildPreviewEntries(pkg) {
    var files = getPreviewFiles(pkg);
    var entries = [];
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        entries.push("[" + file.kind + "] " + file.relativePath);
    }
    return entries.length > 0 ? entries : ["No files"];
}

function getPreviewFiles(pkg) {
    var out = [];
    appendPreviewFiles(out, pkg == null ? null : pkg.hooks, "hook");
    appendPreviewFiles(out, pkg == null ? null : pkg.shared, "shared");
    return out;
}

function appendPreviewFiles(out, files, kind) {
    if (files == null) return;
    for (var i = 0; i < files.length; i++) {
        out.push({
            kind: kind,
            relativePath: files[i].relativePath,
            body: files[i].body
        });
    }
}

function applyPackageToNpc(player, npc, item) {
    if (!isNpcTarget(npc)) {
        player.message("GitHub Loader: target is not a CustomNPC.");
        var targetInfo = describeTarget(npc);
        if (hasText(targetInfo)) player.message("GitHub Loader: " + targetInfo);
        return;
    }

    var pkg = getDownloadedPackage(item);
    if (pkg == null) {
        player.message("GitHub Loader: download a package first.");
        return;
    }

    var storeddataWritten = false;
    var hooksStored = 0;
    var scriptResult = { attempted: false, written: 0, error: "" };
    try {
        var data = npc.getStoreddata();
        data.put("__github_loader_package", JSON.stringify({
            sourceUrl: pkg.sourceUrl,
            owner: pkg.owner,
            repo: pkg.repo,
            ref: pkg.ref,
            rootPath: pkg.rootPath
        }));
        data.put("__shared", buildNpcSharedFactory(pkg.shared));
        writeNpcHooks(data, pkg.hooks);
        storeddataWritten = true;
        hooksStored = pkg.hooks.length;
    } catch (e) {
        player.message("GitHub Loader: failed to write NPC storeddata: " + e);
        return;
    }

    scriptResult = writeNpcScriptTabs(npc, pkg.hooks);
    try {
        npc.updateClient();
    } catch (e) {}

    var parts = [];
    if (storeddataWritten) parts.push("storeddata written");
    if (hooksStored > 0) parts.push("hooks=" + hooksStored);
    if (scriptResult.attempted) {
        if (scriptResult.written > 0) {
            parts.push("script tabs written=" + scriptResult.written);
        } else {
            parts.push("script tabs not written");
        }
    } else {
        parts.push("direct script tabs unavailable");
    }
    player.message("GitHub Loader: " + parts.join(", ") + ".");
    if (hasText(scriptResult.error)) player.message("GitHub Loader: script tab error: " + scriptResult.error);
}

function writeNpcHooks(data, hooks) {
    var oldCount = parseIntSafe(data.get("github_loader_hook_count"), 0);
    for (var i = 0; i < oldCount; i++) {
        data.remove("github_loader_hook_" + i + "_name");
        data.remove("github_loader_hook_" + i + "_path");
        data.remove("github_loader_hook_" + i + "_body");
    }
    for (var j = 0; j < hooks.length; j++) {
        data.put("github_loader_hook_" + j + "_name", hooks[j].hook);
        data.put("github_loader_hook_" + j + "_path", hooks[j].relativePath);
        data.put("github_loader_hook_" + j + "_body", hooks[j].body);
    }
    data.put("github_loader_hook_count", "" + hooks.length);
}

function writeNpcScriptTabs(npc, hooks) {
    var result = { attempted: false, written: 0, error: "" };
    try {
        var handler = getNpcScriptHandler(npc);
        if (handler == null || handler.scripts == null) {
            result.error = "script handler is unavailable";
            return result;
        }
        result.attempted = true;
        var scripts = handler.scripts;
        for (var i = 0; i < hooks.length; i++) {
            var slot = hookIndex(hooks[i].hook);
            if (slot < 0) continue;
            var container = typeof scripts[slot] != "undefined" ? scripts[slot] : null;
            if (container == null && scripts.get != null) container = scripts.get(slot);
            if (container == null) continue;
            container.script = hooks[i].body;
            container.fullscript = hooks[i].body;
            result.written++;
        }
        handler.enabled = true;
        if (handler.saveScriptData != null) handler.saveScriptData();
        if (handler.loadScriptData != null) handler.loadScriptData();
        return result;
    } catch (e) {
        result.error = "" + e;
    }
    return result;
}

function buildNpcSharedFactory(sharedFiles) {
    var source = "(function(event){\n";
    source += "var __modules={};\n";
    source += "function __define(id,fn){__modules[id]={fn:fn,exports:{},loaded:false};}\n";
    source += "function __require(id){var m=__modules[id];if(!m)throw 'Missing shared module '+id;if(!m.loaded){m.loaded=true;var module={exports:m.exports};m.fn(module,module.exports,__require,event);m.exports=module.exports;}return m.exports;}\n";
    for (var i = 0; i < sharedFiles.length; i++) {
        var id = sharedFiles[i].relativePath.substring("shared/".length);
        source += "__define(" + JSON.stringify(id) + ",function(module,exports,require,event){\n";
        source += sharedFiles[i].body + "\n});\n";
    }
    source += "var shared={};\n";
    for (var j = 0; j < sharedFiles.length; j++) {
        var name = sharedFiles[j].relativePath.substring(sharedFiles[j].relativePath.lastIndexOf("/") + 1).replace(/\.js$/i, "");
        source += "shared[" + JSON.stringify(name) + "]=__require(" + JSON.stringify(sharedFiles[j].relativePath.substring("shared/".length)) + ");\n";
    }
    source += "return shared;\n";
    source += "})";
    return source;
}

function loadNpcPackage(url, token) {
    var parsed = parseGithubTarget(url);
    var ref = resolveGithubRef(parsed, token);
    var tree = fetchRepoTree(parsed.owner, parsed.repo, ref, token);
    var rootPath = resolvePackageRoot(parsed.path, tree);
    var hooks = collectPackageFiles(parsed.owner, parsed.repo, token, tree, rootPath, "hooks/");
    var shared = collectPackageFiles(parsed.owner, parsed.repo, token, tree, rootPath, "shared/");

    if (hooks.length === 0) throw "Package has no hook files";
    for (var i = 0; i < hooks.length; i++) {
        hooks[i].hook = detectHookName(hooks[i].relativePath);
        if (!hasText(hooks[i].hook)) throw "Unsupported hook file: " + hooks[i].relativePath;
        validateScript(hooks[i].body, hooks[i].relativePath);
    }
    sortHooks(hooks);
    for (var j = 0; j < shared.length; j++) validateScript(shared[j].body, shared[j].relativePath);

    return {
        sourceUrl: url,
        owner: parsed.owner,
        repo: parsed.repo,
        ref: ref,
        rootPath: rootPath,
        hooks: hooks,
        shared: shared
    };
}

function resolvePackageRoot(requestedPath, tree) {
    var requested = normalizePath(requestedPath);
    if (hasText(requested)) return requested;

    var roots = {};
    for (var i = 0; i < tree.length; i++) {
        var entry = tree[i];
        if (entry == null || trimString(entry.type) != "blob") continue;
        var path = normalizePath(entry.path);
        var marker = path.indexOf("/hooks/");
        if (marker >= 0 && /\.js$/i.test(path)) roots[path.substring(0, marker)] = true;
        if (path.indexOf("hooks/") === 0 && /\.js$/i.test(path)) roots[""] = true;
    }

    var keys = objectKeys(roots);
    if (keys.length === 1) return keys[0];
    return "";
}

function collectPackageFiles(owner, repo, token, tree, rootPath, folder) {
    var files = [];
    var prefix = hasText(rootPath) ? (rootPath + "/" + folder) : folder;
    for (var i = 0; i < tree.length; i++) {
        var entry = tree[i];
        var path = entry == null ? "" : normalizePath(entry.path);
        if (trimString(entry == null ? "" : entry.type) != "blob") continue;
        if (path.indexOf(prefix) !== 0 || !/\.js$/i.test(path)) continue;
        files.push({
            relativePath: hasText(rootPath) ? path.substring(rootPath.length + 1) : path,
            body: fetchBlobText(owner, repo, trimString(entry.sha), token)
        });
    }
    files.sort(function(a, b) {
        return a.relativePath < b.relativePath ? -1 : (a.relativePath > b.relativePath ? 1 : 0);
    });
    return files;
}

function sortHooks(hooks) {
    hooks.sort(function(a, b) {
        return hookIndex(a.hook) - hookIndex(b.hook);
    });
}

function detectHookName(relativePath) {
    var match = normalizePath(relativePath).match(/^hooks\/([^\/]+)\.js$/i);
    if (match == null) return "";
    for (var i = 0; i < HOOK_ORDER.length; i++) if (HOOK_ORDER[i].toLowerCase() == trimString(match[1]).toLowerCase()) return HOOK_ORDER[i];
    return "";
}

function hookIndex(name) {
    for (var i = 0; i < HOOK_ORDER.length; i++) if (HOOK_ORDER[i] == name) return i;
    return -1;
}

function buildPackageStatus(pkg) {
    if (pkg == null) {
        return "Downloaded: no";
    }
    return [
        "Downloaded: yes",
        "Repo: " + pkg.owner + "/" + pkg.repo + "@" + pkg.ref,
        "Path: " + (hasText(pkg.rootPath) ? pkg.rootPath : "/"),
        "Hooks: " + pkg.hooks.length,
        "Shared: " + pkg.shared.length
    ].join("\n");
}

function writeDownloadedPackage(item, pkg, url) {
    var tag = getTag(item);
    tag.putString(ITEM_LAST_URL_KEY, url);
    tag.putString(ITEM_DOWNLOADED_PACKAGE_KEY, encodeText(JSON.stringify(pkg)));
    writeTag(item, tag);
}

function getDownloadedPackage(item) {
    if (item == null || item.isEmpty()) return null;
    var encoded = readTag(getTag(item), ITEM_DOWNLOADED_PACKAGE_KEY);
    if (!hasText(encoded)) return null;
    return JSON.parse(decodeText(encoded));
}

function clearDownloadedPackage(item, player) {
    var tag = getTag(item);
    tag.putString(ITEM_DOWNLOADED_PACKAGE_KEY, "");
    writeTag(item, tag);
    try {
        player.updatePlayerInventory();
    } catch (e) {}
}

function writeLastUrl(item, url) {
    var tag = getTag(item);
    tag.putString(ITEM_LAST_URL_KEY, url);
    writeTag(item, tag);
}

function rememberActiveItem(player, item) {
    player.getTempdata().put(PLAYER_ACTIVE_ITEM_KEY, item);
}

function getActiveLoaderItem(player) {
    var item = null;
    try {
        item = player.getTempdata().get(PLAYER_ACTIVE_ITEM_KEY);
    } catch (e) {}
    if (isLoaderItem(item)) return item;
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

function isNpcTarget(target) {
    if (target == null) return false;
    try {
        return getNpcScriptHandler(target) != null;
    } catch (e) {
        return false;
    }
}

function getNpcScriptHandler(target) {
    if (target == null) return null;
    try {
        if (target.getMCEntity == null && target.mCEntity == null) return null;
        if (target.getStoreddata == null) return null;
        if (target.updateClient == null) return null;
        var mcEntity = target.getMCEntity != null ? target.getMCEntity() : target.mCEntity;
        if (mcEntity == null || mcEntity.script == null || mcEntity.script.scripts == null) return null;
        return mcEntity.script;
    } catch (e) {
        return null;
    }
}

function describeTarget(target) {
    if (target == null) return "";
    var parts = [];
    try {
        if (target.getClass != null) parts.push("class=" + target.getClass().getName());
    } catch (e1) {}
    try {
        if (target.getName != null) parts.push("name=" + target.getName());
    } catch (e2) {}
    try {
        if (target.getType != null) parts.push("type=" + target.getType());
    } catch (e3) {}
    return parts.join(", ");
}

function isLoaderItem(item) {
    if (item == null || item.isEmpty()) return false;
    return readTag(getTag(item), "item_type") == ITEM_TYPE;
}

function getTag(item) {
    try {
        var customData = item.getMCItemStack().get(GitLoader_DataComponents.CUSTOM_DATA);
        if (customData != null) return customData.copyTag();
    } catch (e) {}
    return new GitLoader_CompoundTag();
}

function writeTag(item, tag) {
    item.getMCItemStack().set(GitLoader_DataComponents.CUSTOM_DATA, GitLoader_CustomData.of(tag));
}

function parseGithubTarget(url) {
    var clean = trimString(url).replace(/^https?:\/\/www\.github\.com\//i, "https://github.com/").replace(/\/+$/, "");
    var match = clean.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/(.*))?$/i);
    if (match == null) throw "Only github.com URLs are supported";

    var owner = trimString(match[1]);
    var repo = trimString(match[2]).replace(/\.git$/i, "");
    var tail = trimString(match[3]);
    var ref = "";
    var path = "";
    if (hasText(tail)) {
        var parts = tail.split("/");
        if (parts[0] == "tree" || parts[0] == "blob") {
            ref = trimString(parts[1]);
            path = parts.slice(2).join("/");
        } else {
            path = parts.join("/");
        }
    }
    return { owner: owner, repo: repo, ref: ref, path: normalizePath(path) };
}

function resolveGithubRef(parsed, token) {
    if (hasText(parsed.ref)) return parsed.ref;
    var repoInfo = fetchJson("https://api.github.com/repos/" + parsed.owner + "/" + parsed.repo, token);
    return hasText(repoInfo.default_branch) ? trimString(repoInfo.default_branch) : "main";
}

function fetchRepoTree(owner, repo, ref, token) {
    var url = "https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + encodeQuery(ref) + "?recursive=1";
    var json = fetchJson(url, token);
    return json != null && isArray(json.tree) ? json.tree : [];
}

function fetchJson(url, token) {
    return JSON.parse(fetchText(url, token));
}

function fetchText(url, token) {
    var conn = null;
    var reader = null;
    try {
        conn = new GitLoader_URL(url).openConnection();
        conn.setRequestProperty("User-Agent", "CustomNpc-GitHubLoader");
        conn.setRequestProperty("Accept", "application/vnd.github+json");
        if (hasText(token) && url.indexOf("https://api.github.com/") === 0) conn.setRequestProperty("Authorization", "Bearer " + token);
        reader = new GitLoader_BufferedReader(new GitLoader_InputStreamReader(conn.getInputStream(), "UTF-8"));
        var out = new GitLoader_StringBuilder();
        var line;
        while ((line = reader.readLine()) != null) out.append(line).append("\n");
        return "" + out.toString();
    } catch (e) {
        try {
            throw "HTTP " + conn.getResponseCode();
        } catch (ignored) {
            throw "" + e;
        }
    } finally {
        try {
            if (reader != null) reader.close();
        } catch (e2) {}
    }
}

function fetchBlobText(owner, repo, sha, token) {
    var json = fetchJson("https://api.github.com/repos/" + owner + "/" + repo + "/git/blobs/" + encodeQuery(sha), token);
    if (trimString(json.encoding).toLowerCase() != "base64") throw "Unsupported blob encoding";
    return decodeBase64(trimString(json.content).replace(/\s+/g, ""));
}

function validateScript(source, label) {
    try {
        (1, eval)("(function(){\n" + source + "\n})");
    } catch (e) {
        throw "Invalid `" + label + "`";
    }
}

function encodeText(text) {
    var bytes = new java.lang.String(text == null ? "" : "" + text).getBytes(GitLoader_StandardCharsets.UTF_8);
    return "" + GitLoader_Base64.getEncoder().encodeToString(bytes);
}

function decodeText(text) {
    var bytes = GitLoader_Base64.getDecoder().decode(trimString(text));
    return "" + new java.lang.String(bytes, GitLoader_StandardCharsets.UTF_8);
}

function decodeBase64(text) {
    var bytes = GitLoader_Base64.getDecoder().decode(text);
    return "" + new java.lang.String(bytes, GitLoader_StandardCharsets.UTF_8);
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function getSelectedIndex(scroll) {
    var selection = scroll.getSelection();
    return selection != null && selection.length > 0 ? selection[0] : -1;
}

function getGuiText(gui, id) {
    var component = gui.getComponent(id);
    if (component == null) return "";
    if (component.getText != null) return "" + component.getText();
    return component.text == null ? "" : "" + component.text;
}

function setGuiText(gui, id, text) {
    var component = gui.getComponent(id);
    if (component != null && component.setText != null) component.setText(text == null ? "" : "" + text);
}

function setStatus(gui, text) {
    setGuiText(gui, STATUS_ID, text);
}

function setPreviewStatus(gui, text) {
    setGuiText(gui, PREVIEW_STATUS_ID, text);
}

function setPreviewCode(gui, text) {
    setGuiText(gui, PREVIEW_CODE_ID, text);
}

function safeUpdate(gui) {
    try {
        gui.update();
    } catch (e) {}
}

function encodeQuery(value) {
    return ("" + GitLoader_URLEncoder.encode("" + value, "UTF-8")).replace(/\+/g, "%20");
}

function normalizePath(value) {
    return trimString(value).replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
}

function objectKeys(obj) {
    var keys = [];
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) keys.push(key);
    return keys;
}

function isArray(value) {
    return Object.prototype.toString.call(value) == "[object Array]";
}

function parseIntSafe(value, fallback) {
    var parsed = parseInt(trimString(value), 10);
    return isNaN(parsed) ? fallback : parsed;
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}
