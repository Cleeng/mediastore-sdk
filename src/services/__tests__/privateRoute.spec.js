/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PrivateRoute from 'services/privateRoute';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import Auth from '../auth';
import ThankYouPage from '../../components/ThankYouPage/ThankYouPage';

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

  it('should redirect to login page is user is not logged', () => {
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
});
