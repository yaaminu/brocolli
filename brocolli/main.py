import STPyV8
from .node_shims import Global


def render_app(app_path):
    with STPyV8.JSContext(Global()) as ctx:
        ctx.eval(f"""
            init(this)
            const render = require('./brocolli/react_renderer.js')
            render('{app_path}')
        """)
