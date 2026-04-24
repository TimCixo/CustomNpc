var GitLoader_NpcAPI = Java.type("noppes.npcs.api.NpcAPI");
var GitLoader_DataComponents = Java.type("net.minecraft.core.component.DataComponents");
var GitLoader_CustomData = Java.type("net.minecraft.world.item.component.CustomData");
var GitLoader_CompoundTag = Java.type("net.minecraft.nbt.CompoundTag");
var GitLoader_ListTag = Java.type("net.minecraft.nbt.ListTag");
var GitLoader_URL = Java.type("java.net.URL");
var GitLoader_URLEncoder = Java.type("java.net.URLEncoder");
var GitLoader_InputStreamReader = Java.type("java.io.InputStreamReader");
var GitLoader_BufferedReader = Java.type("java.io.BufferedReader");
var GitLoader_StringBuilder = Java.type("java.lang.StringBuilder");
var GitLoader_Base64 = Java.type("java.util.Base64");
var GitLoader_StandardCharsets = Java.type("java.nio.charset.StandardCharsets");

var ITEM_TYPE = "github_npc_loader_tool";
var ITEM_LAST_URL_KEY = "github_loader_last_url";
var ITEM_PACKAGE_MANIFEST_KEY = "github_loader_downloaded_package";
var PLAYER_ACTIVE_ITEM_KEY = "github_loader_active_item";
var PLAYER_TOKEN_KEY = "github_loader_token";
var PLAYER_PREVIEW_CACHE_KEY = "github_loader_preview_cache";

var NPC_SHARED_MANIFEST_KEY = "github_npc_loader_shared_sources_manifest";
var NPC_SHARED_CHUNK_PREFIX = "github_npc_loader_shared_source_";

var GUI_ID = 9321;
var ACTION_SCROLL_ID = 9322;
var URL_FIELD_ID = 9323;
var STATUS_ID = 9324;
var TOKEN_FIELD_ID = 9326;
var ACTIONS = ["Update", "Preview", "Clear"];

var PREVIEW_GUI_ID = 9331;
var PREVIEW_SCROLL_ID = 9332;
var PREVIEW_CODE_ID = 9333;
var PREVIEW_STATUS_ID = 9334;
var PREVIEW_BACK_ID = 9335;

var SHARED_CHUNK_SIZE = 12000;
var PREVIEW_MAX_CHARS = 12000;
var HOOK_ORDER = ["init", "interact", "customGuiScroll", "customGuiClosed", "timer", "target", "attack", "damaged", "meleeAttack", "killed", "kills", "died", "collide"];

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
    if (event.gui == null) return;

    if (event.gui.getID() == GUI_ID) {
        var item = getActiveLoaderItem(event.player);
        if (item == null || item.isEmpty()) return;
        writeLastUrl(item, trimString(getGuiText(event.gui, URL_FIELD_ID)));
        event.player.getStoreddata().put(PLAYER_TOKEN_KEY, trimString(getGuiText(event.gui, TOKEN_FIELD_ID)));
        return;
    }

    if (event.gui.getID() == PREVIEW_GUI_ID) {
        clearPreviewCache(event.player);
    }
}

function createMainGui(player, item) {
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(GUI_ID, 390, 294, false, player);
    var manifest = getDownloadedManifest(item);

    gui.addLabel(1, "GitHub NPC Loader", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 370, 34, 0x5C8DFF, 1.5);
    gui.addLabel(10, "GitHub URL", 10, 42, 100, 14, 0xE0E0E0);
    gui.addTextField(URL_FIELD_ID, 10, 58, 370, 20);
    gui.addLabel(11, "GitHub Token", 10, 84, 100, 14, 0xE0E0E0);
    gui.addTextField(TOKEN_FIELD_ID, 10, 100, 370, 20);
    gui.addLabel(12, "Actions", 10, 130, 80, 14, 0xE0E0E0);
    gui.addScroll(ACTION_SCROLL_ID, 10, 146, 104, 82, ACTIONS);
    gui.addLabel(13, "Status", 124, 130, 80, 14, 0xE0E0E0);
    gui.addTextArea(STATUS_ID, 124, 146, 256, 124);

    setGuiText(gui, URL_FIELD_ID, readTag(getTag(item), ITEM_LAST_URL_KEY));
    setGuiText(gui, TOKEN_FIELD_ID, trimString(player.getStoreddata().get(PLAYER_TOKEN_KEY)));
    setStatus(gui, buildManifestStatus(manifest));
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
        updateNpcPackageManifest(player, item, gui);
        return true;
    }
    if (selected === 1) {
        return openPreviewGui(player, item, gui);
    }
    if (selected === 2) {
        clearDownloadedManifest(item, player);
        clearPreviewCache(player);
        setStatus(gui, "Updated package cleared.");
        return true;
    }
    return true;
}

function updateNpcPackageManifest(player, item, gui) {
    var url = trimString(getGuiText(gui, URL_FIELD_ID));
    var token = trimString(getGuiText(gui, TOKEN_FIELD_ID));
    if (!hasText(url)) {
        setStatus(gui, "Paste a GitHub URL.");
        return;
    }

    var manifest = loadNpcPackageManifest(url, token);
    writeDownloadedManifest(item, manifest, url);
    player.getStoreddata().put(PLAYER_TOKEN_KEY, token);
    clearPreviewCache(player);
    setStatus(gui, buildManifestStatus(manifest));
    player.message("GitHub Loader: package manifest updated.");
}

function openPreviewGui(player, item, gui) {
    var manifest = getDownloadedManifest(item);
    if (manifest == null) {
        setStatus(gui, "Update a package first.");
        return true;
    }
    clearPreviewCache(player);
    player.showCustomGui(createPreviewGui(player, item, manifest));
    return false;
}

function createPreviewGui(player, item, manifest) {
    var gui = GitLoader_NpcAPI.Instance().createCustomGui(PREVIEW_GUI_ID, 560, 320, false, player);
    gui.addLabel(1, "Package Preview", 10, 10, 220, 18, 0xFFFFFF);
    gui.addColoredLine(2, 10, 34, 540, 34, 0x5C8DFF, 1.5);
    gui.addLabel(10, "Files", 10, 42, 80, 14, 0xE0E0E0);
    gui.addScroll(PREVIEW_SCROLL_ID, 10, 58, 200, 214, buildPreviewEntries(manifest));
    gui.addScroll(PREVIEW_BACK_ID, 10, 280, 200, 24, ["Back"]);
    gui.addLabel(11, "Code", 220, 42, 80, 14, 0xE0E0E0);
    gui.addTextArea(PREVIEW_STATUS_ID, 220, 58, 330, 32);
    gui.addTextArea(PREVIEW_CODE_ID, 220, 96, 330, 208);
    renderPreview(player, item, gui, manifest, 0);
    return gui;
}

function handlePreviewScroll(player, gui, scroll) {
    if (scroll == null) return true;

    if (scroll.getID() == PREVIEW_BACK_ID) {
        var item = getActiveLoaderItem(player);
        clearPreviewCache(player);
        if (item != null && !item.isEmpty()) player.showCustomGui(createMainGui(player, item));
        return false;
    }

    if (scroll.getID() != PREVIEW_SCROLL_ID) return true;

    var item = getActiveLoaderItem(player);
    var manifest = item == null ? null : getDownloadedManifest(item);
    if (manifest == null) {
        setPreviewStatus(gui, "No updated package.");
        setPreviewCode(gui, "");
        return true;
    }

    renderPreview(player, item, gui, manifest, getSelectedIndex(scroll));
    return true;
}

function renderPreview(player, item, gui, manifest, index) {
    var files = getManifestFiles(manifest);
    if (files.length === 0) {
        setPreviewStatus(gui, "Preview is empty.");
        setPreviewCode(gui, "");
        return;
    }

    if (index < 0 || index >= files.length) index = 0;
    var file = files[index];
    var body = "";
    try {
        body = fetchPreviewBody(player, file, manifest);
    } catch (e) {
        setPreviewStatus(gui, "Preview failed: " + e);
        setPreviewCode(gui, "");
        return;
    }

    setPreviewStatus(gui, file.kind + " | " + file.relativePath + " | size=" + file.size + " | sha=" + shortenSha(file.sha));
    if (!hasText(body)) {
        setPreviewCode(gui, "// Empty file");
        return;
    }
    setPreviewCode(gui, body.length > PREVIEW_MAX_CHARS ? body.substring(0, PREVIEW_MAX_CHARS) + "\n\n// --- preview truncated ---" : body);
}

function fetchPreviewBody(player, file, manifest) {
    var cache = getPreviewCache(player);
    if (cache[file.sha] != null) return "" + cache[file.sha];

    var token = trimString(player.getStoreddata().get(PLAYER_TOKEN_KEY));
    var body = fetchBlobText(manifest.owner, manifest.repo, file.sha, token);
    cache[file.sha] = body;
    writePreviewCache(player, cache);
    return body;
}

function applyPackageToNpc(player, npc, item) {
    if (!isNpcTarget(npc)) {
        player.message("GitHub Loader: target is not a CustomNPC.");
        var targetInfo = describeTarget(npc);
        if (hasText(targetInfo)) player.message("GitHub Loader: " + targetInfo);
        return;
    }

    var manifest = getDownloadedManifest(item);
    if (manifest == null) {
        player.message("GitHub Loader: update a package first.");
        return;
    }

    var token = trimString(player.getStoreddata().get(PLAYER_TOKEN_KEY));
    var pkg = null;
    try {
        pkg = materializePackage(manifest, token);
    } catch (e) {
        player.message("GitHub Loader: package download failed: " + e);
        return;
    }

    var storeddataWritten = false;
    var hooksStored = 0;
    var scriptResult = { attempted: false, written: 0, total: 0, error: "", namesWritten: [], skipped: [], usedNbt: false };

    try {
        writeNpcStoreddataPackage(npc, pkg);
        storeddataWritten = true;
        hooksStored = pkg.hooks.length;
    } catch (e1) {
        player.message("GitHub Loader: failed to write NPC storeddata: " + e1);
        return;
    }

    scriptResult = writeNpcScriptTabs(npc, pkg.hooks);
    if (scriptResult.usedNbt) {
        try {
            writeNpcStoreddataPackage(npc, pkg);
        } catch (e2) {
            if (!hasText(scriptResult.error)) scriptResult.error = "storeddata restore failed after NBT write: " + e2;
        }
    }

    try {
        npc.updateClient();
    } catch (e3) {}

    var parts = [];
    if (storeddataWritten) parts.push("storeddata written");
    parts.push("hooks=" + hooksStored);
    if (scriptResult.attempted) {
        if (scriptResult.written > 0 && scriptResult.total > 0) {
            parts.push("script tabs written=" + scriptResult.written + "/" + scriptResult.total);
        } else if (hasText(scriptResult.error)) {
            parts.push("script tabs not written");
        } else {
            parts.push("Script tabs unavailable");
        }
    } else {
        parts.push("Script tabs unavailable");
    }
    player.message("GitHub Loader: " + parts.join(", ") + ".");
    if (scriptResult.namesWritten != null && scriptResult.namesWritten.length > 0) {
        player.message("GitHub Loader: written: " + scriptResult.namesWritten.join(", "));
    }
    if (scriptResult.skipped != null && scriptResult.skipped.length > 0) {
        player.message("GitHub Loader: skipped: " + scriptResult.skipped.join(", "));
    }
    if (scriptResult.attempted && hasText(scriptResult.error) && scriptResult.error != "script tabs unavailable") {
        player.message("GitHub Loader: script tab error: " + scriptResult.error);
    }
}

function materializePackage(manifest, token) {
    var hooks = [];
    var shared = [];
    var i;

    for (i = 0; i < manifest.hooks.length; i++) {
        hooks.push(materializeManifestFile(manifest, manifest.hooks[i], "hook", token));
    }
    for (i = 0; i < manifest.shared.length; i++) {
        shared.push(materializeManifestFile(manifest, manifest.shared[i], "shared", token));
    }

    sortHooks(hooks);
    return {
        sourceUrl: manifest.sourceUrl,
        owner: manifest.owner,
        repo: manifest.repo,
        ref: manifest.ref,
        rootPath: manifest.rootPath,
        totalFiles: manifest.totalFiles,
        totalSize: manifest.totalSize,
        hooks: hooks,
        shared: shared
    };
}

function materializeManifestFile(manifest, file, kind, token) {
    var body = fetchBlobText(manifest.owner, manifest.repo, file.sha, token);
    var compacted = compactSource(body);
    validateScript(compacted, file.relativePath);
    var out = {
        path: file.path,
        relativePath: file.relativePath,
        sha: file.sha,
        size: file.size,
        body: compacted
    };
    if (kind == "hook") out.hook = file.hook;
    return out;
}

function writeNpcStoreddataPackage(npc, pkg) {
    var data = npc.getStoreddata();
    data.put("__github_loader_package", JSON.stringify({
        sourceUrl: pkg.sourceUrl,
        owner: pkg.owner,
        repo: pkg.repo,
        ref: pkg.ref,
        rootPath: pkg.rootPath,
        totalFiles: pkg.totalFiles,
        totalSize: pkg.totalSize
    }));
    writeNpcSharedSources(data, pkg.shared);
    data.put("__shared", buildNpcSharedFactory());
    writeNpcHooks(data, pkg.hooks);
}

function writeNpcSharedSources(data, sharedFiles) {
    clearNpcSharedSourceChunks(data);

    var manifest = [];
    for (var i = 0; i < sharedFiles.length; i++) {
        var file = sharedFiles[i];
        var sourceId = makeSharedSourceId(file.relativePath, i);
        var chunks = splitIntoChunks(file.body, SHARED_CHUNK_SIZE);
        var chunkCount = chunks.length;
        manifest.push({
            id: sourceId,
            path: normalizePath(file.path == null ? file.relativePath : file.path),
            relativePath: normalizePath(file.relativePath),
            chunkCount: chunkCount,
            size: file.body.length
        });
        data.put(NPC_SHARED_CHUNK_PREFIX + sourceId + "_chunk_count", "" + chunkCount);
        for (var j = 0; j < chunkCount; j++) {
            data.put(NPC_SHARED_CHUNK_PREFIX + sourceId + "_chunk_" + j, chunks[j]);
        }
    }

    data.put(NPC_SHARED_MANIFEST_KEY, JSON.stringify(manifest));
    try {
        data.remove("github_npc_loader_shared_sources");
    } catch (e) {}
}

function clearNpcSharedSourceChunks(data) {
    var oldManifest = parseJsonSafe(data.get(NPC_SHARED_MANIFEST_KEY));
    if (oldManifest == null || !isArray(oldManifest)) {
        try {
            data.remove(NPC_SHARED_MANIFEST_KEY);
        } catch (e) {}
        return;
    }

    for (var i = 0; i < oldManifest.length; i++) {
        var entry = oldManifest[i];
        if (entry == null || !hasText(entry.id)) continue;
        var chunkCount = parseIntSafe(entry.chunkCount, 0);
        data.remove(NPC_SHARED_CHUNK_PREFIX + entry.id + "_chunk_count");
        for (var j = 0; j < chunkCount; j++) {
            data.remove(NPC_SHARED_CHUNK_PREFIX + entry.id + "_chunk_" + j);
        }
    }
    data.remove(NPC_SHARED_MANIFEST_KEY);
}

function writeNpcHooks(data, hooks) {
    var oldCount = parseIntSafe(data.get("github_loader_hook_count"), 0);
    var i;
    for (i = 0; i < oldCount; i++) {
        data.remove("github_loader_hook_" + i + "_name");
        data.remove("github_loader_hook_" + i + "_path");
        data.remove("github_loader_hook_" + i + "_body");
    }
    for (i = 0; i < hooks.length; i++) {
        data.put("github_loader_hook_" + i + "_name", hooks[i].hook);
        data.put("github_loader_hook_" + i + "_path", hooks[i].relativePath);
        data.put("github_loader_hook_" + i + "_body", hooks[i].body);
    }
    data.put("github_loader_hook_count", "" + hooks.length);
}

function writeNpcScriptTabs(npc, hooks) {
    var result = { attempted: false, written: 0, total: hooks == null ? 0 : hooks.length, error: "", namesWritten: [], skipped: [], usedNbt: false };
    try {
        var handler = getNpcScriptHandler(npc);
        if (handler == null || handler.scripts == null) {
            result.error = "script tabs unavailable";
            return writeNpcScriptTabsViaNbt(npc, hooks, result);
        }

        var scripts = handler.scripts;
        var scriptCount = getCollectionSize(scripts);
        if (scriptCount <= 0) {
            result.error = "script tabs unavailable";
            return writeNpcScriptTabsViaNbt(npc, hooks, result);
        }

        var requiredCount = getRequiredScriptCount(hooks);
        if (scriptCount < requiredCount) {
            return writeNpcScriptTabsViaNbt(npc, hooks, result);
        }

        result.attempted = true;
        for (var i = 0; i < hooks.length; i++) {
            var slot = hookIndex(hooks[i].hook);
            if (slot < 0) {
                result.skipped.push(hooks[i].hook);
                continue;
            }

            var container = getCollectionValue(scripts, slot);
            if (container == null) {
                return writeNpcScriptTabsViaNbt(npc, hooks, result);
            }

            container.script = hooks[i].body;
            container.fullscript = hooks[i].body;
            result.written++;
            result.namesWritten.push(hooks[i].hook);
        }

        handler.enabled = true;
        if (handler.saveScriptData != null) handler.saveScriptData();
        if (handler.loadScriptData != null) handler.loadScriptData();
        return result;
    } catch (e) {
        result.attempted = true;
        result.error = "" + e;
        return result;
    }
}

function writeNpcScriptTabsViaNbt(npc, hooks, result) {
    var nbt = getNpcNbt(npc);
    if (nbt == null) {
        result.attempted = false;
        result.error = "script tabs unavailable";
        return result;
    }

    result.attempted = true;
    result.usedNbt = true;
    try {
        nbt.mcSetTag("Scripts", buildScriptsMcTag(hooks));
        nbt.setBoolean("ScriptEnabled", true);
        nbt.putString("ScriptLanguage", "ECMAScript");
        setNpcNbt(npc, nbt);

        for (var i = 0; i < hooks.length; i++) {
            if (hookIndex(hooks[i].hook) < 0) {
                result.skipped.push(hooks[i].hook);
                continue;
            }
            result.written++;
            result.namesWritten.push(hooks[i].hook);
        }

        if (!hasText(result.error)) result.error = "";
        return result;
    } catch (e) {
        result.error = "" + e;
        return result;
    }
}

function buildScriptsMcTag(hooks) {
    var scriptsTag = new GitLoader_ListTag();
    var hookMap = {};
    for (var i = 0; i < hooks.length; i++) {
        if (hooks[i] != null && hasText(hooks[i].hook)) hookMap[hooks[i].hook] = hooks[i];
    }
    for (var j = 0; j < HOOK_ORDER.length; j++) {
        var hookName = HOOK_ORDER[j];
        scriptsTag.add(createRootScriptEntry(hookMap[hookName], hookName));
    }
    return scriptsTag;
}

function createRootScriptEntry(hookFile, hookName) {
    var rootTag = new GitLoader_CompoundTag();
    var body = hookFile == null || hookFile.body == null ? "" : "" + hookFile.body;
    rootTag.putString("Script", body);
    rootTag.put("Console", new GitLoader_ListTag());
    rootTag.put("ScriptList", new GitLoader_ListTag());
    rootTag.putString("GitHubHook", hookName == null ? "" : "" + hookName);
    rootTag.putString("GitHubPath", hookFile == null || hookFile.relativePath == null ? "" : "" + hookFile.relativePath);
    return rootTag;
}

function buildNpcSharedFactory() {
    var source = "(function(event){\n";
    source += "var npc=event==null?null:event.npc;\n";
    source += "if(npc==null||npc.getStoreddata==null)throw 'Shared coordinator `__shared` is missing';\n";
    source += "var data=npc.getStoreddata();\n";
    source += "var manifestRaw=''+data.get(" + JSON.stringify(NPC_SHARED_MANIFEST_KEY) + ");\n";
    source += "if(manifestRaw==null||manifestRaw==''||manifestRaw=='null'||manifestRaw=='undefined')throw 'Shared coordinator `__shared` is missing';\n";
    source += "var manifest=JSON.parse(manifestRaw);\n";
    source += "var sourceMap={};\n";
    source += "var moduleCache={};\n";
    source += "function normalizeSharedPath(path){return (''+path).replace(/\\\\/g,'/').replace(/^\\/+|\\/+$/g,'').replace(/^shared\\//,'');}\n";
    source += "function rebuildChunks(entry){\n";
    source += "var base=" + JSON.stringify(NPC_SHARED_CHUNK_PREFIX) + "+entry.id;\n";
    source += "var count=parseInt(''+data.get(base+'_chunk_count'),10);\n";
    source += "if(isNaN(count))count=parseInt(entry.chunkCount,10);\n";
    source += "var out='';\n";
    source += "for(var i=0;i<count;i++)out+=''+data.get(base+'_chunk_'+i);\n";
    source += "return out;\n";
    source += "}\n";
    source += "for(var i=0;i<manifest.length;i++){\n";
    source += "var entry=manifest[i];\n";
    source += "var relative=normalizeSharedPath(entry.relativePath);\n";
    source += "var full=normalizeSharedPath(entry.path);\n";
    source += "var body=rebuildChunks(entry);\n";
    source += "sourceMap[relative]=body;\n";
    source += "sourceMap[full]=body;\n";
    source += "if(full.indexOf('shared/')===0)sourceMap[full.substring('shared/'.length)]=body;\n";
    source += "}\n";
    source += "function resolveSharedSource(path){\n";
    source += "var normalized=normalizeSharedPath(path);\n";
    source += "var candidates=[normalized,'shared/'+normalized,'/'+normalized,'/shared/'+normalized];\n";
    source += "for(var i=0;i<candidates.length;i++){if(Object.prototype.hasOwnProperty.call(sourceMap,candidates[i]))return {key:candidates[i],source:''+sourceMap[candidates[i]]};}\n";
    source += "throw 'Shared module file missing: '+normalized;\n";
    source += "}\n";
    source += "function evalCommonJs(source,filename,requireFn){var module={exports:{}};var exports=module.exports;var fn=(1,eval)('(function(module,exports,require){\\n'+source+'\\n;return module.exports;\\n})');return fn(module,exports,requireFn);}\n";
    source += "function requireSharedModule(path){\n";
    source += "var resolved=resolveSharedSource(path);\n";
    source += "if(Object.prototype.hasOwnProperty.call(moduleCache,resolved.key))return moduleCache[resolved.key];\n";
    source += "var exports=evalCommonJs(resolved.source,resolved.key,requireSharedModule);\n";
    source += "moduleCache[resolved.key]=exports;\n";
    source += "return exports;\n";
    source += "}\n";
    source += "var coordinatorInfo=null;\n";
    source += "try{coordinatorInfo=resolveSharedSource('__shared.js');}catch(e){throw 'Shared coordinator `__shared` is missing';}\n";
    source += "var coordinator=evalCommonJs(coordinatorInfo.source,coordinatorInfo.key,requireSharedModule);\n";
    source += "var shared={};\n";
    source += "for(var alias in coordinator){if(Object.prototype.hasOwnProperty.call(coordinator,alias)){shared[alias]=requireSharedModule(coordinator[alias]);}}\n";
    source += "return shared;\n";
    source += "})";
    return source;
}

function loadNpcPackageManifest(url, token) {
    var parsed = parseGithubTarget(url);
    var ref = resolveGithubRef(parsed, token);
    var tree = fetchRepoTree(parsed.owner, parsed.repo, ref, token);
    var rootPath = resolvePackageRoot(parsed.path, tree);
    var hooks = collectPackageManifestFiles(tree, rootPath, "hooks/");
    var shared = collectPackageManifestFiles(tree, rootPath, "shared/");
    var totalSize = 0;
    var i;

    if (hooks.length === 0) throw "Package has no hook files";

    for (i = 0; i < hooks.length; i++) {
        hooks[i].hook = detectHookName(hooks[i].relativePath);
        if (!hasText(hooks[i].hook)) throw "Unsupported hook file: " + hooks[i].relativePath;
        totalSize += parseIntSafe(hooks[i].size, 0);
    }
    sortHooks(hooks);

    for (i = 0; i < shared.length; i++) totalSize += parseIntSafe(shared[i].size, 0);

    return {
        sourceUrl: url,
        owner: parsed.owner,
        repo: parsed.repo,
        ref: ref,
        rootPath: rootPath,
        hooks: hooks,
        shared: shared,
        totalFiles: hooks.length + shared.length,
        totalSize: totalSize
    };
}

function collectPackageManifestFiles(tree, rootPath, folder) {
    var files = [];
    var prefix = hasText(rootPath) ? (rootPath + "/" + folder) : folder;
    for (var i = 0; i < tree.length; i++) {
        var entry = tree[i];
        var path = entry == null ? "" : normalizePath(entry.path);
        if (trimString(entry == null ? "" : entry.type) != "blob") continue;
        if (path.indexOf(prefix) !== 0 || !/\.js$/i.test(path)) continue;
        files.push({
            path: path,
            relativePath: hasText(rootPath) ? path.substring(rootPath.length + 1) : path,
            sha: trimString(entry.sha),
            size: parseIntSafe(entry.size, 0)
        });
    }
    files.sort(function(a, b) {
        return a.relativePath < b.relativePath ? -1 : (a.relativePath > b.relativePath ? 1 : 0);
    });
    return files;
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

function buildManifestStatus(manifest) {
    if (manifest == null) return "Updated: no";

    var lines = [
        "Updated: yes",
        "Repo: " + manifest.owner + "/" + manifest.repo + "@" + manifest.ref,
        "Path: " + (hasText(manifest.rootPath) ? manifest.rootPath : "/"),
        "Hooks: " + manifest.hooks.length,
        "Shared: " + manifest.shared.length,
        "Files: " + manifest.totalFiles,
        "Total size: " + manifest.totalSize + " bytes"
    ];

    var list = getManifestFiles(manifest);
    var maxList = list.length > 5 ? 5 : list.length;
    if (maxList > 0) {
        lines.push("List:");
        for (var i = 0; i < maxList; i++) {
            lines.push("- " + list[i].relativePath);
        }
        if (list.length > maxList) lines.push("- ... +" + (list.length - maxList) + " more");
    }
    return lines.join("\n");
}

function buildPreviewEntries(manifest) {
    var files = getManifestFiles(manifest);
    var entries = [];
    for (var i = 0; i < files.length; i++) {
        entries.push("[" + files[i].kind + "] " + files[i].relativePath);
    }
    return entries.length > 0 ? entries : ["No files"];
}

function getManifestFiles(manifest) {
    var out = [];
    appendManifestFiles(out, manifest == null ? null : manifest.hooks, "hook");
    appendManifestFiles(out, manifest == null ? null : manifest.shared, "shared");
    return out;
}

function appendManifestFiles(out, files, kind) {
    if (files == null) return;
    for (var i = 0; i < files.length; i++) {
        out.push({
            kind: kind,
            path: files[i].path,
            relativePath: files[i].relativePath,
            sha: files[i].sha,
            size: files[i].size,
            hook: files[i].hook
        });
    }
}

function writeDownloadedManifest(item, manifest, url) {
    var tag = getTag(item);
    tag.putString(ITEM_LAST_URL_KEY, url);
    tag.putString(ITEM_PACKAGE_MANIFEST_KEY, encodeText(JSON.stringify(manifest)));
    writeTag(item, tag);
}

function getDownloadedManifest(item) {
    if (item == null || item.isEmpty()) return null;
    var encoded = readTag(getTag(item), ITEM_PACKAGE_MANIFEST_KEY);
    if (!hasText(encoded)) return null;
    return JSON.parse(decodeText(encoded));
}

function clearDownloadedManifest(item, player) {
    var tag = getTag(item);
    tag.putString(ITEM_PACKAGE_MANIFEST_KEY, "");
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

function getPreviewCache(player) {
    try {
        var cache = player.getTempdata().get(PLAYER_PREVIEW_CACHE_KEY);
        if (cache != null) return cache;
    } catch (e) {}
    return {};
}

function writePreviewCache(player, cache) {
    player.getTempdata().put(PLAYER_PREVIEW_CACHE_KEY, cache == null ? {} : cache);
}

function clearPreviewCache(player) {
    try {
        player.getTempdata().remove(PLAYER_PREVIEW_CACHE_KEY);
    } catch (e) {
        try {
            player.getTempdata().put(PLAYER_PREVIEW_CACHE_KEY, {});
        } catch (e1) {}
    }
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

function fetchBlobText(owner, repo, sha, token) {
    var json = fetchJson("https://api.github.com/repos/" + owner + "/" + repo + "/git/blobs/" + encodeQuery(sha), token);
    if (trimString(json.encoding).toLowerCase() != "base64") throw "Unsupported blob encoding";
    return decodeBase64(trimString(json.content).replace(/\s+/g, ""));
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

function compactSource(source) {
    var text = source == null ? "" : "" + source;
    text = text.replace(/\r\n?/g, "\n");
    text = text.replace(/[ \t]+\n/g, "\n");
    text = text.replace(/\n{3,}/g, "\n\n");
    return text;
}

function validateScript(source, label) {
    try {
        (1, eval)("(function(){\n" + source + "\n})");
    } catch (e) {
        throw "Invalid `" + label + "`";
    }
}

function makeSharedSourceId(relativePath, index) {
    var base = normalizePath(relativePath).replace(/[^A-Za-z0-9_]+/g, "_");
    if (!hasText(base)) base = "shared_" + index;
    return base + "_" + index;
}

function splitIntoChunks(text, chunkSize) {
    var chunks = [];
    var source = text == null ? "" : "" + text;
    var size = chunkSize < 1 ? 12000 : chunkSize;
    if (source.length === 0) return [""];
    for (var i = 0; i < source.length; i += size) {
        chunks.push(source.substring(i, i + size));
    }
    return chunks;
}

function sortHooks(hooks) {
    hooks.sort(function(a, b) {
        return hookIndex(a.hook) - hookIndex(b.hook);
    });
}

function detectHookName(relativePath) {
    var match = normalizePath(relativePath).match(/^hooks\/([^\/]+)\.js$/i);
    if (match == null) return "";
    for (var i = 0; i < HOOK_ORDER.length; i++) {
        if (HOOK_ORDER[i].toLowerCase() == trimString(match[1]).toLowerCase()) return HOOK_ORDER[i];
    }
    return "";
}

function hookIndex(name) {
    for (var i = 0; i < HOOK_ORDER.length; i++) if (HOOK_ORDER[i] == name) return i;
    return -1;
}

function getRequiredScriptCount(hooks) {
    var maxIndex = 0;
    for (var i = 0; i < hooks.length; i++) {
        var index = hookIndex(hooks[i].hook);
        if (index > maxIndex) maxIndex = index;
    }
    return maxIndex + 1;
}

function getNpcNbt(npc) {
    try {
        if (npc.getEntityNbt != null) return npc.getEntityNbt();
    } catch (e) {}
    try {
        if (typeof npc.nBT != "undefined") return npc.nBT;
    } catch (e1) {}
    return null;
}

function setNpcNbt(npc, nbt) {
    try {
        if (npc.setEntityNbt != null) {
            npc.setEntityNbt(nbt);
            return;
        }
    } catch (e) {}
    try {
        npc.nBT = nbt;
        return;
    } catch (e1) {}
    throw "npc nbt write is unavailable";
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

function getCollectionSize(value) {
    if (value == null) return 0;
    if (typeof value.length == "number") return value.length;
    if (value.size != null) return value.size();
    return 0;
}

function getCollectionValue(value, index) {
    if (value == null) return null;
    if (typeof value[index] != "undefined") return value[index];
    if (value.get != null) return value.get(index);
    return null;
}

function encodeQuery(value) {
    return ("" + GitLoader_URLEncoder.encode("" + value, "UTF-8")).replace(/\+/g, "%20");
}

function normalizePath(value) {
    return trimString(value).replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
}

function shortenSha(sha) {
    var text = trimString(sha);
    return text.length > 8 ? text.substring(0, 8) : text;
}

function objectKeys(obj) {
    var keys = [];
    for (var key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) keys.push(key);
    return keys;
}

function parseJsonSafe(raw) {
    if (raw == null || raw == "" || raw == "null" || raw == "undefined") return null;
    try {
        return JSON.parse("" + raw);
    } catch (e) {
        return null;
    }
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
