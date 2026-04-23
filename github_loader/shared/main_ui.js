function createMainGuiModel(lastUrl, statusText) {
    return {
        title: "GitHub NPC Loader",
        fields: [
            { key: "url", label: "GitHub URL", value: lastUrl || "" },
            { key: "token", label: "GitHub Token", value: "" }
        ],
        actions: ["Download", "Preview", "Clear"],
        status: statusText || "Downloaded: no"
    };
}

function buildPackageStatusText(pkg) {
    if (pkg == null) return "Downloaded: no";
    return [
        "Downloaded: yes",
        "Repo: " + pkg.owner + "/" + pkg.repo + "@" + pkg.ref,
        "Path: " + (pkg.rootPath || "/"),
        "Hooks: " + pkg.hooks.length,
        "Shared: " + pkg.shared.length
    ].join("\n");
}
