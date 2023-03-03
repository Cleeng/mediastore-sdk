export type Props = {
  offerId: string;
  adyenConfiguration?: { [n: number]: unknown };
  onSuccess: (...args: unknown[]) => void;
};
