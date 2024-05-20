export type PriceRules =
  | Array<{
      from: number;
      to: number;
      amount: number;
      name: string;
    }>
  | undefined;

export type Price = {
  amount: number;
  currency: string;
  taxIncluded: boolean;
  rules: PriceRules;
};

export default Price;
