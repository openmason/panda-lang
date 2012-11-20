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
  var LIST      = 'lst';
}

start
  = __ b:expression                          { return {ast:b}; }

expression
  = t:assignmentExpression*                  { return t; }

assignmentExpression
  = id:identifier __ EQ val:value            { return [EQ, id, val]; }

value
  = __ s:string __                           { return s; }
  / __ a:array __                            { return a; }
  / __ i:identifier __                       { return i; }

array
  = "[" __ "]"                               { return [LIST,[]]; }
  / "[" v:list "]"                           { return [LIST,v]; }

list
  = first:value rest:("," value)*  {
  var r = [first];
  for(var i=0;i<rest.length;i++) r.push(rest[i][1]);
  return r;
}

identifier
  = h:[a-zA-Z_$?\.] t:[0-9a-zA-Z_$?\.]*      { return (h + t.join('')).trim(); }

string
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
