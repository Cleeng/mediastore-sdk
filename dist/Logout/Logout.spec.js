"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _enzyme = require("enzyme");

var _react = _interopRequireDefault(require("react"));

var _auth = _interopRequireDefault(require("services/auth"));

var _Logout = require("./Logout");

describe('<Logout/>', function () {
  it('should call logout fn on click', function () {
    _auth.default.logout = jest.fn();
    var wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_Logout.PureLogout, null));
    wrapper.find('button').simulate('click');
    expect(_auth.default.logout).toHaveBeenCalledTimes(1);
  });
});