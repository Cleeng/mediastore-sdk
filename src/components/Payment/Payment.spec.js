/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from 'enzyme';
import PaymentMethodButton from 'components/PaymentMethodButton';
import { PureAdyen as Adyen } from 'components/Adyen/Adyen';
import {
  submitPayment,
  getPaymentMethods,
  updateOrder,
  submitPayPalPayment
} from 'api';
import { getData, setData } from 'util/appConfigHelper';
import Payment from './Payment';
import { PaymentErrorStyled } from './PaymentStyled';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

const mockPaymentMethods = {
  responseData: {
    paymentMethods: [
      {
        id: 234,
        methodName: 'card',
        logoUrl:
          'https://cleeng.com/assets/7d823b2183d46cd1fe79a9a32c566e07.png'
      },
      {
        id: 123,
        methodName: 'paypal',
        logoUrl: ''
      }
    ]
  },
  errors: []
};

jest.mock('api', () => ({
  createOrder: jest
    .fn()
    .mockResolvedValue({ orderId: '123123' })
    .mockName('createOrder'),
  updateOrder: jest
    .fn()
    .mockResolvedValue({ errors: [], responseData: { order: {} } })
    .mockName('updateOrder'),
  getPaymentMethods: jest
    .fn()
    .mockResolvedValue({
      responseData: {
        paymentMethods: [
          {
            id: 234,
            methodName: 'card',
            logoUrl:
              'https://cleeng.com/assets/7d823b2183d46cd1fe79a9a32c566e07.png'
          },
          {
            id: 123,
            methodName: 'paypal',
            logoUrl: ''
          }
        ]
      },
      errors: []
    })
    .mockName('getPaymentMethods'),
  submitPayment: jest
    .fn()
    .mockResolvedValue({ errors: [] })
    .mockName('submitPayment'),
  submitPayPalPayment: jest
    .fn()
    .mockResolvedValue({
      responseData: { redirectUrl: 'mock.com' },
      errors: []
    })
    .mockName('submitPayPalPayment')
}));

describe('Payment', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem');
    jest.spyOn(Storage.prototype, 'setItem');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders with buttons', () => {
    const wrapper = shallow(<Payment onPaymentComplete={jest.fn()} />);
    wrapper.setState({
      paymentMethods: mockPaymentMethods.responseData.paymentMethods
    });
    expect(wrapper.find(PaymentMethodButton)).toHaveLength(2);
    expect(wrapper.find(Adyen)).toHaveLength(0);
  });
  it('fetch payment methods on render', done => {
    const wrapper = shallow(<Payment onPaymentComplete={jest.fn()} />);
    setImmediate(() => {
      expect(wrapper.state().paymentMethods).toEqual(
        mockPaymentMethods.responseData.paymentMethods
      );
      const paymentMethodId = getData('CLEENG_PAYMENT_METHOD_ID');
      expect(Number(paymentMethodId)).toBe(
        mockPaymentMethods.responseData.paymentMethods[0].id
      );
      done();
    });
  });
  it('shows error while cannot fetch payment methods', done => {
    getPaymentMethods.mockResolvedValueOnce({
      errors: ['Some error']
    });
    const wrapper = shallow(<Payment onPaymentComplete={jest.fn()} />);
    setImmediate(() => {
      expect(wrapper.find(PaymentErrorStyled).exists()).toBe(true);
      done();
    });
  });
  it('expands on button click', () => {
    const wrapper = mount(<Payment onPaymentComplete={jest.fn()} />);
    setData('CLEENG_ORDER_ID', 123123123);
    wrapper.setState({
      paymentMethods: mockPaymentMethods.responseData.paymentMethods
    });
    wrapper
      .find(PaymentMethodButton)
      .first()
      .simulate('click');
    expect(wrapper.find(Adyen)).toHaveLength(1);
    expect(updateOrder).toHaveBeenCalled();
  });
  it('clears error', () => {
    const wrapper = shallow(<Payment onPaymentComplete={jest.fn()} />);
    const instance = wrapper.instance();
    instance.setState({ generalError: 'ERROR' });
    expect(instance.state.generalError).not.toBe('');
    instance.clearError();
    expect(instance.state.generalError).toBe('');
  });
});
describe('Adyen submit', () => {
  it('complete payment on successful submit via adyen', done => {
    const mockOnPaymentComplete = jest.fn();
    const wrapper = mount(
      <Payment onPaymentComplete={mockOnPaymentComplete} />
    );
    const instance = wrapper.instance();
    instance.onAdyenSubmit({ data: { paymentMethod: {} } });
    expect(submitPayment).toHaveBeenCalled();
    setImmediate(() => {
      expect(instance.props.onPaymentComplete).toHaveBeenCalled();
      done();
    });
  });
  it('shows error when payment submit failed', done => {
    submitPayment.mockResolvedValueOnce({
      errors: ['Some error']
    });
    const wrapper = mount(<Payment onPaymentComplete={jest.fn()} />);
    const instance = wrapper.instance();
    instance.onAdyenSubmit({ data: { paymentMethod: {} } });
    expect(submitPayment).toHaveBeenCalled();
    setImmediate(() => {
      expect(instance.state.generalError).not.toBe('');
      done();
    });
  });
});
describe('Paypal submit', () => {
  it('should call submitPayPalPayment', done => {
    const mockOnPaymentComplete = jest.fn();
    delete window.location;
    window.location = {
      href: ''
    };
    const wrapper = mount(
      <Payment onPaymentComplete={mockOnPaymentComplete} />
    );
    const instance = wrapper.instance();
    instance.submitPayPal();
    expect(submitPayPalPayment).toHaveBeenCalled();
    setImmediate(() => {
      expect(window.location.href).toBe('mock.com');
      done();
    });
  });
  it('should set state when error occures', done => {
    submitPayPalPayment.mockRejectedValue(new Error('erro'));
    const mockOnPaymentComplete = jest.fn();
    const wrapper = mount(
      <Payment onPaymentComplete={mockOnPaymentComplete} />
    );
    const instance = wrapper.instance();
    instance.submitPayPal();
    expect(submitPayPalPayment).toHaveBeenCalled();
    setImmediate(() => {
      expect(instance.state.generalError).toBe(
        'The payment failed. Please try again.'
      );
      done();
    });
  });
});
