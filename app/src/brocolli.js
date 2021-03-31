
const SERVER_OBJECT = new Proxy(function(){return SERVER_OBJECT}, {
    get: ()=> SERVER_OBJECT
})

exports.load_python_module =  function(module){
    if (typeof global !== 'undefined' && global.load_python_module !== undefined){
         return global.load_python_module(module)
    }
    let proxy = {
        get: function(target, prop, receiver){
            console.log("Attempted to access python module in a browser environment " + prop)
            return SERVER_OBJECT
        }
    }
    return new Proxy({}, proxy)
}

exports.restore_component_states = function(){
    if(typeof window !== 'undefined' && window.___brocolli___ === undefined){
        let states = JSON.parse(document.getElementById('data_brocolli_app_state').childNodes[0].data)
        window.___brocolli___ = {___state___:states}
    }
}

exports.create_state = function(component_id, state){
    let keys = Object.keys(state)
    if(typeof window !== 'undefined'){
        let component_state = window.___brocolli___.___state___[component_id]
        for(let i=0; i < keys.length; i++){
             let key = keys[i]
             if(state[key] === SERVER_OBJECT ){
                state[key] = component_state[key]
             }
        }

    }
    if(typeof global !== 'undefined'){
        global.app_state[component_id] = state
    }
    return state
}
