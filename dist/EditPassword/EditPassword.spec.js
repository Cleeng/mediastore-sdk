"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Button = _interopRequireDefault(require("components/Button"));

var _resetPassword = _interopRequireDefault(require("api/Auth/resetPassword"));

var _EditPassword = require("./EditPassword");

/* eslint-disable react/jsx-props-no-spreading */
jest.mock('api/Auth/resetPassword');
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
var hideInnerPopupMock = jest.fn();
describe('<EditPassword/>', function () {
  afterEach(function () {
    return jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_EditPassword.PureEditPassword, {
        hideInnerPopup: hideInnerPopupMock
      }));
      expect(wrapper.state('step')).toBe(1);
      expect(wrapper.state('isLoading')).toBe(false);
      expect(wrapper.state('isError')).toBe(false);
    });
  });
  describe('@actions', function () {
    it('should close popup on "no,thanks" button click', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_EditPassword.PureEditPassword, {
        hideInnerPopup: hideInnerPopupMock
      }));
      var buttons = wrapper.find(_Button.default);
      var cancelButton = buttons.filterWhere(function (button) {
        return button.prop('theme') === 'simple';
      });
      expect(cancelButton).toHaveLength(1);
      cancelButton.simulate('click');
      expect(hideInnerPopupMock).toHaveBeenCalledTimes(1);
    });
    it('should reset password on button click', function (done) {
      _resetPassword.default.mockResolvedValue({
        responseData: {},
        errors: []
      });

      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_EditPassword.PureEditPassword, {
        hideInnerPopup: hideInnerPopupMock
      }));
      var buttons = wrapper.find(_Button.default);
      wrapper.setState({
        step: 1
      });
      var confirmButton = buttons.filterWhere(function (button) {
        return button.prop('theme') === 'confirm';
      });
      confirmButton.simulate('click');
      setImmediate(function () {
        expect(_resetPassword.default).toHaveBeenCalledTimes(1);
        expect(wrapper.state('step')).toBe(2);
        expect(wrapper.state('isLoading')).toBe(false);
        done();
      });
    });
    it('should logout customer on click button in step 2', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_EditPassword.PureEditPassword, {
        hideInnerPopup: hideInnerPopupMock
      }));
      var buttons = wrapper.find(_Button.default);
      var confirmButton = buttons.filterWhere(function (button) {
        return button.prop('theme') === 'confirm';
      });
      expect(confirmButton).toHaveLength(1);
      wrapper.setState({
        step: 2
      });
      expect(wrapper.state('step')).toBe(2);
      confirmButton.simulate('click');
      expect(hideInnerPopupMock).toHaveBeenCalledTimes(1);
    });
  });
});