"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _planHelper = require("util/planHelper");

var _SubscriptionIconStyled = require("./SubscriptionIconStyled");

var SubscriptionIcon = function SubscriptionIcon(_ref) {
  var period = _ref.period,
      showLabel = _ref.showLabel,
      className = _ref.className;

  var _ref2 = _planHelper.periodMapper[period] || _planHelper.periodMapper.default,
      color = _ref2.color,
      bg = _ref2.bg,
      label = _ref2.label,
      border = _ref2.border;

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SubscriptionIconStyled.WrapperStyled, {
    color: color || null,
    bg: bg || null,
    border: border || null,
    className: className
  }, showLabel && /*#__PURE__*/_react.default.createElement(_SubscriptionIconStyled.LabelStyled, {
    label: showLabel
  }, showLabel), label || ''));
};

SubscriptionIcon.defaultProps = {
  period: 'default',
  showLabel: '',
  className: ''
};
var _default = SubscriptionIcon;
exports.default = _default;