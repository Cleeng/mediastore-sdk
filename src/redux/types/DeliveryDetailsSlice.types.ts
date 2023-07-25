export type FormField = {
  value: string;
  error: string;
  translationKey: string;
};

export type DeliveryDetailsInitialState = {
  isGift: boolean;
  confirmRecipientEmail: FormField;
  deliveryDate: FormField;
  message: { value: string };
  recipientEmail: FormField;
};

export type DeliveryDetailsField =
  | 'recipientEmail'
  | 'confirmRecipientEmail'
  | 'deliveryDate';
