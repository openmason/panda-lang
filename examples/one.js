var panda = require('..');

panda.load('');

var sample = "/* This is a sample comment \r\n"
             + "Hello here*/";
panda.load(sample);

var sample1 = "a=\"hello\"";
panda.load(sample1);

sample1 = "b=\"This is {{a}}\"";
panda.load(sample1);

var sample2 = "b";
panda.load(sample2);
