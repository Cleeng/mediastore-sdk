import { OrderInitialState } from 'appRedux/types';

const orderMock: OrderInitialState = {
  order: {
    billingAddress: '123 Main St, Springfield',
    country: 'United States',
    couponId: 'COUPON123',
    currency: 'EUR',
    customer: {
      locale: 'en-US',
      email: 'customer@example.com'
    },
    customerId: 456,
    discount: {
      applied: true,
      type: 'coupon',
      periods: 12
    },
    expirationDate: 1704067200,
    id: 12345,
    offer: {
      title: 'Premium Subscription',
      description: 'Access to all premium features',
      price: 99.99,
      currency: 'EUR'
    },
    offerId: 'OFFER456',
    paymentMethodId: 2,
    priceBreakdown: {
      customerServiceFee: 5.0,
      discountAmount: 10.0,
      discountedPrice: 89.99,
      offerPrice: 99.99,
      paymentMethodFee: 2.5,
      taxValue: 7.5
    },
    publisherId: 321,
    requiredPaymentDetails: true,
    taxBreakdown: '',
    taxRate: 0.15,
    totalPrice: 97.49,
    buyAsAGift: false
  },
  loading: false,
  error: '',
  couponDetails: {
    couponCode: 'DISCOUNT2024',
    showMessage: true,
    message: 'Your coupon has been applied!',
    messageType: 'success',
    translationKey: 'coupon-input.success'
  },
  isCouponLoading: false,
  isUpdateLoading: false
};

export default orderMock;
