/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input';
import CheckoutPriceBox from 'components/CheckoutPriceBox';
import FreeOffer from 'components/FreeOffer';
import * as planHelper from 'util/planHelper';
import Offer from './Offer';
import {
  offerDetailsMock,
  freeOfferDetailsMock,
  subWithTrialDetailsMock,
  seasonPassDetailsMock
} from './__mocks__/offerDetails';
import {
  orderDetailsMock,
  freeOrderDetailsMock
} from './__mocks__/orderDetails';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));
planHelper.dateFormat = jest.fn().mockReturnValue('11/6/2020 02:31 PM GMT+1');

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
          offerDetails={offerDetailsMock}
          orderDetails={orderDetailsMock}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
          updatePriceBreakdown={jest.fn()}
        />
      );

      expect(wrapper.find(CheckoutPriceBox)).toHaveLength(1);
    });
    it('should render FreeOffer component if the offer is free', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={freeOfferDetailsMock}
          orderDetails={freeOrderDetailsMock}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
          updatePriceBreakdown={jest.fn()}
        />
      );

      expect(wrapper.find(CheckoutPriceBox)).toHaveLength(0);
      expect(wrapper.find(FreeOffer)).toHaveLength(1);
    });
    it('should generate description for all offer types', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={offerDetailsMock}
          orderDetails={orderDetailsMock}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
          updatePriceBreakdown={jest.fn()}
        />
      );
      const subscriptionDescription = wrapper
        .instance()
        .generateDescription('S');
      const eventDescription = wrapper.instance().generateDescription('E');
      const rentalDescription = wrapper.instance().generateDescription('R');
      const passDescription = wrapper.instance().generateDescription('P');
      const vodDescription = wrapper.instance().generateDescription('A');

      expect(subscriptionDescription).toMatch(
        `You will be charged 20$ for every month.`
      );
      expect(eventDescription).toContain(
        'Pay-per-view event 11/6/2020 02:31 PM GMT+1'
      );
      expect(rentalDescription).toContain('Monthly access');
      expect(passDescription).toContain('Monthly season pass');
      expect(vodDescription).toContain('Unlimited access');
    });
    it('should generate description for subscription with trial', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={subWithTrialDetailsMock}
          orderDetails={orderDetailsMock}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
          updatePriceBreakdown={jest.fn()}
        />
      );
      const description = wrapper.instance().generateDescription('S');
      expect(description).toMatch(`You will be charged 20$ after 2 months.`);
    });
    it('should generate description for season pass with specific end date', () => {
      const wrapper = shallow(
        <Offer
          offerDetails={seasonPassDetailsMock}
          orderDetails={orderDetailsMock}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
          updatePriceBreakdown={jest.fn()}
        />
      );
      const description = wrapper.instance().generateDescription('P');
      expect(description).toMatch(`Access until 11/6/2020 02:31 PM GMT+1`);
    });
  });
  describe('@events', () => {
    it('should add coupon to state on coupon applied', () => {
      const couponCode = 'abc';
      const wrapper = shallow(
        <Offer
          offerDetails={offerDetailsMock}
          orderDetails={orderDetailsMock}
          couponProps={mockCouponProps}
          onPaymentComplete={jest.fn()}
          updatePriceBreakdown={jest.fn()}
        />
      );

      wrapper.find('CouponInput').simulate('change', couponCode);
      expect(wrapper.state().coupon).toBe(couponCode);
    });
  });
});
