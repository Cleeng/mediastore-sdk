const calculateGrossPriceForFreeOffer = (
  netPrice: number,
  taxRate: number,
  customerPriceInclTax: number
): string => {
  if (taxRate === 0) return netPrice.toFixed(2);
  const grossPrice = netPrice + taxRate * netPrice;
  const shouldRoundGrossPrice =
    customerPriceInclTax === Number(grossPrice.toFixed(2));

  if (shouldRoundGrossPrice) {
    return grossPrice.toFixed(2);
  }
  // required to handle price edge cases
  return (Math.trunc(Math.ceil(grossPrice * 100)) / 100).toFixed(2);
};

export default calculateGrossPriceForFreeOffer;
