function parseGithubTarget(url) {
    var clean = String(url == null ? "" : url).replace(/^\s+|\s+$/g, "").replace(/^https?:\/\/www\.github\.com\//i, "https://github.com/").replace(/\/+$/, "");
    var match = clean.match(/^https?:\/\/github\.com\/([^\/]+)\/([^\/]+)(?:\/(.*))?$/i);
    if (match == null) throw "Only github.com URLs are supported";

    var owner = match[1];
    var repo = match[2].replace(/\.git$/i, "");
    var tail = (match[3] || "").replace(/^\s+|\s+$/g, "");
    var ref = "";
    var path = "";

    if (tail.length > 0) {
        var parts = tail.split("/");
        if (parts[0] == "tree" || parts[0] == "blob") {
            ref = parts[1] || "";
            path = parts.slice(2).join("/");
        } else {
            path = parts.join("/");
        }
    }

    return { owner: owner, repo: repo, ref: ref, path: path };
}

function detectHookName(relativePath) {
    var match = String(relativePath == null ? "" : relativePath).match(/^hooks\/([^\/]+)\.js$/i);
    return match == null ? "" : match[1];
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
        var name = sharedFiles[j].relativePath.substring(sharedFiles[j].relativePath.lastIndexOf("/") + 1).replace(/\\.js$/i, "");
        source += "shared[" + JSON.stringify(name) + "]=__require(" + JSON.stringify(sharedFiles[j].relativePath.substring("shared/".length)) + ");\n";
    }
    source += "return shared;\n";
    source += "})";
    return source;
}
