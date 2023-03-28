const formatTrialPrice = (offerPrice, taxRate, customerPriceInclTax) => {
  let calculatedGrossPrice = offerPrice + taxRate * offerPrice;
  const calculatedGrossPriceRounded = Number(calculatedGrossPrice.toFixed(2));

  if (customerPriceInclTax !== calculatedGrossPriceRounded) {
    calculatedGrossPrice = Math.trunc(calculatedGrossPrice * 100) / 100;
  }
  return calculatedGrossPrice.toFixed(2);
};

export default formatTrialPrice;
