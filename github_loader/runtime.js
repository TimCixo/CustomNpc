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
var GitLoader_MCCompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var GitLoader_MCListTag = Java.type("net.minecraft.nbt.ListTag");

var GIT_LOADER_ITEM_TYPE = "github_npc_loader_tool";
var GIT_LOADER_SESSION_KEY = "github_npc_loader_session_id";
var GIT_LOADER_LAST_URL_KEY = "github_npc_loader_last_url";
var GIT_LOADER_BUNDLE_KEY = "github_npc_loader_bundle";
var GIT_LOADER_HOOKS_KEY = "github_npc_loader_hooks";
var GIT_LOADER_PACKAGE_KEY = "github_npc_loader_package";
var GIT_LOADER_ACTIVE_SESSION_KEY = "github_npc_loader_active_session";
var GIT_LOADER_GUI_URL_PREFIX = "github_npc_loader_url_";
var GIT_LOADER_GUI_LAST_URL_KEY = "github_npc_loader_last_url";
var GIT_LOADER_GUI_TOKEN_KEY = "github_npc_loader_github_token";
var GIT_LOADER_TEMP_BUNDLE_PREFIX = "github_npc_loader_bundle_";
var GIT_LOADER_TEMP_HOOKS_PREFIX = "github_npc_loader_hooks_";
var GIT_LOADER_TEMP_PACKAGE_PREFIX = "github_npc_loader_package_";
var GIT_LOADER_STORED_BUNDLE_PREFIX = "github_npc_loader_bundle_";
var GIT_LOADER_STORED_HOOKS_PREFIX = "github_npc_loader_hooks_";
var GIT_LOADER_STORED_PACKAGE_PREFIX = "github_npc_loader_package_";
var GIT_LOADER_LAST_TEMP_BUNDLE_KEY = "github_npc_loader_last_bundle";
var GIT_LOADER_LAST_TEMP_HOOKS_KEY = "github_npc_loader_last_hooks";
var GIT_LOADER_LAST_TEMP_PACKAGE_KEY = "github_npc_loader_last_package";
var GIT_LOADER_LAST_STORED_BUNDLE_KEY = "github_npc_loader_last_bundle";
var GIT_LOADER_LAST_STORED_HOOKS_KEY = "github_npc_loader_last_hooks";
var GIT_LOADER_LAST_STORED_PACKAGE_KEY = "github_npc_loader_last_package";
var GIT_LOADER_NPC_SHARED_SOURCES_KEY = "github_npc_loader_shared_sources";
var GIT_LOADER_NPC_SHARED_ENTRY_KEY = "__shared";
var GIT_LOADER_MAX_SCRIPT_CHARS = 65000;
var GIT_LOADER_HTTP_RETRIES = 4;
var GIT_LOADER_HTTP_RETRY_DELAY_MS = 350;

var GIT_LOADER_GUI_ID = 9321;
var GIT_LOADER_ACTION_SCROLL_ID = 9322;
var GIT_LOADER_URL_FIELD_ID = 9323;
var GIT_LOADER_STATUS_ID = 9324;
var GIT_LOADER_TOKEN_FIELD_ID = 9326;
var GIT_LOADER_PREVIEW_GUI_ID = 9325;
var GIT_LOADER_PREVIEW_SCROLL_ID = 9329;
var GIT_LOADER_PREVIEW_STATUS_ID = 9327;
var GIT_LOADER_PREVIEW_CODE_ID = 9328;
var GIT_LOADER_ACTIONS = ["Load", "Preview", "Clear"];

var GIT_LOADER_SUPPORTED_FILES = {
    "init.js": "init",
    "interact.js": "interact",
    "timer.js": "timer",
    "attack.js": "attack",
    "target.js": "target",
    "damaged.js": "damaged",
    "died.js": "died",
    "kills.js": "kills",
    "killed.js": "killed",
    "collide.js": "collide",
    "meleeAttack.js": "meleeAttack"
};

var GIT_LOADER_HOOK_FILE_NAMES = {
    "init": "init.js",
    "interact": "interact.js",
    "timer": "timer.js",
    "attack": "attack.js",
    "target": "target.js",
    "damaged": "damaged.js",
    "died": "died.js",
    "kills": "kills.js",
    "killed": "killed.js",
    "collide": "collide.js",
    "meleeAttack": "meleeAttack.js"
};

var GIT_LOADER_HOOK_ORDER = [
    "init",
    "interact",
    "timer",
    "target",
    "attack",
    "damaged",
    "meleeAttack",
    "killed",
    "kills",
    "died",
    "collide"
];

// shared/main_ui.js
function interact(event) {
    var item = event.item;
    var player = event.player;
    var target = event.target;

    if (!isLoaderItem(item)) return;

    if (isNpcTarget(target)) {
        applyPackageToNpcFromItem(item, player, target);
        event.setCanceled(true);
        return;
    }

    rememberActiveSession(player, getSessionId(item));

    try {
        player.showCustomGui(createGui(player, item));
    } catch (e) {
        player.message("GitHub Loader: ошибка GUI. " + shortError(e));
    }

    event.setCanceled(true);
}

// shared/main_ui.js + shared/preview_ui.js
function customGuiScroll(event) {
    try {
        var gui = event.gui;
        var scroll = event.scroll;
        var player = event.player;
        if (gui == null) return;
        if (scroll == null) return;

        if (gui.getID() == GIT_LOADER_GUI_ID) {
            var sessionId = getActiveSession(player);
            if (!hasText(sessionId)) {
                setStatus(gui, "No active item session.");
                safeUpdate(gui);
                return;
            }

            if (scroll.getID() == GIT_LOADER_ACTION_SCROLL_ID) {
                handleActionScroll(player, gui, sessionId, scroll);
            } else {
                return;
            }
        } else if (gui.getID() == GIT_LOADER_PREVIEW_GUI_ID) {
            handlePreviewScroll(player, gui, scroll);
        } else {
            return;
        }

        safeUpdate(gui);
    } catch (e) {
        try {
            setStatus(event.gui, "Ошибка GUI: " + shortError(e));
            safeUpdate(event.gui);
        } catch (ignored) {}
        try {
            event.player.message("GitHub Loader: ошибка GUI. " + shortError(e));
        } catch (ignored2) {}
    }
}

// shared/main_ui.js
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

// shared/main_ui.js
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

// shared/preview_ui.js
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

// shared/git_runtime.js
function handleLoadAction(player, gui, sessionId) {
    var url = trimString(getGuiText(gui, GIT_LOADER_URL_FIELD_ID));
    var githubToken = trimString(getGuiText(gui, GIT_LOADER_TOKEN_FIELD_ID));
    if (!hasText(url)) {
        setStatus(gui, "Вставь URL репозитория или папки GitHub.");
        return;
    }

    var heldItem = getHeldLoaderItemForSession(player, sessionId);
    if (heldItem != null && !heldItem.isEmpty()) {
        updateItemLastUrl(player, heldItem, url);
    }
    player.getStoreddata().put(GIT_LOADER_GUI_URL_PREFIX + sessionId, url);
    player.getStoreddata().put(GIT_LOADER_GUI_LAST_URL_KEY, url);
    player.getStoreddata().put(GIT_LOADER_GUI_TOKEN_KEY, githubToken);

    try {
        var pkg = loadGithubPackage(url, githubToken);
        cacheLoadedPackage(player, heldItem, sessionId, pkg);

        setStatus(gui, buildLoadedStatusText(pkg, url));
        player.message("GitHub Loader: код загружен из GitHub.");
        player.message("GitHub Loader: загруженные хуки: " + joinHookNames(pkg.supportedHooks) + ".");
    } catch (e) {
        setStatus(gui, "Ошибка загрузки: " + shortError(e));
        player.message("GitHub Loader: ошибка загрузки. " + shortError(e));
    }
}

// shared/main_ui.js
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

// shared/preview_ui.js
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

function applyPackageToNpcFromItem(item, player, npc) {
    var sessionId = getSessionId(item);
    if (!hasText(sessionId)) {
        player.message("GitHub Loader: отсутствует session id.");
        return false;
    }

    var pkg = getCachedPackage(player, item, sessionId);
    if (pkg == null) {
        player.message("GitHub Loader: загруженный код не найден.");
        return false;
    }

    var result = applyPackageToNpc(pkg, npc);
    if (!result.ok) {
        player.message("GitHub Loader: ошибка применения. " + result.message);
        return false;
    }

    player.message("GitHub Loader: код применён к NPC.");
    player.message("GitHub Loader: записанные хуки: " + joinHookNames(pkg.supportedHooks) + ".");
    return true;
}

// shared/git_runtime.js
function collectGithubFiles(owner, repo, path, ref, rootPath, out, githubToken) {
    var cleanRoot = normalizeSlashes(rootPath);
    var treeUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + encodeQuery(ref) + "?recursive=1";
    var payload = fetchJson(treeUrl, githubToken);
    var tree = payload == null ? null : payload.tree;

    if (isArray(tree)) {
        for (var i = 0; i < tree.length; i++) {
            var entry = tree[i];
            if (entry == null) continue;

            var cleanPath = normalizeSlashes(entry.path);
            if (trimString(entry.type) != "blob") continue;
            if (!isJsPath(cleanPath)) continue;
            if (hasText(cleanRoot) && cleanPath != cleanRoot && cleanPath.indexOf(cleanRoot + "/") !== 0) continue;

            out.push({
                name: cleanPath.substring(cleanPath.lastIndexOf("/") + 1),
                path: cleanPath,
                relativePath: toRelativePath(cleanPath, rootPath),
                body: fetchText(buildGithubRawUrl(owner, repo, ref, cleanPath), githubToken)
            });
        }
        return;
    }

    var apiUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/contents";
    if (hasText(path)) apiUrl += "/" + encodePath(path);
    apiUrl += "?ref=" + encodeQuery(ref);
    payload = fetchJson(apiUrl, githubToken);
    if (payload != null && trimString(payload.type) == "file" && isJsPath(payload.path)) {
        out.push({
            name: trimString(payload.name),
            path: trimString(payload.path),
            relativePath: toRelativePath(payload.path, rootPath),
            body: fetchText(buildGithubRawUrl(owner, repo, ref, trimString(payload.path)), githubToken)
        });
    }
}

// shared/git_runtime.js
function buildGithubRawUrl(owner, repo, ref, path) {
    return "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + encodePath(ref) + "/" + encodePath(path);
}

function buildScriptBundle(sourceUrl, files) {
    var sections = [];
    sections.push("// GitHub NPC Loader bundle");
    sections.push("// Source: " + sourceUrl);
    sections.push("");

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        sections.push("// ===== " + file.relativePath + " =====");
        sections.push(trimTrailingWhitespace("" + file.body));
        sections.push("");
    }

    return sections.join("\n");
}

function applyPackageToNpc(pkg, npc) {
    try {
        var nbt = npc.getEntityNbt();
        if (nbt == null) {
            return { ok: false, message: "NBT NPC РЅРµРґРѕСЃС‚СѓРїРµРЅ." };
        }

        nbt.mcSetTag("Scripts", buildScriptsMcTag(pkg));
        nbt.setBoolean("ScriptEnabled", true);
        nbt.putString("ScriptLanguage", "ECMAScript");

        npc.setEntityNbt(nbt);
        npc.updateClient();

        // After NBT merge: some builds reset NPC storeddata during setEntityNbt; shared keys must survive.
        writeSharedFilesToNpc(npc, pkg);

        return { ok: true, message: "OK" };
    } catch (e) {
        return { ok: false, message: shortError(e) };
    }
}

function buildScriptsMcTag(pkg) {
    var scriptsTag = new GitLoader_MCListTag();
    var fileMap = {};

    if (pkg != null && pkg.supportedFiles != null) {
        for (var i = 0; i < pkg.supportedFiles.length; i++) {
            var file = pkg.supportedFiles[i];
            if (file == null || !hasText(file.hook)) continue;
            fileMap[file.hook] = file;
        }
    }

    for (var j = 0; j < GIT_LOADER_HOOK_ORDER.length; j++) {
        var hook = GIT_LOADER_HOOK_ORDER[j];
        var hookFile = fileMap[hook];

        if (hookFile == null) {
            scriptsTag.add(createRootScriptEntry(pkg, {
                hook: hook,
                relativePath: "",
                body: ""
            }));
        } else {
            scriptsTag.add(createRootScriptEntry(pkg, hookFile));
        }
    }

    return scriptsTag;
}

function createRootScriptEntry(pkg, file) {
    var script = buildHookScriptWithSharedBootstrap(pkg, file);
    var rootTag = new GitLoader_MCCompoundTag();
    rootTag.putString("Script", script);
    rootTag.put("Console", new GitLoader_MCListTag());
    rootTag.put("ScriptList", new GitLoader_MCListTag());
    rootTag.putString("GitHubHook", file != null && file.hook != null ? "" + file.hook : "");
    rootTag.putString("GitHubPath", file != null && file.relativePath != null ? "" + file.relativePath : "");
    return rootTag;
}

function buildHookScriptWithSharedBootstrap(pkg, file) {
    var script = file == null || file.body == null ? "" : ("" + file.body);
    if (!hasText(script)) return "";
    return trimTrailingWhitespace(script);
}

function writeSharedFilesToNpc(npc, pkg) {
    clearStoredSharedFiles(npc);
    if (npc == null || pkg == null || pkg.sharedFiles == null || pkg.sharedFiles.length == 0) return;

    var data = npc.getStoreddata();
    if (data == null) return;

    var sources = {};
    for (var i = 0; i < pkg.sharedFiles.length; i++) {
        var file = pkg.sharedFiles[i];
        if (file == null || !hasText(file.relativePath)) continue;
        if (file.isCoordinator || isSharedCoordinatorRelativePath(file.relativePath)) {
            data.put(GIT_LOADER_NPC_SHARED_ENTRY_KEY, file.body == null ? "" : ("" + file.body));
            continue;
        }
        if (!hasText(file.libraryId)) continue;

        sources[file.libraryId] = {
            path: file.relativePath,
            encodedBody: encodeBundle(file.body == null ? "" : ("" + file.body))
        };
    }

    data.put(GIT_LOADER_NPC_SHARED_SOURCES_KEY, JSON.stringify(sources));
}

function clearStoredSharedFiles(npc) {
    if (npc == null) return;

    var data = npc.getStoreddata();
    if (data == null) return;

    try {
        data.remove(GIT_LOADER_NPC_SHARED_SOURCES_KEY);
    } catch (e) {}
    try {
        data.remove(GIT_LOADER_NPC_SHARED_ENTRY_KEY);
    } catch (e1) {}
}

function getSharedLibraryId(relativePath) {
    var clean = normalizeSlashes(relativePath);
    clean = clean.replace(/^shared\//, "").replace(/\.js$/i, "");
    clean = clean.replace(/\//g, ".");
    return clean;
}

// shared/git_runtime.js
function parseGithubTarget(url) {
    var clean = trimString(url).replace(/^https?:\/\/www\.github\.com\//i, "https://github.com/");
    clean = clean.replace(/\/+$/, "");

    var match = clean.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/(.*))?$/i);
    if (match == null) throw "РџРѕРґРґРµСЂР¶РёРІР°СЋС‚СЃСЏ С‚РѕР»СЊРєРѕ URL github.com";

    var owner = trimString(match[1]);
    var repo = trimString(match[2]).replace(/\.git$/i, "");
    var tail = trimString(match[3]);
    var parts = hasText(tail) ? tail.split("/") : [];
    var ref = "";
    var path = "";

    if (parts.length > 0) {
        if (parts[0] == "tree" || parts[0] == "blob") {
            if (parts.length < 2) throw "Р’ URL GitHub РѕС‚СЃСѓС‚СЃС‚РІСѓРµС‚ РІРµС‚РєР°";
            ref = trimString(parts[1]);
            path = parts.slice(2).join("/");
        } else {
            path = parts.join("/");
        }
    }

    return {
        owner: owner,
        repo: repo,
        ref: ref,
        path: path
    };
}

// shared/git_runtime.js
function fetchJson(url, githubToken) {
    var text = fetchText(url, githubToken);
    try {
        return JSON.parse(text);
    } catch (e) {
        throw "GitHub РІРµСЂРЅСѓР» РЅРµРєРѕСЂСЂРµРєС‚РЅС‹Р№ JSON";
    }
}

// shared/git_runtime.js
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

// shared/git_runtime.js
function fetchTextOnce(url, githubToken) {
    var conn = null;
    var reader = null;
    var errorReader = null;
    try {
        conn = new GitLoader_URL(url).openConnection();
        var resolvedToken = resolveGithubToken(githubToken);
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 CustomNpc-GitHubLoader");
        conn.setRequestProperty("Accept", "application/vnd.github+json");
        if (hasText(resolvedToken) && url.indexOf("https://api.github.com/") === 0) {
            conn.setRequestProperty("Authorization", "Bearer " + resolvedToken);
        }
        conn.setRequestProperty("Connection", "close");
        conn.setUseCaches(false);
        conn.setConnectTimeout(10000);
        conn.setReadTimeout(20000);

        reader = new GitLoader_BufferedReader(new GitLoader_InputStreamReader(conn.getInputStream(), "UTF-8"));
        var out = new GitLoader_StringBuilder();
        var line;
        while ((line = reader.readLine()) != null) {
            out.append(line).append("\n");
        }
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
                while ((errorLine = errorReader.readLine()) != null) {
                    errorOut.append(errorLine).append("\n");
                }
                errorText = trimString("" + errorOut.toString());
            }
        } catch (e3) {}
        if (hasText(code)) {
            if (code == "401") {
                if (errorText.toLowerCase().indexOf("bad credentials") >= 0) {
                    throw "HTTP 401: РЅРµРІРµСЂРЅС‹Р№ GitHub token. РћР±РЅРѕРІРё РїРѕР»Рµ GitHub Token РІ GUI.";
                }
                throw "HTTP 401: GitHub РѕС‚РєР»РѕРЅРёР» Р°РІС‚РѕСЂРёР·Р°С†РёСЋ.";
            }
            if (code == "403") {
                if (errorText.toLowerCase().indexOf("rate limit") >= 0) {
                    throw "HTTP 403: GitHub API rate limit exceeded. РџРѕРґРѕР¶РґРё РЅРµРјРЅРѕРіРѕ Рё РїРѕРїСЂРѕР±СѓР№ СЃРЅРѕРІР°.";
                }
                throw "HTTP 403: GitHub Р·Р°РїСЂРµС‚РёР» РґРѕСЃС‚СѓРї. Р’РѕР·РјРѕР¶РµРЅ rate limit, РїСЂРёРІР°С‚РЅС‹Р№ СЂРµРїРѕР·РёС‚РѕСЂРёР№ РёР»Рё РІСЂРµРјРµРЅРЅР°СЏ Р±Р»РѕРєРёСЂРѕРІРєР° API.";
            }
            throw hasText(errorText)
                ? ("HTTP " + code + " РїСЂРё Р·Р°РїСЂРѕСЃРµ Рє GitHub. " + shortError(errorText))
                : ("HTTP " + code + " РїСЂРё Р·Р°РїСЂРѕСЃРµ Рє GitHub");
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

// shared/git_runtime.js
function shouldRetryHttpError(errorText, attempt) {
    if (attempt >= GIT_LOADER_HTTP_RETRIES) return false;

    var text = trimString("" + errorText).toLowerCase();
    if (text.indexOf("connection reset") >= 0) return true;
    if (text.indexOf("unexpected end of file") >= 0) return true;
    if (text.indexOf("read timed out") >= 0) return true;
    if (text.indexOf("connect timed out") >= 0) return true;
    if (text.indexOf("http 429") >= 0) return true;
    if (text.indexOf("http 500") >= 0) return true;
    if (text.indexOf("http 502") >= 0) return true;
    if (text.indexOf("http 503") >= 0) return true;
    if (text.indexOf("http 504") >= 0) return true;
    return false;
}

// shared/git_runtime.js
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

// shared/git_runtime.js
function sleepMs(ms) {
    try {
        GitLoader_Thread.sleep(ms);
    } catch (e) {}
}

function detectHook(relativePath) {
    var clean = normalizeSlashes(relativePath);
    var fileName = clean.substring(clean.lastIndexOf("/") + 1);
    var hook = GIT_LOADER_SUPPORTED_FILES[fileName];
    return hasText(hook) ? hook : "";
}

function hookOrderIndex(hook) {
    for (var i = 0; i < GIT_LOADER_HOOK_ORDER.length; i++) {
        if (GIT_LOADER_HOOK_ORDER[i] == hook) return i;
    }
    return 999;
}

function extractHooks(files) {
    var hooks = [];
    for (var i = 0; i < files.length; i++) {
        hooks.push(files[i].hook);
    }
    return hooks;
}

function buildLoadedStatusText(pkg, fallbackUrl) {
    if (pkg == null) {
        return [
            "Загружено: нет",
            "Репо: -",
            "Папка: -",
            "Hooks: 0",
            "Shared: 0"
        ].join("\n");
    }

    var repoText = "-";
    if (hasText(pkg.owner) && hasText(pkg.repo)) {
        repoText = pkg.owner + "/" + pkg.repo;
    } else if (hasText(pkg.sourceUrl)) {
        repoText = extractRepoFromUrl(pkg.sourceUrl);
    } else if (hasText(fallbackUrl)) {
        repoText = extractRepoFromUrl(fallbackUrl);
    }

    var pathText = hasText(pkg.rootPath) ? pkg.rootPath : extractPathFromUrl(hasText(pkg.sourceUrl) ? pkg.sourceUrl : fallbackUrl);
    if (!hasText(pathText)) pathText = "/";

    var hooksCount = pkg.supportedFiles != null ? pkg.supportedFiles.length : (pkg.supportedHooks != null ? pkg.supportedHooks.length : 0);
    var sharedCount = pkg.sharedFiles != null ? countNonCoordinatorShared(pkg.sharedFiles) : 0;

    return [
        "Загружено: да",
        "Репо: " + repoText,
        "Папка: " + pathText,
        "Hooks: " + hooksCount,
        "Shared: " + sharedCount
    ].join("\n");
}

// shared/preview_ui.js
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

// shared/preview_ui.js
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

// shared/preview_ui.js
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

// shared/preview_ui.js
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

// shared/preview_ui.js
function buildPreviewMetaText(file) {
    var pathText = hasText(file.relativePath) ? file.relativePath : "(без пути)";
    var code = file.body == null ? "" : ("" + file.body);
    var lines = code.length === 0 ? 0 : code.split(/\r?\n/).length;
    var kindText = "hook";

    if (file.kind == "shared") kindText = "shared";
    if (file.kind == "shared_coordinator") kindText = "shared coordinator";

    return "Тип: " + kindText + " | Путь: " + pathText + " | Строк: " + lines + " | Символов: " + code.length;
}

// shared/preview_ui.js
function buildPreviewCodeText(file) {
    var code = file == null || file.body == null ? "" : ("" + file.body);
    if (!hasText(code)) return "// Файл пуст";
    return limitPreviewText(code, 12000);
}

// shared/preview_ui.js
function limitPreviewText(text, maxChars) {
    var code = text == null ? "" : ("" + text);
    if (code.length <= maxChars) return code;

    var tail = "\n\n// --- preview truncated ---\n// Total chars: " + code.length + "\n";
    return code.substring(0, Math.max(0, maxChars - tail.length)) + tail;
}

function extractRepoFromUrl(url) {
    try {
        var parsed = parseGithubTarget(url);
        if (hasText(parsed.owner) && hasText(parsed.repo)) {
            return parsed.owner + "/" + parsed.repo;
        }
    } catch (e) {}
    return "-";
}

function extractPathFromUrl(url) {
    try {
        var parsed = parseGithubTarget(url);
        return hasText(parsed.path) ? parsed.path : "/";
    } catch (e) {
        return "/";
    }
}

function countNonCoordinatorShared(sharedFiles) {
    var count = 0;
    if (sharedFiles == null) return count;

    for (var i = 0; i < sharedFiles.length; i++) {
        var file = sharedFiles[i];
        if (file == null || file.isCoordinator) continue;
        count++;
    }
    return count;
}

function getInitialUrl(player, item, sessionId) {
    var tag = getCustomTag(item);
    var itemUrl = tag == null ? "" : readTag(tag, GIT_LOADER_LAST_URL_KEY);
    if (hasText(itemUrl)) return itemUrl;

    var stored = trimString(player.getStoreddata().get(GIT_LOADER_GUI_URL_PREFIX + sessionId));
    if (hasStoredValue(stored)) return stored;

    try {
        stored = trimString(player.getStoreddata().get(GIT_LOADER_GUI_LAST_URL_KEY));
        return hasStoredValue(stored) ? stored : "";
    } catch (e) {
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

function updateItemLastUrl(player, item, url) {
    var tag = getCustomTag(item);
    if (tag == null) return false;

    tag.putString(GIT_LOADER_LAST_URL_KEY, trimString(url));
    return writeHeldTag(player, item, tag);
}

function cacheLoadedPackage(player, item, sessionId, pkg) {
    var encodedBundle = encodeBundle(pkg.bundleScript);
    var encodedPackage = encodePackage(pkg);
    cacheTempString(player, GIT_LOADER_TEMP_BUNDLE_PREFIX + sessionId, encodedBundle);
    cacheTempString(player, GIT_LOADER_TEMP_HOOKS_PREFIX + sessionId, joinHookNames(pkg.supportedHooks));
    cacheTempString(player, GIT_LOADER_TEMP_PACKAGE_PREFIX + sessionId, encodedPackage);
    cacheTempString(player, GIT_LOADER_LAST_TEMP_BUNDLE_KEY, encodedBundle);
    cacheTempString(player, GIT_LOADER_LAST_TEMP_HOOKS_KEY, joinHookNames(pkg.supportedHooks));
    cacheTempString(player, GIT_LOADER_LAST_TEMP_PACKAGE_KEY, encodedPackage);
    cacheStoredString(player, GIT_LOADER_STORED_BUNDLE_PREFIX + sessionId, encodedBundle);
    cacheStoredString(player, GIT_LOADER_STORED_HOOKS_PREFIX + sessionId, joinHookNames(pkg.supportedHooks));
    cacheStoredString(player, GIT_LOADER_STORED_PACKAGE_PREFIX + sessionId, encodedPackage);
    cacheStoredString(player, GIT_LOADER_LAST_STORED_BUNDLE_KEY, encodedBundle);
    cacheStoredString(player, GIT_LOADER_LAST_STORED_HOOKS_KEY, joinHookNames(pkg.supportedHooks));
    cacheStoredString(player, GIT_LOADER_LAST_STORED_PACKAGE_KEY, encodedPackage);

    if (item != null && !item.isEmpty()) {
        writeLoadedFieldsToItem(player, item, pkg);
    }
}

function writeLoadedFieldsToItem(player, item, pkg) {
    var tag = getCustomTag(item);
    if (tag == null) return false;

    tag.putString(GIT_LOADER_BUNDLE_KEY, "");
    tag.putString(GIT_LOADER_HOOKS_KEY, joinHookNames(pkg.supportedHooks));
    tag.putString(GIT_LOADER_PACKAGE_KEY, encodePackage(pkg));
    return writeHeldTag(player, item, tag);
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

    return null;
}

function getCachedPackage(player, item, sessionId) {
    var pkg = decodePackage(getTempString(player, GIT_LOADER_TEMP_PACKAGE_PREFIX + sessionId));
    if (pkg != null) {
        pkg.source = "tempdata_package";
        return pkg;
    }

    pkg = decodePackage(getStoredString(player, GIT_LOADER_STORED_PACKAGE_PREFIX + sessionId));
    if (pkg != null) {
        pkg.source = "storeddata_package";
        return pkg;
    }

    pkg = decodePackage(getTempString(player, GIT_LOADER_LAST_TEMP_PACKAGE_KEY));
    if (pkg != null) {
        pkg.source = "last_tempdata_package";
        return pkg;
    }

    pkg = decodePackage(getStoredString(player, GIT_LOADER_LAST_STORED_PACKAGE_KEY));
    if (pkg != null) {
        pkg.source = "last_storeddata_package";
        return pkg;
    }

    var bundle = "";
    var hooksText = getTempString(player, GIT_LOADER_TEMP_HOOKS_PREFIX + sessionId);
    var source = "";

    var tempEncoded = getTempString(player, GIT_LOADER_TEMP_BUNDLE_PREFIX + sessionId);
    if (hasStoredValue(tempEncoded)) {
        bundle = decodeBundle(tempEncoded);
        source = hasStoredValue(bundle) ? "tempdata" : "";
    }

    if (!hasStoredValue(bundle)) {
        var storedEncoded = getStoredString(player, GIT_LOADER_STORED_BUNDLE_PREFIX + sessionId);
        if (hasStoredValue(storedEncoded)) {
            bundle = decodeBundle(storedEncoded);
            source = hasStoredValue(bundle) ? "storeddata" : "";
        }
    }
    if (!hasStoredValue(hooksText)) {
        hooksText = getStoredString(player, GIT_LOADER_STORED_HOOKS_PREFIX + sessionId);
    }

    if (!hasStoredValue(bundle)) {
        var lastTempEncoded = getTempString(player, GIT_LOADER_LAST_TEMP_BUNDLE_KEY);
        if (hasStoredValue(lastTempEncoded)) {
            bundle = decodeBundle(lastTempEncoded);
            source = hasStoredValue(bundle) ? "last_tempdata" : "";
        }
    }
    if (!hasStoredValue(hooksText)) {
        hooksText = getTempString(player, GIT_LOADER_LAST_TEMP_HOOKS_KEY);
    }

    if (!hasStoredValue(bundle)) {
        var lastStoredEncoded = getStoredString(player, GIT_LOADER_LAST_STORED_BUNDLE_KEY);
        if (hasStoredValue(lastStoredEncoded)) {
            bundle = decodeBundle(lastStoredEncoded);
            source = hasStoredValue(bundle) ? "last_storeddata" : "";
        }
    }
    if (!hasStoredValue(hooksText)) {
        hooksText = getStoredString(player, GIT_LOADER_LAST_STORED_HOOKS_KEY);
    }

    if (!hasStoredValue(bundle) && item != null && !item.isEmpty()) {
        var tag = getCustomTag(item);
        if (tag != null) {
            pkg = decodePackage(readTag(tag, GIT_LOADER_PACKAGE_KEY));
            if (pkg != null) {
                pkg.source = "item_tag_package";
                return pkg;
            }
            bundle = readTag(tag, GIT_LOADER_BUNDLE_KEY);
            hooksText = readTag(tag, GIT_LOADER_HOOKS_KEY);
            source = hasStoredValue(bundle) ? "item_tag" : source;
        }
    }

    if (!hasStoredValue(bundle)) return null;

    return {
        bundleScript: bundle,
        supportedHooks: parseHooksText(hooksText),
        source: hasText(source) ? source : "unknown"
    };
}

function clearCachedPackage(player, sessionId) {
    try {
        player.getTempdata().remove(GIT_LOADER_TEMP_BUNDLE_PREFIX + sessionId);
    } catch (e1) {}
    try {
        player.getTempdata().remove(GIT_LOADER_TEMP_HOOKS_PREFIX + sessionId);
    } catch (e2) {}
    try {
        player.getTempdata().remove(GIT_LOADER_TEMP_PACKAGE_PREFIX + sessionId);
    } catch (e3) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_STORED_BUNDLE_PREFIX + sessionId);
    } catch (e4) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_STORED_HOOKS_PREFIX + sessionId);
    } catch (e5) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_STORED_PACKAGE_PREFIX + sessionId);
    } catch (e6) {}
    try {
        player.getTempdata().remove(GIT_LOADER_LAST_TEMP_BUNDLE_KEY);
    } catch (e7) {}
    try {
        player.getTempdata().remove(GIT_LOADER_LAST_TEMP_HOOKS_KEY);
    } catch (e8) {}
    try {
        player.getTempdata().remove(GIT_LOADER_LAST_TEMP_PACKAGE_KEY);
    } catch (e9) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_LAST_STORED_BUNDLE_KEY);
    } catch (e10) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_LAST_STORED_HOOKS_KEY);
    } catch (e11) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_LAST_STORED_PACKAGE_KEY);
    } catch (e12) {}
}

function clearLoadedFieldsOnHeldItem(player, sessionId) {
    var item = getHeldLoaderItemForSession(player, sessionId);
    if (item == null || item.isEmpty()) return false;

    var tag = getCustomTag(item);
    if (tag == null) return false;

    tag.putString(GIT_LOADER_BUNDLE_KEY, "");
    tag.putString(GIT_LOADER_HOOKS_KEY, "");
    tag.putString(GIT_LOADER_PACKAGE_KEY, "");
    return writeHeldTag(player, item, tag);
}

function rememberActiveSession(player, sessionId) {
    try {
        player.getTempdata().put(GIT_LOADER_ACTIVE_SESSION_KEY, sessionId);
    } catch (e) {}
}

function getActiveSession(player) {
    try {
        return trimString(player.getTempdata().get(GIT_LOADER_ACTIVE_SESSION_KEY));
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
        return target.getStoreddata() != null && hasText(getNpcUuid(target));
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

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
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

function normalizeActionSelection(index) {
    if (index === 0) return "load";
    if (index === 1) return "preview";
    if (index === 2) return "clear";
    return "";
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

function setScrollList(gui, id, entries) {
    try {
        var comp = gui.getComponent(id);
        if (comp != null && comp.setList != null) {
            comp.setList(entries == null ? [] : entries);
            return true;
        }
    } catch (e1) {}
    try {
        var comp2 = gui.getComponent(id);
        if (comp2 != null && comp2.list != null) {
            comp2.list = entries == null ? [] : entries;
            return true;
        }
    } catch (e2) {}
    return false;
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

function joinHookNames(hooks) {
    return hooks != null && hooks.length > 0 ? hooks.join(", ") : "none";
}

function parseHooksText(text) {
    var clean = trimString(text);
    if (!hasText(clean) || clean == "none") return [];

    var split = clean.split(/\s*,\s*/);
    var out = [];
    for (var i = 0; i < split.length; i++) {
        var hook = trimString(split[i]);
        if (!hasText(hook)) continue;
        out.push(hook);
    }
    return out;
}

function cacheTempString(player, key, value) {
    try {
        player.getTempdata().put(key, value == null ? "" : ("" + value));
        return true;
    } catch (e) {
        return false;
    }
}

function getTempString(player, key) {
    try {
        var value = player.getTempdata().get(key);
        if (value == null) return "";
        value = trimString(value);
        return hasStoredValue(value) ? value : "";
    } catch (e) {
        return "";
    }
}

function cacheStoredString(player, key, value) {
    try {
        player.getStoreddata().put(key, value == null ? "" : ("" + value));
        return true;
    } catch (e) {
        return false;
    }
}

function getStoredString(player, key) {
    try {
        var value = player.getStoreddata().get(key);
        if (value == null) return "";
        value = trimString(value);
        return hasStoredValue(value) ? value : "";
    } catch (e) {
        return "";
    }
}

function toObjectArray(values) {
    return Java.to(values, "java.lang.Object[]");
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

function encodePackage(pkg) {
    try {
        var safeFiles = [];
        var safeSharedFiles = [];
        var supportedFiles = pkg != null && pkg.supportedFiles != null ? pkg.supportedFiles : [];
        var sharedFiles = pkg != null && pkg.sharedFiles != null ? pkg.sharedFiles : [];

        for (var i = 0; i < supportedFiles.length; i++) {
            safeFiles.push({
                hook: supportedFiles[i].hook,
                relativePath: supportedFiles[i].relativePath,
                body: supportedFiles[i].body
            });
        }

        for (var j = 0; j < sharedFiles.length; j++) {
            safeSharedFiles.push({
                libraryId: sharedFiles[j].libraryId,
                relativePath: sharedFiles[j].relativePath,
                body: sharedFiles[j].body,
                isCoordinator: !!sharedFiles[j].isCoordinator
            });
        }

        return encodeBundle(JSON.stringify({
            sourceUrl: pkg == null ? "" : pkg.sourceUrl,
            owner: pkg == null ? "" : pkg.owner,
            repo: pkg == null ? "" : pkg.repo,
            rootPath: pkg == null ? "" : pkg.rootPath,
            bundleScript: pkg == null ? "" : pkg.bundleScript,
            supportedHooks: pkg == null ? [] : pkg.supportedHooks,
            supportedFiles: safeFiles,
            sharedFiles: safeSharedFiles
        }));
    } catch (e) {
        return "";
    }
}

function decodePackage(text) {
    try {
        var decoded = decodeBundle(text);
        if (!hasStoredValue(decoded)) return null;

        var parsed = JSON.parse(decoded);
        if (parsed == null || !hasStoredValue(parsed.bundleScript)) return null;

        parsed.sourceUrl = parsed.sourceUrl == null ? "" : parsed.sourceUrl;
        parsed.owner = parsed.owner == null ? "" : parsed.owner;
        parsed.repo = parsed.repo == null ? "" : parsed.repo;
        parsed.rootPath = parsed.rootPath == null ? "" : parsed.rootPath;
        parsed.supportedHooks = parsed.supportedHooks == null ? [] : parsed.supportedHooks;
        parsed.supportedFiles = parsed.supportedFiles == null ? [] : parsed.supportedFiles;
        parsed.sharedFiles = parsed.sharedFiles == null ? [] : parsed.sharedFiles;
        for (var si = 0; si < parsed.sharedFiles.length; si++) {
            var sfile = parsed.sharedFiles[si];
            if (sfile == null) continue;
            if (isSharedCoordinatorRelativePath(sfile.relativePath)) {
                sfile.isCoordinator = true;
            }
        }
        return parsed;
    } catch (e) {
        return null;
    }
}

function encodePath(path) {
    var parts = normalizeSlashes(path).split("/");
    var encoded = [];
    for (var i = 0; i < parts.length; i++) {
        if (!hasText(parts[i])) continue;
        encoded.push(encodeQuery(parts[i]));
    }
    return encoded.join("/");
}

function encodeQuery(value) {
    return ("" + GitLoader_URLEncoder.encode("" + value, "UTF-8")).replace(/\+/g, "%20");
}

function normalizeSlashes(value) {
    return trimString(value).replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
}

function isSharedCoordinatorRelativePath(relativePath) {
    return normalizeSlashes(relativePath).toLowerCase() == "shared/__shared.js";
}

function toRelativePath(fullPath, rootPath) {
    var full = normalizeSlashes(fullPath);
    var root = normalizeSlashes(rootPath);
    if (!hasText(root)) return full;
    if (full.indexOf(root + "/") === 0) return full.substring(root.length + 1);
    return full;
}

function isJsPath(path) {
    return /\.js$/i.test(trimString(path));
}

function trimTrailingWhitespace(text) {
    return ("" + text).replace(/[ \t]+$/gm, "");
}

function isArray(value) {
    try {
        return Object.prototype.toString.call(value) == "[object Array]";
    } catch (e) {
        return false;
    }
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

function getNpcUuid(npc) {
    try {
        return "" + npc.getUUID();
    } catch (e) {
        return "";
    }
}

// shared/git_runtime.js
function loadGithubPackage(url, githubToken) {
    var parsed = parseGithubTarget(url);
    var ref = trimString(parsed.ref);
    if (!hasText(ref)) {
        var repoInfo = fetchJson("https://api.github.com/repos/" + parsed.owner + "/" + parsed.repo, githubToken);
        ref = trimString(repoInfo.default_branch);
    }
    if (!hasText(ref)) ref = "main";

    var files = [];
    collectGithubFiles(parsed.owner, parsed.repo, parsed.path, ref, normalizeSlashes(parsed.path), files, githubToken);

    var selection = selectHookFiles(files);
    var sharedFiles = selectSharedFiles(files);
    var supported = selection.supportedFiles;
    var ignored = collectIgnoredFiles(files, supported, sharedFiles);

    var bundle = buildScriptBundle(url, supported);
    if (!hasText(bundle)) throw "РџР°РїРєР° РЅРµ СЃРѕРґРµСЂР¶РёС‚ РїРѕРґРґРµСЂР¶РёРІР°РµРјС‹С… hook-С„Р°Р№Р»РѕРІ.";
    if (bundle.length > GIT_LOADER_MAX_SCRIPT_CHARS) {
        throw "РЎРѕР±СЂР°РЅРЅС‹Р№ РЅР°Р±РѕСЂ СЃРєСЂРёРїС‚РѕРІ СЃР»РёС€РєРѕРј Р±РѕР»СЊС€РѕР№ РґР»СЏ РѕРґРЅРѕР№ РІРєР»Р°РґРєРё NPC.";
    }

    return {
        sourceUrl: url,
        owner: parsed.owner,
        repo: parsed.repo,
        ref: ref,
        rootPath: parsed.path,
        files: files,
        supportedFiles: supported,
        sharedFiles: sharedFiles,
        supportedHooks: extractHooks(supported),
        ignoredFiles: ignored,
        bundleScript: bundle,
        loadedAt: "" + GitLoader_System.currentTimeMillis()
    };
}

function selectHookFiles(files) {
    var grouped = groupFilesByHook(files);
    var supported = [];

    for (var i = 0; i < GIT_LOADER_HOOK_ORDER.length; i++) {
        var hook = GIT_LOADER_HOOK_ORDER[i];
        var group = grouped[hook];
        if (group == null || group.length == 0) continue;

        var selected = selectBestHookCandidate(hook, group);
        if (selected == null) continue;

        selected.hook = hook;
        supported.push(selected);
    }

    return {
        supportedFiles: supported
    };
}

function selectSharedFiles(files) {
    var shared = [];
    var coordinator = null;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var clean = normalizeSlashes(file.relativePath);
        if (clean.indexOf("shared/") !== 0) continue;
        if (!isJsPath(clean)) continue;

        var entry = {
            libraryId: getSharedLibraryId(clean),
            relativePath: clean,
            body: file.body,
            isCoordinator: isSharedCoordinatorRelativePath(clean)
        };

        shared.push(entry);
        if (entry.isCoordinator) coordinator = entry;
    }

    if (coordinator != null) {
        var aliasMap = parseSharedAliasMap(coordinator.body, coordinator.relativePath);
        var resolvedAliases = resolveSharedAliasMap(aliasMap, shared, coordinator.relativePath);
        coordinator.body = buildResolvedSharedCoordinatorBody(resolvedAliases);
    }

    shared.sort(function(a, b) {
        if (a.relativePath < b.relativePath) return -1;
        if (a.relativePath > b.relativePath) return 1;
        return 0;
    });

    return shared;
}

function parseSharedAliasMap(body, relativePath) {
    var exportsObject;
    try {
        exportsObject = (1, eval)(
            "(function(){ var module = { exports: {} }; var exports = module.exports;\n" +
            (body == null ? "" : ("" + body)) +
            "\nreturn module.exports; })()"
        );
    } catch (e) {
        throw "Р¤Р°Р№Р» `" + relativePath + "` РЅРµ СѓРґР°Р»РѕСЃСЊ СЂР°Р·РѕР±СЂР°С‚СЊ РєР°Рє shared-СЃР»РѕРІР°СЂСЊ. " + shortError(e);
    }

    if (exportsObject == null || typeof exportsObject != "object") {
        throw "Р¤Р°Р№Р» `" + relativePath + "` РґРѕР»Р¶РµРЅ СЌРєСЃРїРѕСЂС‚РёСЂРѕРІР°С‚СЊ РѕР±СЉРµРєС‚ alias -> localPath.";
    }

    var aliasMap = {};
    for (var alias in exportsObject) {
        if (!Object.prototype.hasOwnProperty.call(exportsObject, alias)) continue;

        var localPath = exportsObject[alias];
        if (!hasText(alias)) continue;
        if (!hasText(localPath) || typeof localPath != "string") {
            throw "Р¤Р°Р№Р» `" + relativePath + "` РґРѕР»Р¶РµРЅ СЃРѕРґРµСЂР¶Р°С‚СЊ С‚РѕР»СЊРєРѕ СЃС‚СЂРѕРєРѕРІС‹Рµ РїСѓС‚Рё. РџСЂРѕР±Р»РµРјРЅС‹Р№ alias: `" + alias + "`.";
        }

        aliasMap[alias] = trimString(localPath);
    }

    return aliasMap;
}

function resolveSharedAliasMap(aliasMap, sharedFiles, coordinatorPath) {
    var resolved = {};
    var filesByPath = {};

    for (var i = 0; i < sharedFiles.length; i++) {
        var file = sharedFiles[i];
        if (file == null || !hasText(file.relativePath)) continue;
        filesByPath[normalizeSlashes(file.relativePath)] = file;
    }

    for (var alias in aliasMap) {
        if (!Object.prototype.hasOwnProperty.call(aliasMap, alias)) continue;

        var localPath = aliasMap[alias];
        var resolvedPath = resolveSharedLocalPath(coordinatorPath, localPath);
        var target = filesByPath[resolvedPath];

        if (target == null) {
            throw "Р’ `" + coordinatorPath + "` alias `" + alias + "` СѓРєР°Р·С‹РІР°РµС‚ РЅР° РѕС‚СЃСѓС‚СЃС‚РІСѓСЋС‰РёР№ shared-С„Р°Р№Р» `" + localPath + "`.";
        }
        if (target.relativePath == coordinatorPath) {
            throw "Р’ `" + coordinatorPath + "` alias `" + alias + "` РЅРµ РјРѕР¶РµС‚ СЃСЃС‹Р»Р°С‚СЊСЃСЏ РЅР° СЃР°Рј `__shared.js`.";
        }

        resolved[alias] = {
            alias: alias,
            localPath: localPath,
            relativePath: target.relativePath,
            libraryId: target.libraryId
        };
    }

    return resolved;
}

function resolveSharedLocalPath(basePath, localPath) {
    var cleanLocal = normalizeSlashes(localPath);
    if (!hasText(cleanLocal)) throw "РџСѓСЃС‚РѕР№ shared localPath.";

    var targetPath = cleanLocal;
    if (cleanLocal.indexOf("shared/") !== 0) {
        var baseDir = getParentPath(basePath);
        targetPath = hasText(baseDir) ? (baseDir + "/" + cleanLocal) : cleanLocal;
    }

    targetPath = collapseRelativePath(targetPath);
    if (targetPath.indexOf("shared/") !== 0) {
        throw "Shared localPath РґРѕР»Р¶РµРЅ РѕСЃС‚Р°РІР°С‚СЊСЃСЏ РІРЅСѓС‚СЂРё РїР°РїРєРё `shared/`: " + localPath;
    }

    return targetPath;
}

function getParentPath(path) {
    var clean = normalizeSlashes(path);
    var lastSlash = clean.lastIndexOf("/");
    return lastSlash < 0 ? "" : clean.substring(0, lastSlash);
}

function collapseRelativePath(path) {
    var parts = normalizeSlashes(path).split("/");
    var stack = [];

    for (var i = 0; i < parts.length; i++) {
        var part = trimString(parts[i]);
        if (!hasText(part) || part == ".") continue;
        if (part == "..") {
            if (stack.length == 0) throw "РџСѓС‚СЊ РІС‹С…РѕРґРёС‚ РІС‹С€Рµ РєРѕСЂРЅСЏ: " + path;
            stack.pop();
            continue;
        }
        stack.push(part);
    }

    return stack.join("/");
}

function buildResolvedSharedCoordinatorBody(resolvedAliases) {
    var lines = [];
    lines.push("(function(event) {");
    lines.push("    var npc = null;");
    lines.push("    if (event != null) {");
    lines.push("        try { if (event.npc != null) npc = event.npc; } catch (e1) {}");
    lines.push("        try { if (npc == null && event.target != null && event.target.getStoreddata != null) npc = event.target; } catch (e2) {}");
    lines.push("    }");
    lines.push("    if (npc == null) throw \"GitHub Loader shared: npc is not available\";");
    lines.push("    var temp = npc.getTempdata();");
    lines.push("    var data = npc.getStoreddata();");
    lines.push("    var sourcesText = \"\" + data.get(" + quoteJsString(GIT_LOADER_NPC_SHARED_SOURCES_KEY) + ");");
    lines.push("    var runtime = temp.get(\"github_npc_loader_shared_runtime\");");
    lines.push("    if (runtime == null || runtime.sourcesText !== sourcesText) {");
    lines.push("        runtime = { sourcesText: sourcesText, libraries: {} };");
    lines.push("        temp.put(\"github_npc_loader_shared_runtime\", runtime);");
    lines.push("    }");
    lines.push("    function requireLibrary(libraryId) {");
    lines.push("        if (runtime.libraries[libraryId] != null) return runtime.libraries[libraryId];");
    lines.push("        var sources = JSON.parse(sourcesText);");
    lines.push("        var entry = sources == null ? null : sources[libraryId];");
    lines.push("        if (entry == null || entry.encodedBody == null || entry.encodedBody === \"\") throw \"GitHub Loader shared library not found: \" + libraryId;");
    lines.push("        var Base64 = Java.type(\"java.util.Base64\");");
    lines.push("        var StandardCharsets = Java.type(\"java.nio.charset.StandardCharsets\");");
    lines.push("        var bytes = Base64.getDecoder().decode(entry.encodedBody);");
    lines.push("        var source = \"\" + new java.lang.String(bytes, StandardCharsets.UTF_8);");
    lines.push("        var module = { exports: {} };");
    lines.push("        var exports = module.exports;");
    lines.push("        var require = function(otherLibraryId) { return requireLibrary(otherLibraryId); };");
    lines.push("        var factory = (1, eval)(\"(function(exports, module, require, npc, event){\\n\" + source + \"\\n})\");");
    lines.push("        factory(exports, module, require, npc, event);");
    lines.push("        runtime.libraries[libraryId] = module.exports;");
    lines.push("        return runtime.libraries[libraryId];");
    lines.push("    }");
    lines.push("    var shared = {};");

    for (var alias in resolvedAliases) {
        if (!Object.prototype.hasOwnProperty.call(resolvedAliases, alias)) continue;
        lines.push("    shared[" + quoteJsString(alias) + "] = requireLibrary(" + quoteJsString(resolvedAliases[alias].libraryId) + ");");
    }

    lines.push("    return shared;");
    lines.push("})");
    return lines.join("\n");
}

function quoteJsString(value) {
    return JSON.stringify(value == null ? "" : ("" + value));
}

function collectIgnoredFiles(files, selectedHookFiles, selectedSharedFiles) {
    var ignored = [];
    var selectedLookup = {};
    var hookFiles = selectedHookFiles == null ? [] : selectedHookFiles;
    var sharedFiles = selectedSharedFiles == null ? [] : selectedSharedFiles;

    for (var i = 0; i < hookFiles.length; i++) {
        if (hookFiles[i] != null && hasText(hookFiles[i].relativePath)) {
            selectedLookup[hookFiles[i].relativePath] = true;
        }
    }
    for (var j = 0; j < sharedFiles.length; j++) {
        if (sharedFiles[j] != null && hasText(sharedFiles[j].relativePath)) {
            selectedLookup[sharedFiles[j].relativePath] = true;
        }
    }

    for (var k = 0; k < files.length; k++) {
        if (!selectedLookup[files[k].relativePath]) {
            ignored.push(files[k].relativePath);
        }
    }

    return ignored;
}

function groupFilesByHook(files) {
    var grouped = {};
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var hook = detectHook(file.relativePath);
        file.hook = hook;
        if (!hasText(hook)) continue;

        if (grouped[hook] == null) grouped[hook] = [];
        grouped[hook].push(file);
    }
    return grouped;
}

function selectBestHookCandidate(hook, files) {
    var ranked = [];

    for (var i = 0; i < files.length; i++) {
        ranked.push({
            file: files[i],
            rank: hookPathRank(hook, files[i].relativePath)
        });
    }

    ranked.sort(function(a, b) {
        if (a.rank != b.rank) return a.rank - b.rank;

        var aPath = normalizeSlashes(a.file.relativePath);
        var bPath = normalizeSlashes(b.file.relativePath);
        if (aPath < bPath) return -1;
        if (aPath > bPath) return 1;
        return 0;
    });

    if (ranked.length > 1) {
        var duplicates = [];
        for (var j = 0; j < ranked.length; j++) {
            duplicates.push(ranked[j].file.relativePath);
        }
        throw "РќР°Р№РґРµРЅРѕ РЅРµСЃРєРѕР»СЊРєРѕ С„Р°Р№Р»РѕРІ РґР»СЏ hook `" + hook + "`: " + duplicates.join(" | ") + ". РћСЃС‚Р°РІСЊ РѕРґРёРЅ С„Р°Р№Р» РЅР° РѕРґРёРЅ hook.";
    }

    return ranked.length > 0 ? ranked[0].file : null;
}

function hookPathRank(hook, relativePath) {
    var clean = normalizeSlashes(relativePath);
    var fileName = GIT_LOADER_HOOK_FILE_NAMES[hook] == null ? (hook + ".js") : GIT_LOADER_HOOK_FILE_NAMES[hook];

    if (clean == "hooks/" + fileName) return 0;
    if (clean == fileName) return 1;
    if (clean == hook + "/" + fileName) return 2;
    return 10;
}
