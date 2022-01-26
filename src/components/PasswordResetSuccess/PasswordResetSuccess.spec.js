/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import PasswordResetSuccess from './PasswordResetSuccess';
import { StyledMessage } from './PasswordResetSuccessStyled';

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
      const wrapper = mount(<PasswordResetSuccess email={MOCK_EMAIL} />);
      const messageComponent = wrapper.find(StyledMessage);
      expect(messageComponent).toHaveLength(1);
      expect(messageComponent.text()).toBe(
        `Please check your inbox at {{email}}`
      );
    });
  });
});
