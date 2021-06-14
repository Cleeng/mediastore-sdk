"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _MyAccountContent = _interopRequireDefault(require("./MyAccountContent"));

/* eslint-disable react/jsx-props-no-spreading */
describe('<MyAccountContent/>', function () {
  var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_MyAccountContent.default, null));
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
  describe('@renders', function () {
    it('should render initial state', function () {
      expect(wrapper.prop('children')).toBe('');
    });
  });
});