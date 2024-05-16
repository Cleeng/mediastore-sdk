import { PriceRules } from 'types/Price.types';

export const addSpaceAfterNumber = (str: string): string => {
  if (!/\d/.test(str.charAt(0))) {
    return str;
  }

  return `${str.charAt(0)} ${str.substring(1)}`;
};

export const isPromoPriceActive = (priceRules: PriceRules): boolean => {
  const currentTimestamp = Math.ceil(Date.now() / 1000);

  return (
    priceRules?.some(
      ({ from, to }) => from <= currentTimestamp && to >= currentTimestamp
    ) ?? false
  );
};
