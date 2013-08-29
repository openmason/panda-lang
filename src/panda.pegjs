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
  var OBJECT    = 'obj';
  var LIST      = 'lst';

  /* --------------- json related -------------- */

  /*
   * We can't return |null| in the |value| rule because that would mean parse
   * failure. So we return a special object instead and convert it to |null|
   * later.
   */

  var null_ = new Object;

  function fixNull(value) {
    return value === null_ ? null : value;
  }

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
  / __ j:jsonObject __                       { return [OBJECT,j]; }

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



/* ------------- JSON Grammar ------------ */

/* ===== Syntactical Elements ===== */

jsonObject
  = _ object:object { return object; }

object
  = "{" _ "}" _                 { return {};      }
  / "{" _ members:members "}" _ { return members; }

members
  = head:pair tail:("," _ pair)* {
      var result = {};
      result[head[0]] = fixNull(head[1]);
      for (var i = 0; i < tail.length; i++) {
        result[tail[i][2][0]] = fixNull(tail[i][2][1]);
      }
      return result;
    }

pair
  = name:jstring ":" _ jvalue:jvalue { return [name, jvalue]; }

jarray
  = "[" _ "]" _                   { return [];       }
  / "[" _ elements:elements "]" _ { return elements; }

elements
  = head:jvalue tail:("," _ jvalue)* {
      var result = [fixNull(head)];
      for (var i = 0; i < tail.length; i++) {
        result.push(fixNull(tail[i][2]));
      }
      return result;
    }

jvalue
  = jstring
  / number
  / object
  / jarray
  / "true" _  { return true;  }
  / "false" _ { return false; }
  / "null" _  { return null_; }

/* ===== Lexical Elements ===== */

jstring "string"
  = '"' '"' _             { return "";    }
  / '"' chars:chars '"' _ { return chars; }

chars
  = chars:char+ { return chars.join(""); }

char
  // In the original JSON grammar: "any-Unicode-character-except-"-or-\-or-control-character"
  = [^"\\\0-\x1F\x7f]
  / '\\"'  { return '"';  }
  / "\\\\" { return "\\"; }
  / "\\/"  { return "/";  }
  / "\\b"  { return "\b"; }
  / "\\f"  { return "\f"; }
  / "\\n"  { return "\n"; }
  / "\\r"  { return "\r"; }
  / "\\t"  { return "\t"; }
  / "\\u" digits:$(hexDigit hexDigit hexDigit hexDigit) {
      return String.fromCharCode(parseInt("0x" + digits));
    }

number "number"
  = parts:$(int frac exp) _ { return parseFloat(parts); }
  / parts:$(int frac) _     { return parseFloat(parts); }
  / parts:$(int exp) _      { return parseFloat(parts); }
  / parts:$(int) _          { return parseFloat(parts); }

int
  = digit19 digits
  / digit
  / "-" digit19 digits
  / "-" digit

frac
  = "." digits

exp
  = e digits

digits
  = digit+

e
  = [eE] [+-]?

/*
 * The following rules are not present in the original JSON gramar, but they are
 * assumed to exist implicitly.
 *
 * FIXME: Define them according to ECMA-262, 5th ed.
 */

digit
  = [0-9]

digit19
  = [1-9]

hexDigit
  = [0-9a-fA-F]

/* ===== Whitespace ===== */

_ "whitespace"
  = whitespace*

// Whitespace is undefined in the original JSON grammar, so I assume a simple
// conventional definition consistent with ECMA-262, 5th ed.
whitespace
  = [ \t\n\r]

