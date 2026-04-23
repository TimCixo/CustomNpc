var GitLoader_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var GitLoader_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var GitLoader_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var GitLoader_ItemLore = Java.type("net.minecraft.world.item.component.ItemLore");
var GitLoader_Component = Java.type("net.minecraft.network.chat.Component");
var GitLoader_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var GitLoader_ArrayList = Java.type("java.util.ArrayList");
var GitLoader_URL = Java.type("java.net.URL");
var GitLoader_URLEncoder = Java.type("java.net.URLEncoder");
var GitLoader_InputStreamReader = Java.type("java.io.InputStreamReader");
var GitLoader_BufferedReader = Java.type("java.io.BufferedReader");
var GitLoader_StringBuilder = Java.type("java.lang.StringBuilder");
var GitLoader_Base64 = Java.type("java.util.Base64");
var GitLoader_StandardCharsets = Java.type("java.nio.charset.StandardCharsets");

var ITEM_TYPE = "github_npc_loader_tool";
var ITEM_STAGE_KEY = "github_loader_stage";
var ITEM_LAST_URL_KEY = "github_loader_last_url";
var ITEM_INSTALLED_INIT_KEY = "github_loader_installed_init";
var ITEM_INSTALLED_INTERACT_KEY = "github_loader_installed_interact";
var ITEM_INSTALLED_SHARED_KEY = "github_loader_installed_shared";
var PLAYER_ACTIVE_ITEM_KEY = "github_loader_active_item";
var PLAYER_TOKEN_KEY = "github_loader_token";

var GUI_ID = 9321;
var ACTION_SCROLL_ID = 9322;
var URL_FIELD_ID = 9323;
var STATUS_ID = 9324;
var TOKEN_FIELD_ID = 9326;
var ACTIONS = ["Install", "Cancel"];

function interact(event) {
    var item = event.item;
    var player = event.player;
    ensureInstallerItem(item);
    rememberActiveItem(player, item);
    player.showCustomGui(createInstallerGui(player, item));
    event.setCanceled(true);
}

function customGuiScroll(event) {
    if (event.gui == null || event.gui.getID() != GUI_ID) return;
    if (event.scroll == null || event.scroll.getID() != ACTION_SCROLL_ID) return;

    var player = event.player;
    var item = getActiveLoaderItem(player);
    if (item == null || item.isEmpty()) {
        setStatus(event.gui, "Loader item is missing.");
        safeUpdate(event.gui);
        return;
    }

    var selected = getSelectedIndex(event.scroll);
    if (selected === 0) {
        installReadyFirmware(player, item, event.gui);
    } else if (selected === 1) {
        player.closeGui();
        return;
    } else {
        setStatus(event.gui, "Unknown action.");
    }
    safeUpdate(event.gui);
}

function customGuiClosed(event) {
    if (event.gui == null || event.gui.getID() != GUI_ID) return;
    var item = getActiveLoaderItem(event.player);
    if (item == null || item.isEmpty()) return;
    writeLastUrl(item, trimString(getGuiText(event.gui, URL_FIELD_ID)));
    event.player.getStoreddata().put(PLAYER_TOKEN_KEY, trimString(getGuiText(event.gui, TOKEN_FIELD_ID)));
}

function createInstallerGui(player, item) {
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(GUI_ID, 360, 272, false, player);
    gui.addLabel(1, "GitHub Loader Installer", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 340, 34, 0x5C8DFF, 1.5);
    gui.addLabel(10, "GitHub URL", 10, 42, 100, 14, 0xE0E0E0);
    gui.addTextField(URL_FIELD_ID, 10, 58, 340, 20);
    gui.addLabel(11, "GitHub Token", 10, 84, 100, 14, 0xE0E0E0);
    gui.addTextField(TOKEN_FIELD_ID, 10, 100, 340, 20);
    gui.addLabel(12, "Actions", 10, 130, 80, 14, 0xE0E0E0);
    gui.addScroll(ACTION_SCROLL_ID, 10, 146, 90, 52, ACTIONS);
    gui.addLabel(13, "Status", 110, 130, 80, 14, 0xE0E0E0);
    gui.addTextArea(STATUS_ID, 110, 146, 240, 98);

    setGuiText(gui, URL_FIELD_ID, readTag(getTag(item), ITEM_LAST_URL_KEY));
    setGuiText(gui, TOKEN_FIELD_ID, readPlayerToken(player));
    setStatus(gui, "Installer ready.");
    return gui;
}

function installReadyFirmware(player, item, gui) {
    var repoUrl = trimString(getGuiText(gui, URL_FIELD_ID));
    var token = trimString(getGuiText(gui, TOKEN_FIELD_ID));
    if (!hasText(repoUrl)) {
        setStatus(gui, "Paste a GitHub URL.");
        return;
    }

    var loader = downloadLoaderPayload(repoUrl, token);
    rewriteItemScripts(item, loader);
    writeInstalledData(item, loader, repoUrl);
    eventlessWriteItem(item, player);
    player.getStoreddata().put(PLAYER_TOKEN_KEY, token);
    setStatus(gui, "Installed. Reopen the item.");
    player.message("GitHub Loader: installer switched item to ready mode.");
    player.closeGui();
}

function downloadLoaderPayload(repoUrl, token) {
    var parsed = parseGithubTarget(repoUrl);
    var ref = resolveGithubRef(parsed, token);
    var tree = fetchRepoTree(parsed.owner, parsed.repo, ref, token);
    var root = locateLoaderRoot(tree, parsed.path);
    var initSource = fetchRequiredLoaderFile(parsed, token, tree, root, "hooks/init.js");
    var interactSource = fetchRequiredLoaderFile(parsed, token, tree, root, "hooks/interact.js");
    var sharedFiles = fetchLoaderSharedFiles(parsed, token, tree, root);

    validateScript(initSource, "hooks/init.js");
    validateScript(interactSource, "hooks/interact.js");
    for (var i = 0; i < sharedFiles.length; i++) validateScript(sharedFiles[i].body, sharedFiles[i].path);

    return {
        initSource: initSource,
        interactSource: interactSource,
        sharedFiles: sharedFiles
    };
}

function locateLoaderRoot(tree, requestedPath) {
    var requested = normalizePath(requestedPath);
    if (requested == "github_loader" || requested.indexOf("github_loader/") === 0) return "github_loader";

    for (var i = 0; i < tree.length; i++) {
        var entry = tree[i];
        if (entry != null && normalizePath(entry.path).indexOf("github_loader/") === 0) return "github_loader";
    }
    throw "github_loader folder not found";
}

function fetchRequiredLoaderFile(parsed, token, tree, root, relativePath) {
    var fullPath = root + "/" + relativePath;
    var sha = findTreeSha(tree, fullPath);
    if (!hasText(sha)) throw "Missing `" + fullPath + "`";
    return fetchBlobText(parsed.owner, parsed.repo, sha, token);
}

function fetchLoaderSharedFiles(parsed, token, tree, root) {
    var files = [];
    var prefix = root + "/shared/";
    for (var i = 0; i < tree.length; i++) {
        var entry = tree[i];
        var path = entry == null ? "" : normalizePath(entry.path);
        if (trimString(entry == null ? "" : entry.type) != "blob") continue;
        if (path.indexOf(prefix) !== 0 || !/\.js$/i.test(path)) continue;
        files.push({
            path: path.substring(root.length + 1),
            body: fetchBlobText(parsed.owner, parsed.repo, trimString(entry.sha), token)
        });
    }
    files.sort(function(a, b) {
        return a.path < b.path ? -1 : (a.path > b.path ? 1 : 0);
    });
    if (files.length === 0) throw "Loader shared files are missing";
    return files;
}

function rewriteItemScripts(item, loader) {
    setScriptSource(item, 0, loader.initSource);
    setScriptSource(item, 2, loader.interactSource);
    setScriptSource(item, 48, loader.interactSource);
    setScriptSource(item, 51, loader.interactSource);
    item.enabled = true;
    item.saveScriptData();
}

function writeInstalledData(item, loader, repoUrl) {
    var tag = getTag(item);
    tag.putString("item_type", ITEM_TYPE);
    tag.putString(ITEM_STAGE_KEY, "ready");
    tag.putString(ITEM_LAST_URL_KEY, repoUrl);
    tag.putString(ITEM_INSTALLED_INIT_KEY, encodeText(loader.initSource));
    tag.putString(ITEM_INSTALLED_INTERACT_KEY, encodeText(loader.interactSource));
    tag.putString(ITEM_INSTALLED_SHARED_KEY, encodeText(JSON.stringify(loader.sharedFiles)));
    writeTag(item, tag);
}

function ensureInstallerItem(item) {
    var tag = getTag(item);
    if (!hasText(readTag(tag, "item_type"))) tag.putString("item_type", ITEM_TYPE);
    if (!hasText(readTag(tag, ITEM_STAGE_KEY))) tag.putString(ITEM_STAGE_KEY, "installer");
    if (!hasText(readTag(tag, ITEM_LAST_URL_KEY))) tag.putString(ITEM_LAST_URL_KEY, "");
    writeTag(item, tag);
    applyInstallerPresentation(item);
}

function applyInstallerPresentation(item) {
    var mcStack = item.getMCItemStack();
    mcStack.set(GitLoader_DataComponents.MAX_STACK_SIZE, java.lang.Integer.valueOf(1));
    mcStack.set(GitLoader_DataComponents.CUSTOM_NAME, GitLoader_Component.literal("GitHub Loader Installer"));
    mcStack.set(GitLoader_DataComponents.LORE, new GitLoader_ItemLore(buildLore([
        "Installer stage.",
        "Use Install to write ready firmware into this item."
    ])));
    try {
        item.setCustomName("GitHub Loader Installer");
        item.setTexture(1, "minecraft:oak_sapling");
        item.setMaxStackSize(1);
        item.setDurabilityShow(false);
    } catch (e) {}
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

function eventlessWriteItem(item, player) {
    try {
        player.updatePlayerInventory();
    } catch (e) {}
}

function setScriptSource(item, index, source) {
    var container = item.scripts[index];
    if (container == null && item.scripts.get != null) container = item.scripts.get(index);
    if (container == null) throw "Missing script slot " + index;
    container.script = source;
    container.fullscript = source;
    try {
        container.errored = false;
    } catch (e) {}
}

function buildLore(lines) {
    var lore = new GitLoader_ArrayList();
    for (var i = 0; i < lines.length; i++) lore.add(GitLoader_Component.literal(lines[i]));
    return lore;
}

function writeLastUrl(item, url) {
    var tag = getTag(item);
    tag.putString(ITEM_LAST_URL_KEY, url);
    writeTag(item, tag);
}

function readPlayerToken(player) {
    return trimString(player.getStoreddata().get(PLAYER_TOKEN_KEY));
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

function findTreeSha(tree, fullPath) {
    var wanted = normalizePath(fullPath);
    for (var i = 0; i < tree.length; i++) {
        var entry = tree[i];
        if (entry != null && normalizePath(entry.path) == wanted) return trimString(entry.sha);
    }
    return "";
}

function fetchJson(url, token) {
    return JSON.parse(fetchText(url, token));
}

function fetchText(url, token) {
    var conn = null;
    var reader = null;
    try {
        conn = new GitLoader_URL(url).openConnection();
        conn.setRequestProperty("User-Agent", "CustomNpc-GitHubLoaderInstaller");
        conn.setRequestProperty("Accept", "application/vnd.github+json");
        if (hasText(token) && url.indexOf("https://api.github.com/") === 0) {
            conn.setRequestProperty("Authorization", "Bearer " + token);
        }
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

function isArray(value) {
    return Object.prototype.toString.call(value) == "[object Array]";
}

function trimString(value) {
    return ("" + value).replace(/^\s+|\s+$/g, "");
}

function hasText(value) {
    return value != null && trimString(value).length > 0;
}
