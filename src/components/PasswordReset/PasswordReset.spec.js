/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import 'jest-styled-components';
import Input from 'components/Input';
import PasswordReset from './PasswordReset';
import Button from '../Button';

const mockUrlProps = {
  location: { search: '?offer=123123' }
};

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

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
          <PasswordReset onSuccess={jest.fn()} urlProps={mockUrlProps} />
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
