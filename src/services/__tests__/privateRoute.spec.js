/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PrivateRoute from 'services/privateRoute';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import MyAccount from 'containers/MyAccount/MyAccount.container';
import ThankYouPage from 'components/ThankYouPage/ThankYouPage';
import Auth from 'services/auth';

jest.mock('services/auth');
jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('PrivateRoute', () => {
  it('should render private component when user is logged', () => {
    Auth.isLogged = jest.fn(() => true);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/thankyou']}>
        <PrivateRoute path="/thankyou" component={ThankYouPage} />
      </MemoryRouter>
    );
    expect(wrapper.find(ThankYouPage)).toHaveLength(1);
    expect(wrapper.find('Router').prop('history').location.pathname).toEqual(
      '/thankyou'
    );
  });

  it('should redirect from checkout private route to login page if user is not logged', () => {
    Auth.isLogged = jest.fn(() => false);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/thankyou']}>
        <PrivateRoute path="/thankyou" component={ThankYouPage} />
      </MemoryRouter>
    );
    expect(wrapper.find(ThankYouPage)).toHaveLength(0);
    expect(wrapper.find('Router').prop('history').location.pathname).toEqual(
      '/login'
    );
  });
  it('should redirect from myaccount private route to login page if user is not logged', () => {
    Auth.isLogged = jest.fn(() => false);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/my-account']}>
        <PrivateRoute path="/my-account" isMyAccount component={MyAccount} />
      </MemoryRouter>
    );
    expect(wrapper.find(MyAccount)).toHaveLength(0);
    expect(wrapper.find('Router').prop('history').location.pathname).toEqual(
      '/my-account/login'
    );
  });
});
