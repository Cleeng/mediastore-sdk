"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

require("jest-styled-components");

var _Input = _interopRequireDefault(require("components/Input"));

var _PasswordInput = _interopRequireDefault(require("./PasswordInput"));

var _InputStyled = require("../Input/InputStyled");

jest.useFakeTimers();
var onChangeMock = jest.fn();
var ERROR_MESSAGE = 'MOCK_ERROR_MESSAGE';
describe('PasswordInput', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordInput.default, null));
      var inputComponent = wrapper.find(_Input.default);
      expect(inputComponent).toHaveLength(1);
      expect(inputComponent.props().value).toBe('');
      var inputElement = wrapper.find(_InputStyled.InputElementStyled);
      expect(inputElement).toHaveLength(1);
      expect(inputElement.props().type).toBe('password');
      expect(inputElement.props().autoComplete).toBe('off');
    });
    it('should show error message', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordInput.default, {
        error: ERROR_MESSAGE
      }));
      var errorWrapper = wrapper.find(_InputStyled.ErrorWrapper);
      expect(errorWrapper).toHaveLength(1);
      expect(errorWrapper.text()).toBe(ERROR_MESSAGE);
    });
    it('should call passed function on change', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordInput.default, {
        onChange: onChangeMock,
        showPasswordStrength: true
      }));
      expect(onChangeMock).not.toHaveBeenCalled();
      wrapper.find('Input').props().onChange('sth');
      expect(onChangeMock).toHaveBeenCalledTimes(1);
      expect(onChangeMock).toHaveBeenCalledWith('sth');
    });
    it('should set too short error if less than 6 chars and no digit', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordInput.default, {
        onChange: onChangeMock,
        showPasswordStrength: true
      }));
      wrapper.find('Input').props().onChange('sth');
      expect(wrapper.state().passError).toBe('Your password must contain at least 8 characters, including 1 digit.');
      expect(wrapper.state().errorLabel).toBe('NotValid');
    });
    it('should set weak indicator if only small letters', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordInput.default, {
        onChange: onChangeMock,
        showPasswordStrength: true
      }));
      wrapper.find('Input').props().onChange('something1');
      expect(wrapper.state().passError).toBe('Weak');
      expect(wrapper.state().errorLabel).toBe('Weak');
    });
    it('should set fair indicator if small, big letters and digit', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordInput.default, {
        onChange: onChangeMock,
        showPasswordStrength: true
      }));
      wrapper.find('Input').props().onChange('example1D');
      expect(wrapper.state().passError).toBe('Could be stronger');
      expect(wrapper.state().errorLabel).toBe('Fair');
    });
    it('should set good indicator if small and big letters and numbers', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordInput.default, {
        onChange: onChangeMock,
        showPasswordStrength: true
      }));
      wrapper.find('Input').props().onChange('somethingELSE123');
      expect(wrapper.state().passError).toBe('Good password');
      expect(wrapper.state().errorLabel).toBe('Good');
    });
    it('should set strong indicator if small and big letters, numbers and special characters', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_PasswordInput.default, {
        onChange: onChangeMock,
        showPasswordStrength: true
      }));
      wrapper.find('Input').props().onChange('somethingELSE123$%^');
      expect(wrapper.state().passError).toBe('Strong password');
      expect(wrapper.state().errorLabel).toBe('Strong');
    });
  });
});