"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _enzyme = require("enzyme");

require("jest-styled-components");

var _PasswordResetSuccess = _interopRequireDefault(require("./PasswordResetSuccess"));

var _PasswordResetSuccessStyled = require("./PasswordResetSuccessStyled");

/* eslint-disable react/jsx-props-no-spreading */
jest.mock('containers/labeling', function () {
  return function () {
    return function (Component) {
      return function (props) {
        return /*#__PURE__*/_react.default.createElement(Component, Object.assign({
          t: function t(k) {
            return k;
          }
        }, props));
      };
    };
  };
});
jest.mock('react-i18next', function () {
  return {
    withTranslation: function withTranslation() {
      return function (Component) {
        return function (props) {
          return /*#__PURE__*/_react.default.createElement(Component, Object.assign({
            t: function t(k) {
              return k;
            }
          }, props));
        };
      };
    }
  };
});
describe('PasswordResetSuccess', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var MOCK_EMAIL = 'gummybear@cleeng.com';
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_reactRouterDom.Router, {
        history: {
          listen: jest.fn(),
          createHref: jest.fn(),
          location: {
            pathname: ''
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_PasswordResetSuccess.default, {
        email: MOCK_EMAIL
      })));
      var messageComponent = wrapper.find(_PasswordResetSuccessStyled.StyledMessage);
      expect(messageComponent).toHaveLength(1);
      expect(messageComponent.text()).toBe("Please check your inbox at {{email}}");
      var linkComponent = wrapper.find(_PasswordResetSuccessStyled.StyledLink);
      expect(linkComponent).toHaveLength(1);
    });
  });
});