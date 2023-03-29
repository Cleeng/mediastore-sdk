const formatTrialPrice = (price, tax, incTax) => {
  const grossPrice = price + tax * price;
  const isGrossAndTaxEqual = incTax === Number(grossPrice).toFixed(2);

  if (isGrossAndTaxEqual) {
    return grossPrice.toFixed(2);
  }
  return (Math.trunc(grossPrice * 100) / 100).toFixed(2);
};

export default formatTrialPrice;
