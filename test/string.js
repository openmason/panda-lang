var panda=require('..');
var assert=require('assert');

// verify string parsing
describe('string', function() {
  before(function(done) {
    done();
  });
  describe('assignment', function() {
    it('simple string', function(done) {
      var str = 'hello there';
      var program='a="'+str+'"';
      panda.execute(panda.load(program));
      assert.equal(panda.lookup('a'), str);
      done();
    });
    it('empty string', function(done) {
      var program='a=""';
      panda.execute(panda.load(program));
      assert.equal(panda.lookup('a'), '');
      done();
    });
  });

  // we would not run a full fledged mushtache test
  describe('mushtache template', function() {
    it('simple variable lookup', function(done) {
      var program='b="35" a="{{b}}"';
      panda.execute(panda.load(program));
      assert.equal(panda.lookup('a'), "35");
      done();
    });
  });


});
