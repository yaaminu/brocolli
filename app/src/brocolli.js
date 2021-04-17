
const SERVER_OBJECT = new Proxy(function(){return SERVER_OBJECT}, {
    get: ()=> SERVER_OBJECT
})

exports.load_python_module =  function(module){
    if (typeof window !== 'undefined'){
        let proxy = {
            get: function(target, prop, receiver){
                console.log("Attempted to access python module in a browser environment " + prop)
                return SERVER_OBJECT
            }
        }
        return new Proxy({}, proxy)
    }
    return global.load_python_module(module)
}

exports.initialize = function initialize(){
    if(typeof window !== 'undefined' && window.___brocolli___ === undefined){
        let states = JSON.parse(document.getElementById('app_state').childNodes[0].data)
        let props = JSON.parse(document.getElementById('app_prop').childNodes[0].data)
        window.___brocolli___ = {state:states, props: props}
    }
}

exports.main_props = function main_props(){
    if(window.___brocolli___ !== undefined){
        return window.___brocolli___.props
    }
    throw new Error("Brocolli is not initialized!!")
}

exports.create_state = function(component_id, state){
    let keys = Object.keys(state)
    for (let key of keys){
        if(state[key] === SERVER_OBJECT ){
            let component_state = window.___brocolli___.state[component_id]
            state[key] = component_state[key]
        }
    }
    if(typeof global !== 'undefined'){
        global.___brocolli___ = global.___brocolli___ || {state:{}}
        global.___brocolli___.state[component_id] = state
    }
    return state
}
