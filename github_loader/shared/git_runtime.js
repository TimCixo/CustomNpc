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

function buildGithubRawUrl(owner, repo, ref, path) {
    return "https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + encodePath(ref) + "/" + encodePath(path);
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

function fetchJson(url, githubToken) {
    var text = fetchText(url, githubToken);
    try {
        return JSON.parse(text);
    } catch (e) {
        throw "GitHub вернул некорректный JSON";
    }
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
                    throw "HTTP 401: неверный GitHub token. Обнови поле GitHub Token в GUI.";
                }
                throw "HTTP 401: GitHub отклонил авторизацию.";
            }
            if (code == "403") {
                if (errorText.toLowerCase().indexOf("rate limit") >= 0) {
                    throw "HTTP 403: GitHub API rate limit exceeded. Подожди немного и попробуй снова.";
                }
                throw "HTTP 403: GitHub запретил доступ. Возможен rate limit, приватный репозиторий или временная блокировка API.";
            }
            throw hasText(errorText)
                ? ("HTTP " + code + " при запросе к GitHub. " + shortError(errorText))
                : ("HTTP " + code + " при запросе к GitHub");
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
        sharedFiles: sharedFiles,
        supportedHooks: extractHooks(supported),
        ignoredFiles: ignored,
        bundleScript: bundle,
        loadedAt: "" + GitLoader_System.currentTimeMillis()
    };
}

module.exports = {
    handleLoadAction: handleLoadAction,
    collectGithubFiles: collectGithubFiles,
    buildGithubRawUrl: buildGithubRawUrl,
    parseGithubTarget: parseGithubTarget,
    fetchJson: fetchJson,
    fetchText: fetchText,
    fetchTextOnce: fetchTextOnce,
    shouldRetryHttpError: shouldRetryHttpError,
    resolveGithubToken: resolveGithubToken,
    sleepMs: sleepMs,
    loadGithubPackage: loadGithubPackage
};
