/*
 * Panda language.
 * MIT License. (C) OpenMason
 */
var bigote = require('bigote');
var handy = require('handy');

module.exports = (function(){

  var symbols_ = {};

  var result = {
    /* Execute a given panda AST 
     * 
     * format would be
     *   {'ast': ... ast ... }
     */
    evaluate: function (ast) {
      if(ast) { 
        instructions(ast['ast']);
        //console.log(symbols_);
      }
      return '<empty or null template>';
    },
    lookup: function(k) {
      return symbols_[k];
    }
  };

  /*
   * Function to handle runtime
   *  ast - [ array of ops ]
   *  - each ops
   *    - EQ (id, value)
   */
  function instructions(ast) {
    var buf='';
    if(!ast) return buf;
    for(var i=0,astlen=ast.length;i<astlen;i++) {
      var node = ast[i];
      //console.log(node);
      if(node && node.length>=3) {
        // assignment 
        if(node[0]=='=') {
          // [ '=', id, val ]
          symbols_[node[1]] = getValue(node[2]);
        } else if(node[0]=='rem') {
          // just ignore comments
        } else {
          console.log('*** unknown tag **** ' + node[0]);
        }
      }
    }
    return buf;
  };

  /* Extract the value
   * If 'str', then call bigote template engine
   */
  function getValue(ast) {
    //console.log(ast);
    if(ast) {
      if(handy.getType(ast)=='array') {
        var t = ast[0];
        if(t=='str') {
          return(bigote.render(ast[1], symbols_));
        } else if(t=='lst') {
          var r=[];
          for(var i=0;i<ast[1].length;i++) {
            r.push(getValue(ast[1][i]));
          }
          return r;
        } 
      } else {
        // its an identifier
        return(symbols_[ast]);
      }
    }
    return '';
  };

  return result;
})();
