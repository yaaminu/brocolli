import functools
from pathlib import Path
import os
import importlib


def load_python_module(module: str):
    return importlib.import_module(module)


def do_resolve_js_module_path(name, current_dir, node_modules_dir):
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

    if resolved_path is None:
        if not __are_same_dir(current_dir, os.curdir):
            if Path(Path(current_dir).parent).is_dir():
                return do_resolve_js_module_path(name, str(Path(current_dir).parent), node_modules_dir)
        elif Path("brocolli", "js", f"{name}.js").is_file():  # look into brocolli/js as our last resort
            return Path("brocolli", "js", f"{name}.js")
        elif Path(node_modules_dir, f"{name}.js").is_file():
            return Path(node_modules_dir, f"{name}.js")
        elif Path(node_modules_dir, name, "index.js").is_file():
            return Path(node_modules_dir, name, "index.js")

    return resolved_path


def do_load_js_module(name, current_dir, app_node_modules):
    resolved_path = do_resolve_js_module_path(name, current_dir, app_node_modules)
    if resolved_path is None:
        raise RuntimeError(f"module {name} not found")
    return load_javascript_file(resolved_path)


def __are_same_dir(first, second):
    return Path(first).resolve() == Path(second).resolve()


@functools.lru_cache(maxsize=2048)
def load_javascript_file(path):
    path = Path(path)
    return {
        "file_name": path.resolve(),
        "parent_dir": Path(path.parent).resolve(),
        "code": path.read_text("utf8")
    }
