/*
 * Panda language.
 * MIT License. (C) OpenMason
 */
module.exports = (function(){
  var parser = require('./parser');

  var result = {
    /* Load panda script */
    load: function(pandascript) {
      console.log(JSON.stringify(parser.parse(pandascript)));
    }
  };
  return result;
})();
