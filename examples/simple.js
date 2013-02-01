var panda = require('..');

var sample='a="hi there"';
var ast = panda.load(sample);
panda.execute(ast);
console.log(panda.lookup('a'));
console.log(panda.symbols());
