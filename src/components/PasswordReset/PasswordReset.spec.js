/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { shallow, mount } from 'enzyme';
import Input from 'components/Input';
import ResetPasswordRequest from 'api/Auth/resetPassword';
import Button from 'components/Button';
import EmailInput from 'components/EmailInput';
import PasswordReset, { PurePasswordReset } from './PasswordReset';
import { FormStyled } from './PasswordResetStyled';

jest.mock('api/Auth/resetPassword');
jest.mock('react-router-dom', () => {
  return {
    Link: () => {
      return <div />;
    }
  };
});

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

const MockEmailValue = 'mock@email.com';
const MockInvalidEmailValue = 'mock@.com';
const MockOfferId = '762736382';
const FuncMock = jest.fn();

describe('PasswordReset', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('@renders', () => {
    it('should render initial state', () => {
      const wrapper = mount(
        <PasswordReset onSuccess={jest.fn()} urlProps={mockUrlProps} />
      );
      const inputComponent = wrapper.find(Input);
      expect(inputComponent).toHaveLength(1);
      expect(inputComponent.props().error).toBe('');
      expect(inputComponent.props().value).toBe('');

      const buttons = wrapper.find(Button);
      expect(buttons).toHaveLength(2);
    });
  });
  describe('@events', () => {
    it('should update state on email input change', () => {
      const wrapper = shallow(
        <PurePasswordReset onSuccess={jest.fn()} urlProps={mockUrlProps} />
      );
      const inputComponent = wrapper.find(EmailInput);

      inputComponent.simulate('change', MockEmailValue);
      expect(wrapper.state().value).toBe(MockEmailValue);
    });
  });
  describe('@onSubmit', () => {
    it('should call onSuccess cb when email valid', done => {
      ResetPasswordRequest.mockResolvedValue({
        errors: []
      });
      const wrapper = mount(
        <PurePasswordReset onSuccess={FuncMock} urlProps={mockUrlProps} />
      );
      const formComponent = wrapper.find(FormStyled);
      wrapper.setState({
        value: MockEmailValue,
        offerId: MockOfferId
      });

      formComponent.simulate('submit');
      setImmediate(() => {
        expect(wrapper.state().message).toBe('');
        expect(FuncMock).toHaveBeenCalled();
        done();
      });
    });

    it('should not call onSuccess cb when email is not correct', done => {
      ResetPasswordRequest.mockResolvedValue({
        errors: MockEmailValue
      });
      const wrapper = mount(
        <PurePasswordReset onSuccess={FuncMock} urlProps={mockUrlProps} />
      );
      const formComponent = wrapper.find(FormStyled);
      wrapper.setState({
        value: MockEmailValue,
        offerId: MockOfferId
      });

      formComponent.simulate('submit');
      setImmediate(() => {
        expect(wrapper.state().message).not.toBe('');
        expect(FuncMock).not.toHaveBeenCalled();
        done();
      });
    });

    it('should set error when email is not properly formatted', done => {
      const wrapper = mount(
        <PurePasswordReset onSuccess={FuncMock} urlProps={mockUrlProps} />
      );
      const formComponent = wrapper.find(FormStyled);
      wrapper.setState({
        value: MockInvalidEmailValue,
        offerId: MockOfferId
      });

      formComponent.simulate('submit');
      setImmediate(() => {
        expect(wrapper.state().message).not.toBe('');
        expect(FuncMock).not.toHaveBeenCalled();
        done();
      });
    });
  });
});
