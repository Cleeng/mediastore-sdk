import React from 'react';
import { mount } from 'enzyme';
import PaymentInfo from './PaymentInfo.component';
import { HeaderStyled } from './PaymentInfoStyled';

describe('<PaymentInfo/>', () => {
  const wrapper = mount(<PaymentInfo />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.find(HeaderStyled)).toHaveLength(1);
    });
  });
});
