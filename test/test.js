var code = require('../main.js');

var expect = require('chai').expect;


describe('elmiminateDuplicateArrayElements', function(){
  it('should return an array object', function(){
    expect(typeof code.elmiminateDuplicateArrayElements([1, 2, 3]))
    .to.equal('object');
  });
  it('should return the unmodified array with unique elements', function(){
    expect(code.elmiminateDuplicateArrayElements([1, 2, 3]))
    .to.deep.equal([1, 2, 3]);
  });
  it('should return a unique array when duplicates present', function(){
    expect(code.elmiminateDuplicateArrayElements([1, 2, 2, 3]))
    .to.deep.equal([1, 2, 3]);
  });

});
