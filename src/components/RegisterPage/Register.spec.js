import React from 'react';
import { Router } from 'react-router-dom';
import { mount } from 'enzyme';
import Register from './Register';
import Button from '../Button/Button';
import RegisterForm from './RegisterForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { ContentWrapperStyled } from '../LoginPage/LoginStyled';

const wrapper = mount(
  <Router
    history={{
      listen: jest.fn(),
      createHref: jest.fn(),
      location: { pathname: '' }
    }}
  >
    <Register />
  </Router>
);

describe('LoRegistergin', () => {
  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.find(Header)).toHaveLength(1);
      expect(wrapper.find(Button)).toHaveLength(5);
      expect(wrapper.find(RegisterForm)).toHaveLength(1);
      expect(wrapper.find(Footer)).toHaveLength(1);
      expect(wrapper.find(ContentWrapperStyled)).toHaveLength(1);
    });
  });
});
