function custom_require(id) {
  if ( 'undefined' === typeof arguments.callee.require_stack ) { arguments.callee.require_stack = []; }
  var require_stack = arguments.callee.require_stack;
  if ( 'undefined' === typeof arguments.callee.modules ) { arguments.callee.modules = {}; }
  var modules = arguments.callee.modules;
  
  // if currently requiring module 'id', return partial exports
  if ( require_stack.indexOf(id) >= 0 ) {
    return modules[id].exports;
  }
  
  // if already required module 'id', return finished exports
  if ( modules[id] && modules[id].exports ) {
    return modules[id].exports;
  }
  
  // do the require of module 'id'
  // - if currently requiring a module, push global exports/module objects into arguments.callee.modules  
  if ( require_stack.length > 0 ) {
    var currently_requiring_id = require_stack[require_stack.length - 1];
    modules[currently_requiring_id] = {
      exports: exports,
      module: module
    };
  }
  
  require_stack.push(id);
  exports = {};
  module = {};
  module.exports = exports
  script = load_js_module(id, custom_require.dir)
  ;(function do_require(exports, require, module, __filename, __dirname){
        require.dir = __dirname
        eval(script.code)
        module.exports['default'] = module.exports
        require.dir = ""
  })(exports, custom_require, module, script.file_name, script.parent_dir)

  modules[id] = {
    exports: module.exports,
    module: module
  };
  require_stack.pop();
  
  // restore last required modules' partial exports to the global space, or clear them
  if ( require_stack.length > 0 ) {
    var currently_requiring_id = require_stack[require_stack.length - 1];
    exports = modules[currently_requiring_id].exports;
    module = modules[currently_requiring_id].module;
  } else {
    exports = {};
    module = {};
  }
  return modules[id].exports;
}