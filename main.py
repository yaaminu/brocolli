import sys
import os
from pathlib import Path

import brocolli

if __name__ == '__main__':
    if len(sys.argv) < 2:
        raise RuntimeError("Usage: python3 main.py {app_path}")
    app_path = Path(os.curdir, sys.argv[1]).resolve()
    print(brocolli.render_app(app_path))
