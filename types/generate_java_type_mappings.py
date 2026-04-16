from __future__ import annotations

import re
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parent
INPUTS = [ROOT / "server.txt", ROOT / "client.txt"]
OUTPUT = ROOT / "minecraft_mappings_java_type.d.ts"

CLASS_RE = re.compile(r"^(?P<fqcn>\S+) -> \S+:$")
METHOD_RE = re.compile(
    r"^\s*(?:\d+:\d+:)?(?P<ret>.+?) (?P<name>[^\s(]+)\((?P<params>.*)\) -> \S+$"
)
FIELD_RE = re.compile(r"^\s*(?P<type>.+?) (?P<name>[^\s]+) -> \S+$")
IDENT_RE = re.compile(r"^[A-Za-z_$][A-Za-z0-9_$]*$")


def ts_ident(name: str) -> str:
    return name if IDENT_RE.match(name) else repr(name)


def import_expr(package: str, class_name: str) -> str:
    if IDENT_RE.match(class_name):
        return f'import("{package}").{class_name}'
    return f'import("{package}")["{class_name}"]'


def parse_mapping_file(path: Path, classes: dict[str, dict[str, set[str]]]) -> None:
    current: str | None = None
    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.rstrip()
        if not line or line.startswith("#"):
            continue

        class_match = CLASS_RE.match(line)
        if class_match:
            current = class_match.group("fqcn")
            classes[current]
            continue

        if current is None:
            continue

        method_match = METHOD_RE.match(line)
        if method_match:
            method_name = method_match.group("name")
            if method_name == "<clinit>" or method_name.startswith("lambda$"):
                continue
            if method_name == "<init>":
                classes[current]["constructors"].add("constructor(...args: any[]);")
            else:
                signature = f"{method_name}(...args: any[]): any;"
                classes[current]["methods"].add(signature)
                classes[current]["static_methods"].add(f"static {signature}")
            continue

        field_match = FIELD_RE.match(line)
        if field_match:
            field_name = field_match.group("name")
            if field_name in {"this$0"}:
                continue
            ident = ts_ident(field_name)
            classes[current]["fields"].add(f"{ident}: any;")
            classes[current]["static_fields"].add(f"static {ident}: any;")


def build_output(classes: dict[str, dict[str, set[str]]]) -> str:
    packages: dict[str, list[tuple[str, dict[str, set[str]]]]] = defaultdict(list)
    for fqcn, members in classes.items():
        package, class_name = fqcn.rsplit(".", 1)
        if not IDENT_RE.match(class_name):
            continue
        packages[package].append((class_name, members))

    out: list[str] = []
    out.append("// Auto-generated from types/server.txt and types/client.txt")
    out.append("// Regenerate with: python types/generate_java_type_mappings.py")
    out.append("")

    for package in sorted(packages):
        out.append(f"declare module '{package}' {{")
        for class_name, members in sorted(packages[package], key=lambda x: x[0]):
            out.append(f"  class {class_name} {{")
            body = []
            body.extend(sorted(members["constructors"]))
            body.extend(sorted(members["static_fields"]))
            body.extend(sorted(members["static_methods"]))
            body.extend(sorted(members["fields"]))
            body.extend(sorted(members["methods"]))
            if not body:
                body.append("    [key: string]: any;")
            out.extend(f"    {line}" for line in body)
            out.append("  }")
            out.append("")
        out.append("}")
        out.append("")

    out.append("declare namespace Java {")
    out.append("  interface TypeMap {")
    for fqcn in sorted(classes):
        package, class_name = fqcn.rsplit(".", 1)
        if not IDENT_RE.match(class_name):
            continue
        out.append(f'    "{fqcn}": typeof {import_expr(package, class_name)};')
    out.append("  }")
    out.append("")
    out.append("  function type<K extends keyof TypeMap>(name: K): TypeMap[K];")
    out.append("  function type(name: string): any;")
    out.append("}")
    out.append("")
    return "\n".join(out)


def main() -> None:
    classes: dict[str, dict[str, set[str]]] = defaultdict(
        lambda: {
            "constructors": set(),
            "fields": set(),
            "methods": set(),
            "static_fields": set(),
            "static_methods": set(),
        }
    )

    for path in INPUTS:
        parse_mapping_file(path, classes)

    OUTPUT.write_text(build_output(classes), encoding="utf-8", newline="\n")
    print(f"Wrote {OUTPUT}")


if __name__ == "__main__":
    main()
