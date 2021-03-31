//brocolli is assumed to run in a modern javascript engine
const require_cache = new Map()

function custom_require(path){
    custom_require.stack = custom_require.stack || []
    top_dir = custom_require.stack[custom_require.stack.length -1]
    let script = load_js_module(path, top_dir)
    if(!require_cache.has(script.file_name)){
        console.log(`module ${path} not found in cache, loading`)
        custom_require.stack.push(script.parent_dir)
        let module = {}
        let exports = {}
        module.exports = exports
        ;(function do_require(exports, require, module, __filename, __dirname){
            eval(script.code)
            if (exports['default']){
                module.exports = exports['default']
                module.exports['default'] = exports['default']
            }else{
                module.exports['default'] = module.exports
            }
            require.stack.pop()
        })(exports, custom_require, module, script.file_name, script.parent_dir)
        require_cache.set(script.file_name, module)
        return module.exports
    }else{
        console.log(`module ${path} found in cache`)
        return require_cache.get(script.file_name).exports
    }
}

