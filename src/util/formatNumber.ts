const formatNumber = (valueToFormat: number, decimalPlaces = 2): string =>
  Number(valueToFormat).toFixed(decimalPlaces);

export default formatNumber;
