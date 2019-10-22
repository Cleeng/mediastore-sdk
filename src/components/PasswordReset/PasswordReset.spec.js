import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import Input from 'components/Input';
import Button from 'components/Button';
import PasswordReset from './PasswordReset';

describe('PasswordReset', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(<PasswordReset onSuccess={jest.fn()} />);
      const inputComponent = wrapper.find(Input);
      expect(inputComponent).toHaveLength(1);
      expect(inputComponent.props().clearMessageAfterDelay).toBe(false);
      expect(inputComponent.props().clearMessageOnFocus).toBe(false);
      expect(inputComponent.props().blurOnSubmit).toBe(false);
      expect(inputComponent.props().icon).toBe('test-file-stub');

      const submitButton = wrapper.find(Button);
      expect(submitButton).toHaveLength(1);
    });
  });
});
