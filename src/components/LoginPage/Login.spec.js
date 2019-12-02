/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Router } from 'react-router-dom';
import { mount } from 'enzyme';
import Login from './Login';
import Button from '../Button/Button';
import LoginForm from './LoginForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ContentWrapperStyled } from './LoginStyled';

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

const wrapper = mount(
  <Router
    history={{
      listen: jest.fn(),
      createHref: jest.fn(),
      location: { pathname: '' }
    }}
  >
    <Login urlProps={mockUrlProps} />
  </Router>
);

describe('Login', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.find(Header)).toHaveLength(1);
      expect(wrapper.find(Button)).toHaveLength(5);
      expect(wrapper.find(LoginForm)).toHaveLength(1);
      expect(wrapper.find(Footer)).toHaveLength(1);
      expect(wrapper.find(ContentWrapperStyled)).toHaveLength(1);
    });
  });
});
