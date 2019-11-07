import React from 'react';
import { shallow, mount } from 'enzyme';
import EmailInput from '../EmailInput/EmailInput';
import RegisterForm from './RegisterForm';
import Consent from '../Consents';
import PasswordInput from '../PasswordInput/PasswordInput';

const mockInputValue = 'MOCK_INPUT_VALUE11';
const mockEmailValue = 'mockmail@mock.com';
const mockNotValidEmail = 'mock';
const mockConsentValue = [true];
const onSubmitMock = jest.fn().mockImplementation(
  () =>
    new Promise(resolve => {
      resolve(false);
    })
);
const mockConsentDefinitions = [
  {
    name: 'name',
    version: '1',
    required: true
  }
];

describe('RegisterForm', () => {
  describe('@events', () => {
    it('should update state on input change', () => {
      const wrapper = shallow(<RegisterForm />);
      const emailInput = wrapper.find(EmailInput);
      const passwordInput = wrapper.find(PasswordInput);
      expect(wrapper.find(Consent).exists()).toBe(true);

      emailInput.simulate('change', mockEmailValue);
      passwordInput.simulate('change', mockInputValue);

      expect(wrapper.state().email).toBe(mockEmailValue);
      expect(wrapper.state().password).toBe(mockInputValue);
    });
    it('should set error and not call onSubmit cb when email empty', () => {
      const submitWrapper = mount(<RegisterForm onSubmit={onSubmitMock} />);
      const instance = submitWrapper.instance();

      onSubmitMock.mockClear();
      instance.setState({
        email: '',
        password: mockInputValue,
        consents: mockConsentValue,
        consentDefinitions: mockConsentDefinitions
      });
      submitWrapper.simulate('submit');

      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(submitWrapper.state().errors.email).not.toBe('');
      expect(submitWrapper.state().errors.password).toBe('');
      expect(submitWrapper.state().errors.consents).toBe('');
    });

    it('should set error and not call onSubmit cb when password empty', () => {
      const submitWrapper = mount(<RegisterForm onSubmit={onSubmitMock} />);
      const instance = submitWrapper.instance();

      onSubmitMock.mockClear();
      instance.setState({
        email: mockEmailValue,
        password: '',
        consents: mockConsentValue,
        consentDefinitions: mockConsentDefinitions
      });
      submitWrapper.simulate('submit');

      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(submitWrapper.state().errors.password).not.toBe('');
      expect(submitWrapper.state().errors.consents).toBe('');
      expect(submitWrapper.state().errors.email).toBe('');
    });

    it('should set error and not call onSubmit cb when required consents not checked', () => {
      const submitWrapper = mount(<RegisterForm onSubmit={onSubmitMock} />);
      const instance = submitWrapper.instance();

      onSubmitMock.mockClear();
      instance.setState({
        email: mockEmailValue,
        password: mockInputValue,
        consents: [false],
        consentDefinitions: mockConsentDefinitions
      });
      submitWrapper.simulate('submit');

      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(submitWrapper.state().errors.consents).not.toBe('');
      expect(submitWrapper.state().errors.password).toBe('');
      expect(submitWrapper.state().errors.email).toBe('');
    });

    it('should set field error if email not valid', () => {
      const submitWrapper = mount(<RegisterForm onSubmit={onSubmitMock} />);
      const instance = submitWrapper.instance();
      const preventDefaultMock = jest.fn();
      onSubmitMock.mockClear();
      instance.setState({
        email: mockNotValidEmail,
        password: mockNotValidEmail
      });
      submitWrapper.simulate('submit', { preventDefault: preventDefaultMock });

      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(submitWrapper.state().errors.email).not.toBe('');
    });
    it('should validate fields on blur', () => {
      const wrapper = mount(<RegisterForm />);
      const instance = wrapper.instance();
      instance.setState({
        email: '',
        password: '',
        consents: [false],
        consentDefinitions: mockConsentDefinitions
      });
      instance.validateFields();

      expect(instance.state.errors.email).not.toBe('');
      expect(instance.state.errors.password).not.toBe('');
      expect(instance.state.errors.consents).not.toBe('');
    });
  });
});
