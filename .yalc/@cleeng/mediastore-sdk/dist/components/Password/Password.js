"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PurePassword = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _Card = _interopRequireDefault(require("../Card"));
var _Button = _interopRequireDefault(require("../Button"));
var _innerPopupReducer = require("../../redux/innerPopupReducer");
var _PasswordStyled = require("./PasswordStyled");
var Password = function Password(_ref) {
  var showInnerPopup = _ref.showInnerPopup,
    t = _ref.t;
  return /*#__PURE__*/_react.default.createElement(_PasswordStyled.WrapStyled, null, /*#__PURE__*/_react.default.createElement(_Card.default, {
    withBorder: true
  }, /*#__PURE__*/_react.default.createElement(_PasswordStyled.InnerWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_PasswordStyled.OldPasswordStyled, null, "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    width: "auto",
    onClickFn: function onClickFn() {
      return showInnerPopup({
        type: _innerPopupReducer.POPUP_TYPES.editPassword
      });
    }
  }, t('Edit Password')))));
};
exports.PurePassword = Password;
Password.propTypes = {
  showInnerPopup: _propTypes.default.func.isRequired,
  t: _propTypes.default.func
};
Password.defaultProps = {
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Password));
exports.default = _default;