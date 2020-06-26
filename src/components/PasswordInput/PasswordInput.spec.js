import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import Input from 'components/Input';
import PasswordInput from './PasswordInput';
import { InputElementStyled, ErrorWrapper } from '../Input/InputStyled';

jest.useFakeTimers();

const onChangeMock = jest.fn();

const ERROR_MESSAGE = 'MOCK_ERROR_MESSAGE';

describe('PasswordInput', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<PasswordInput />);
      const inputComponent = wrapper.find(Input);
      expect(inputComponent).toHaveLength(1);
      expect(inputComponent.props().value).toBe('');

      const inputElement = wrapper.find(InputElementStyled);
      expect(inputElement).toHaveLength(1);
      expect(inputElement.props().type).toBe('password');
      expect(inputElement.props().autoComplete).toBe('off');
    });

    it('should show error message', () => {
      const wrapper = mount(<PasswordInput error={ERROR_MESSAGE} />);
      const errorWrapper = wrapper.find(ErrorWrapper);

      expect(errorWrapper).toHaveLength(1);
      expect(errorWrapper.text()).toBe(ERROR_MESSAGE);
    });

    it('should call passed function on change', () => {
      const wrapper = mount(
        <PasswordInput onChange={onChangeMock} showPasswordStrength />
      );
      expect(onChangeMock).not.toHaveBeenCalled();
      wrapper
        .find('Input')
        .props()
        .onChange('sth');
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith('sth');
    });
    it('should set too short error if less than 6 chars and no digit', () => {
      const wrapper = mount(
        <PasswordInput onChange={onChangeMock} showPasswordStrength />
      );
      wrapper
        .find('Input')
        .props()
        .onChange('sth');
      expect(wrapper.state().passError).toBe(
        'Your password must contain at least 8 characters, including 1 digit.'
      );
      expect(wrapper.state().errorLabel).toBe('NotValid');
    });
    it('should set weak indicator if only small letters', () => {
      const wrapper = mount(
        <PasswordInput onChange={onChangeMock} showPasswordStrength />
      );
      wrapper
        .find('Input')
        .props()
        .onChange('something1');
      expect(wrapper.state().passError).toBe('Weak');
      expect(wrapper.state().errorLabel).toBe('Weak');
    });
    it('should set fair indicator if small, big letters and digit', () => {
      const wrapper = mount(
        <PasswordInput onChange={onChangeMock} showPasswordStrength />
      );
      wrapper
        .find('Input')
        .props()
        .onChange('example1D');
      expect(wrapper.state().passError).toBe('Could be stronger');
      expect(wrapper.state().errorLabel).toBe('Fair');
    });
    it('should set good indicator if small and big letters and numbers', () => {
      const wrapper = mount(
        <PasswordInput onChange={onChangeMock} showPasswordStrength />
      );
      wrapper
        .find('Input')
        .props()
        .onChange('somethingELSE123');
      expect(wrapper.state().passError).toBe('Good password');
      expect(wrapper.state().errorLabel).toBe('Good');
    });
    it('should set strong indicator if small and big letters, numbers and special characters', () => {
      const wrapper = mount(
        <PasswordInput onChange={onChangeMock} showPasswordStrength />
      );
      wrapper
        .find('Input')
        .props()
        .onChange('somethingELSE123$%^');
      expect(wrapper.state().passError).toBe('Strong password');
      expect(wrapper.state().errorLabel).toBe('Strong');
    });
  });
});
