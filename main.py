import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

import brocolli

app = FastAPI()
app_path = Path(os.curdir, "build/sample_app.js").resolve()
app_node_modules = Path(os.curdir, "example_app/node_modules").resolve()
react_renderer = brocolli.create_renderer('react', app_path, app_node_modules)

app.mount("/static", StaticFiles(directory="./example_app/build/static"), name="static")


@app.get("/")
async def root():
    html = Path('./example_app/build/index.html').read_text("utf-8")
    data = {"Hello": "world"}
    rendered_app = react_renderer.render_app(data)
    content = html.replace(
        '<div id="root"></div>',
        f"<div id='app_state' style='display:none'><!--{rendered_app['state']}--></div>"
        f"<div id='app_prop' style='display:none'><!--{rendered_app['props']}--></div>"
        f"<div id='root'>{rendered_app['markup']}</div>")
    return HTMLResponse(content=content)
