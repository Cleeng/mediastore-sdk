import React from 'react';
import { mount } from 'enzyme';
import PaymentMethod from './PaymentMethod';

const initialValue = { paymentDetails: [] };

describe('<PaymentMethod/>', () => {
  const wrapper = mount(<PaymentMethod />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.props('paymentDetails')).toEqual(initialValue);
    });
  });
});
