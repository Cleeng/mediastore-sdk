import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input/InputConstants';
import Button from 'components/Button';
import { PureCouponInput as CouponInput } from './CouponInput';
import {
  InputElementStyled,
  MessageStyled,
  CloseButtonStyled
} from './CouponInputStyled';

jest.useFakeTimers();

const onSubmit = jest.fn().mockResolvedValue({});
const onClose = jest.fn();
const MOCK_MESSAGE_1 = 'MOCK_MESSAGE_1';
const MOCK_MESSAGE_2 = 'MOCK_MESSAGE_2';
const DELAY = 5000;
describe('CouponInput', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<CouponInput onSubmit={onSubmit} />);
      const inputComponent = wrapper.find(InputElementStyled);
      expect(inputComponent).toHaveLength(1);
      expect(wrapper.props().couponLoading).toBe(false);
      expect(wrapper.props().showMessage).toBe(false);

      const inputElement = wrapper.find(InputElementStyled);
      expect(inputElement).toHaveLength(1);
      expect(inputElement.props().placeholder).toBe('Your coupon');
      expect(inputElement.props().autoComplete).toBe('off');
    });

    it('should display message according to props', () => {
      const wrapper = mount(
        <CouponInput
          onSubmit={onSubmit}
          showMessage
          message={MOCK_MESSAGE_1}
          messageType={MESSAGE_TYPE_SUCCESS}
        />
      );
      wrapper.setState({ isOpened: true });
      const messageEl = wrapper.find(MessageStyled);
      expect(messageEl.text()).toBe(MOCK_MESSAGE_1);
      expect(messageEl).toHaveStyleRule('opacity', '1');
    });

    it("shouldn't display message if not specified", () => {
      const wrapper = mount(
        <CouponInput
          onSubmit={onSubmit}
          message={MOCK_MESSAGE_1}
          messageType={MESSAGE_TYPE_SUCCESS}
        />
      );
      wrapper.setState({ isOpened: true });
      const messageEl = wrapper.find(MessageStyled);
      expect(messageEl.text()).toBe(MOCK_MESSAGE_1);
      expect(messageEl).toHaveStyleRule('opacity', '0');
    });
  });
  describe('@events', () => {
    it('should call onChange cb when input change', () => {
      const onChangeMock = jest.fn();
      const MockInputValue = 'MOCKVALUE';
      const wrapper = mount(
        <CouponInput onChange={onChangeMock} onSubmit={onSubmit} />
      );
      const input = wrapper.find(InputElementStyled);

      input.simulate('change', { target: { value: MockInputValue } });

      expect(onChangeMock).toHaveBeenCalledWith(MockInputValue);
    });
    it('should call onSubmit when enter is pressed', done => {
      onSubmit.mockClear();
      const mockInputValue = 'MOCK_INPUT_VALUE';
      const wrapper = mount(<CouponInput onSubmit={onSubmit} />);
      const input = wrapper.find(InputElementStyled);

      input.blur = jest.fn();
      input.value = mockInputValue;

      input.simulate('keydown', {
        key: 'Enter',
        target: input
      });
      setImmediate(() => {
        expect(onSubmit).toHaveBeenCalledWith(mockInputValue);
        expect(wrapper.state()).toMatchObject({ suppressMessage: false });
        done();
      });
    });

    it('should not call onSubmit when any other key is pressed', () => {
      onSubmit.mockClear();
      const mockInputValue = 'MOCK_INPUT_VALUE';

      const wrapper = mount(<CouponInput onSubmit={onSubmit} />);
      const input = wrapper.find(InputElementStyled);
      input.value = mockInputValue;

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
    it('should blur on submit when', () => {
      onSubmit.mockClear();

      const wrapper = mount(<CouponInput onSubmit={onSubmit} />);
      const input = wrapper.find(InputElementStyled);
      const inputEl = wrapper.getDOMNode();

      jest.spyOn(inputEl, 'blur');
      input.simulate('keydown', {
        key: 'Enter',
        target: inputEl
      });
      expect(inputEl.blur).toHaveBeenCalled();
    });
    it('should suppress message on focus', () => {
      onSubmit.mockClear();

      const wrapper = mount(
        <CouponInput
          onSubmit={onSubmit}
          showMessage
          message={MOCK_MESSAGE_1}
          messageType={MESSAGE_TYPE_SUCCESS}
        />
      );
      const input = wrapper.find(InputElementStyled);

      input.simulate('focus');
      expect(wrapper.state().suppressMessage).toBe(true);
    });

    it('should show previously suppressed message on props change', () => {
      onSubmit.mockClear();

      const wrapper = mount(
        <CouponInput
          onSubmit={onSubmit}
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

    it('should suppress message after 5s', () => {
      onSubmit.mockClear();

      const wrapper = mount(<CouponInput onSubmit={onSubmit} />);

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

      const wrapper = mount(<CouponInput onSubmit={onSubmit} />);

      wrapper.setProps({
        showMessage: true,
        message: MOCK_MESSAGE_1,
        messageType: MESSAGE_TYPE_SUCCESS
      });

      const { timeoutId } = wrapper.state();

      wrapper.unmount();
      expect(clearTimeout).toHaveBeenCalledWith(timeoutId);
    });
    it('should open input field on first click and apply coupon on second click', () => {
      const wrapper = mount(
        <CouponInput onSubmit={onSubmit} value="mockValue" />
      );
      const buttonComponent = wrapper.find(Button);

      expect(wrapper.state('isOpened')).toBe(false);

      buttonComponent.simulate('click');

      expect(wrapper.state('isOpened')).toBe(true);

      buttonComponent.simulate('click');

      expect(onSubmit).toHaveBeenCalled();
      expect(onSubmit).toHaveBeenCalledWith('mockValue');
    });

    it('should close input field on close button click', () => {
      const wrapper = mount(
        <CouponInput onSubmit={onSubmit} onClose={onClose} value="mockValue" />
      );
      const buttonComponent = wrapper.find(CloseButtonStyled);

      wrapper.setState({ isOpened: true });

      expect(wrapper.state('isOpened')).toBe(true);

      buttonComponent.simulate('click');

      expect(onClose).toHaveBeenCalled();

      expect(wrapper.state('isOpened')).toBe(false);
    });
  });
});
