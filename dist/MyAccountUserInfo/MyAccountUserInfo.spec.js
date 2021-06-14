"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _MyAccountUserInfo = _interopRequireDefault(require("./MyAccountUserInfo"));

var _MyAccountUserInfoStyled = require("./MyAccountUserInfoStyled");

describe('<MyAccountUserInfo/>', function () {
  var wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_MyAccountUserInfo.default, null));
  describe('@renders', function () {
    it('should render initial state', function () {
      expect(wrapper.find(_MyAccountUserInfoStyled.DetailsStyled)).toHaveLength(1);
      expect(wrapper.find(_MyAccountUserInfoStyled.PhotoStyled)).toHaveLength(1);
    });
  });
});