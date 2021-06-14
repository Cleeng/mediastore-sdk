"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

require("jest-styled-components");

var _MessageBox = _interopRequireDefault(require("./MessageBox"));

var _MessageBoxStyled = require("./MessageBoxStyled");

var message = 'test message';
var type = 'test type';
describe('<MessageBox/>', function () {
  afterEach(function () {
    jest.clearAllMocks();
  });
  describe('@renders', function () {
    it('should render initial state', function () {
      var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MessageBox.default, {
        message: message,
        type: type
      }));
      expect(wrapper.find(_MessageBoxStyled.MessageBoxIconWrapStyled)).toHaveLength(1);
      expect(wrapper.find(_MessageBoxStyled.MessageBoxMessageStyled)).toHaveLength(1);
    });
  });
});