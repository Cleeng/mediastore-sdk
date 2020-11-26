/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import roundNumber from 'util/roundNumber';
import { PureCheckoutPriceBox as CheckoutPriceBox } from './CheckoutPriceBox';
import {
  StyledPriceBoxWrapper,
  StyledPriceWrapper,
  StyledOfferPrice,
  StyledTotalOfferPrice
} from './CheckoutPriceBoxStyled';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('CheckoutPriceBox', () => {
  const customerServiceFee = 2;
  const paymentFee = 1;
  const offerPrice = 10;
  const customerCurrencySymbol = '$';
  const discountAmount = 2;
  const taxValue = 0.23;
  const finalPriceWithCoupon = offerPrice + taxValue - discountAmount;
  const finalPriceWithFees = offerPrice + customerServiceFee + paymentFee;
  it('displays coupon discount', () => {
    const wrapper = shallow(
      <CheckoutPriceBox
        isCouponApplied
        finalPrice={finalPriceWithCoupon}
        discountAmount={discountAmount}
        taxValue={taxValue}
        customerServiceFee={0}
        paymentMethodFee={0}
        customerCurrencySymbol={customerCurrencySymbol}
        offerPrice={offerPrice}
      />
    );

    expect(wrapper.find(StyledPriceBoxWrapper)).toHaveLength(1);
    expect(wrapper.find(StyledPriceWrapper)).toHaveLength(4);

    expect(
      wrapper
        .find(StyledPriceWrapper)
        .at(0)
        .find(StyledOfferPrice)
        .text()
    ).toBe(`${customerCurrencySymbol}${offerPrice} exVAT`);
    expect(
      wrapper
        .find(StyledPriceWrapper)
        .at(1)
        .find(StyledOfferPrice)
        .text()
    ).toBe(`${customerCurrencySymbol}${discountAmount}`);
    expect(
      wrapper
        .find(StyledPriceWrapper)
        .at(2)
        .find(StyledOfferPrice)
        .text()
    ).toBe(`${customerCurrencySymbol}${taxValue}`);
    expect(
      wrapper
        .find(StyledPriceWrapper)
        .at(3)
        .find(StyledTotalOfferPrice)
        .text()
    ).toBe(`${customerCurrencySymbol}${finalPriceWithCoupon}`);
  });
  it('displays payment and service fee', () => {
    const wrapper = shallow(
      <CheckoutPriceBox
        isCouponApplied={false}
        finalPrice={offerPrice + customerServiceFee + paymentFee}
        discountAmount={0}
        taxValue={0}
        customerServiceFee={customerServiceFee}
        paymentMethodFee={paymentFee}
        customerCurrencySymbol={customerCurrencySymbol}
        offerPrice={offerPrice}
      />
    );

    expect(wrapper.find(StyledPriceBoxWrapper)).toHaveLength(1);
    expect(wrapper.find(StyledPriceWrapper)).toHaveLength(3);

    expect(
      wrapper
        .find(StyledPriceWrapper)
        .at(0)
        .find(StyledOfferPrice)
        .text()
    ).toBe(`${customerCurrencySymbol}${roundNumber(customerServiceFee)}`);
    expect(
      wrapper
        .find(StyledPriceWrapper)
        .at(1)
        .find(StyledOfferPrice)
        .text()
    ).toBe(`${customerCurrencySymbol}${roundNumber(paymentFee)}`);
    expect(
      wrapper
        .find(StyledPriceWrapper)
        .at(2)
        .find(StyledTotalOfferPrice)
        .text()
    ).toBe(`${customerCurrencySymbol}${roundNumber(finalPriceWithFees)}`);
  });
});
