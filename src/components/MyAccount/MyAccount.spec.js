import React from 'react';
import { shallow } from 'enzyme';
import MyAccount from './MyAccount';

describe('<MyAccount/>', () => {
  const wrapper = shallow(<MyAccount />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.prop('overlay')).toBe(false);
    });
    it('should set overlay prop if passed', () => {
      const overlayValue = true;
      wrapper.setProps({ overlay: overlayValue });
      expect(wrapper.prop('overlay')).toBe(overlayValue);
    });
  });
});
