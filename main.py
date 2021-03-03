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
        """
        Given a module name, resolve it on the file system. Note that the module resolution used here
        does not follow the node.js convention, it's a quick and dirty solution designed to work in most cases.

        :param name:
        :param current_dir:
        :return:
        """
        current_dir = current_dir or os.curdir
        if pathlib.Path(current_dir, name).is_file():
            resolved_path = pathlib.Path(current_dir, name).resolve()
        elif pathlib.Path(current_dir, f"{name}.js").is_file():
            resolved_path = pathlib.Path(current_dir, f"{name}.js").resolve()
        elif pathlib.Path(current_dir, f"{name}.node").is_file():
            resolved_path = pathlib.Path(current_dir, f"{name}.node").resolve()
        elif pathlib.Path(current_dir, f"{name}.node.js").is_file():
            resolved_path = pathlib.Path(current_dir, f"{name}.node.js").resolve()
        elif pathlib.Path(current_dir, name, "index.js").is_file():
            resolved_path = pathlib.Path(current_dir, name, "index.js")
        elif pathlib.Path(current_dir, "node_modules").is_dir():
            return self.load_module(name, str(pathlib.Path(current_dir, "node_modules").resolve()))
        elif pathlib.Path("./node_modules", f"{name}.js").is_file():
            resolved_path = pathlib.Path("./node_modules", f"{name}.js").resolve()
        elif pathlib.Path("./node_modules").is_dir():
            return self.load_module(name, str(pathlib.Path("./node_modules").resolve()))
        else:
            raise RuntimeError(f"module {name} not found")
        return load(resolved_path)


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
