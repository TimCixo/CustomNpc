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
        var path = normalizeSlashes(entry.path);
        var root = inferRootFromHookPath(path);
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
        if (byHook[hook] != null) {
            throw "Duplicate hook `" + hook + "`: " + byHook[hook].relativePath + " and " + file.relativePath;
        }
        file.hook = hook;
        byHook[hook] = file;
        selected.push(file);
    }

    selected.sort(function(a, b) {
        return hookSortIndex(a.hook) - hookSortIndex(b.hook);
    });
    return selected;
}

function selectSharedFiles(files) {
    var selected = [];
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var rel = normalizeSlashes(file.relativePath);
        if (rel.indexOf("shared/") === 0 && isJsPath(rel)) selected.push(file);
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

function validateNpcPackage(pkg) {
    if (pkg == null) throw "Package is empty";
    if (pkg.supportedFiles == null || pkg.supportedFiles.length === 0) {
        throw "Package has no supported hook files";
    }
    for (var i = 0; i < pkg.supportedFiles.length; i++) {
        var file = pkg.supportedFiles[i];
        if (!hasText(file.body)) throw "Hook file is empty: " + file.relativePath;
        validateScriptSource(file.body, file.relativePath);
        if (file.body.length > GIT_LOADER_MAX_SCRIPT_CHARS) {
            throw "Hook `" + file.hook + "` is larger than the CustomNPCs script tab limit";
        }
    }
    buildSharedFactorySource(pkg.sharedFiles);
}

function buildSharedFactorySource(sharedFiles) {
    var files = sharedFiles == null ? [] : sharedFiles;
    var entries = [];

    for (var i = 0; i < files.length; i++) {
        var rel = normalizeSlashes(files[i].relativePath);
        if (rel == "shared/__shared.js") continue;
        entries.push({
            id: rel.substring("shared/".length),
            body: files[i].body || ""
        });
    }

    var source = "(function(event){\n";
    source += "var __modules={};\n";
    source += "function __define(id,fn){__modules[id]={fn:fn,exports:{},loaded:false};}\n";
    source += "function __require(id){var m=__modules[id];if(!m)throw 'Missing shared module '+id;if(!m.loaded){m.loaded=true;var module={exports:m.exports};m.fn(module,module.exports,__require,event);m.exports=module.exports;}return m.exports;}\n";

    for (var j = 0; j < entries.length; j++) {
        source += "__define(" + JSON.stringify(entries[j].id) + ",function(module,exports,require,event){\n";
        source += entries[j].body + "\n";
        source += "});\n";
    }

    source += "var shared={};\n";
    for (var k = 0; k < entries.length; k++) {
        var name = moduleNameFromPath(entries[k].id);
        source += "shared[" + JSON.stringify(name) + "]=__require(" + JSON.stringify(entries[k].id) + ");\n";
    }
    source += "return shared;\n";
    source += "})";

    validateScriptSource(source, "__shared");
    return source;
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
    if (!scriptResult.ok) {
        player.message("GitHub Loader: script tabs were not directly updated; durable copies were written to storeddata.");
    }
    return true;
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

function tryWriteNpcScriptTabs(npc, hookFiles) {
    try {
        var mcNpc = npc.getMCEntity != null ? npc.getMCEntity() : npc.mCEntity;
        if (mcNpc == null || mcNpc.script == null || mcNpc.script.scripts == null) return { ok: false };
        var scripts = mcNpc.script.scripts;

        for (var i = 0; i < hookFiles.length; i++) {
            var file = hookFiles[i];
            var index = hookSortIndex(file.hook);
            var container = null;
            try {
                container = scripts[index];
            } catch (e1) {}
            if (container == null && scripts.get != null) {
                try {
                    container = scripts.get(index);
                } catch (e2) {}
            }
            if (container == null) continue;
            container.script = file.body || "";
            container.fullscript = file.body || "";
            try {
                container.errored = false;
            } catch (e3) {}
        }
        try {
            mcNpc.script.enabled = true;
        } catch (e4) {}
        return { ok: true };
    } catch (e) {
        return { ok: false, error: shortError(e) };
    }
}
