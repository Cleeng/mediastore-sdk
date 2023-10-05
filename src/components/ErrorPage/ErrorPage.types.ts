export type Errors =
  | 'offerNotExist'
  | 'generalError'
  | 'alreadyHaveAccess'
  | 'cannotPurchase'
  | 'inactive'
  | 'isNotAuth';

export type ErrorPageProps = {
  type?: Errors;
  error?: string;
  isRedeemGift?: boolean;
};
