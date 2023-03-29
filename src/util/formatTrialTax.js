const formatTrialTax = (price, tax, incTax) => {
  const taxValue = price * tax;
  const isGrossAndTaxEqual = incTax === Number(price + tax * price).toFixed(2);

  if (isGrossAndTaxEqual) {
    return taxValue.toFixed(2);
  }
  return (Math.trunc(taxValue * 100) / 100).toFixed(2);
};

export default formatTrialTax;
