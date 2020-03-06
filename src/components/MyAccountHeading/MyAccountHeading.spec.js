import React from 'react';
import { mount } from 'enzyme';
import MyAccountHeading from './MyAccountHeading';

describe('<MyAccountHeading/>', () => {
  const wrapper = mount(<MyAccountHeading />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.prop('text')).toBe('');
    });
    it('should set text prop if passed', () => {
      const newText = 'test text';
      wrapper.setProps({ text: newText });
      expect(wrapper.prop('text')).toBe(newText);
    });
  });
});
