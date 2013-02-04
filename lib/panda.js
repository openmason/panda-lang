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
      var ast=parser.parse(pandascript);
      this.loadAST(ast['ast'], pandascript);
      return ast;
    },
    // load a given AST to runtime
    // - prepare all variables
    loadAST: function(ast, source) {
      if(!ast) return;
      for(var i=0;i<ast.length;i++) {
        var node=ast[i];
        if(node && node.length>=3 && node[0]=='=') {
          // looking for ['=', id, val]
          runtime.ast()[node[1]] = {'ast': [node]};
          runtime.source()[node[1]] = source;
        }
      }
    },
    execute: runtime.evaluate,
    lookup:  runtime.lookup,
    ast:     runtime.ast,
    source:  runtime.source,
    symbols: runtime.symbols
  };
  return result;
})();
