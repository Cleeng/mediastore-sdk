import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import PasswordInput from './PasswordInput';
import {
  InputElementStyled,
  ErrorWrapper,
  MessageStyled
} from '../Input/InputStyled';
import Input from '../Input';

jest.useFakeTimers();

const ERROR_MESSAGE = 'MOCK_ERROR_MESSAGE';

describe('PasswordInput', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<PasswordInput />);
      const inputComponent = wrapper.find(Input);
      expect(inputComponent).toHaveLength(1);
      expect(inputComponent.props().value).toBe('');
      expect(inputComponent.props().icon).toBe('test-file-stub');

      const inputElement = wrapper.find(InputElementStyled);
      expect(inputElement).toHaveLength(1);
      expect(inputElement.props().type).toBe('password');
      expect(inputElement.props().placeholder).toBe('Password');
      expect(inputElement.props().autoComplete).toBe('off');
    });

    it('should show error message', () => {
      const wrapper = mount(<PasswordInput error={ERROR_MESSAGE} />);
      const errorWrapper = wrapper.find(ErrorWrapper);
      const messageWrapper = wrapper.find(MessageStyled);

      expect(errorWrapper).toHaveLength(1);
      expect(messageWrapper).toHaveLength(0);
      expect(errorWrapper.text()).toBe(ERROR_MESSAGE);
    });
  });
});
