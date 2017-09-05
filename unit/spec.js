var test = require('tape');
var calc = require('../incomeTaxCalc');

test('===Income Tax Calculator Test Cases===', function (TC) {
  TC.test('Income of £11500 or less must not be taxed', function(assert) {
    var result = calc(11500);

    assert.equal(result.net, 11500, 11500);
    assert.equal(result.totalTax, 0, 0);
    assert.end();
  });

  TC.test('Income above £11500 but below £45000 must be taxed at a rate of 20%', function(assert) {
    var result = calc(31500);
    assert.equal(result.net, 27500, 27500);
    assert.equal(result.totalTax, 4000, 4000);
    assert.end();
  });

  TC.test('Income above £45000 but below £150000 must be taxed at a rate of 40%', function(assert) {
    var result = calc(60000);

    assert.equal(result.net, 47300, 47300);
    assert.equal(result.basic, 6700, 6700);
    assert.equal(result.higher, 6000, 6000);
    assert.equal(result.totalTax, 12700, 12700);
    assert.end();
  });

  TC.test('Income above £150000 must be taxed at a rate of 45%', function(assert) {
    var result = calc(167893);

    assert.equal(result.additional, 8051.85, 8051.85);
    assert.equal(result.totalTax, 61351.85, 61351.85);
    assert.end();
  });

  TC.test('For every £2 earned above £100000, personal allowance must be reduced by £1 and the amount reduced taxed at 40%', function(assert) {
    var result = calc(110000);

    assert.equal(result.higher, 28000, 28000);
    assert.equal(result.totalTax, 34700, 34700);
    assert.end();
  });

});
