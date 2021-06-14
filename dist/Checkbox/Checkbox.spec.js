"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _CheckboxStyled = require("./CheckboxStyled");

describe('<Checkbox/>', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Checkbox.default, null));
      expect(wrapper.find(_CheckboxStyled.CheckboxStyled).exists()).toBe(true);
      expect(wrapper.props().checked).toEqual(false);
    });
    it('should add class to checkbox when general error', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
        error: "general",
        required: true
      }));
      expect(wrapper.find(_CheckboxStyled.CheckFrameStyled).exists()).toBe(true);
      expect(wrapper.find(_CheckboxStyled.CheckFrameStyled).props().error).toBe(true);
    });
    it('should change checked field if passed', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
        checked: true
      }));
      expect(wrapper.props().checked).toBe(true);
      expect(wrapper.find(_CheckboxStyled.CheckMarkStyled).exists()).toBe(true);
    });
  });
  describe('@events', function () {
    it('should call onClickFn when checkbox is clicked', function () {
      var clickFn = jest.fn();
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
        onClickFn: clickFn
      }));
      expect(clickFn).not.toHaveBeenCalled();
      wrapper.simulate('click');
      expect(clickFn).toHaveBeenCalledTimes(1);
    });
    it('should call onClickFn when press Enter on checkbox', function () {
      var clickFn = jest.fn();
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
        onClickFn: clickFn
      }));
      var checkbox = wrapper.find(_CheckboxStyled.CheckFrameStyled);
      expect(clickFn).not.toHaveBeenCalled();
      checkbox.simulate('keyDown', {
        keyCode: 32
      });
      expect(clickFn).toHaveBeenCalledTimes(1);
    });
  });
});