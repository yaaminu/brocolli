import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

import brocolli

app = FastAPI()
react_renderer = brocolli.create_renderer(type='react')

app.mount("/static", StaticFiles(directory="./app/build/static"), name="static")


@app.get("/")
async def root():
    app_path = Path(os.curdir, "build/sample_app.js").resolve()
    html = Path('./app/build/index.html').read_text("utf-8")
    rendered_app = react_renderer.render_app(app_path)
    content = html.replace(
        '<div id="root"></div>',
        f"<div id='app_state' style='display:none'><!--{rendered_app['state']}--></div>"
        f"<div id='root'>{rendered_app['markup']}</div>")
    return HTMLResponse(content=content)
