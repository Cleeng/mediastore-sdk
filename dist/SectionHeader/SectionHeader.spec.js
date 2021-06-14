"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _SectionHeader = _interopRequireDefault(require("./SectionHeader"));

describe('<SectionHeader/>', function () {
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_SectionHeader.default, null, "Test"));
      expect(wrapper.prop('center')).toBe(false);
      expect(wrapper.text()).toEqual('Test');
    });
    it('should set center prop if passed', function () {
      var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_SectionHeader.default, {
        center: true
      }));
      expect(wrapper.prop('center')).toBe(true);
    });
  });
});