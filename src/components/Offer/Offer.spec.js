/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input';
import Offer from './Offer';
import mockOfferDetails from './__mocks__/offerDetails';
import mockOrderDetails from './__mocks__/orderDetails';
import {
  StyledOfferTitle,
  StyledOfferDescription,
  StyledTrial,
  StyledTrialDescription,
  StyledOfferPrice,
  StyledPriceBoxWrapper,
  StyledPriceBoxItemWrapper,
  StyledTotalWrapper
} from './OfferStyled';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const mockCouponProps = {
  showMessage: false,
  message: '',
  messageType: MESSAGE_TYPE_SUCCESS,
  onSubmit: jest.fn().mockResolvedValue({})
};
describe('Offer', () => {
  describe('@render', () => {
    it('displays basic details', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={mockOfferDetails}
          orderDetails={mockOrderDetails}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
        />
      );

      expect(wrapper.find(StyledTrial)).toHaveLength(0);
      expect(wrapper.find(StyledPriceBoxWrapper)).toHaveLength(1);
      expect(wrapper.find(StyledPriceBoxItemWrapper)).toHaveLength(1);

      expect(wrapper.find(StyledOfferTitle).text()).toBe(
        mockOfferDetails.offerTitle
      );
      expect(wrapper.find(StyledOfferDescription).text()).toBe(
        mockOfferDetails.description
      );

      expect(
        wrapper
          .find(StyledPriceBoxItemWrapper)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.taxValue}`
      );

      expect(
        wrapper
          .find(StyledTotalWrapper)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.offerPrice}`
      );
    });

    it('displays trial', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={{ ...mockOfferDetails, trialAvailable: true }}
          orderDetails={mockOrderDetails}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
        />
      );

      const trialDescription = `You will be charged {{price}}exVat after {{period}}.`;

      expect(wrapper.find(StyledTrial)).toHaveLength(1);
      expect(wrapper.find(StyledTrialDescription).text()).toBe(
        trialDescription
      );
      expect(wrapper.find(StyledOfferDescription).text()).toBe(
        `${trialDescription}${mockOfferDetails.description}`
      );
    });

    it('displays coupon discount', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={{
            ...mockOfferDetails
          }}
          orderDetails={{
            ...mockOrderDetails,
            discount: {
              applied: true
            }
          }}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
        />
      );

      expect(wrapper.find(StyledPriceBoxWrapper)).toHaveLength(1);
      expect(wrapper.find(StyledPriceBoxItemWrapper)).toHaveLength(3);

      expect(
        wrapper
          .find(StyledPriceBoxItemWrapper)
          .at(0)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.offerPrice} exVAT`
      );
      expect(
        wrapper
          .find(StyledPriceBoxItemWrapper)
          .at(1)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.discountAmount}`
      );
      expect(
        wrapper
          .find(StyledPriceBoxItemWrapper)
          .at(2)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.taxValue}`
      );
      expect(
        wrapper
          .find(StyledTotalWrapper)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.totalPrice}`
      );
    });
  });
  describe('@events', () => {
    it('should add coupon to state on coupon applied', () => {
      const couponCode = 'abc';
      const wrapper = shallow(
        <Offer
          offerDetails={mockOfferDetails}
          orderDetails={mockOrderDetails}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
        />
      );

      wrapper.find('CouponInput').simulate('change', couponCode);
      expect(wrapper.state().coupon).toBe(couponCode);
    });
  });
});
