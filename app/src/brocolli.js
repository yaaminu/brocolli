let load_python_module
if (global !== undefined && global.load_python_module){
     load_python_module = global.load_python_module
}else{
     let proxy = {
        get: function(target, prop, receiver){
            throw new Error("Attempted to access python module in a browser environment " + prop)
        }
     }
     load_python_module = (module)=>(new Proxy({}, proxy))
}

exports.load_python_module =  load_python_module