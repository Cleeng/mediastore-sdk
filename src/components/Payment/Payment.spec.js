import React from 'react';
import { shallow, mount } from 'enzyme';
import Payment from './Payment';
import Button from '../Button/Button';
import Adyen from '../Adyen';

describe('Payment', () => {
  it('renders with buttons', () => {
    const wrapper = shallow(<Payment onPaymentComplete={jest.fn()} />);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(Adyen)).toHaveLength(0);
  });

  it('expands on button click', () => {
    const wrapper = mount(<Payment onPaymentComplete={jest.fn()} />);
    wrapper
      .find(Button)
      .first()
      .simulate('click');
    expect(wrapper.find(Adyen)).toHaveLength(1);
  });
});
