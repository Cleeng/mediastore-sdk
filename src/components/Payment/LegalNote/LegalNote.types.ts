import { Order } from 'redux/orderSlice';

export type LegalNoteProps = {
  order: Order;
  period?: string;
};
