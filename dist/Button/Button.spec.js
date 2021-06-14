"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("./Button"));

describe('<Button/>', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Button.default, null));
      expect(wrapper.prop('type')).toBe('button');
      expect(wrapper.prop('theme')).toBe('primary');
    });
    it('should render initial state for Link', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Button.default, {
        isLink: true,
        to: {
          pathname: '/my-account',
          fromMyAccount: true
        }
      }));
      expect(wrapper.prop('to')).toEqual({
        pathname: '/my-account',
        state: {
          fromMyAccount: true
        }
      });
    });
    it('should change type if passed', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Button.default, null));
      var newType = 'submit';
      wrapper.setProps({
        type: newType
      });
      expect(wrapper.prop('type')).toBe(newType);
    });
  });
  describe('@events', function () {
    it('should call onClickFn when button clicked', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Button.default, null));
      var clickFn = jest.fn();
      wrapper.setProps({
        onClickFn: clickFn
      });
      expect(clickFn).not.toHaveBeenCalled();
      wrapper.simulate('click');
      expect(clickFn).toHaveBeenCalledTimes(1);
    });
  });
});