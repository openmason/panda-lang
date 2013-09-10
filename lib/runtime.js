/*
 * Panda language.
 * MIT License. (C) OpenMason
 */
var bigote = require('bigote');
var handy = require('handy');

module.exports = (function(){

  var symbols_ = {};
  var ast_ = {};
  var src_ = {};

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
    },
    source: function(k) {
      if(k) return src_[k];
      return src_;
    },
    ast: function(k) {
      if(k) return ast_[k];
      return ast_;
    },
    symbols: function() {
      return symbols_;
    }
  };

  /*
   * Function to handle runtime
   *  ast - [ array of ops ]
   *  - each ops
   *    - EQ (id, value)
   *    - ITR (op, list, expression)
   */
  function instructions(ast, context) {
    var buf='';
    if(!ast) return buf;
    symbols_['$']=context;
    for(var i=0,astlen=ast.length;i<astlen;i++) {
      var node = ast[i];
      //console.log(node);
      if(node && node.length>=3) {
        // assignment 
        if(node[0]=='=') {
          // [ '=', id, val ]
          var id = node[1];
          var v = getValue(node[2]);
          if(id=='_') {
            var tmp=symbols_.hasOwnProperty(id)?symbols_[id]:[];
            tmp.push(v);
            v=tmp;
          } 
          symbols_[id] = v;
        } else if(node[0]=='rem') {
          // just ignore comments
        } else {
          console.log('*** unknown tag **** ' + node[0]);
        }
      }
    }
    delete symbols_['$'];
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
        } else if(t=='obj') {
          return ast[1];
        } else if(t=='num') {
          return ast[1];
        } else if(t=='#') {
          var obj=getValue(ast[1]);
          return obj.length;
        } else if(t=='@') {
          // iteration
          // [ '@', op (->/=>), list, expr ]
          var lst=getValue(ast[2]);
          var result=[];
          for(var li=0;lst!=null && li<lst.length;li++) {
            symbols_['$']=lst[li];
            result.push(getValue(ast[3]));
          }
          return result;
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
