/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import ErrorPage from 'components/ErrorPage';
import LoginForm from 'components/LoginPage/LoginForm';
import Auth from 'services/auth';
import { PureLogin } from './Login';

jest.mock('services/auth');

const mockUrlProps = {
  location: { search: '?offer=123123&publisher=123456789' }
};

jest.mock('react-router-dom', () => {
  return {
    Link: () => {
      return <div />;
    }
  };
});

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('Login', () => {
  afterEach(() => jest.clearAllMocks());
  describe('@renders', () => {
    Auth.isLogged = jest.fn(() => true);
    it('should render initail state', () => {
      const wrapper = mount(<PureLogin urlProps={mockUrlProps} />);
      expect(wrapper.find(ErrorPage).exists()).toBe(false);
      expect(wrapper.find(LoginForm).exists()).toBe(true);
    });
    it('should show Error page when offer error occurred', () => {
      const wrapper = mount(<PureLogin urlProps={mockUrlProps} />);
      wrapper.setState({ isOfferError: true });
      wrapper.update();
      expect(wrapper.find(ErrorPage).exists()).toBe(true);
    });
    it('should update state when offerError occure', () => {
      const wrapper = mount(<PureLogin urlProps={mockUrlProps} />);
      wrapper.instance().setOfferError(true);
      wrapper.update();
      expect(wrapper.state().isOfferError).toBe(true);
      expect(wrapper.find(ErrorPage).exists()).toBe(true);
    });
  });
});
