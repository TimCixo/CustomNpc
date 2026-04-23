function buildPreviewEntries(pkg) {
    var entries = [];
    appendEntries(entries, pkg == null ? null : pkg.hooks, "hook");
    appendEntries(entries, pkg == null ? null : pkg.shared, "shared");
    return entries;
}

function appendEntries(out, files, kind) {
    if (files == null) return;
    for (var i = 0; i < files.length; i++) {
        out.push("[" + kind + "] " + files[i].relativePath);
    }
}

function buildPreviewMeta(file) {
    var code = file == null || file.body == null ? "" : "" + file.body;
    return (file == null ? "" : file.relativePath) + " | chars=" + code.length;
}
