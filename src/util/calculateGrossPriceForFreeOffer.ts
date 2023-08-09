const calculateGrossPriceForFreeOffer = (
  netPrice: number,
  taxRate: number,
  customerPriceInclTax: number
): string => {
  const grossPrice = netPrice + taxRate * netPrice;
  const shouldRoundGrossPrice =
    customerPriceInclTax === Number(grossPrice.toFixed(2));

  if (shouldRoundGrossPrice) {
    return grossPrice.toFixed(2);
  }
  // required to handle price edge cases
  return (Math.trunc(grossPrice * 100) / 100).toFixed(2);
};

export default calculateGrossPriceForFreeOffer;
