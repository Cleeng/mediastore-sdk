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
  StyledPriceWrapper,
  StyledOfferPrice,
  StyledPriceBeforeWrapper,
  StyledCouponDiscountWrapper
} from './OfferStyled';

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
      expect(wrapper.find(StyledPriceBeforeWrapper)).toHaveLength(0);

      expect(wrapper.find(StyledOfferTitle).text()).toBe(
        mockOfferDetails.offerTitle
      );
      expect(wrapper.find(StyledOfferDescription).text()).toBe(
        mockOfferDetails.description
      );
      expect(wrapper.find(StyledOfferPrice).text()).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.offerPrice} exVAT`
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

      const trialDescription = `You will be charged {{price}} after {{period}}.`;

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

      expect(wrapper.find(StyledPriceBeforeWrapper)).toHaveLength(1);
      expect(
        wrapper
          .find(StyledPriceBeforeWrapper)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.offerPrice} exVAT`
      );
      expect(wrapper.find(StyledCouponDiscountWrapper)).toHaveLength(1);
      expect(
        wrapper
          .find(StyledCouponDiscountWrapper)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.discountAmount}`
      );
      expect(
        wrapper
          .find(StyledPriceWrapper)
          .find(StyledOfferPrice)
          .text()
      ).toBe(
        `${mockOfferDetails.customerCurrencySymbol}${mockOrderDetails.priceBreakdown.discountedPrice} exVAT`
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
