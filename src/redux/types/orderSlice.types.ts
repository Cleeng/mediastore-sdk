import { CurrencyFormat } from 'util/planHelper';
import { MESSAGE_TYPE_FAIL, MESSAGE_TYPE_SUCCESS } from 'components/Input';

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

export type OrderInitialState = {
  order: Order;
  loading: boolean;
  error: string;
  couponDetails: {
    couponCode: string;
    showMessage: boolean;
    message: string;
    messageType: typeof MESSAGE_TYPE_SUCCESS | typeof MESSAGE_TYPE_FAIL;
    translationKey: string;
  };
  isCouponLoading: boolean;
  isUpdateLoading: boolean;
};
