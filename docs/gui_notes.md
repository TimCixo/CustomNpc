# GUI Notes

## Scope

These notes describe the practical GUI model used in this repository for CustomNPCs scripted GUI.

Target environment:

- Minecraft 1.21.1
- CustomNPCs Unofficial
- Nashorn JavaScript hooks

## Practical GUI Pattern

The most stable pattern in this project is:

- build GUI in `interact(event)`
- use text fields for editable values
- use `addScroll(...)` as the action selector
- handle actions in `customGuiScroll(event)`
- persist field values in `customGuiClosed(event)`

This avoids depending on unstable button components.

## Update / Preview Flow

The GitHub Loader ready GUI follows this shape:

- URL field
- token field
- scroll-based actions such as `Update`, `Preview`, `Clear`
- preview is a separate GUI state/view

## Preview Cache Rule

Preview file bodies should be temporary.

Use:

- player temp cache
- GUI-local state
- runtime memory

Do not use:

- item `CUSTOM_DATA` for large preview bodies

## Item Data Rule

Do not store large package source bodies in item `CUSTOM_DATA`.

For loader-style tools:

- item should keep manifest/metadata only
- preview fetches file content on demand
- apply downloads files when needed

This avoids large item NBT and client slot-sync failures.

## Safe Components

In this repository, the reliable pattern is to prefer:

- labels
- text fields
- text areas
- scroll components
- colored lines

Avoid assuming that every CustomNPCs GUI component is safe in this environment without testing.

## General Advice

- keep GUI state explicit
- rehydrate fields when reopening a GUI
- update the current GUI when possible instead of rebuilding it unnecessarily
- keep technical/admin actions separate from ordinary player-facing interactions
