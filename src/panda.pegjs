/*
 * Panda parser grammar
 * MIT License. 
 * OpenMason
 */

// let the actions be at column 45 or at next line

{
  // imports
  var bigote = require('bigote');
  // variables
  var COMMENT   = 'rem';
  var EQ        = '=';
  var STRING    = 'str';
}

start
  = b:expression                             { return {ast:b}; }

expression
  = t:assignmentExpression                   { return t; }
  / __

assignmentExpression
  = id:identifier __ EQ __ val:stringLiteral { return [EQ, id, val]; }

identifier
  = h:[a-zA-Z_$?\.] t:[0-9a-zA-Z_$?\.]*      { return (h + t.join('')).trim(); }

stringLiteral
  = '"' content:([^"\\] / "\\" c:.{return c;} )* '"' 
{
  var tmpl=bigote.load(content.join(''));
  return [STRING, tmpl];
}

__
  = (WS / EOL / comment)*                    { return []; }

comment
  = multiLineComment
  / singleLineComment

multiLineComment
  = "/*" rem:(!"*/" c:. {return c;})* "*/"   { return [COMMENT, rem.join('')]; }

singleLineComment
  = "//" rem:(!EOL c:. {return c;})* EOL+    { return [COMMENT, rem.join('')]; }


/* ------------ Lex part ------------- */

EQ
  = [=]

WS
  = [\t\v\f ]

EOL
  = [\n\r]

EOF
  = !.
