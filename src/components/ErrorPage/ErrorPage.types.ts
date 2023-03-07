export type Errors =
  | 'offerNotExist'
  | 'generalError'
  | 'alreadyHaveAccess'
  | 'cannotPurchase'
  | 'inactive';

export type ErrorPageProps = { type?: Errors; error?: string };
