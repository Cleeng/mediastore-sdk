"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Password = require("./Password");

var _PasswordStyled = require("./PasswordStyled");

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
describe('<Password/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('@renders', function () {
    var showInnerPopupMock = jest.fn();
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Password.PurePassword, {
        showInnerPopup: showInnerPopupMock
      }));
      expect(wrapper.find(_PasswordStyled.WrapStyled)).toHaveLength(1);
    });
    it('should call showPopup on button click', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Password.PurePassword, {
        showInnerPopup: showInnerPopupMock
      }));
      wrapper.find('button').simulate('click');
      expect(showInnerPopupMock).toHaveBeenCalledTimes(1);
    });
  });
});