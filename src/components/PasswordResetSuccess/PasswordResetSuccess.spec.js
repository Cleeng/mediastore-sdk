import React from 'react';
import { Router } from 'react-router-dom';
import { mount } from 'enzyme';
import 'jest-styled-components';
import PasswordResetSuccess from './PasswordResetSuccess';
import { StyledLink, StyledMessage } from './PasswordResetSuccessStyled';

describe('PasswordResetSuccess', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      const MOCK_EMAIL = 'gummybear@cleeng.com';
      const MOCK_OFFER_ID = 'S123456789';
      const wrapper = mount(
        <Router
          history={{
            listen: jest.fn(),
            createHref: jest.fn(),
            location: { pathname: '' }
          }}
        >
          <PasswordResetSuccess email={MOCK_EMAIL} offerId={MOCK_OFFER_ID} />
        </Router>
      );
      const messageComponent = wrapper.find(StyledMessage);
      expect(messageComponent).toHaveLength(1);
      expect(messageComponent.text()).toBe(
        `Please check your inbox at ${MOCK_EMAIL}`
      );

      const linkComponent = wrapper.find(StyledLink);
      expect(linkComponent).toHaveLength(1);
    });
  });
});
