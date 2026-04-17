var GitLoaderBoot_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var GitLoaderBoot_URL = Java.type("java.net.URL");
var GitLoaderBoot_InputStreamReader = Java.type("java.io.InputStreamReader");
var GitLoaderBoot_BufferedReader = Java.type("java.io.BufferedReader");
var GitLoaderBoot_StringBuilder = Java.type("java.lang.StringBuilder");
var GitLoaderBoot_System = Java.type("java.lang.System");
var GitLoaderBoot_Base64 = Java.type("java.util.Base64");
var GitLoaderBoot_StandardCharsets = Java.type("java.nio.charset.StandardCharsets");

var GIT_LOADER_ITEM_TYPE = "github_npc_loader_tool";
var GIT_LOADER_SESSION_KEY = "github_npc_loader_session_id";
var GIT_LOADER_ACTIVE_SESSION_KEY = "github_npc_loader_active_session";
var GIT_LOADER_ACTIVE_ITEM_KEY = "github_npc_loader_active_item";
var GIT_LOADER_SELF_RUNTIME_URL_KEY = "github_npc_loader_self_runtime_url";
var GIT_LOADER_SELF_RUNTIME_VERSION_KEY = "github_npc_loader_self_runtime_version";
var GIT_LOADER_INSTALLED_RUNTIME_SOURCE_KEY = "github_loader_installed_runtime_source";
var GIT_LOADER_INSTALLED_RUNTIME_SIGNATURE_KEY = "github_loader_installed_runtime_signature";

var GIT_LOADER_DEFAULT_RUNTIME_URL = "https://raw.githubusercontent.com/TimCixo/CustomNpc/main/github_loader/installer.js";
var GIT_LOADER_RUNTIME_REFRESH_MS = 300000;

var GIT_LOADER_TEMP_RUNTIME_MODULE_KEY = "github_loader_runtime_module";
var GIT_LOADER_TEMP_RUNTIME_URL_KEY = "github_loader_runtime_url";
var GIT_LOADER_TEMP_RUNTIME_FETCHED_AT_KEY = "github_loader_runtime_fetched_at";
var GIT_LOADER_STORED_RUNTIME_SOURCE_KEY = "github_loader_runtime_source";
var GIT_LOADER_STORED_RUNTIME_URL_KEY = "github_loader_runtime_source_url";
var GIT_LOADER_STORED_RUNTIME_FETCHED_AT_KEY = "github_loader_runtime_source_fetched_at";
var GIT_LOADER_STORED_RUNTIME_ERROR_KEY = "github_loader_runtime_error";

function interact(event) {
    var item = event.item;
    var player = event.player;

    if (!isLoaderItem(item)) return;
    rememberActiveSession(player, getSessionId(item));
    rememberActiveItem(player, item);

    try {
        var runtime = ensureRuntime(player, item, false);
        requireRuntimeEntry(runtime, "interact")(event);
    } catch (e) {
        player.message("GitHub Loader bootstrap: " + shortError(e));
    }

    event.setCanceled(true);
}

function customGuiScroll(event) {
    try {
        if (event == null || event.player == null) return;

        var player = event.player;
        var item = getHeldLoaderItemForActiveSession(player);
        var runtime = ensureRuntime(player, item, false);
        requireRuntimeEntry(runtime, "customGuiScroll")(event);
    } catch (e) {
        try {
            event.player.message("GitHub Loader bootstrap: " + shortError(e));
        } catch (ignored) {}
    }
}

function customGuiClosed(event) {
    try {
        if (event == null || event.player == null) return;

        var player = event.player;
        var item = getHeldLoaderItemForActiveSession(player);
        var runtime = ensureRuntime(player, item, false);
        requireRuntimeEntry(runtime, "customGuiClosed")(event);
    } catch (e) {
        try {
            event.player.message("GitHub Loader bootstrap: " + shortError(e));
        } catch (ignored) {}
    }
}

function ensureRuntime(player, item, forceRefresh) {
    var installedSource = getInstalledRuntimeSource(item);
    var runtimeKey = getRuntimeKey(item, installedSource);
    var runtime = getCachedRuntimeModule(player, runtimeKey, forceRefresh);
    if (runtime != null) return runtime;

    if (hasText(installedSource)) {
        runtime = buildRuntimeModule(installedSource);
        cacheRuntimeModule(player, runtimeKey, runtime, GitLoaderBoot_System.currentTimeMillis());
        return runtime;
    }

    var runtimeUrl = getSelfRuntimeUrl(item);

    var source = "";
    var fetchedAt = 0;
    var fetchedFresh = false;

    if (forceRefresh || shouldRefreshRuntime(player, runtimeUrl)) {
        try {
            source = fetchText(runtimeUrl);
            fetchedAt = GitLoaderBoot_System.currentTimeMillis();
            fetchedFresh = true;
            cacheRuntimeSource(player, runtimeUrl, source, fetchedAt);
        } catch (e) {
            cacheRuntimeError(player, shortError(e));
            source = getStoredRuntimeSource(player, runtimeUrl);
            fetchedAt = getStoredRuntimeFetchedAt(player, runtimeUrl);
        }
    } else {
        source = getStoredRuntimeSource(player, runtimeUrl);
        fetchedAt = getStoredRuntimeFetchedAt(player, runtimeUrl);
    }

    if (!hasText(source)) {
        throw "runtime loader is unavailable. Check `github_loader/installer.js` and GitHub access.";
    }

    runtime = buildRuntimeModule(source);
    cacheRuntimeModule(player, runtimeKey, runtime, fetchedFresh ? fetchedAt : normalizeTimestamp(fetchedAt));
    return runtime;
}

function requireRuntimeEntry(runtime, key) {
    if (runtime == null || typeof runtime[key] != "function") {
        throw "runtime entry `" + key + "` is missing";
    }
    return runtime[key];
}

function buildRuntimeModule(source) {
    var factory = (1, eval)(
        "(function(){\n" +
        (source == null ? "" : ("" + source)) +
        "\nreturn {" +
        " interact: (typeof interact == 'function' ? interact : null)," +
        " customGuiScroll: (typeof customGuiScroll == 'function' ? customGuiScroll : null)," +
        " customGuiClosed: (typeof customGuiClosed == 'function' ? customGuiClosed : null)" +
        "}; })"
    );
    var runtime = factory();
    if (runtime == null) throw "runtime module did not initialize";
    return runtime;
}

function getCachedRuntimeModule(player, runtimeUrl, forceRefresh) {
    if (player == null) return null;
    if (forceRefresh) return null;

    try {
        var temp = player.getTempdata();
        var module = temp.get(GIT_LOADER_TEMP_RUNTIME_MODULE_KEY);
        var url = trimString(temp.get(GIT_LOADER_TEMP_RUNTIME_URL_KEY));
        var fetchedAt = normalizeTimestamp(temp.get(GIT_LOADER_TEMP_RUNTIME_FETCHED_AT_KEY));
        if (module == null) return null;
        if (url != runtimeUrl) return null;
        if (isTimestampExpired(fetchedAt)) return null;
        return module;
    } catch (e) {
        return null;
    }
}

function cacheRuntimeModule(player, runtimeUrl, runtime, fetchedAt) {
    if (player == null || runtime == null) return;
    try {
        var temp = player.getTempdata();
        temp.put(GIT_LOADER_TEMP_RUNTIME_MODULE_KEY, runtime);
        temp.put(GIT_LOADER_TEMP_RUNTIME_URL_KEY, runtimeUrl);
        temp.put(GIT_LOADER_TEMP_RUNTIME_FETCHED_AT_KEY, "" + normalizeTimestamp(fetchedAt));
    } catch (e) {}
}

function shouldRefreshRuntime(player, runtimeUrl) {
    var storedUrl = getStoredRuntimeUrl(player);
    var storedFetchedAt = getStoredRuntimeFetchedAt(player, runtimeUrl);
    if (!hasText(getStoredRuntimeSource(player, runtimeUrl))) return true;
    if (storedUrl != runtimeUrl) return true;
    return isTimestampExpired(storedFetchedAt);
}

function isTimestampExpired(timestamp) {
    if (timestamp <= 0) return true;
    return GitLoaderBoot_System.currentTimeMillis() - timestamp >= GIT_LOADER_RUNTIME_REFRESH_MS;
}

function cacheRuntimeSource(player, runtimeUrl, source, fetchedAt) {
    if (player == null) return;
    try {
        var stored = player.getStoreddata();
        stored.put(GIT_LOADER_STORED_RUNTIME_SOURCE_KEY, source == null ? "" : ("" + source));
        stored.put(GIT_LOADER_STORED_RUNTIME_URL_KEY, runtimeUrl == null ? "" : ("" + runtimeUrl));
        stored.put(GIT_LOADER_STORED_RUNTIME_FETCHED_AT_KEY, "" + normalizeTimestamp(fetchedAt));
        stored.put(GIT_LOADER_STORED_RUNTIME_ERROR_KEY, "");
    } catch (e) {}
}

function cacheRuntimeError(player, errorText) {
    if (player == null) return;
    try {
        player.getStoreddata().put(GIT_LOADER_STORED_RUNTIME_ERROR_KEY, errorText == null ? "" : ("" + errorText));
    } catch (e) {}
}

function getStoredRuntimeSource(player, runtimeUrl) {
    if (player == null) return "";
    try {
        var stored = player.getStoreddata();
        var storedUrl = trimString(stored.get(GIT_LOADER_STORED_RUNTIME_URL_KEY));
        var source = trimString(stored.get(GIT_LOADER_STORED_RUNTIME_SOURCE_KEY));
        if (!hasText(source)) return "";
        if (hasText(storedUrl) && storedUrl != runtimeUrl) return "";
        return source;
    } catch (e) {
        return "";
    }
}

function getStoredRuntimeUrl(player) {
    if (player == null) return "";
    try {
        return trimString(player.getStoreddata().get(GIT_LOADER_STORED_RUNTIME_URL_KEY));
    } catch (e) {
        return "";
    }
}

function getStoredRuntimeFetchedAt(player, runtimeUrl) {
    if (player == null) return 0;
    try {
        var storedUrl = getStoredRuntimeUrl(player);
        if (hasText(storedUrl) && storedUrl != runtimeUrl) return 0;
        return normalizeTimestamp(player.getStoreddata().get(GIT_LOADER_STORED_RUNTIME_FETCHED_AT_KEY));
    } catch (e) {
        return 0;
    }
}

function getSelfRuntimeUrl(item) {
    var tag = getCustomTag(item);
    if (tag == null) return GIT_LOADER_DEFAULT_RUNTIME_URL;

    var runtimeUrl = readTag(tag, GIT_LOADER_SELF_RUNTIME_URL_KEY);
    return hasText(runtimeUrl) ? runtimeUrl : GIT_LOADER_DEFAULT_RUNTIME_URL;
}

function getRuntimeKey(item, installedSource) {
    if (hasText(installedSource)) {
        return "item://github_loader/" + getInstalledRuntimeSignature(item);
    }
    return getSelfRuntimeUrl(item);
}

function getInstalledRuntimeSource(item) {
    var tag = getCustomTag(item);
    if (tag == null) return "";
    return decodeBundle(readTag(tag, GIT_LOADER_INSTALLED_RUNTIME_SOURCE_KEY));
}

function getInstalledRuntimeSignature(item) {
    var tag = getCustomTag(item);
    if (tag == null) return "installed";

    var signature = readTag(tag, GIT_LOADER_INSTALLED_RUNTIME_SIGNATURE_KEY);
    return hasText(signature) ? signature : "installed";
}

function isLoaderItem(item) {
    var tag = getCustomTag(item);
    return tag != null && readTag(tag, "item_type") == GIT_LOADER_ITEM_TYPE;
}

function getSessionId(item) {
    var tag = getCustomTag(item);
    return tag == null ? "" : readTag(tag, GIT_LOADER_SESSION_KEY);
}

function getCustomTag(item) {
    if (item == null || item.isEmpty()) return null;
    try {
        var customData = item.getMCItemStack().get(GitLoaderBoot_DataComponents.CUSTOM_DATA);
        if (customData == null) return null;
        return customData.copyTag();
    } catch (e) {
        return null;
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

function getActiveLoaderItem(player) {
    try {
        var item = player.getTempdata().get(GIT_LOADER_ACTIVE_ITEM_KEY);
        if (item == null || item.isEmpty()) return null;
        return isLoaderItem(item) ? item : null;
    } catch (e) {
        return null;
    }
}

function getHeldLoaderItemForActiveSession(player) {
    var item = getActiveLoaderItem(player);
    if (item != null) return item;
    return getHeldLoaderItemForSession(player, getActiveSession(player));
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

function fetchText(url) {
    var conn = null;
    var reader = null;
    try {
        conn = new GitLoaderBoot_URL(url).openConnection();
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 CustomNpc-GitHubLoaderBootstrap");
        conn.setRequestProperty("Accept", "text/plain");
        conn.setRequestProperty("Connection", "close");
        conn.setUseCaches(false);
        conn.setConnectTimeout(10000);
        conn.setReadTimeout(20000);

        reader = new GitLoaderBoot_BufferedReader(new GitLoaderBoot_InputStreamReader(conn.getInputStream(), "UTF-8"));
        var out = new GitLoaderBoot_StringBuilder();
        var line;
        while ((line = reader.readLine()) != null) {
            out.append(line).append("\n");
        }
        return "" + out.toString();
    } catch (e) {
        throw "" + e;
    } finally {
        try {
            if (reader != null) reader.close();
        } catch (ignored) {}
    }
}

function decodeBundle(text) {
    try {
        var clean = trimString(text);
        if (!hasText(clean)) return "";
        var bytes = GitLoaderBoot_Base64.getDecoder().decode(clean);
        return "" + new java.lang.String(bytes, GitLoaderBoot_StandardCharsets.UTF_8);
    } catch (e) {
        return "";
    }
}

function readTag(tag, key) {
    try {
        return "" + tag.getString(key);
    } catch (e) {
        return "";
    }
}

function normalizeTimestamp(value) {
    var text = trimString(value);
    if (!hasText(text)) return 0;
    var parsed = parseInt(text, 10);
    return isNaN(parsed) ? 0 : parsed;
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
