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
var GIT_LOADER_SUMMARY_KEY = "github_npc_loader_summary";
var GIT_LOADER_ACTIVE_SESSION_KEY = "github_npc_loader_active_session";
var GIT_LOADER_GUI_URL_PREFIX = "github_npc_loader_url_";
var GIT_LOADER_TEMP_BUNDLE_PREFIX = "github_npc_loader_bundle_";
var GIT_LOADER_TEMP_HOOKS_PREFIX = "github_npc_loader_hooks_";
var GIT_LOADER_TEMP_SUMMARY_PREFIX = "github_npc_loader_summary_";
var GIT_LOADER_TEMP_PACKAGE_PREFIX = "github_npc_loader_package_";
var GIT_LOADER_STORED_BUNDLE_PREFIX = "github_npc_loader_bundle_";
var GIT_LOADER_STORED_HOOKS_PREFIX = "github_npc_loader_hooks_";
var GIT_LOADER_STORED_SUMMARY_PREFIX = "github_npc_loader_summary_";
var GIT_LOADER_STORED_PACKAGE_PREFIX = "github_npc_loader_package_";
var GIT_LOADER_LAST_TEMP_BUNDLE_KEY = "github_npc_loader_last_bundle";
var GIT_LOADER_LAST_TEMP_HOOKS_KEY = "github_npc_loader_last_hooks";
var GIT_LOADER_LAST_TEMP_SUMMARY_KEY = "github_npc_loader_last_summary";
var GIT_LOADER_LAST_TEMP_PACKAGE_KEY = "github_npc_loader_last_package";
var GIT_LOADER_LAST_STORED_BUNDLE_KEY = "github_npc_loader_last_bundle";
var GIT_LOADER_LAST_STORED_HOOKS_KEY = "github_npc_loader_last_hooks";
var GIT_LOADER_LAST_STORED_SUMMARY_KEY = "github_npc_loader_last_summary";
var GIT_LOADER_LAST_STORED_PACKAGE_KEY = "github_npc_loader_last_package";
var GIT_LOADER_MAX_SCRIPT_CHARS = 65000;
var GIT_LOADER_HTTP_RETRIES = 4;
var GIT_LOADER_HTTP_RETRY_DELAY_MS = 350;

var GIT_LOADER_GUI_ID = 9321;
var GIT_LOADER_ACTION_SCROLL_ID = 9322;
var GIT_LOADER_URL_FIELD_ID = 9323;
var GIT_LOADER_STATUS_ID = 9324;
var GIT_LOADER_SUMMARY_ID = 9325;
var GIT_LOADER_ACTIONS = ["Load", "Summary", "Clear"];

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

function customGuiScroll(event) {
    try {
        var gui = event.gui;
        var scroll = event.scroll;
        var player = event.player;
        if (gui == null || gui.getID() != GIT_LOADER_GUI_ID) return;
        if (scroll == null || scroll.getID() != GIT_LOADER_ACTION_SCROLL_ID) return;

        var sessionId = getActiveSession(player);
        if (!hasText(sessionId)) {
            setStatus(gui, "No active item session.");
            safeUpdate(gui);
            return;
        }

        var selected = getSelectedIndex(scroll);
        if (selected == 0) {
            handleLoadAction(player, gui, sessionId);
        } else if (selected == 1) {
            setSummary(gui, getCachedSummary(player, sessionId, null));
            setStatus(gui, "Сводка обновлена.");
        } else if (selected == 2) {
            clearCachedPackage(player, sessionId);
            clearLoadedFieldsOnHeldItem(player, sessionId);
            setSummary(gui, buildEmptySummary());
            setStatus(gui, "Кэш кода очищен.");
            player.message("GitHub Loader: кэш кода очищен.");
        }

        safeUpdate(gui);
    } catch (e) {}
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
    } catch (e) {}
}

function createGui(player, item) {
    var sessionId = getSessionId(item);
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(GIT_LOADER_GUI_ID, 360, 250, false, player);

    gui.addLabel(1, "Загрузчик NPC из GitHub", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 340, 34, 0x5C8DFF, 1.5);

    gui.addLabel(10, "GitHub URL", 10, 42, 100, 14, 0xE0E0E0);
    gui.addTextField(GIT_LOADER_URL_FIELD_ID, 10, 58, 340, 20);

    gui.addLabel(11, "Действия", 10, 88, 80, 14, 0xE0E0E0);
    gui.addScroll(GIT_LOADER_ACTION_SCROLL_ID, 10, 104, 90, 78, GIT_LOADER_ACTIONS);

    gui.addLabel(12, "Сводка", 110, 88, 80, 14, 0xE0E0E0);
    gui.addTextArea(GIT_LOADER_SUMMARY_ID, 110, 104, 240, 108);

    gui.addTextArea(GIT_LOADER_STATUS_ID, 10, 222, 340, 16);

    setGuiText(gui, GIT_LOADER_URL_FIELD_ID, getInitialUrl(player, item, sessionId));
    setSummary(gui, getCachedSummary(player, sessionId, item));
    setStatus(gui, "Загрузи код, затем нажми ПКМ по NPC.");
    return gui;
}

function handleLoadAction(player, gui, sessionId) {
    var url = trimString(getGuiText(gui, GIT_LOADER_URL_FIELD_ID));
    if (!hasText(url)) {
        setStatus(gui, "Вставь URL репозитория или папки GitHub.");
        return;
    }

    var heldItem = getHeldLoaderItemForSession(player, sessionId);
    if (heldItem != null && !heldItem.isEmpty()) {
        updateItemLastUrl(player, heldItem, url);
    }
    player.getStoreddata().put(GIT_LOADER_GUI_URL_PREFIX + sessionId, url);

    try {
        var pkg = loadGithubPackage(url);
        cacheLoadedPackage(player, heldItem, sessionId, pkg);

        setSummary(gui, buildPackageSummaryText(pkg));
        setStatus(gui, "Загружено поддерживаемых файлов: " + pkg.supportedFiles.length + ".");
        player.message("GitHub Loader: код загружен из GitHub.");
        player.message("GitHub Loader: загруженные хуки: " + joinHookNames(pkg.supportedHooks) + ".");
    } catch (e) {
        setStatus(gui, "Ошибка загрузки: " + shortError(e));
        player.message("GitHub Loader: ошибка загрузки. " + shortError(e));
    }
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

function loadGithubPackage(url) {
    var parsed = parseGithubTarget(url);
    var repoInfo = fetchJson("https://api.github.com/repos/" + parsed.owner + "/" + parsed.repo);
    var ref = hasText(parsed.ref) ? parsed.ref : trimString(repoInfo.default_branch);
    if (!hasText(ref)) ref = "main";

    var files = [];
    collectGithubFiles(parsed.owner, parsed.repo, parsed.path, ref, normalizeSlashes(parsed.path), files);

    var supported = [];
    var ignored = [];
    var duplicates = [];
    var seenHooks = {};

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var hook = detectHook(file.relativePath);
        file.hook = hook;

        if (!hasText(hook)) {
            ignored.push(file.relativePath);
            continue;
        }

        if (seenHooks[hook]) {
            duplicates.push(hook + ": " + seenHooks[hook] + " | " + file.relativePath);
            continue;
        }

        seenHooks[hook] = file.relativePath;
        supported.push(file);
    }

    if (duplicates.length > 0) {
        throw "Найдены дубликаты hook-файлов. Укажи более узкую папку. " + duplicates.join(" ; ");
    }

    supported.sort(function(a, b) {
        return hookOrderIndex(a.hook) - hookOrderIndex(b.hook);
    });

    var bundle = buildScriptBundle(url, supported);
    if (!hasText(bundle)) throw "Поддерживаемые файлы пустые";
    if (bundle.length > GIT_LOADER_MAX_SCRIPT_CHARS) {
        throw "Собранный скрипт слишком большой для одной вкладки NPC";
    }

    return {
        sourceUrl: url,
        owner: parsed.owner,
        repo: parsed.repo,
        ref: ref,
        rootPath: parsed.path,
        files: files,
        supportedFiles: supported,
        supportedHooks: extractHooks(supported),
        ignoredFiles: ignored,
        bundleScript: bundle,
        loadedAt: "" + GitLoader_System.currentTimeMillis()
    };
}

function collectGithubFiles(owner, repo, path, ref, rootPath, out) {
    var apiUrl = "https://api.github.com/repos/" + owner + "/" + repo + "/contents";
    if (hasText(path)) apiUrl += "/" + encodePath(path);
    apiUrl += "?ref=" + encodeQuery(ref);

    var payload = fetchJson(apiUrl);
    if (isArray(payload)) {
        for (var i = 0; i < payload.length; i++) {
            var entry = payload[i];
            if (entry == null) continue;

            var type = trimString(entry.type);
            if (type == "dir") {
                collectGithubFiles(owner, repo, entry.path, ref, rootPath, out);
            } else if (type == "file" && isJsPath(entry.path)) {
                out.push({
                    name: trimString(entry.name),
                    path: trimString(entry.path),
                    relativePath: toRelativePath(entry.path, rootPath),
                    body: fetchText(trimString(entry.download_url))
                });
            }
        }
        return;
    }

    if (payload != null && trimString(payload.type) == "file" && isJsPath(payload.path)) {
        out.push({
            name: trimString(payload.name),
            path: trimString(payload.path),
            relativePath: toRelativePath(payload.path, rootPath),
            body: fetchText(trimString(payload.download_url))
        });
    }
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
            return { ok: false, message: "NBT NPC недоступен." };
        }

        nbt.mcSetTag("Scripts", buildScriptsMcTag(pkg));
        nbt.setBoolean("ScriptEnabled", true);
        nbt.putString("ScriptLanguage", "ECMAScript");

        npc.setEntityNbt(nbt);
        npc.updateClient();

        return { ok: true, message: "OK" };
    } catch (e) {
        return { ok: false, message: shortError(e) };
    }
}

function buildScriptsMcTag(pkg) {
    var scriptsTag = new GitLoader_MCListTag();

    if (pkg != null && pkg.supportedFiles != null && pkg.supportedFiles.length > 0) {
        for (var i = 0; i < pkg.supportedFiles.length; i++) {
            scriptsTag.add(createRootScriptEntry(pkg.supportedFiles[i]));
        }
        return scriptsTag;
    }

    scriptsTag.add(createRootScriptEntry({
        hook: "bundle",
        relativePath: "bundle.js",
        body: pkg == null ? "" : pkg.bundleScript
    }));
    return scriptsTag;
}

function createRootScriptEntry(file) {
    var script = file == null || file.body == null ? "" : ("" + file.body);
    var rootTag = new GitLoader_MCCompoundTag();
    rootTag.putString("Script", script);
    rootTag.put("Console", new GitLoader_MCListTag());
    rootTag.put("ScriptList", new GitLoader_MCListTag());
    rootTag.putString("GitHubHook", file != null && file.hook != null ? "" + file.hook : "");
    rootTag.putString("GitHubPath", file != null && file.relativePath != null ? "" + file.relativePath : "");
    return rootTag;
}

function parseGithubTarget(url) {
    var clean = trimString(url).replace(/^https?:\/\/www\.github\.com\//i, "https://github.com/");
    clean = clean.replace(/\/+$/, "");

    var match = clean.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/(.*))?$/i);
    if (match == null) throw "Поддерживаются только URL github.com";

    var owner = trimString(match[1]);
    var repo = trimString(match[2]).replace(/\.git$/i, "");
    var tail = trimString(match[3]);
    var parts = hasText(tail) ? tail.split("/") : [];
    var ref = "";
    var path = "";

    if (parts.length > 0) {
        if (parts[0] == "tree" || parts[0] == "blob") {
            if (parts.length < 2) throw "В URL GitHub отсутствует ветка";
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

function fetchJson(url) {
    var text = fetchText(url);
    try {
        return JSON.parse(text);
    } catch (e) {
        throw "GitHub вернул некорректный JSON";
    }
}

function fetchText(url) {
    var lastError = null;

    for (var attempt = 1; attempt <= GIT_LOADER_HTTP_RETRIES; attempt++) {
        try {
            return fetchTextOnce(url);
        } catch (e) {
            lastError = e;
            if (!shouldRetryHttpError(e, attempt)) break;
            sleepMs(GIT_LOADER_HTTP_RETRY_DELAY_MS * attempt);
        }
    }

    throw lastError == null ? "Unknown HTTP error" : lastError;
}

function fetchTextOnce(url) {
    var conn = null;
    var reader = null;
    try {
        conn = new GitLoader_URL(url).openConnection();
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 CustomNpc-GitHubLoader");
        conn.setRequestProperty("Accept", "application/vnd.github+json");
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
        try {
            code = "" + conn.getResponseCode();
        } catch (e2) {}
        if (hasText(code)) throw "HTTP " + code + " при запросе к GitHub";
        throw "" + e;
    } finally {
        try {
            if (reader != null) reader.close();
        } catch (e3) {}
    }
}

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

function buildPackageSummaryText(pkg) {
    if (pkg == null) return buildEmptySummary();

    var lines = [];
    lines.push("Репозиторий: " + pkg.owner + "/" + pkg.repo);
    lines.push("Ветка: " + pkg.ref);
    lines.push("Папка: " + (hasText(pkg.rootPath) ? pkg.rootPath : "/"));
    lines.push("Найдено JS-файлов: " + pkg.files.length);
    lines.push("Поддерживаемых хуков: " + pkg.supportedFiles.length);
    lines.push("Хуки: " + joinHookNames(pkg.supportedHooks));
    lines.push("Игнорировано файлов: " + pkg.ignoredFiles.length);
    lines.push("Применение: ПКМ по NPC этим предметом");
    return lines.join("\n");
}

function buildEmptySummary() {
    return [
        "Код не загружен.",
        "Поддерживается URL репозитория или /tree/<ветка>/<путь>.",
        "Поддерживаемые файлы:",
        "init, interact, timer, attack, target, damaged, died, kills, killed, collide, meleeAttack"
    ].join("\n");
}

function getInitialUrl(player, item, sessionId) {
    var tag = getCustomTag(item);
    var itemUrl = tag == null ? "" : readTag(tag, GIT_LOADER_LAST_URL_KEY);
    if (hasText(itemUrl)) return itemUrl;

    var stored = trimString(player.getStoreddata().get(GIT_LOADER_GUI_URL_PREFIX + sessionId));
    return hasStoredValue(stored) ? stored : "";
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
    cacheTempString(player, GIT_LOADER_TEMP_SUMMARY_PREFIX + sessionId, buildPackageSummaryText(pkg));
    cacheTempString(player, GIT_LOADER_TEMP_PACKAGE_PREFIX + sessionId, encodedPackage);
    cacheTempString(player, GIT_LOADER_LAST_TEMP_BUNDLE_KEY, encodedBundle);
    cacheTempString(player, GIT_LOADER_LAST_TEMP_HOOKS_KEY, joinHookNames(pkg.supportedHooks));
    cacheTempString(player, GIT_LOADER_LAST_TEMP_SUMMARY_KEY, buildPackageSummaryText(pkg));
    cacheTempString(player, GIT_LOADER_LAST_TEMP_PACKAGE_KEY, encodedPackage);
    cacheStoredString(player, GIT_LOADER_STORED_BUNDLE_PREFIX + sessionId, encodedBundle);
    cacheStoredString(player, GIT_LOADER_STORED_HOOKS_PREFIX + sessionId, joinHookNames(pkg.supportedHooks));
    cacheStoredString(player, GIT_LOADER_STORED_SUMMARY_PREFIX + sessionId, buildPackageSummaryText(pkg));
    cacheStoredString(player, GIT_LOADER_STORED_PACKAGE_PREFIX + sessionId, encodedPackage);
    cacheStoredString(player, GIT_LOADER_LAST_STORED_BUNDLE_KEY, encodedBundle);
    cacheStoredString(player, GIT_LOADER_LAST_STORED_HOOKS_KEY, joinHookNames(pkg.supportedHooks));
    cacheStoredString(player, GIT_LOADER_LAST_STORED_SUMMARY_KEY, buildPackageSummaryText(pkg));
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
    tag.putString(GIT_LOADER_SUMMARY_KEY, buildPackageSummaryText(pkg));
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
        player.getTempdata().remove(GIT_LOADER_TEMP_SUMMARY_PREFIX + sessionId);
    } catch (e3) {}
    try {
        player.getTempdata().remove(GIT_LOADER_TEMP_PACKAGE_PREFIX + sessionId);
    } catch (e3b) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_STORED_BUNDLE_PREFIX + sessionId);
    } catch (e4) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_STORED_HOOKS_PREFIX + sessionId);
    } catch (e5) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_STORED_SUMMARY_PREFIX + sessionId);
    } catch (e6) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_STORED_PACKAGE_PREFIX + sessionId);
    } catch (e6b) {}
    try {
        player.getTempdata().remove(GIT_LOADER_LAST_TEMP_BUNDLE_KEY);
    } catch (e7) {}
    try {
        player.getTempdata().remove(GIT_LOADER_LAST_TEMP_HOOKS_KEY);
    } catch (e8) {}
    try {
        player.getTempdata().remove(GIT_LOADER_LAST_TEMP_SUMMARY_KEY);
    } catch (e9) {}
    try {
        player.getTempdata().remove(GIT_LOADER_LAST_TEMP_PACKAGE_KEY);
    } catch (e9b) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_LAST_STORED_BUNDLE_KEY);
    } catch (e10) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_LAST_STORED_HOOKS_KEY);
    } catch (e11) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_LAST_STORED_SUMMARY_KEY);
    } catch (e12) {}
    try {
        player.getStoreddata().remove(GIT_LOADER_LAST_STORED_PACKAGE_KEY);
    } catch (e12b) {}
}

function clearLoadedFieldsOnHeldItem(player, sessionId) {
    var item = getHeldLoaderItemForSession(player, sessionId);
    if (item == null || item.isEmpty()) return false;

    var tag = getCustomTag(item);
    if (tag == null) return false;

    tag.putString(GIT_LOADER_BUNDLE_KEY, "");
    tag.putString(GIT_LOADER_HOOKS_KEY, "");
    tag.putString(GIT_LOADER_SUMMARY_KEY, "");
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

function setSummary(gui, text) {
    setGuiText(gui, GIT_LOADER_SUMMARY_ID, text);
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

function getCachedSummary(player, sessionId, item) {
    var summary = getTempString(player, GIT_LOADER_TEMP_SUMMARY_PREFIX + sessionId);
    if (hasStoredValue(summary)) return summary;

    summary = getStoredString(player, GIT_LOADER_STORED_SUMMARY_PREFIX + sessionId);
    if (hasStoredValue(summary)) return summary;

    summary = getTempString(player, GIT_LOADER_LAST_TEMP_SUMMARY_KEY);
    if (hasStoredValue(summary)) return summary;

    summary = getStoredString(player, GIT_LOADER_LAST_STORED_SUMMARY_KEY);
    if (hasStoredValue(summary)) return summary;

    if (item != null && !item.isEmpty()) {
        var tag = getCustomTag(item);
        if (tag != null) {
            summary = readTag(tag, GIT_LOADER_SUMMARY_KEY);
            if (hasStoredValue(summary)) return summary;
        }
    }

    return buildEmptySummary();
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
        var supportedFiles = pkg != null && pkg.supportedFiles != null ? pkg.supportedFiles : [];

        for (var i = 0; i < supportedFiles.length; i++) {
            safeFiles.push({
                hook: supportedFiles[i].hook,
                relativePath: supportedFiles[i].relativePath,
                body: supportedFiles[i].body
            });
        }

        return encodeBundle(JSON.stringify({
            bundleScript: pkg == null ? "" : pkg.bundleScript,
            supportedHooks: pkg == null ? [] : pkg.supportedHooks,
            supportedFiles: safeFiles
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

        parsed.supportedHooks = parsed.supportedHooks == null ? [] : parsed.supportedHooks;
        parsed.supportedFiles = parsed.supportedFiles == null ? [] : parsed.supportedFiles;
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

function loadGithubPackage(url) {
    var parsed = parseGithubTarget(url);
    var repoInfo = fetchJson("https://api.github.com/repos/" + parsed.owner + "/" + parsed.repo);
    var ref = hasText(parsed.ref) ? parsed.ref : trimString(repoInfo.default_branch);
    if (!hasText(ref)) ref = "main";

    var files = [];
    collectGithubFiles(parsed.owner, parsed.repo, parsed.path, ref, normalizeSlashes(parsed.path), files);

    var selection = selectHookFiles(files);
    var supported = selection.supportedFiles;
    var ignored = selection.ignoredFiles;

    var bundle = buildScriptBundle(url, supported);
    if (!hasText(bundle)) throw "Папка не содержит поддерживаемых hook-файлов.";
    if (bundle.length > GIT_LOADER_MAX_SCRIPT_CHARS) {
        throw "Собранный набор скриптов слишком большой для одной вкладки NPC.";
    }

    return {
        sourceUrl: url,
        owner: parsed.owner,
        repo: parsed.repo,
        ref: ref,
        rootPath: parsed.path,
        files: files,
        supportedFiles: supported,
        supportedHooks: extractHooks(supported),
        ignoredFiles: ignored,
        layoutMode: selection.layoutMode,
        selectedPaths: selection.selectedPaths,
        bundleScript: bundle,
        loadedAt: "" + GitLoader_System.currentTimeMillis()
    };
}

function selectHookFiles(files) {
    var grouped = groupFilesByHook(files);
    var supported = [];
    var ignored = [];
    var selectedPaths = [];
    var selectedLookup = {};
    var layoutMode = "empty";

    for (var i = 0; i < GIT_LOADER_HOOK_ORDER.length; i++) {
        var hook = GIT_LOADER_HOOK_ORDER[i];
        var group = grouped[hook];
        if (group == null || group.length == 0) continue;

        var selected = selectBestHookCandidate(hook, group);
        if (selected == null) continue;

        selected.hook = hook;
        supported.push(selected);
        selectedLookup[selected.relativePath] = true;
        selectedPaths.push(selected.relativePath);

        var mode = detectLayoutMode(selected.relativePath, hook);
        if (layoutRank(mode) < layoutRank(layoutMode)) {
            layoutMode = mode;
        }
    }

    for (var j = 0; j < files.length; j++) {
        if (!selectedLookup[files[j].relativePath]) {
            ignored.push(files[j].relativePath);
        }
    }

    return {
        supportedFiles: supported,
        ignoredFiles: ignored,
        selectedPaths: selectedPaths,
        layoutMode: layoutMode
    };
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
        throw "Найдено несколько файлов для hook `" + hook + "`: " + duplicates.join(" | ") + ". Оставь один файл на один hook.";
    }

    return ranked.length > 0 ? ranked[0].file : null;
}

function hookPathRank(hook, relativePath) {
    var clean = normalizeSlashes(relativePath);
    var fileName = getHookFileName(hook);

    if (clean == "hooks/" + fileName) return 0;
    if (clean == fileName) return 1;
    if (clean == hook + "/" + fileName) return 2;
    return 10;
}

function getHookFileName(hook) {
    return GIT_LOADER_HOOK_FILE_NAMES[hook] == null ? (hook + ".js") : GIT_LOADER_HOOK_FILE_NAMES[hook];
}

function detectLayoutMode(relativePath, hook) {
    var clean = normalizeSlashes(relativePath);
    var fileName = getHookFileName(hook);

    if (clean == "hooks/" + fileName) return "hooks";
    if (clean == fileName) return "flat";
    if (clean == hook + "/" + fileName) return "legacy_nested";
    return "legacy_other";
}

function layoutRank(mode) {
    if (mode == "hooks") return 0;
    if (mode == "flat") return 1;
    if (mode == "legacy_nested") return 2;
    if (mode == "legacy_other") return 3;
    return 99;
}

function buildPackageSummaryText(pkg) {
    if (pkg == null) return buildEmptySummary();

    var lines = [];
    lines.push("Репозиторий: " + pkg.owner + "/" + pkg.repo);
    lines.push("Ветка: " + pkg.ref);
    lines.push("Папка: " + (hasText(pkg.rootPath) ? pkg.rootPath : "/"));
    lines.push("Layout: " + describeLayoutMode(pkg.layoutMode));
    lines.push("Найдено JS-файлов: " + pkg.files.length);
    lines.push("Поддерживаемых hook-скриптов: " + pkg.supportedFiles.length);
    lines.push("Hooks: " + joinHookNames(pkg.supportedHooks));
    if (pkg.selectedPaths != null && pkg.selectedPaths.length > 0) {
        lines.push("Выбранные файлы: " + pkg.selectedPaths.join(", "));
    }
    lines.push("Порядок в NPC: " + GIT_LOADER_HOOK_ORDER.join(" -> "));
    lines.push("Игнорировано файлов: " + pkg.ignoredFiles.length);
    lines.push("Применение: ПКМ по NPC этим предметом");
    return lines.join("\n");
}

function buildEmptySummary() {
    return [
        "Код ещё не загружен.",
        "URL должен указывать на папку одного NPC-пакета в GitHub.",
        "Рекомендуемый layout: hooks/<hook>.js",
        "Совместимость: <hook>.js и <hook>/<hook>.js",
        "Порядок в NPC: " + GIT_LOADER_HOOK_ORDER.join(" -> ")
    ].join("\n");
}

function describeLayoutMode(layoutMode) {
    if (layoutMode == "hooks") return "hooks/<hook>.js";
    if (layoutMode == "flat") return "<hook>.js";
    if (layoutMode == "legacy_nested") return "<hook>/<hook>.js";
    if (layoutMode == "legacy_other") return "legacy nested";
    return "not detected";
}
