"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _BackButton = _interopRequireDefault(require("components/BackButton"));

var _auth = _interopRequireDefault(require("services/auth"));

var _ErrorPage = _interopRequireDefault(require("./ErrorPage"));

var _ErrorPageStyled = require("./ErrorPageStyled");

var mockErrorType = 'offerNotExist';
describe('ErrorPage', function () {
  describe('@renders', function () {
    it('renders whoops page on default', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_ErrorPage.default, null));
      expect(wrapper.text()).toMatch('Whoops');
      expect(wrapper.find(_ErrorPageStyled.IconStyled).exists()).toBe(true);
    });
    it('renders specified type of error', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_ErrorPage.default, {
        type: mockErrorType
      }));
      expect(wrapper.text()).toMatch('Offer does not exist or is not provided.');
      expect(wrapper.find(_ErrorPageStyled.IconStyled).exists()).toBe(true);
    });
    it('renders error message ', function () {
      var errorMessage = 'Some error';
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_ErrorPage.default, {
        error: errorMessage
      }));
      expect(wrapper.text()).toMatch(errorMessage);
    });
    it('renders error page with BackButton ', function () {
      _auth.default.isLogged = jest.fn(function () {
        return false;
      });
      var functionMock = jest.fn();
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_ErrorPage.default, {
        type: mockErrorType,
        resetError: functionMock
      }));
      expect(wrapper.text()).toMatch('Offer does not exist or is not provided.');
      expect(wrapper.find(_BackButton.default).exists()).toBe(true);
      expect(wrapper.find(_BackButton.default).prop('onClickFn')).toBe(functionMock);
    });
  });
});