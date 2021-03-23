function custom_require(path){
    custom_require.stack = custom_require.stack || []
    top_dir = custom_require.stack[custom_require.stack.length -1]
    let script = load_js_module(path, top_dir)
    custom_require.stack.push(script.parent_dir)
    let module = {}
    let exports = {}
    module.exports = exports
    ;(function do_require(exports, require, module, __filename, __dirname){
        eval(script.code)
        require.stack.pop()
    })(exports, custom_require, module, script.file_name, script.parent_dir)
    return module.exports
}