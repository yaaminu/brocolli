from pathlib import Path
import os

def do_load_module(name, current_dir):
    current_dir = current_dir or os.curdir
    resolved_path = None
    if Path(current_dir, name).is_file():
        resolved_path = Path(current_dir, name).resolve()
    elif Path(current_dir, f"{name}.js").is_file():
        resolved_path = Path(current_dir, f"{name}.js").resolve()
    elif Path(current_dir, f"{name}.node").is_file():
        resolved_path = Path(current_dir, f"{name}.node").resolve()
    elif Path(current_dir, f"{name}.node.js").is_file():
        resolved_path = Path(current_dir, f"{name}.node.js").resolve()
    elif Path(current_dir, name, "index.js").is_file():
        resolved_path = Path(current_dir, name, "index.js")
    elif Path(current_dir, "node_modules", f"{name}.js").is_file():
        resolved_path = Path(current_dir, "node_modules", f"{name}.js").resolve()
    elif Path(current_dir, "node_modules", name, "index.js").is_file():
        resolved_path = Path(current_dir, "node_modules", name, "index.js").resolve()

    if resolved_path is None:
        if not __are_same_dir(current_dir, os.curdir):
            if Path(Path(current_dir).parent).is_dir():
                return do_load_module(name, str(Path(current_dir).parent))
        else:
            raise RuntimeError(f"module {name} not found")
    return load(resolved_path)


def __are_same_dir(first, second):
    return Path(first).resolve() == Path(second).resolve()


def load(path):
    path = Path(path)
    return {
        "file_name": path.resolve(),
        "parent_dir": Path(path.parent).resolve(),
        "code": path.read_text("utf8")
    }
