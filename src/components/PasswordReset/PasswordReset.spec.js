import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import 'jest-styled-components';
import Input from 'components/Input';
import PasswordReset from './PasswordReset';
import Button from '../Button';

describe('PasswordReset', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(
        <Router
          history={{
            listen: jest.fn(),
            createHref: jest.fn(),
            location: { pathname: '' }
          }}
        >
          <PasswordReset onSuccess={jest.fn()} offerId="S123456789" />
        </Router>
      );
      const inputComponent = wrapper.find(Input);
      expect(inputComponent).toHaveLength(1);
      expect(inputComponent.props().blurOnSubmit).toBe(false);
      expect(inputComponent.props().error).toBe('');
      expect(inputComponent.props().value).toBe('');
      expect(inputComponent.props().icon).toBe('test-file-stub');

      const buttons = wrapper.find(Button);
      expect(buttons).toHaveLength(2);
    });
  });
});
