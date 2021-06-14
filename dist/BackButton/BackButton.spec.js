"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _BackButton = require("./BackButton");

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
jest.mock('react-router-dom', function () {
  return {
    Link: function Link() {
      return /*#__PURE__*/_react.default.createElement("div", null);
    }
  };
});
describe('<BackButton/>', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_BackButton.PureBackButton, null));
      expect(wrapper.prop('isMyAccount')).toBe(false);
    });
    it('should change pathname when isMyAccount', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_BackButton.PureBackButton, {
        isMyAccount: true
      }));
      expect(wrapper.prop('isMyAccount')).toBe(true);
    });
  });
});