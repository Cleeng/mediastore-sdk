"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _loginCustomer = _interopRequireDefault(require("api/Auth/loginCustomer"));

var _getCustomerLocales = _interopRequireDefault(require("api/Customer/getCustomerLocales"));

var _auth = _interopRequireDefault(require("services/auth"));

var _PasswordInput = _interopRequireDefault(require("components/PasswordInput"));

var _EmailInput = _interopRequireDefault(require("components/EmailInput"));

var _LoginForm = _interopRequireDefault(require("./LoginForm"));

jest.mock('api/Auth/loginCustomer');
jest.mock('api/Customer/getCustomerLocales');
var setOfferErrorMock = jest.fn();
var mockInputValue = 'MOCK_INPUT_VALUE';
var mockEmailValue = 'mockmail@mock.com';
var mockNotValidEmail = 'mock';
var onSubmitMock = jest.fn().mockImplementation(function () {
  return new Promise(function (resolve) {
    resolve(false);
  });
});
var jwtMock = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoiNjkwNjI0MjU1IiwicHVibGlzaGVySWQiOjEyMDM1NTU1OX0.EvaMwJ1ZtGR4TNujmROVxiXhiHxzTOp0vgCJPoScXW2bBSroAGsm8kLe-ivnqQ9xoiHJWtDRYZGLKSGASFVuo0bqJT2ZzVEohvCPRwMke0R87p_eaTztWvAUjhbUP0Dk9xo8_AeDvEIDmGln_NXJvTTn6EqU_Xk2Zq3W29_WtbEOjfPplCp49gerR_VpnWA36yTUhfF2sWA1ir0F2HymsDvoQ_6dc8t7nENdslJY08kW-_mSQgj4SbOf4uXgiKAlPU8x3LWzUbO9uFF-eAND7hrJGM-FIWcJreW92DRXmuUMBfe_ws9KXzv-F5gKVcuz7qOpyykkJtZSBvFQJtKMaw';
describe('LoginForm', function () {
  afterEach(function () {
    jest.clearAllMocks();
    delete global.__mobxInstanceCount; // eslint-disable-line
  });
  beforeEach(function () {
    _getCustomerLocales.default.mockResolvedValue({
      status: 200,
      responseData: {
        ipAddress: '1234'
      }
    });
  });
  describe('@events', function () {
    it('should update state on input change', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        offerId: "S649095045_PL"
      }));
      var emailInput = wrapper.find(_EmailInput.default);
      var passwordInput = wrapper.find(_PasswordInput.default);
      emailInput.simulate('change', mockEmailValue);
      passwordInput.simulate('change', mockInputValue);
      expect(wrapper.state().email).toBe(mockEmailValue);
      expect(wrapper.state().password).toBe(mockInputValue);
    });
    it('should set error and not call onSubmit cb when email empty', function () {
      var submitWrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        offerId: "S649095045_PL",
        onSubmit: onSubmitMock
      }));
      var instance = submitWrapper.instance();
      onSubmitMock.mockClear();
      instance.setState({
        email: '',
        password: mockInputValue
      });
      submitWrapper.simulate('submit');
      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(submitWrapper.state().errors.email).not.toBe('');
    });
    it('should set error and not call onSubmit cb when password empty', function () {
      var submitWrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        offerId: "S649095045_PL",
        onSubmit: onSubmitMock
      }));
      var instance = submitWrapper.instance();
      onSubmitMock.mockClear();
      instance.setState({
        email: mockEmailValue,
        password: ''
      });
      submitWrapper.simulate('submit');
      expect(onSubmitMock).not.toHaveBeenCalled();
      expect(submitWrapper.state().errors.password).not.toBe('');
    });
    it('should set field error if email not valid', function () {
      var submitWrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        offerId: "S649095045_PL",
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
    it('should validate fields on blur', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        offerId: "S649095045_PL"
      }));
      var instance = wrapper.instance();
      instance.setState({
        email: '',
        password: ''
      });
      instance.validateEmail();
      instance.validatePassword();
      instance.validateFields();
      expect(instance.state.errors.email).not.toBe('');
      expect(instance.state.errors.password).not.toBe('');
    });
  });
  describe('@onSubmit', function () {
    it('should login with offerId when fields valid', function (done) {
      _loginCustomer.default.mockResolvedValue({
        status: 200,
        responseData: {
          jwt: jwtMock
        }
      });

      onSubmitMock.mockClear();
      _auth.default.login = jest.fn();
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        offerId: "S649095045_PL"
      }));
      var instance = wrapper.instance();
      var preventDefaultMock = jest.fn();
      instance.setState({
        email: mockEmailValue,
        password: 'testtest123'
      });
      expect(_auth.default.login).not.toHaveBeenCalled();
      wrapper.simulate('submit', {
        preventDefault: preventDefaultMock
      });
      expect(preventDefaultMock).toHaveBeenCalledTimes(1);
      setImmediate(function () {
        expect(instance.state.errors.email).toBe('');
        expect(instance.state.errors.password).toBe('');
        expect(instance.state.generalError).toBe('');
        expect(_auth.default.login).toHaveBeenCalled();
        expect(_auth.default.login).toHaveBeenCalledTimes(1);
        expect(_auth.default.login).toHaveBeenCalledWith(false, false, mockEmailValue, jwtMock);
        done();
      });
    });
    it('should login to my account when fields valid', function (done) {
      _loginCustomer.default.mockResolvedValue({
        status: 200,
        responseData: {
          jwt: jwtMock
        }
      });

      onSubmitMock.mockClear();
      _auth.default.login = jest.fn();
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        publisher: "123456789",
        isMyAccount: true
      }));
      var instance = wrapper.instance();
      var preventDefaultMock = jest.fn();
      instance.setState({
        email: mockEmailValue,
        password: 'testtest123'
      });
      expect(_auth.default.login).not.toHaveBeenCalled();
      wrapper.simulate('submit', {
        preventDefault: preventDefaultMock
      });
      expect(preventDefaultMock).toHaveBeenCalledTimes(1);
      setImmediate(function () {
        expect(instance.state.errors.email).toBe('');
        expect(instance.state.errors.password).toBe('');
        expect(instance.state.generalError).toBe('');
        expect(_auth.default.login).toHaveBeenCalled();
        expect(_auth.default.login).toHaveBeenCalledTimes(1);
        expect(_auth.default.login).toHaveBeenCalledWith(true, false, mockEmailValue, jwtMock);
        done();
      });
    });
    it('should set general error when customer doesnt exist', function (done) {
      _loginCustomer.default.mockResolvedValue({
        status: 422
      });

      onSubmitMock.mockClear();
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        offerId: "S649095045_PL",
        onLoginComplete: onSubmitMock
      }));
      var instance = wrapper.instance();
      var preventDefaultMock = jest.fn();
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
        expect(instance.state.errors.email).toBe('');
        expect(instance.state.errors.password).toBe('');
        expect(instance.state.generalError).toBe('Wrong email or password');
        expect(onSubmitMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should set general error when status code 429', function (done) {
      _loginCustomer.default.mockResolvedValue({
        status: 429
      });

      onSubmitMock.mockClear();
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        offerId: "S649095045_PL",
        onLoginComplete: onSubmitMock
      }));
      var instance = wrapper.instance();
      var preventDefaultMock = jest.fn();
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
        expect(instance.state.errors.email).toBe('');
        expect(instance.state.errors.password).toBe('');
        expect(instance.state.generalError).toBe('Server overloaded. Please try again later.');
        expect(instance.state.overloaded).toBe(true);
        expect(onSubmitMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should set general error when error occurred', function (done) {
      _loginCustomer.default.mockResolvedValue({
        status: 500
      });

      onSubmitMock.mockClear();
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        offerId: "S649095045_PL",
        onLoginComplete: onSubmitMock
      }));
      var instance = wrapper.instance();
      var preventDefaultMock = jest.fn();
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
        expect(instance.state.errors.email).toBe('');
        expect(instance.state.errors.password).toBe('');
        expect(instance.state.generalError).toBe('An error occurred.');
        expect(onSubmitMock).not.toHaveBeenCalled();
        done();
      });
    });
    it('should return offer error when offerId is not given', function (done) {
      var preventDefaultMock = jest.fn();
      onSubmitMock.mockClear();
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_LoginForm.default, {
        offerId: "",
        onLoginComplete: onSubmitMock,
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
  });
});