import { shallow } from 'enzyme';
import React from 'react';
import Button from './Button';

describe('<Button/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<Button />);

      expect(wrapper.prop('type')).toBe('button');
      expect(wrapper.prop('theme')).toBe('primary');
    });
    it('should render initial state for Link', () => {
      const wrapper = shallow(
        <Button isLink to={{ pathname: '/my-account', fromMyAccount: true }} />
      );
      expect(wrapper.prop('to')).toEqual({
        pathname: '/my-account',
        state: { fromMyAccount: true }
      });
    });
    it('should change type if passed', () => {
      const wrapper = shallow(<Button />);
      const newType = 'submit';
      wrapper.setProps({ type: newType });
      expect(wrapper.prop('type')).toBe(newType);
    });
  });
  describe('@events', () => {
    it('should call onClickFn when button clicked', () => {
      const wrapper = shallow(<Button />);
      const clickFn = jest.fn();
      wrapper.setProps({ onClickFn: clickFn });
      expect(clickFn).not.toHaveBeenCalled();
      wrapper.simulate('click');
      expect(clickFn).toHaveBeenCalledTimes(1);
    });
  });
});
