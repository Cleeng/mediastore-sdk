import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import { InputElementStyled, ErrorWrapper } from 'components/Input/InputStyled';
import Input from 'components/Input';
import EmailInput from './EmailInput';

const ERROR_MESSAGE = 'MOCK_ERROR_MESSAGE';

describe('EmailInput', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<EmailInput />);
      const inputComponent = wrapper.find(Input);
      expect(inputComponent).toHaveLength(1);
      expect(inputComponent.props().value).toBe('');

      const inputElement = wrapper.find(InputElementStyled);
      expect(inputElement).toHaveLength(1);
      expect(inputElement.props().type).toBe('email');
      expect(inputElement.props().autoComplete).toBe('off');
    });

    it('should show error message', () => {
      const wrapper = mount(<EmailInput error={ERROR_MESSAGE} />);
      const errorWrapper = wrapper.find(ErrorWrapper);

      expect(errorWrapper).toHaveLength(1);
      expect(errorWrapper.text()).toBe(ERROR_MESSAGE);
    });
  });
});
