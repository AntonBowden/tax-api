exports.incomeTaxCalc = function(num) {
  var taxFreeAllowance = 11500;
  var totalTax = 0;
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
    return num;
  }

  // Decrease personal allowance in case of income over 100k
  if (num > 100000) {
    var adjustment = num <= 123000 ? (num - 100000) / 2 : 11500;
    bands[1].min -= adjustment;
  }

  for (var band of bands) {
    var range = band.max - band.min + 1;
    var tax = 0;
    if (num >= band.max) {
      tax = range * band.rate;
      totalTax += tax;
      console.log(band.name, tax);
    } else {
      tax = (num - band.min + 1) * band.rate;
      totalTax += tax;
      console.log(band.name, tax);
      break;
    }
  }
  return `Net income: £${(num - totalTax).toFixed(2)}, Tax due: £${totalTax.toFixed(2)}`;
}
