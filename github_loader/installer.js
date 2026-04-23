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
var GIT_LOADER_SELF_RUNTIME_URL_KEY = "github_npc_loader_self_runtime_url";
var GIT_LOADER_SELF_RUNTIME_VERSION_KEY = "github_npc_loader_self_runtime_version";
var GIT_LOADER_INSTALLED_PACKAGE_KEY = "github_loader_installed_package";
var GIT_LOADER_INSTALLED_RUNTIME_SOURCE_KEY = "github_loader_installed_runtime_source";
var GIT_LOADER_INSTALLED_RUNTIME_SIGNATURE_KEY = "github_loader_installed_runtime_signature";
var GIT_LOADER_INSTALLED_HOOKS_KEY = "github_loader_installed_hooks";
var GIT_LOADER_INSTALLED_SHARED_KEY = "github_loader_installed_shared";
var GIT_LOADER_TEMP_RUNTIME_MODULE_KEY = "github_loader_runtime_module";
var GIT_LOADER_TEMP_RUNTIME_URL_KEY = "github_loader_runtime_url";
var GIT_LOADER_TEMP_RUNTIME_FETCHED_AT_KEY = "github_loader_runtime_fetched_at";

var GIT_LOADER_HTTP_RETRIES = 4;
var GIT_LOADER_HTTP_RETRY_DELAY_MS = 350;

var GIT_LOADER_GUI_ID = 9321;
var GIT_LOADER_ACTION_SCROLL_ID = 9322;
var GIT_LOADER_URL_FIELD_ID = 9323;
var GIT_LOADER_STATUS_ID = 9324;
var GIT_LOADER_TOKEN_FIELD_ID = 9326;
var GIT_LOADER_ACTIONS = ["Install", "Cancel"];

function interact(event) {
    var item = event.item;
    var player = event.player;

    if (!isLoaderItem(item)) return;

    rememberActiveSession(player, getSessionId(item));
    rememberActiveItem(player, item);

    try {
        player.showCustomGui(createGui(player, item));
    } catch (e) {
        player.message("GitHub Loader installer: GUI error. " + shortError(e));
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

        var sessionId = resolveActiveSession(player);
        if (!hasText(sessionId)) {
            setStatus(gui, [
                "No active item session.",
                "activeItem=" + describeItemForDebug(getActiveLoaderItem(player)),
                "mainhand=" + describeItemForDebug(safeGetMainhandItem(player)),
                "offhand=" + describeItemForDebug(safeGetOffhandItem(player))
            ].join("\n"));
            safeUpdate(gui);
            return;
        }

        handleActionScroll(player, gui, sessionId, scroll);
        safeUpdate(gui);
    } catch (e) {
        try {
            setStatus(event.gui, "GUI error: " + shortError(e));
            safeUpdate(event.gui);
        } catch (ignored) {}
        try {
            event.player.message("GitHub Loader installer: " + shortError(e));
        } catch (ignored2) {}
    }
}

function customGuiClosed(event) {
    try {
        var gui = event.gui;
        var player = event.player;
        if (gui == null || gui.getID() != GIT_LOADER_GUI_ID) return;

        var sessionId = resolveActiveSession(player);
        if (!hasText(sessionId)) {
            var activeItem = getCurrentLoaderItem(player);
            if (activeItem != null && !activeItem.isEmpty()) {
                sessionId = getSessionId(activeItem);
            }
        }
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

function createGui(player, item) {
    var sessionId = getSessionId(item);
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(GIT_LOADER_GUI_ID, 360, 278, false, player);
    var installed = getInstalledPackage(item);

    gui.addLabel(1, "GitHub Loader Installer", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 340, 34, 0x5C8DFF, 1.5);

    gui.addLabel(10, "Repo URL", 10, 42, 100, 14, 0xE0E0E0);
    gui.addTextField(GIT_LOADER_URL_FIELD_ID, 10, 58, 340, 20);

    gui.addLabel(13, "Token", 10, 84, 100, 14, 0xE0E0E0);
    gui.addTextField(GIT_LOADER_TOKEN_FIELD_ID, 10, 100, 340, 20);

    gui.addLabel(11, "Actions", 10, 130, 80, 14, 0xE0E0E0);
    gui.addScroll(GIT_LOADER_ACTION_SCROLL_ID, 10, 146, 90, 52, GIT_LOADER_ACTIONS);

    gui.addLabel(12, "Status", 110, 130, 80, 14, 0xE0E0E0);
    gui.addTextArea(GIT_LOADER_STATUS_ID, 110, 146, 240, 108);

    setGuiText(gui, GIT_LOADER_URL_FIELD_ID, getInitialUrl(player, item, sessionId));
    setGuiText(gui, GIT_LOADER_TOKEN_FIELD_ID, getInitialGithubToken(player));
    setStatus(gui, buildInstallerStatusText(installed));
    return gui;
}

function handleActionScroll(player, gui, sessionId, scroll) {
    var selectedIndex = getSelectedIndex(scroll);
    var selected = normalizeActionSelection(selectedIndex);

    if (selected == "apply") {
        handleApplyAction(player, gui, sessionId);
        return;
    }

    if (selected == "cancel") {
        setStatus(gui, "Canceled.");
        try {
            player.closeGui();
        } catch (e) {}
        return;
    }

    setStatus(gui, "Unknown action index: " + selectedIndex);
}

function handleApplyAction(player, gui, sessionId) {
    var effectiveSessionId = hasText(sessionId) ? sessionId : resolveActiveSession(player);
    var repoUrl = trimString(getGuiText(gui, GIT_LOADER_URL_FIELD_ID));
    var githubToken = trimString(getGuiText(gui, GIT_LOADER_TOKEN_FIELD_ID));
    if (!hasText(repoUrl)) {
        setStatus(gui, "Paste a GitHub repository URL.");
        return;
    }

    var heldItem = getCurrentLoaderItem(player);
    var debugLines = [];
    debugLines.push("sessionId=" + sessionId);
    debugLines.push("effectiveSessionId=" + effectiveSessionId);
    debugLines.push("activeItem=" + describeItemForDebug(heldItem));
    if (heldItem == null || heldItem.isEmpty()) {
        debugLines.push("mainhand=" + describeItemForDebug(safeGetMainhandItem(player)));
        debugLines.push("offhand=" + describeItemForDebug(safeGetOffhandItem(player)));
        setStatus(gui, [
            "Loader item not found.",
            debugLines.join("\n")
        ].join("\n"));
        try {
            player.message("GitHub Loader debug:\n" + debugLines.join("\n"));
        } catch (e0) {}
        return;
    }

    if (!hasText(effectiveSessionId)) {
        effectiveSessionId = getSessionId(heldItem);
        debugLines.push("effectiveSessionFromItem=" + effectiveSessionId);
    }
    if (!hasText(effectiveSessionId)) {
        setStatus(gui, [
            "Loader session is missing on item.",
            debugLines.join("\n")
        ].join("\n"));
        try {
            player.message("GitHub Loader debug:\n" + debugLines.join("\n"));
        } catch (e01) {}
        return;
    }

    player.getStoreddata().put(GIT_LOADER_GUI_URL_PREFIX + effectiveSessionId, repoUrl);
    player.getStoreddata().put(GIT_LOADER_GUI_LAST_URL_KEY, repoUrl);
    player.getStoreddata().put(GIT_LOADER_GUI_TOKEN_KEY, githubToken);

    try {
        var installedPkg = loadLoaderPackageFromRepo(repoUrl, githubToken);
        if (!writeInstalledPackageToItem(player, heldItem, installedPkg, repoUrl)) {
            throw "failed to write installed runtime into item";
        }

        invalidateBootstrapRuntimeCache(player);
        setStatus(gui, "Installed. Reopen the item to use the ready loader.");
        player.message(
            "GitHub Loader: installed from " +
            installedPkg.owner + "/" + installedPkg.repo + "@" + installedPkg.ref +
            " [" + installedPkg.loaderRootPath + "]"
        );

        try {
            player.closeGui();
        } catch (e1) {}
    } catch (e) {
        setStatus(gui, "Install error: " + shortError(e));
        player.message("GitHub Loader install error: " + shortError(e));
    }
}

function loadLoaderPackageFromRepo(repoUrl, githubToken) {
    var parsed = parseGithubTarget(repoUrl);
    var ref = resolveGithubRef(parsed, githubToken);
    var tree = fetchRepoTree(parsed.owner, parsed.repo, ref, githubToken);
    var loaderRootPath = locateLoaderRootPath(parsed.path, tree);
    var files = collectLoaderFiles(parsed.owner, parsed.repo, ref, loaderRootPath, tree, githubToken);
    var runtimeSource = buildInstalledRuntimeSource(files);
    validateInstalledLoaderPayload(files, runtimeSource);

    return {
        sourceUrl: repoUrl,
        owner: parsed.owner,
        repo: parsed.repo,
        ref: ref,
        loaderRootPath: loaderRootPath,
        runtimeSource: runtimeSource,
        files: files,
        installedAt: "" + GitLoader_System.currentTimeMillis()
    };
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

function locateLoaderRootPath(requestedPath, tree) {
    var requested = normalizeSlashes(requestedPath);
    var roots = {};

    for (var i = 0; i < tree.length; i++) {
        var entry = tree[i];
        if (entry == null) continue;
        if (trimString(entry.type) != "blob") continue;

        var cleanPath = normalizeSlashes(entry.path);
        var rootPath = extractLoaderRootPath(cleanPath);
        if (!hasText(rootPath)) continue;
        if (!matchesRequestedScope(requested, rootPath)) continue;
        roots[rootPath] = true;
    }

    var candidates = objectKeys(roots);
    if (candidates.length === 0) {
        throw "folder `github_loader` not found in repository";
    }
    if (candidates.length > 1) {
        throw "multiple `github_loader` folders found: " + candidates.join(" | ");
    }

    return candidates[0];
}

function extractLoaderRootPath(path) {
    var clean = normalizeSlashes(path);
    var marker = "/github_loader/";
    var index = clean.indexOf(marker);

    if (clean == "github_loader/installer.js") return "github_loader";
    if (clean == "github_loader/runtime.js") return "github_loader";
    if (clean.indexOf("github_loader/hooks/") === 0) return "github_loader";
    if (clean.indexOf("github_loader/shared/") === 0) return "github_loader";

    if (index < 0) return "";
    return clean.substring(0, index + marker.length - 1);
}

function matchesRequestedScope(requested, rootPath) {
    if (!hasText(requested)) return true;
    if (requested == rootPath) return true;
    if (requested.indexOf(rootPath + "/") === 0) return true;
    if (rootPath.indexOf(requested + "/") === 0) return true;
    return false;
}

function collectLoaderFiles(owner, repo, ref, loaderRootPath, tree, githubToken) {
    var out = [];

    for (var i = 0; i < tree.length; i++) {
        var entry = tree[i];
        if (entry == null) continue;
        if (trimString(entry.type) != "blob") continue;

        var cleanPath = normalizeSlashes(entry.path);
        if (cleanPath.indexOf(loaderRootPath + "/") !== 0) continue;
        if (!isLoaderRuntimePath(cleanPath, loaderRootPath)) continue;

        out.push({
            path: cleanPath,
            relativePath: cleanPath.substring(loaderRootPath.length + 1),
            body: fetchBlobText(owner, repo, trimString(entry.sha), githubToken)
        });
    }

    out.sort(function(a, b) {
        if (a.relativePath < b.relativePath) return -1;
        if (a.relativePath > b.relativePath) return 1;
        return 0;
    });

    if (out.length === 0) throw "no loader files found inside `" + loaderRootPath + "`";
    if (!hasLoaderFile(out, "hooks/init.js")) throw "required file `" + loaderRootPath + "/hooks/init.js` is missing";
    if (!hasLoaderFile(out, "hooks/interact.js")) throw "required file `" + loaderRootPath + "/hooks/interact.js` is missing";
    if (!hasLoaderSubdirFiles(out, "shared/")) throw "folder `" + loaderRootPath + "/shared` is missing";
    return out;
}

function isLoaderRuntimePath(path, loaderRootPath) {
    var relative = path.substring(loaderRootPath.length + 1);
    if (relative == "installer.js") return true;
    if (relative == "runtime.js") return true;
    if (relative.indexOf("hooks/") === 0 && isJsPath(relative)) return true;
    if (relative.indexOf("shared/") === 0 && isJsPath(relative)) return true;
    return false;
}

function hasLoaderSubdirFiles(files, prefix) {
    for (var i = 0; i < files.length; i++) {
        if (files[i] != null && files[i].relativePath.indexOf(prefix) === 0) return true;
    }
    return false;
}

function hasLoaderFile(files, relativePath) {
    var wanted = normalizeSlashes(relativePath);
    for (var i = 0; i < files.length; i++) {
        if (files[i] != null && normalizeSlashes(files[i].relativePath) == wanted) return true;
    }
    return false;
}

function buildInstalledRuntimeSource(files) {
    var readyInteractSource = findLoaderFileBody(files, "hooks/interact.js");
    if (hasText(readyInteractSource)) return readyInteractSource;

    var runtimeSource = findLoaderFileBody(files, "runtime.js");
    if (hasText(runtimeSource)) return runtimeSource;

    throw "loader runtime source is missing. Expected `github_loader/hooks/interact.js` or `github_loader/runtime.js`.";
}

function validateInstalledLoaderPayload(files, runtimeSource) {
    if (!hasText(runtimeSource)) throw "installed runtime source is empty";
    validateRuntimeModuleSource(runtimeSource, "installed runtime");

    var initSource = findLoaderFileBody(files, "hooks/init.js");
    validateRuntimeModuleSource(initSource, "hooks/init.js");

    var sharedCount = 0;
    for (var i = 0; i < files.length; i++) {
        if (files[i] != null && normalizeSlashes(files[i].relativePath).indexOf("shared/") === 0) {
            sharedCount++;
            validateRuntimeModuleSource(files[i].body, files[i].relativePath);
        }
    }
    if (sharedCount <= 0) throw "loader shared payload is empty";
}

function validateRuntimeModuleSource(source, label) {
    if (!hasText(source)) throw label + " is empty";
    try {
        (1, eval)(
            "(function(){\n" +
            source +
            "\nreturn {" +
            " interact: (typeof interact == 'function' ? interact : null)," +
            " customGuiScroll: (typeof customGuiScroll == 'function' ? customGuiScroll : null)," +
            " customGuiClosed: (typeof customGuiClosed == 'function' ? customGuiClosed : null)" +
            "}; })"
        );
    } catch (e) {
        throw label + " is not executable: " + shortError(e);
    }
}

function findLoaderFileBody(files, relativePath) {
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file != null && normalizeSlashes(file.relativePath) == normalizeSlashes(relativePath)) {
            return file.body == null ? "" : ("" + file.body);
        }
    }
    return "";
}

function writeInstalledPackageToItem(player, item, pkg, repoUrl) {
    var tag = getCustomTag(item);
    if (tag == null) return false;

    var signature = buildInstalledRuntimeSignature(pkg);
    var split = splitLoaderFiles(pkg.files);
    var oldFirmware = snapshotItemFirmware(item);
    var rewrite = rewriteItemFirmware(item, split.hooks);
    if (!rewrite.ok) {
        restoreItemFirmware(item, oldFirmware);
        throw "failed to rewrite item firmware: " + rewrite.error;
    }

    tag.putString(GIT_LOADER_MODE_KEY, "ready");
    tag.putString(GIT_LOADER_LAST_URL_KEY, trimString(repoUrl));
    tag.putString(GIT_LOADER_INSTALLED_PACKAGE_KEY, encodeBundle(JSON.stringify({
        sourceUrl: pkg.sourceUrl,
        owner: pkg.owner,
        repo: pkg.repo,
        ref: pkg.ref,
        loaderRootPath: pkg.loaderRootPath,
        installedAt: pkg.installedAt,
        files: buildFileSummary(pkg.files)
    })));
    tag.putString(GIT_LOADER_INSTALLED_RUNTIME_SOURCE_KEY, encodeBundle(pkg.runtimeSource));
    tag.putString(GIT_LOADER_INSTALLED_RUNTIME_SIGNATURE_KEY, signature);
    tag.putString(GIT_LOADER_INSTALLED_HOOKS_KEY, encodeBundle(JSON.stringify(split.hooks)));
    tag.putString(GIT_LOADER_INSTALLED_SHARED_KEY, encodeBundle(JSON.stringify(split.shared)));
    tag.putString(GIT_LOADER_SELF_RUNTIME_URL_KEY, "item://github_loader/" + signature);
    tag.putString(GIT_LOADER_SELF_RUNTIME_VERSION_KEY, signature);
    if (!writeHeldTag(player, item, tag)) {
        restoreItemFirmware(item, oldFirmware);
        return false;
    }
    return true;
}

function buildFileSummary(files) {
    var out = [];
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file == null) continue;
        out.push({
            path: file.path,
            relativePath: file.relativePath,
            chars: file.body == null ? 0 : ("" + file.body).length
        });
    }
    return out;
}

function snapshotItemFirmware(item) {
    var out = {};
    out["0"] = getScriptContainerSource(item, 0);
    out["2"] = getScriptContainerSource(item, 2);
    out["48"] = getScriptContainerSource(item, 48);
    out["51"] = getScriptContainerSource(item, 51);
    return out;
}

function restoreItemFirmware(item, snapshot) {
    if (snapshot == null) return;
    setScriptContainerSource(item.scripts, 0, snapshot["0"]);
    setScriptContainerSource(item.scripts, 2, snapshot["2"]);
    setScriptContainerSource(item.scripts, 48, snapshot["48"]);
    setScriptContainerSource(item.scripts, 51, snapshot["51"]);
    try {
        item.saveScriptData();
    } catch (e) {}
}

function getScriptContainerSource(item, index) {
    try {
        if (item == null || item.scripts == null) return "";
        var container = null;
        try {
            container = item.scripts[index];
        } catch (e1) {}
        if (container == null && item.scripts.get != null) {
            try {
                container = item.scripts.get(index);
            } catch (e2) {}
        }
        return container == null ? "" : ("" + container.script);
    } catch (e) {
        return "";
    }
}

function rewriteItemFirmware(item, hookFiles) {
    try {
        var initSource = findFileInList(hookFiles, "hooks/init.js");
        var interactSource = findFileInList(hookFiles, "hooks/interact.js");
        if (!hasText(initSource)) return { ok: false, error: "hooks/init.js missing" };
        if (!hasText(interactSource)) return { ok: false, error: "hooks/interact.js missing" };
        if (item == null || item.scripts == null) return { ok: false, error: "item script list unavailable" };

        setScriptContainerSource(item.scripts, 0, initSource);
        setScriptContainerSource(item.scripts, 2, interactSource);
        setScriptContainerSource(item.scripts, 48, interactSource);
        setScriptContainerSource(item.scripts, 51, interactSource);

        try {
            item.enabled = true;
        } catch (e1) {}
        try {
            item.saveScriptData();
        } catch (e2) {}
        return { ok: true, error: "" };
    } catch (e) {
        return { ok: false, error: shortError(e) };
    }
}

function setScriptContainerSource(scripts, index, source) {
    var container = null;
    try {
        container = scripts[index];
    } catch (e1) {}
    if (container == null && scripts.get != null) {
        try {
            container = scripts.get(index);
        } catch (e2) {}
    }
    if (container == null) return false;
    container.script = source == null ? "" : ("" + source);
    container.fullscript = source == null ? "" : ("" + source);
    try {
        container.errored = false;
    } catch (e3) {}
    return true;
}

function findFileInList(files, relativePath) {
    var wanted = normalizeSlashes(relativePath);
    for (var i = 0; i < files.length; i++) {
        if (files[i] != null && normalizeSlashes(files[i].relativePath) == wanted) {
            return files[i].body == null ? "" : ("" + files[i].body);
        }
    }
    return "";
}

function splitLoaderFiles(files) {
    var hooks = [];
    var shared = [];
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (file == null) continue;
        var rel = normalizeSlashes(file.relativePath);
        if (rel.indexOf("hooks/") === 0) hooks.push(file);
        if (rel.indexOf("shared/") === 0) shared.push(file);
    }
    return { hooks: hooks, shared: shared };
}

function buildInstalledRuntimeSignature(pkg) {
    return [
        trimString(pkg.owner),
        trimString(pkg.repo),
        trimString(pkg.ref),
        trimString(pkg.loaderRootPath),
        trimString(pkg.installedAt)
    ].join("@");
}

function getInstalledPackage(item) {
    var tag = getCustomTag(item);
    if (tag == null) return null;

    try {
        var encoded = readTag(tag, GIT_LOADER_INSTALLED_PACKAGE_KEY);
        var decoded = decodeBundle(encoded);
        if (!hasText(decoded)) return null;
        return JSON.parse(decoded);
    } catch (e) {
        return null;
    }
}

function buildInstallerStatusText(installed) {
    if (installed == null) {
        return [
            "Installed: no",
            "Repo: -",
            "Path: -",
            "Files: 0"
        ].join("\n");
    }

    return [
        "Installed: yes",
        "Repo: " + (hasText(installed.owner) && hasText(installed.repo) ? (installed.owner + "/" + installed.repo) : "-"),
        "Path: " + (hasText(installed.loaderRootPath) ? installed.loaderRootPath : "-"),
        "Files: " + (installed.files == null ? 0 : installed.files.length)
    ].join("\n");
}

function invalidateBootstrapRuntimeCache(player) {
    if (player == null) return;
    try {
        player.getTempdata().remove(GIT_LOADER_TEMP_RUNTIME_MODULE_KEY);
    } catch (e1) {}
    try {
        player.getTempdata().remove(GIT_LOADER_TEMP_RUNTIME_URL_KEY);
    } catch (e2) {}
    try {
        player.getTempdata().remove(GIT_LOADER_TEMP_RUNTIME_FETCHED_AT_KEY);
    } catch (e3) {}
}

function parseGithubTarget(url) {
    var clean = trimString(url).replace(/^https?:\/\/www\.github\.com\//i, "https://github.com/");
    clean = clean.replace(/\/+$/, "");

    var match = clean.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/(.*))?$/i);
    if (match == null) throw "only github.com URLs are supported";

    var owner = trimString(match[1]);
    var repo = trimString(match[2]).replace(/\.git$/i, "");
    var tail = trimString(match[3]);
    var parts = hasText(tail) ? tail.split("/") : [];
    var ref = "";
    var path = "";

    if (parts.length > 0) {
        if (parts[0] == "tree" || parts[0] == "blob") {
            if (parts.length < 2) throw "GitHub URL is missing branch name";
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
        conn.setRequestProperty("User-Agent", "Mozilla/5.0 CustomNpc-GitHubLoaderInstaller");
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
            if (code == "401") throw "HTTP 401: invalid GitHub token";
            if (code == "403" && errorText.toLowerCase().indexOf("rate limit") >= 0) {
                throw "HTTP 403: GitHub API rate limit exceeded";
            }
            throw hasText(errorText)
                ? ("HTTP " + code + ": " + shortError(errorText))
                : ("HTTP " + code);
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

function sleepMs(ms) {
    try {
        GitLoader_Thread.sleep(ms);
    } catch (e) {}
}

function buildGithubRawUrl(owner, repo, ref, path) {
    return "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + encodePath(ref) + "/" + encodePath(path);
}

function getInitialUrl(player, item, sessionId) {
    var tag = getCustomTag(item);
    var itemUrl = tag == null ? "" : readTag(tag, GIT_LOADER_LAST_URL_KEY);
    if (hasText(itemUrl)) return itemUrl;

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

function safeGetMainhandItem(player) {
    try {
        return player.getMainhandItem();
    } catch (e) {
        return null;
    }
}

function safeGetOffhandItem(player) {
    try {
        return player.getOffhandItem();
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

function resolveActiveSession(player) {
    var sessionId = getActiveSession(player);
    if (hasText(sessionId)) return sessionId;

    var item = getActiveLoaderItem(player);
    if (item != null && !item.isEmpty()) {
        sessionId = getSessionId(item);
        if (hasText(sessionId)) {
            rememberActiveSession(player, sessionId);
            return sessionId;
        }
    }

    item = safeGetMainhandItem(player);
    if (item != null && !item.isEmpty() && isLoaderItem(item)) {
        sessionId = getSessionId(item);
        if (hasText(sessionId)) {
            rememberActiveSession(player, sessionId);
            rememberActiveItem(player, item);
            return sessionId;
        }
    }

    item = safeGetOffhandItem(player);
    if (item != null && !item.isEmpty() && isLoaderItem(item)) {
        sessionId = getSessionId(item);
        if (hasText(sessionId)) {
            rememberActiveSession(player, sessionId);
            rememberActiveItem(player, item);
            return sessionId;
        }
    }

    return "";
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

function getCurrentLoaderItem(player) {
    var item = getActiveLoaderItem(player);
    if (item != null && !item.isEmpty()) return item;

    item = safeGetMainhandItem(player);
    if (item != null && !item.isEmpty() && isLoaderItem(item)) return item;

    item = safeGetOffhandItem(player);
    if (item != null && !item.isEmpty() && isLoaderItem(item)) return item;

    return null;
}

function describeItemForDebug(item) {
    if (item == null) return "null";

    var parts = [];
    try {
        if (item.isEmpty()) {
            parts.push("empty=true");
        } else {
            parts.push("empty=false");
        }
    } catch (e1) {
        parts.push("empty=?");
    }

    try {
        parts.push("loader=" + isLoaderItem(item));
    } catch (e2) {
        parts.push("loader=?");
    }

    try {
        parts.push("session=" + getSessionId(item));
    } catch (e3) {
        parts.push("session=?");
    }

    try {
        parts.push("name=" + trimString(item.getDisplayName()));
    } catch (e4) {}

    return parts.join(", ");
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
    if (index === 0) return "apply";
    if (index === 1) return "cancel";
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

function setStatus(gui, text) {
    setGuiText(gui, GIT_LOADER_STATUS_ID, text);
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
    try {
        var bytes = GitLoader_Base64.getDecoder().decode(trimString(text));
        return "" + new java.lang.String(bytes, GitLoader_StandardCharsets.UTF_8);
    } catch (e) {
        return "";
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

function isJsPath(path) {
    return /\.js$/i.test(trimString(path));
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
