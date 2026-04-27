# GitHub Loader Notes

## Two-Stage Firmware

The current loader is split into two firmware roles:

- installer firmware
- ready firmware

Installer firmware only installs the ready loader into the item.
Ready firmware performs package Update, Preview, and Apply.

## Ready Item Storage

The ready item stores compact metadata only.

It keeps:

- ready firmware metadata
- last used GitHub URL
- compact package manifest

It does not keep:

- full hook source bundle
- full shared source bundle
- preview file bodies

This is required to avoid large item `CUSTOM_DATA` and client slot-sync failures.

## Manifest Model

Manifest entries include:

- `owner`
- `repo`
- `ref`
- `rootPath`
- hook list with path, relative path, hook name, `sha`, and size
- shared list with path, relative path, `sha`, and size
- total file count
- total size estimate

The manifest survives relog and allows re-apply without storing full source in the item.

## Preview Cache

Preview works from the manifest:

1. user selects a file from the manifest list
2. loader downloads only that file body by blob `sha`
3. body is held temporarily in GUI/player runtime state

Preview body should never be written into item `CUSTOM_DATA`.

## Apply To NPC

Apply uses the manifest to rebuild the package in memory:

1. read manifest from item
2. download each required file body by blob `sha`
3. build hooks/shared package in memory
4. write hooks into NPC script tabs
5. write shared sources into NPC storeddata

## Hook Mapping

Hooks stay separate.

The loader does not merge hooks into one file.

Binding policy:

- `hooks/init.js` is pinned to the first/root init slot
- every other `hooks/*.js` file is resolved dynamically by filename
- if the NPC script system exposes a matching hook slot, the file is written there
- if no matching hook slot exists, that file is skipped with a warning
- no hardcoded hook whitelist is used for package hook filenames

If script containers are unavailable directly, storeddata remains the canonical package delivery layer and script-tab writes remain best-effort.

## Shared Storage

Shared modules are stored in NPC memory/storeddata and reconstructed through `__shared`.

For large packages, shared source may be chunked in storeddata with:

- manifest key for shared sources
- chunk count per shared file
- chunk payload keys per shared file

The stored `__shared` factory reconstructs shared source text from these chunks.

## Large Package Handling

Large packages are handled by:

- manifest-only item storage
- preview-on-demand
- apply-time download by `sha`
- optional chunked shared storage in NPC storeddata

This is the current answer to large-package item NBT growth.
