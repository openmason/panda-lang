var panda = require('..');

var a='a="hi there"';
var b='b="value of {{a}}"';
var ast1 = panda.load(a);
var ast = panda.load(b);
panda.execute(ast1);
panda.execute(ast);
console.log(panda.lookup('a'));
console.log(panda.lookup('b'));
console.log(panda.symbols());
