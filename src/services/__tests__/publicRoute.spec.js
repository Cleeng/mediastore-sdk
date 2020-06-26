/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PublicRoute from 'services/publicRoute';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Login from 'components/LoginPage';
import AuthRequest from '../auth';

jest.mock('../auth');

jest.mock('containers/labeling', () => () => Component => props => (
  <Component t={k => k} {...props} />
));
jest.mock('react-i18next', () => ({
  withTranslation: () => Component => props => (
    <Component t={k => k} {...props} />
  )
}));

describe('PublicRoute', () => {
  it('should render public component when user is not logged', () => {
    AuthRequest.isLogged = jest.fn(() => false);
    const mockUrlProps = {
      location: {
        search: 'offer:123'
      }
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <PublicRoute
          path="/login"
          component={() => <Login urlProps={mockUrlProps} />}
        />
      </MemoryRouter>
    );
    expect(wrapper.find(Login)).toHaveLength(1);
    expect(wrapper.find('Router').prop('history').location.pathname).toEqual(
      '/login'
    );
  });

  it('should redirect from checkout login to offer page if user is logged', () => {
    AuthRequest.isLogged = jest.fn(() => true);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <PublicRoute path="/login" component={Login} />
      </MemoryRouter>
    );
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find('Router').prop('history').location.pathname).toEqual(
      '/offer'
    );
  });
  it('should redirect from my account login to plan details page if user is logged', () => {
    AuthRequest.isLogged = jest.fn(() => true);
    const wrapper = mount(
      <MemoryRouter initialEntries={['/my-account/login']}>
        <PublicRoute
          path="/my-account/login"
          isMyAccount
          component={() => <Login isMyAccount />}
        />
      </MemoryRouter>
    );
    expect(wrapper.find(Login)).toHaveLength(0);
    expect(wrapper.find('Router').prop('history').location.pathname).toEqual(
      '/my-account/plan-details'
    );
  });
});
