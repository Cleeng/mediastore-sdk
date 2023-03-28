const formatTrialTax = (offerPrice, taxRate, customerPriceIncTax) => {
  let taxValue = offerPrice * taxRate;
  const calculatedGrossPriceRounded = Number(
    (offerPrice + taxRate * offerPrice).toFixed(2)
  );

  if (customerPriceIncTax !== calculatedGrossPriceRounded) {
    taxValue = Math.trunc(taxValue * 100) / 100;
  }
  return taxValue.toFixed(2);
};

export default formatTrialTax;
