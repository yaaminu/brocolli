import datetime
import os
import STPyV8
import brocolli


class NodeConsoleShim:
    def log(self, *msg):
        print(*msg)


class NodeProcessShim:
    env = dict((key, val) for key, val in os.environ.items())


class Global(STPyV8.JSClass):
    version = "1.23"
    console = NodeConsoleShim()
    process = NodeProcessShim()

    def init(self, ctxt, renderer):
        ctxt.console = self.console
        setattr(ctxt, "global", self)
        require = brocolli.load_javascript_file('./brocolli/js/require.js')
        ctxt.eval(require["code"])
        ctxt.require = ctxt.custom_require
        ctxt.render = ctxt.require(renderer)
        ctxt.eval("global.app_state = {___brocolli___:{___state___:{}}}")

    def load_python_module(self, name: str):
        return brocolli.load_python_module(name)

    def load_js_module(self, name, current_dir):
        """
        Given a module name, resolve it on the file system. Note that the module resolution used here
        does not follow the node.js convention, it's a quick and dirty solution designed to work in most cases.

        :param name:
        :param current_dir:
        :return:
        """
        return brocolli.do_load_js_module(name, current_dir)
