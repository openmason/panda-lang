var panda = require('..');

//panda.load('');
var sample = "/* This is a sample comment \r\n"
             + "Hello here*/";
/*
panda.load(sample);

var sample1 = "a=\"hello\"";
panda.load(sample1);

sample1 = "b=\"This is {{a}}\"";
panda.load(sample1);

var sample2 = "a = \"hi\"\n b= \"45\" \n c=[a,b,\"This is {{ mush }}\"]";
panda.load(sample2);
*/

//panda.execute(panda.load('a="hello there"\nb="another"\nc="Total value {{a}} and {{b}}"'));
//panda.execute(panda.load('a="1"\nb="2"\nc=b'));
panda.execute(panda.load('a="hello there"\nb="another"\nc=[a,b]'));
console.log(panda.lookup('c'));
console.log(panda.symbols());