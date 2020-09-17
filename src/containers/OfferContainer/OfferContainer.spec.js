/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { getOfferDetails, updateOrder } from 'api';
import Offer from 'components/Offer';
import Loader from 'components/Loader';
import ErrorPage from 'components/ErrorPage';
import { MESSAGE_TYPE_SUCCESS, MESSAGE_TYPE_FAIL } from 'components/Input';
import { setData } from 'util/appConfigHelper';
import OfferContainer, { PureOfferContainer } from './OfferContainer';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const mockUrlProps = {
  location: { search: '?offer=123123' }
};

const jwtMock =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNjkwNjI0MjU1IiwicHVibGlzaGVySWQiOjEyMDM1NTU1OX0.EvaMwJ1ZtGR4TNujmROVxiXhiHxzTOp0vgCJPoScXW2bBSroAGsm8kLe-ivnqQ9xoiHJWtDRYZGLKSGASFVuo0bqJT2ZzVEohvCPRwMke0R87p_eaTztWvAUjhbUP0Dk9xo8_AeDvEIDmGln_NXJvTTn6EqU_Xk2Zq3W29_WtbEOjfPplCp49gerR_VpnWA36yTUhfF2sWA1ir0F2HymsDvoQ_6dc8t7nENdslJY08kW-_mSQgj4SbOf4uXgiKAlPU8x3LWzUbO9uFF-eAND7hrJGM-FIWcJreW92DRXmuUMBfe_ws9KXzv-F5gKVcuz7qOpyykkJtZSBvFQJtKMaw';

jest.mock('react-router-dom', () => {
  return {
    Redirect: jest.fn().mockImplementation(() => null)
  };
});

jest.mock('api', () => ({
  updateOrder: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({
          errors: [],
          responseData: {
            order: {
              id: 123123,
              priceBreakdown: { offerPrice: 2 },
              discount: { applied: false }
            }
          }
        });
      })
  ),
  getOfferDetails: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({ errors: [], responseData: { trialAvailable: true } });
      })
  ),
  createOrder: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({
          errors: [],
          responseData: {
            order: {
              id: 123123,
              priceBreakdown: { offerPrice: 2 },
              discount: { applied: false }
            }
          },
          trialAvailable: true
        });
      })
  ),
  getPaymentMethods: jest.fn().mockImplementation(
    () =>
      new Promise(resolve => {
        resolve({
          errors: [],
          responseData: {}
        });
      })
  )
}));
const orderId = 123123;
const MockCoupon = {
  message: 'Your coupon has been applied',
  messageType: MESSAGE_TYPE_SUCCESS
};

describe('<OfferContainer/>', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  setData('CLEENG_AUTH_TOKEN', jwtMock);

  describe('@renders', () => {
    it('should show Loader when no offer details', () => {
      const wrapper = mount(
        <OfferContainer urlProps={mockUrlProps} onPaymentComplete={jest.fn()} />
      );
      expect(wrapper.exists(Loader)).toBe(true);
    });
    it('should render error page when offer is blocked for country', () => {
      const wrapper = mount(
        <PureOfferContainer
          urlProps={mockUrlProps}
          onPaymentComplete={jest.fn()}
        />
      );
      wrapper.setState({
        error: 'Offer is blocked for country'
      });
      expect(wrapper.exists(ErrorPage)).toBe(true);
      expect(wrapper.find(ErrorPage).props().type).toBe('cannotPurchase');
    });
    it('should render error page when offer does not exist', () => {
      const wrapper = mount(
        <PureOfferContainer
          urlProps={mockUrlProps}
          onPaymentComplete={jest.fn()}
        />
      );
      wrapper.setState({
        error: `doesn't exist.`
      });
      expect(wrapper.exists(ErrorPage)).toBe(true);
      expect(wrapper.find(ErrorPage).props().type).toBe('offerNotExist');
    });
    it('should render error page when customer already have access', () => {
      const wrapper = mount(
        <PureOfferContainer
          urlProps={mockUrlProps}
          onPaymentComplete={jest.fn()}
        />
      );
      wrapper.setState({
        error: 'Access already granted'
      });
      expect(wrapper.exists(ErrorPage)).toBe(true);
      expect(wrapper.find(ErrorPage).props().type).toBe('alreadyHaveAccess');
    });
    it('should redirect to login page if error occurred', () => {
      const wrapper = mount(
        <PureOfferContainer
          urlProps={mockUrlProps}
          onPaymentComplete={jest.fn()}
        />
      );
      wrapper.setState({
        error: 'error'
      });
      expect(wrapper.exists(ErrorPage)).toBe(false);
      expect(wrapper.exists(Offer)).toBe(false);
    });
  });

  describe('@actions', () => {
    it('should apply valid coupon on submit', done => {
      const wrapper = shallow(
        <PureOfferContainer
          urlProps={mockUrlProps}
          onPaymentComplete={jest.fn()}
        />
      );
      wrapper.setState({
        orderDetails: { id: orderId }
      });
      wrapper.instance().onCouponSubmit(MockCoupon);
      expect(wrapper.state().couponProps.couponLoading).toBe(true);
      setImmediate(() => {
        expect(wrapper.state().orderDetails).not.toBe(null);
        expect(wrapper.state().couponProps.couponLoading).toBe(false);
        expect(wrapper.state().couponProps.showMessage).toBe(true);
        expect(wrapper.state().couponProps.message).toBe(
          'Your coupon has been applied!'
        );
        expect(wrapper.state().couponProps.messageType).toBe(
          MESSAGE_TYPE_SUCCESS
        );
        done();
      });
    });
    it('should not apply empty coupon on submit', () => {
      const wrapper = shallow(
        <PureOfferContainer
          urlProps={mockUrlProps}
          onPaymentComplete={jest.fn()}
        />
      );
      wrapper.setState({
        orderDetails: { id: orderId }
      });
      wrapper.instance().onCouponSubmit('');
      expect(wrapper.state().couponProps).toBe(null);
    });
    it('should not apply invalid coupon on submit', done => {
      updateOrder.mockImplementationOnce(
        () =>
          new Promise(resolve => {
            resolve({
              status: 422,
              errors: ['not valid coupon']
            });
          })
      );
      getOfferDetails.mockImplementationOnce(
        () =>
          new Promise(resolve => {
            resolve({ errors: [] });
          })
      );

      const wrapper = mount(
        <PureOfferContainer
          urlProps={mockUrlProps}
          onPaymentComplete={jest.fn()}
        />
      );
      wrapper.setState({
        orderDetails: { id: orderId },
        offerId: '123'
      });
      wrapper.instance().onCouponSubmit(MockCoupon);
      expect(wrapper.state().couponProps.couponLoading).toBe(true);
      setImmediate(() => {
        expect(wrapper.state().couponProps.couponLoading).toBe(false);
        expect(wrapper.state().couponProps.showMessage).toBe(true);
        expect(wrapper.state().couponProps.message).toBe(
          'This is not a valid coupon code for this offer. Please check the code on your coupon and try again.'
        );
        expect(wrapper.state().couponProps.messageType).toBe(MESSAGE_TYPE_FAIL);
        done();
      });
    });
    it('should show error while empty offerId', done => {
      setData('CLEENG_OFFER_ID', '');
      const localProps = {
        location: { search: '' }
      };
      const wrapper = shallow(
        <PureOfferContainer
          urlProps={localProps}
          onPaymentComplete={jest.fn()}
        />
      );
      setImmediate(() => {
        expect(wrapper.state().error).toBe('Offer not set');
        done();
      });
    });
    it('should show error while offer fetching will fail', done => {
      getOfferDetails.mockImplementationOnce(
        () =>
          new Promise(resolve => {
            resolve({ errors: ['some error'] });
          })
      );
      const wrapper = shallow(
        <PureOfferContainer
          urlProps={mockUrlProps}
          onPaymentComplete={jest.fn()}
        />
      );
      setImmediate(() => {
        expect(wrapper.state().error).toBe('some error');
        done();
      });
    });
  });
});
