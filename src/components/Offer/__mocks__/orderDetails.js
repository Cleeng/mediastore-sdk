export const orderDetailsMock = {
  priceBreakdown: {
    offerPrice: 20,
    discountedPrice: 16,
    discountAmount: 4,
    taxValue: 4.6,
    customerServiceFee: 0,
    paymentMethodFee: 0
  },
  discount: {
    applied: false
  },
  totalPrice: 20
};

export const freeOrderDetailsMock = {
  priceBreakdown: {
    offerPrice: 0,
    discountedPrice: 0,
    discountAmount: 0,
    taxValue: 0,
    customerServiceFee: 0,
    paymentMethodFee: 0
  },
  discount: {
    applied: false
  },
  totalPrice: 0
};
