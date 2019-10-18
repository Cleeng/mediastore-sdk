import React from 'react';
import { shallow, mount } from 'enzyme';
import Button from 'components/Button/Button';
import Adyen from 'components/Adyen';
import Payment from './Payment';

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
