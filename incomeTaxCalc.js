function calculator(num) {
  var result = {
    net: 0,
    totalTax: 0
  };

  var taxFreeAllowance = 11500;

  var bands = [
    {
      name: "basic",
      min: 11501,
      max: 45000,
      rate: 0.2
    },
    {
      name: "higher",
      min: 45001,
      max: 150000,
      rate: 0.4
    },
    {
      name: "additional",
      min: 150001,
      max: Infinity,
      rate: 0.45
    }
  ];

  if (num <= taxFreeAllowance) {
    result.net = num;
    return result;
  }

  // Decrease personal allowance (i.e. expand 'higher' band) in case of income over 100k
  if (num > 100000) {
    var adjustment = num <= 123000 ? (num - 100000) / 2 : 11500;
    bands[1].min -= adjustment;
  }

  for (var band of bands) {
    var range = band.max - band.min + 1;
    var tax = 0;
    if (num >= band.max) {
      tax = range * band.rate;
      result.totalTax += tax;
      //console.log(band.name, tax);
      result[band.name] = tax;
    } else {
      tax = (num - band.min + 1) * band.rate;
      result.totalTax += tax;
      //console.log(band.name, tax);
      result[band.name] = tax;
      break;
    }
  }

  result.net = num - result.totalTax;
  console.log(`Net income: £${(result.net).toFixed(2)}, Tax due: £${result.totalTax.toFixed(2)}`);

  return result;
}

module.exports = calculator;
