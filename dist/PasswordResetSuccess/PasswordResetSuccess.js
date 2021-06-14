"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PurePasswordResetSuccess = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _PasswordResetSuccessStyled = require("./PasswordResetSuccessStyled");

var PasswordResetSuccess = function PasswordResetSuccess(_ref) {
  var email = _ref.email,
      t = _ref.t;
  return /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.PasswordResetSuccessPageStyled, null, /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.Loader, null, /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.Checkmark, null)), /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.StyledTitle, null, t('Password link sent')), /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.StyledMessage, null, email ? t('Please check your inbox at {{email}}', {
    email: email
  }) : t('Please check your inbox')), /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.NoteStyled, null, t('Not sure that was the right email address?'), "\xA0", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/reset-password/"
  }, /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.StyledLink, null, t('Try again.')))));
};

exports.PurePasswordResetSuccess = PasswordResetSuccess;

/* istanbul ignore next */
PasswordResetSuccess.defaultProps = {
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(PasswordResetSuccess));

exports.default = _default;