/*
 * Panda language.
 * MIT License. (C) OpenMason
 */
module.exports = (function(){
  var parser = require('./parser');
  var runtime = require('./runtime');

  var result = {
    /* Load panda script */
    load: function(pandascript) {
      return parser.parse(pandascript);
    },
    execute: runtime.evaluate,
    lookup: runtime.lookup
  };
  return result;
})();
