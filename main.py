import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.responses import HTMLResponse

import brocolli

app = FastAPI()
react_renderer = brocolli.create_renderer(type='react')


@app.get("/")
async def root():
    app_path = Path(os.curdir, "build/sample_app.js").resolve()
    css = Path('./index.css').read_text("utf-8")
    rendered_app = react_renderer.render_app(app_path)
    content = f"""
    <html>
        <head>
            <style>
                {css}
            </style> 
        </head>
        <body> {rendered_app}  </body>
    </html>"""
    return HTMLResponse(content=content)
