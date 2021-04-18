import datetime
from pathlib import Path
import sys
import os
import STPyV8

from brocolli.node_shims import Global


class Renderer:
    def __init__(self, renderer_path: str, app_root_component: str, app_node_modules: str):
        self.ctx = None
        self.renderer_path = renderer_path
        self.app_root_component = app_root_component
        self.app_node_modules = app_node_modules

    def init(self):
        if self.ctx is not None:
            raise RuntimeError("Attempted to initialize an already initialized renderer")
        self.ctx = STPyV8.JSContext(Global(self.app_node_modules))
        self.ctx.__enter__()
        self.ctx.eval(f"init(this, '{self.renderer_path}')")

    def destroy(self):
        if self.ctx is not None:
            self.ctx.__exit__(None, None, None)
            self.ctx = None

    def render_app(self, data: dict):
        if self.ctx is None:
            raise RuntimeError("Attempted to use an uninitialized renderer")
        print('build: ', self.app_root_component)
        return self.ctx.eval(f"render('{self.app_root_component}', JSON.parse(JSON.stringify({data})))")


class ReactRenderer(Renderer):
    def __init__(self, app_root_component, app_node_modules):
        renderer_path = Path(os.path.dirname(__file__), "js", "react_renderer.js").resolve()
        super(ReactRenderer, self).__init__(renderer_path, app_root_component, app_node_modules)


def python_version():
    return sys.version


class Date:
    def __init__(self):
        self._date = datetime.datetime.today()

    def __getattr__(self, key):
        return getattr(self._date, key)

    def __str__(self):
        return str(self._date)


def create_renderer(type: str, app_root_component: str, app_node_modules: str, ) -> Renderer:
    if type == "react":
        renderer = ReactRenderer(app_root_component, app_node_modules)
        renderer.init()
    else:
        raise RuntimeError(f"Unknown renderer type {type}")
    return renderer
