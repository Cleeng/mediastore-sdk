"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread2"));

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var RedirectWithQuery = function RedirectWithQuery(_ref) {
  var location = _ref.location;
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Redirect, {
    to: (0, _objectSpread2.default)((0, _objectSpread2.default)({}, location), {}, {
      pathname: '/login'
    })
  });
};

RedirectWithQuery.defaultProps = {
  location: {}
};
var _default = RedirectWithQuery;
exports.default = _default;