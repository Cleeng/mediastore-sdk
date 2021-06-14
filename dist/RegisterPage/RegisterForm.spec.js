"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _registerCustomer = _interopRequireDefault(require("api/Auth/registerCustomer"));

var _getCustomerLocales = _interopRequireDefault(require("api/Customer/getCustomerLocales"));

var _submitConsents = _interopRequireDefault(require("api/Customer/submitConsents"));

var _auth = _interopRequireDefault(require("services/auth"));

var _EmailInput = _interopRequireDefault(require("components/EmailInput"));

var _Consents = _interopRequireDefault(require("components/Consents"));

var _PasswordInput = _interopRequireDefault(require("components/PasswordInput"));

var _RegisterForm = _interopRequireDefault(require("./RegisterForm"));

jest.mock('api/Auth/registerCustomer');
jest.mock('api/Customer/getCustomerLocales');
jest.mock('api/Customer/submitConsents');
var mockInputValue = 'MOCK_INPUT_VALUE11';
var mockEmailValue = 'mockmail@mock.com';
var mockNotValidEmail = 'mock';
var onSubmitMock = jest.fn().mockImplementation(function () {
  return new Promise(function (resolve) {
    resolve(false);
  });
});
var mockConsentValue = [true];
var mockConsentDefinitions = [{
  name: 'name',
  version: '1',
  required: true
}];
var jwtMock = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNjkwNjI0MjU1IiwicHVibGlzaGVySWQiOjEyMDM1NTU1OX0.EvaMwJ1ZtGR4TNujmROVxiXhiHxzTOp0vgCJPoScXW2bBSroAGsm8kLe-ivnqQ9xoiHJWtDRYZGLKSGASFVuo0bqJT2ZzVEohvCPRwMke0R87p_eaTztWvAUjhbUP0Dk9xo8_AeDvEIDmGln_NXJvTTn6EqU_Xk2Zq3W29_WtbEOjfPplCp49gerR_VpnWA36yTUhfF2sWA1ir0F2HymsDvoQ_6dc8t7nENdslJY08kW-_mSQgj4SbOf4uXgiKAlPU8x3LWzUbO9uFF-eAND7hrJGM-FIWcJreW92DRXmuUMBfe_ws9KXzv-F5gKVcuz7qOpyykkJtZSBvFQJtKMaw';
describe('RegisterForm', function () {
  afterEach(function () {
    delete global.__mobxInstanceCount; // eslint-disable-line
  });
  describe('@events', function () {
    it('should update state on input change', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, null));
      var instance = wrapper.instance();
      var emailInput = wrapper.find(_EmailInput.default);
      var passwordInput = wrapper.find(_PasswordInput.default);
      expect(wrapper.find(_Consents.default).exists()).toBe(true);
      emailInput.simulate('change', mockEmailValue);
      passwordInput.simulate('change', mockInputValue);
      instance.handleConsentsChange(mockConsentValue, mockConsentDefinitions);
      expect(wrapper.state().email).toBe(mockEmailValue);
      expect(wrapper.state().password).toBe(mockInputValue);
      expect(wrapper.state().consents).toBe(mockConsentValue);
      expect(wrapper.state().consentDefinitions).toBe(mockConsentDefinitions);
    });
    it('should set error and not call onSubmit cb when email empty', function () {
      var submitWrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        onSubmit: onSubmitMock
      }));
      var instance = submitWrapper.instance();
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
    it('should set error and not call onSubmit cb when password empty', function () {
      var submitWrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        onSubmit: onSubmitMock
      }));
      var instance = submitWrapper.instance();
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
    it('should set error and not call onSubmit cb when required consents not checked', function () {
      var submitWrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        onSubmit: onSubmitMock
      }));
      var instance = submitWrapper.instance();
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
    it('should set error and not call onSubmit cb when email not valid', function () {
      var submitWrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        onSubmit: onSubmitMock
      }));
      var instance = submitWrapper.instance();
      var preventDefaultMock = jest.fn();
      onSubmitMock.mockClear();
      instance.setState({
        email: mockNotValidEmail,
        password: mockNotValidEmail
      });
      submitWrapper.simulate('submit', {
        preventDefault: preventDefaultMock
      });
      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(submitWrapper.state().errors.email).not.toBe('');
    });
    it('should return offer error when offerId is not given', function (done) {
      var preventDefaultMock = jest.fn();
      var setOfferErrorMock = jest.fn();
      onSubmitMock.mockClear();
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        offerId: "",
        setOfferError: setOfferErrorMock
      }));
      var instance = wrapper.instance();
      instance.setState({
        email: 'john@example.com',
        password: 'testtest123'
      });
      expect(onSubmitMock).not.toHaveBeenCalled();
      wrapper.simulate('submit', {
        preventDefault: preventDefaultMock
      });
      expect(preventDefaultMock).toHaveBeenCalledTimes(1);
      setImmediate(function () {
        expect(setOfferErrorMock).toHaveBeenCalled();
        done();
      });
    });
    it('should validate fields on blur', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, null));
      var instance = wrapper.instance();
      instance.setState({
        email: '',
        password: ''
      });
      instance.validateEmail();
      instance.validatePassword();
      expect(instance.state.errors.email).not.toBe('');
      expect(instance.state.errors.password).not.toBe('');
    });
    it('should update state when show password icon clicked', function () {
      var registerWrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, null));
      var instance = registerWrapper.instance();
      instance.handleClickShowPassword({
        preventDefault: jest.fn()
      });
      expect(instance.state.showPassword).toBe(true);
    });
    it('should set general error when request failed', function (done) {
      _getCustomerLocales.default.mockResolvedValue({
        responseData: {
          locale: 'pl_PL',
          country: 'PL',
          currency: 'EUR'
        }
      });

      _registerCustomer.default.mockResolvedValue({
        status: 500
      });

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        onRegistrationComplete: onSubmitMock,
        offerId: "S705970293_NL"
      }));
      var instance = wrapper.instance();
      var preventDefaultMock = jest.fn();
      instance.setState({
        email: 'john@example.com',
        password: 'testtest123'
      });
      wrapper.simulate('submit', {
        preventDefault: preventDefaultMock
      });
      setImmediate(function () {
        expect(instance.state.generalError).toBe('An error occurred.');
        done();
      });
    });
    it('should set general error when getLocales failed', function (done) {
      _getCustomerLocales.default.mockResolvedValue({});

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        onRegistrationComplete: onSubmitMock,
        offerId: "S705970293_NL"
      }));
      var instance = wrapper.instance();
      var preventDefaultMock = jest.fn();
      instance.setState({
        email: 'john@example.com',
        password: 'testtest123'
      });
      wrapper.simulate('submit', {
        preventDefault: preventDefaultMock
      });
      setImmediate(function () {
        expect(instance.state.generalError).toBe('An error occurred.');
        done();
      });
    });
    it('should call onSubmit cb when fields valid', function (done) {
      _getCustomerLocales.default.mockResolvedValue({
        responseData: {
          locale: 'pl_PL',
          country: 'PL',
          currency: 'EUR'
        }
      });

      _registerCustomer.default.mockResolvedValue({
        status: 200,
        responseData: {
          jwt: jwtMock
        }
      });

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        offerId: "S705970293_NL"
      }));
      var instance = wrapper.instance();
      var preventDefaultMock = jest.fn();
      _auth.default.login = jest.fn();
      instance.setState({
        email: mockEmailValue,
        password: 'testtest123',
        consents: mockConsentValue,
        consentDefinitions: mockConsentDefinitions
      });
      expect(_auth.default.login).not.toHaveBeenCalled();
      wrapper.simulate('submit', {
        preventDefault: preventDefaultMock
      });
      expect(preventDefaultMock).toHaveBeenCalledTimes(1);
      expect(_registerCustomer.default).toHaveBeenCalled();
      setImmediate(function () {
        expect(instance.state.errors.email).toBe('');
        expect(instance.state.errors.password).toBe('');
        expect(instance.state.generalError).toBe('');
        expect(_auth.default.login).toHaveBeenCalled();
        expect(_auth.default.login).toHaveBeenCalledTimes(1);
        expect(_auth.default.login).toHaveBeenCalledWith(false, true, mockEmailValue, jwtMock, _submitConsents.default, [mockConsentValue, mockConsentDefinitions]);
        done();
      });
    });
    it('should set general error when customer already exists', function (done) {
      _getCustomerLocales.default.mockResolvedValue({
        responseData: {
          locale: 'pl_PL',
          country: 'PL',
          currency: 'EUR'
        }
      });

      _registerCustomer.default.mockResolvedValue({
        status: 422,
        errors: ['Customer already exists']
      });

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        offerId: "S705970293_NL"
      }));
      var instance = wrapper.instance();
      instance.setState({
        email: 'john@example.com',
        password: 'testtest123'
      });
      var preventDefaultMock = jest.fn();
      wrapper.simulate('submit', {
        preventDefault: preventDefaultMock
      });
      setImmediate(function () {
        expect(instance.state.generalError).toBe('Customer already exists.');
        done();
      });
    });
    it('should set error when faild with 429 code', function (done) {
      _getCustomerLocales.default.mockResolvedValue({
        responseData: {
          locale: 'pl_PL',
          country: 'PL',
          currency: 'EUR'
        }
      });

      _registerCustomer.default.mockResolvedValue({
        status: 429
      });

      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_RegisterForm.default, {
        offerId: "S705970293_NL"
      }));
      var instance = wrapper.instance();
      instance.setState({
        email: 'john@example.com',
        password: 'testtest123'
      });
      var preventDefaultMock = jest.fn();
      wrapper.simulate('submit', {
        preventDefault: preventDefaultMock
      });
      setImmediate(function () {
        expect(instance.state.generalError).toBe('Server overloaded. Please try again later.');
        expect(instance.state.disableActionButton).toBe(true);
        done();
      });
    });
  });
});