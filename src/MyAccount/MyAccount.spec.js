import React from 'react';
import { shallow } from 'enzyme';
import MyAccount from './MyAccount';

describe('<MyAccount/>', () => {
  const wrapper = shallow(<MyAccount />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.prop('isOverlay')).toBe(false);
    });
    it('should set overlay prop if passed', () => {
      const overlayValue = true;
      wrapper.setProps({ isOverlay: overlayValue });
      expect(wrapper.prop('isOverlay')).toBe(overlayValue);
    });
  });
});
