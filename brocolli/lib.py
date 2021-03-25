import datetime
from pathlib import Path
import sys
import os
import STPyV8

from brocolli.node_shims import Global


class Renderer:
    def __init__(self, renderer_path: str):
        self.ctx = None
        self.renderer_path = renderer_path

    def init(self):
        if self.ctx is not None:
            raise RuntimeError("Attempted to initialize an already initialized renderer")
        self.ctx = STPyV8.JSContext(Global())
        self.ctx.__enter__()
        self.ctx.eval(f"init(this, '{self.renderer_path}')")

    def destroy(self):
        if self.ctx is not None:
            self.ctx.__exit__(None, None, None)
            self.ctx = None

    def render_app(self, app_path: Path):
        if self.ctx is None:
            raise RuntimeError("Attempted to use an uninitialized renderer")
        return self.ctx.eval(f"render('{app_path}')")


class ReactRenderer(Renderer):
    def __init__(self):
        renderer_path = Path(os.path.dirname(__file__), "react_renderer.js").resolve()
        super(ReactRenderer, self).__init__(renderer_path)


def python_version():
    return sys.version


class Date:
    def __init__(self):
        self._date = datetime.datetime.today()

    def __getattr__(self, key):
        return getattr(self._date, key)

    def __str__(self):
        return str(self._date)


def create_renderer(type: str) -> Renderer:
    if type == "react":
        renderer = ReactRenderer()
        renderer.init()
    else:
        raise RuntimeError(f"Unknown renderer type {type}")
    return renderer
