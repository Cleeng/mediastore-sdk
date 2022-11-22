"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PurePasswordResetSuccess = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _Header = _interopRequireDefault(require("../Header"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _PasswordResetStyled = require("../PasswordReset/PasswordResetStyled");
var _Button = _interopRequireDefault(require("../Button"));
var _PasswordResetSuccessStyled = require("./PasswordResetSuccessStyled");
var PasswordResetSuccess = function PasswordResetSuccess(_ref) {
  var email = _ref.email,
    resetPasswordCallback = _ref.resetPasswordCallback,
    t = _ref.t;
  return /*#__PURE__*/_react.default.createElement(_PasswordResetStyled.PasswordResetWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.PasswordResetSuccessPageStyled, null, /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.Loader, null, /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.Checkmark, null)), /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.StyledTitle, null, t('Password link sent')), /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.StyledMessage, null, email ? t('Please check your inbox at {{email}}', {
    email: email
  }) : t('Please check your inbox')), /*#__PURE__*/_react.default.createElement(_PasswordResetSuccessStyled.NoteStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "link",
    onClickFn: resetPasswordCallback
  }, t('Go back to the login page')), "\xA0")), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
};
exports.PurePasswordResetSuccess = PasswordResetSuccess;
PasswordResetSuccess.propTypes = {
  email: _propTypes.default.string.isRequired,
  t: _propTypes.default.func,
  resetPasswordCallback: _propTypes.default.func
};

/* istanbul ignore next */
PasswordResetSuccess.defaultProps = {
  t: function t(k) {
    return k;
  },
  resetPasswordCallback: function resetPasswordCallback() {}
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(PasswordResetSuccess));
exports.default = _default;