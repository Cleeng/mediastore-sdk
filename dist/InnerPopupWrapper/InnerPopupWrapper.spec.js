"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _InnerPopupWrapper = require("./InnerPopupWrapper");

var _InnerPopupWrapperStyled = require("./InnerPopupWrapperStyled");

require("jest-styled-components");

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
var defaultProps = {
  steps: 2,
  popupTitle: 'title',
  currentStep: 1,
  children: /*#__PURE__*/_react.default.createElement("p", null, "mock"),
  isError: false
};
describe('<InnerPopupWrapper/>', function () {
  afterEach(function () {
    return jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.PureInnerPopupWrapper, defaultProps));
      expect(wrapper.find(_InnerPopupWrapperStyled.DotStyled)).toHaveLength(2);
      expect(wrapper.find(_InnerPopupWrapperStyled.HeaderTitleStyled).text()).toBe('title');
    });
  });
});