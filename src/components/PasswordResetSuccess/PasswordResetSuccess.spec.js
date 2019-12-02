/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Router } from 'react-router-dom';
import { mount } from 'enzyme';
import 'jest-styled-components';
import PasswordResetSuccess from './PasswordResetSuccess';
import { StyledLink, StyledMessage } from './PasswordResetSuccessStyled';

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('PasswordResetSuccess', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const MOCK_EMAIL = 'gummybear@cleeng.com';
      const wrapper = mount(
        <Router
          history={{
            listen: jest.fn(),
            createHref: jest.fn(),
            location: { pathname: '' }
          }}
        >
          <PasswordResetSuccess email={MOCK_EMAIL} />
        </Router>
      );
      const messageComponent = wrapper.find(StyledMessage);
      expect(messageComponent).toHaveLength(1);
      expect(messageComponent.text()).toBe(
        `Please check your inbox at {{email}}`
      );

      const linkComponent = wrapper.find(StyledLink);
      expect(linkComponent).toHaveLength(1);
    });
  });
});
