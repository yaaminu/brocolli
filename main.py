import logging
import pathlib
import os

import STPyV8

logger = logging.getLogger(__name__)


class NodeConsoleShim:
    name = "hello"

    def log(self, message):
        print(message)


class NodeProcessShim:
    env = dict((key, val) for key, val in os.environ.items())


class Global(STPyV8.JSClass):
    version = "1.23"
    console_shim = NodeConsoleShim()
    process = NodeProcessShim()

    def load_module(self, name, current_dir):
        current_dir = current_dir or os.curdir
        path = pathlib.Path(current_dir, name)
        if path.is_file():
            resolved_path = path.resolve()
        elif path.is_dir():
            resolved_path = pathlib.Path(path.resolve(), "index.js").resolve()
        else:
            resolved_path = self.__resolve_module_dir("./node_modules", name)
            if not resolved_path or not pathlib.Path(resolved_path).exists():
                raise RuntimeError(f"module {name} not found")

        return load(resolved_path)

    def __resolve_module_dir(self, parent_dir, name):
        if pathlib.Path(parent_dir, name).is_file():
            path = pathlib.Path(parent_dir, name)
            return path.resolve()
        elif pathlib.Path(parent_dir, f"{name}.js").is_file():
            return pathlib.Path(parent_dir, f"{name}.js").resolve()
        elif pathlib.Path(parent_dir, f"{name}.node.js").is_file():
            return pathlib.Path(parent_dir, f"{name}.node.js").resolve()
        elif pathlib.Path(parent_dir, name).is_dir():
            path = pathlib.Path(parent_dir, name)
            if pathlib.Path(path.resolve(), name).exists():
                return pathlib.Path(path.resolve(), name)
            elif pathlib.Path(path.resolve(), "index.js").exists():
                return pathlib.Path(path.resolve(), "index.js").resolve()
            else:
                return self.__resolve_module_dir(pathlib.Path(parent_dir, name, "node_modules").resolve(), name)
        else:
            return None


def load(path):
    path = pathlib.Path(path)
    return {
        "file_name": path.resolve(),
        "parent_dir": pathlib.Path(path.parent).resolve(),
        "code": path.read_text("utf8")
    }


with STPyV8.JSContext(Global()) as ctx:
    require_script = load("./require.js")
    ctx.eval(require_script["code"])
    ctx.eval("""
        this.console = console_shim
        this.load_module = load_module
        this.require = custom_require
    """)
    ctx.eval(load('./app.js')["code"])
