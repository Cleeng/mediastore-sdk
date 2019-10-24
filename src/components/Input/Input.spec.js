import React from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import Input from './Input';
import { InputElementStyled, MessageStyled } from './InputStyled';
import { MESSAGE_TYPE_SUCCESS } from './InputConstants';

jest.useFakeTimers();

const DELAY = 5000;
const MOCK_MESSAGE_1 = 'MOCK_MESSAGE_1';
const MOCK_MESSAGE_2 = 'MOCK_MESSAGE_2';
const onSubmit = jest.fn().mockResolvedValue({});

describe('Input', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = shallow(<Input />);
      const inputElement = wrapper.find(InputElementStyled);
      expect(inputElement).toHaveLength(1);
      expect(inputElement.props().type).toBe('text');
      expect(inputElement.props().placeholder).toBe('');
      expect(inputElement.props().autoComplete).toBe('off');
    });

    it('should display message according to props', () => {
      const wrapper = mount(
        <Input
          onSubmit={onSubmit}
          showMessage
          message={MOCK_MESSAGE_1}
          messageType={MESSAGE_TYPE_SUCCESS}
          isCouponInput
        />
      );

      const messageEl = wrapper.find(MessageStyled);
      expect(messageEl.text()).toBe(MOCK_MESSAGE_1);
      expect(messageEl).toHaveStyleRule('opacity', '1');
    });

    it("shouldn't display message if not specified", () => {
      const wrapper = mount(
        <Input
          onSubmit={onSubmit}
          message={MOCK_MESSAGE_1}
          messageType={MESSAGE_TYPE_SUCCESS}
          isCouponInput
        />
      );

      const messageEl = wrapper.find(MessageStyled);
      expect(messageEl.text()).toBe(MOCK_MESSAGE_1);
      expect(messageEl).toHaveStyleRule('opacity', '0');
    });
  });

  describe('@events', () => {
    it('should call onSubmit when enter is pressed', () => {
      onSubmit.mockClear();
      const mockInputValue = 'MOCK_INPUT_VALUE';

      const wrapper = shallow(<Input onSubmit={onSubmit} isCouponInput />);
      const input = wrapper.find(InputElementStyled);
      input.value = mockInputValue;
      input.simulate('keydown', {
        key: 'Enter',
        target: input
      });
      expect(onSubmit).toHaveBeenCalledWith(mockInputValue);
    });

    it('should not call onSubmit when any other key is pressed', () => {
      onSubmit.mockClear();

      const wrapper = shallow(<Input onSubmit={onSubmit} isCouponInput />);
      const input = wrapper.find(InputElementStyled);

      input.simulate('keydown', {
        key: 'x',
        target: input
      });
      input.simulate('keydown', {
        key: 'd',
        target: input
      });
      expect(onSubmit).not.toHaveBeenCalled();
    });

    it('should blur on submit when blurOnSubmit=true', () => {
      onSubmit.mockClear();

      const wrapper = mount(
        <Input onSubmit={onSubmit} blurOnSubmit isCouponInput />
      );
      const input = wrapper.find(InputElementStyled);
      const inputEl = wrapper.getDOMNode();

      jest.spyOn(inputEl, 'blur');
      input.simulate('keydown', {
        key: 'Enter',
        target: inputEl
      });
      expect(inputEl.blur).toHaveBeenCalled();
    });

    it('should not blur on submit when blurOnSubmit=false', () => {
      onSubmit.mockClear();

      const wrapper = mount(<Input onSubmit={onSubmit} isCouponInput />);
      const input = wrapper.find(InputElementStyled);
      const inputEl = wrapper.getDOMNode();

      jest.spyOn(inputEl, 'blur');
      input.simulate('keydown', {
        key: 'Enter',
        target: inputEl
      });
      expect(inputEl.blur).not.toHaveBeenCalled();
    });

    it('should suppress message on focus when clearMessageOnFocus=true', () => {
      onSubmit.mockClear();

      const wrapper = mount(
        <Input
          onSubmit={onSubmit}
          clearMessageOnFocus
          showMessage
          message={MOCK_MESSAGE_1}
          messageType={MESSAGE_TYPE_SUCCESS}
        />
      );
      const input = wrapper.find(InputElementStyled);

      input.simulate('focus');
      expect(wrapper.state().suppressMessage).toBe(true);
    });

    it('should not suppress message on focus when clearMessageOnFocus=false', () => {
      onSubmit.mockClear();

      const wrapper = mount(
        <Input
          onSubmit={onSubmit}
          showMessage
          message={MOCK_MESSAGE_1}
          messageType={MESSAGE_TYPE_SUCCESS}
        />
      );
      const input = wrapper.find(InputElementStyled);

      input.simulate('focus');
      expect(wrapper.state().suppressMessage).toBe(false);
    });

    it('should show previously suppressed message on props change', () => {
      onSubmit.mockClear();

      const wrapper = mount(
        <Input
          onSubmit={onSubmit}
          clearMessageOnFocus
          showMessage
          message={MOCK_MESSAGE_1}
          messageType={MESSAGE_TYPE_SUCCESS}
        />
      );
      const input = wrapper.find(InputElementStyled);

      input.simulate('focus');
      expect(wrapper.state().suppressMessage).toBe(true);

      wrapper.setProps({
        message: MOCK_MESSAGE_2
      });
      expect(wrapper.state().suppressMessage).toBe(false);
    });

    it('should suppress message after 5s when clearMessageAfterDelay=true', () => {
      onSubmit.mockClear();

      const wrapper = mount(
        <Input onSubmit={onSubmit} clearMessageAfterDelay />
      );

      wrapper.setProps({
        showMessage: true,
        message: MOCK_MESSAGE_1,
        messageType: MESSAGE_TYPE_SUCCESS
      });

      expect(wrapper.state().suppressMessage).toBe(false);
      jest.advanceTimersByTime(DELAY);
      expect(wrapper.state().suppressMessage).toBe(true);
    });

    it('should skip state update when unmounted during timeout', () => {
      jest.spyOn(window, 'clearTimeout');
      onSubmit.mockClear();

      const wrapper = mount(
        <Input onSubmit={onSubmit} clearMessageAfterDelay />
      );

      wrapper.setProps({
        showMessage: true,
        message: MOCK_MESSAGE_1,
        messageType: MESSAGE_TYPE_SUCCESS
      });

      const { timeoutId } = wrapper.state();

      wrapper.unmount();
      expect(clearTimeout).toHaveBeenCalledWith(timeoutId);
    });
  });
});
