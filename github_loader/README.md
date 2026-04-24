# GitHub NPC Loader

Scripted item firmware for loading CustomNPCs packages from GitHub into NPC script tabs.

## Firmware Stages

The loader item has two stages:

### 1. Installer firmware

Installer firmware is responsible only for installing ready firmware into the item.

Responsibilities:

- open installer GUI
- read GitHub URL and optional token
- download loader ready firmware from `github_loader/`
- validate that downloaded firmware is ready-only
- write ready firmware into the item
- switch item presentation from installer to ready mode

Installer firmware is not the runtime used after installation.

### 2. Ready firmware

Ready firmware is the actual loader item used by players after installation.

Ready item behavior:

- right click air opens the ready GUI
- right click NPC applies the current package to that NPC
- item name is `GitHub NPC Loader`
- item lore describes Update/Preview/Apply usage

## Current Ready Flow

### Update

`Update` reads GitHub metadata and stores only a compact package manifest in item `CUSTOM_DATA`.

The item does not store full hook bodies or shared source bodies.

Stored manifest includes:

- repository identity
- resolved ref
- package root path
- hook file list with `sha`, path, size, and hook name
- shared file list with `sha`, path, and size
- total file count
- total estimated size

### Preview

Preview uses the stored manifest and downloads only the selected file body on demand.

Preview body is temporary:

- it is not stored in item `CUSTOM_DATA`
- it may live in GUI state or player temp cache only for the preview session

### Apply

Apply reads the manifest, downloads the required files by blob `sha`, builds the package in memory, and writes it directly to the NPC.

Apply behavior:

- hooks are written into separate NPC script tabs
- shared files are written into NPC storeddata/memory
- hooks remain raw hook files
- shared bootstrap is not injected into hook bodies

## Supported Package Layout

Recommended package layout:

```text
package/
  hooks/
    init.js
    interact.js
    timer.js
    damaged.js
    died.js
    attack.js
    meleeAttack.js
    ...
  shared/
    __shared.js
    *.js
```

Shared requirements:

- `shared/__shared.js` exports alias-to-file mappings
- shared modules use CommonJS-like `module.exports`
- hooks call `requireShared(event)` themselves

## Item Storage Model

Current item storage is manifest-only.

The loader item keeps:

- firmware metadata
- last GitHub URL
- ready firmware source for the loader itself
- compact package manifest for the selected NPC package

The loader item does not keep:

- full downloaded package source
- preview file bodies
- combined hook bundles

This keeps item NBT small enough for large packages.

## NPC Write Model

When applying a package:

- hook files are mapped to separate NPC script tabs
- shared files are stored in NPC storeddata
- large shared source bodies may be chunked in storeddata
- a stored shared factory reconstructs modules from chunked sources

Canonical shared-related NPC keys include:

- `__shared`
- `github_npc_loader_shared_sources_manifest`
- `github_npc_loader_shared_source_<id>_chunk_count`
- `github_npc_loader_shared_source_<id>_chunk_<n>`

Canonical hook-related NPC keys include:

- `github_loader_hook_count`
- `github_loader_hook_<n>_name`
- `github_loader_hook_<n>_path`
- `github_loader_hook_<n>_body`

## Troubleshooting

### Item still opens installer GUI

The item is still on installer firmware or ready firmware was not installed correctly.

### Preview opens but file body is missing

Check:

- package manifest exists
- GitHub token is valid for private repos
- file still exists at the stored `sha`

### Apply writes storeddata but not script tabs

Direct script tab access may be unavailable on the target NPC at runtime.
The loader treats storeddata write as canonical and uses best-effort script-tab injection.

### Large package disconnects the client

Current loader avoids storing full package source in the item.
If this still happens, inspect item `CUSTOM_DATA` growth and manifest size rather than package body size.

### Shared module alias is undefined in hooks

Check:

- `shared/__shared.js` exists
- alias points to the correct file
- shared file exports through `module.exports`
- hook calls `requireShared(event)` and uses the exported alias
