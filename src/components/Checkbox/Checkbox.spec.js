import { shallow } from 'enzyme';
import React from 'react';
import Checkbox from './Checkbox';
import {
  CheckboxStyled,
  CheckFrameStyled,
  CheckMarkStyled
} from './CheckboxStyled';

describe('<Checkbox/>', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<Checkbox />);
      expect(wrapper.find(CheckboxStyled).exists()).toBe(true);
      expect(wrapper.props().checked).toEqual(false);
    });
    it('should add class to checkbox when general error', () => {
      const wrapper = shallow(<Checkbox error="general" required />);
      expect(wrapper.find(CheckFrameStyled).exists()).toBe(true);
      expect(wrapper.find(CheckFrameStyled).props().error).toBe(true);
    });
    it('should change checked field if passed', () => {
      const wrapper = shallow(<Checkbox checked />);
      expect(wrapper.props().checked).toBe(true);
      expect(wrapper.find(CheckMarkStyled).exists()).toBe(true);
    });
  });
  describe('@events', () => {
    it('should call onClickFn when checkbox is clicked', () => {
      const clickFn = jest.fn();
      const wrapper = shallow(<Checkbox onClickFn={clickFn} />);
      expect(clickFn).not.toHaveBeenCalled();
      wrapper.simulate('click');
      expect(clickFn).toHaveBeenCalledTimes(1);
    });
    it('should call onClickFn when press Enter on checkbox', () => {
      const clickFn = jest.fn();
      const wrapper = shallow(<Checkbox onClickFn={clickFn} />);
      const checkbox = wrapper.find(CheckFrameStyled);
      expect(clickFn).not.toHaveBeenCalled();
      checkbox.simulate('keyDown', { keyCode: 32 });
      expect(clickFn).toHaveBeenCalledTimes(1);
    });
  });
});
