from pathlib import Path

import STPyV8

from .node_shims import Global
from .loader import load_javascript_file


def render_app(app_path: Path):
    with STPyV8.JSContext(Global()) as ctx:
        bootstrap = load_javascript_file('./brocolli/bootstrap.js')
        ctx.eval(f"APP_ROOT_PATH = '{app_path}'")
        rendered_app = ctx.eval(bootstrap["code"])
    return rendered_app

