import { CurrencyFormat } from 'util/planHelper';
import {
  MESSAGE_TYPE_FAIL,
  MESSAGE_TYPE_SUCCESS
} from 'components/InputLegacy';

export type Order = {
  billingAddress: unknown;
  country: string;
  couponId: unknown;
  currency: CurrencyFormat;
  customer: { locale: string; email: string };
  customerId: number;
  discount: {
    applied: boolean;
    type: 'trial' | 'coupon' | '';
    periods: number;
  };
  expirationDate: number;
  id: number;
  offer: {
    title: string;
    description: string;
    price: number;
    currency: string;
  };
  offerId: string;
  paymentMethodId: number;
  priceBreakdown: {
    customerServiceFee: number;
    discountAmount: number;
    discountedPrice: number;
    offerPrice: number;
    paymentMethodFee: number;
    taxValue: number;
  };
  publisherId: number;
  requiredPaymentDetails: boolean;
  taxBreakdown: unknown;
  taxRate: number;
  totalPrice: number;
  buyAsAGift: boolean;
};

type MessageType = typeof MESSAGE_TYPE_FAIL | typeof MESSAGE_TYPE_SUCCESS;

export type OrderCouponDetailsMessage = {
  showMessage: boolean;
  message: string;
  messageType: MessageType;
  translationKey: string;
};

type OrderCouponDetails = OrderCouponDetailsMessage & {
  couponCode: string;
};

export type OrderInitialState = {
  order: Order;
  loading: boolean;
  error: string;
  couponDetails: OrderCouponDetails;
  isCouponLoading: boolean;
  isUpdateLoading: boolean;
};
