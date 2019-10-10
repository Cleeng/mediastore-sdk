import { shallow } from 'enzyme';
import React from 'react';
import Button from './Button';

describe('<Button/>', () => {
  const wrapper = shallow(<Button />);

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.prop('type')).toBe('button');
      expect(wrapper.prop('variant')).toBe('');
    });
    it('should change type if passed', () => {
      const newType = 'submit';
      wrapper.setProps({ type: newType });
      expect(wrapper.prop('type')).toBe(newType);
    });
  });
  describe('@events', () => {
    it('should call onClickFn when button clicked', () => {
      const clickFn = jest.fn();
      wrapper.setProps({ onClickFn: clickFn });
      expect(clickFn).not.toHaveBeenCalled();
      wrapper.simulate('click');
      expect(clickFn).toHaveBeenCalledTimes(1);
    });
  });
});
