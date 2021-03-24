const SERVER_OBJECT = new Proxy(new Function("return new Proxy({},{})"), {
    get: function(target, prop, receiver){
        return SERVER_OBJECT
    }
})

exports.load_python_module =  function(module){
    let load_python_module
    if (typeof global !== 'undefined' && global.load_python_module){
         load_python_module = global.load_python_module
    } else {
         let proxy = {
            get: function(target, prop, receiver){
                console.log("Attempted to access python module in a browser environment " + prop)
                return SERVER_OBJECT
            }
         }
         load_python_module = (module)=>(new Proxy({}, proxy))
    }
    return load_python_module(module)
}

exports.restore_component_states = function(){
    if(typeof window !== 'undefined' && window.___brocolli___ === undefined){
        let state = document.getElementById('app_state').childNodes[0].data
        window.___brocolli___ = {___state___:JSON.parse(state)}
    }
}

exports.create_state = function(component_id, state){
    let keys = Object.keys(state)
    for (let key of keys){
        if(state[key] === SERVER_OBJECT ){
            let component_state = window.___brocolli___.___state___[component_id]
            state[key] = component_state[key]
        }
    }
    if(typeof global !== 'undefined'){
        global.___brocolli___ = global.___brocolli___ || {___state___:{}}
        global.___brocolli___.___state___[component_id] = state
    }
    return state
}


