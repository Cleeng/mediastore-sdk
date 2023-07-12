export type FormField = {
  value: string;
  error: string;
};

export type DeliveryDetailsInitialState = {
  recipientEmail: FormField;
  confirmRecipientEmail: FormField;
  deliveryDate: FormField;
  message: FormField;
};

export type DeliveryDetailsField =
  | 'recipientEmail'
  | 'confirmRecipientEmail'
  | 'deliveryDate'
  | 'message';
