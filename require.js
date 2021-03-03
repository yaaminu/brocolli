function custom_require(path){
    let script = load_module(path, custom_require.dirname)
    let module = {}
    let exports = {}
    module.exports = exports
    ;(function do_require(exports, require, module, __filename, __dirname){
        require.dirname = __dirname
        eval(script.code)
    })(exports, require, module, script.file_name, script.parent_dir)

    return module.exports
}