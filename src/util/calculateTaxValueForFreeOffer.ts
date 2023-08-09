const calculateTaxValueForFreeOffer = (
  netPrice: number,
  taxRate: number,
  customerPriceInclTax: number
): string => {
  const taxValue = netPrice * taxRate;
  const shouldRoundTaxValue =
    customerPriceInclTax === Number((netPrice + taxRate * netPrice).toFixed(2));

  if (shouldRoundTaxValue) {
    return taxValue.toFixed(2);
  }
  // required to handle tax edge cases
  return (Math.trunc(taxValue * 100) / 100).toFixed(2);
};

export default calculateTaxValueForFreeOffer;
