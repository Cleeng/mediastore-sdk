export type FormField = {
  value: string;
  error: string;
};

export type DeliveryDetailsInitialState = {
  isGift: boolean;
  confirmRecipientEmail: FormField;
  deliveryDate: FormField;
  message: FormField;
  recipientEmail: FormField;
};

export type DeliveryDetailsField =
  | 'recipientEmail'
  | 'confirmRecipientEmail'
  | 'deliveryDate'
  | 'message';
