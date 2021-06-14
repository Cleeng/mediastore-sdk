"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PurePassword = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _Card = _interopRequireDefault(require("components/Card"));

var _Button = _interopRequireDefault(require("components/Button"));

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
        type: 'editPassword'
      });
    }
  }, t('Edit Password')))));
};

exports.PurePassword = Password;
Password.defaultProps = {
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Password));

exports.default = _default;