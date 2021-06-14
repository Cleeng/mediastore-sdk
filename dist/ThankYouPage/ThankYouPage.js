"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureThankYouPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _Header = _interopRequireDefault(require("components/Header"));

var _Logout = _interopRequireDefault(require("components/Logout"));

var _Footer = _interopRequireDefault(require("components/Footer"));

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _checkmark = _interopRequireDefault(require("assets/images/checkmark.svg"));

var _ThankYouPageStyled = require("./ThankYouPageStyled");

var ThankYouPage = function ThankYouPage(_ref) {
  var t = _ref.t;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Header.default, null, /*#__PURE__*/_react.default.createElement(_Logout.default, null)), /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.ThankYouPageStyled, null, /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.IconStyled, {
    src: _checkmark.default,
    alt: "checkmark icon"
  }), /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.TitleStyled, null, t('Thank You!')), /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.MessageStyled, null, /*#__PURE__*/_react.default.createElement("strong", null, t('Your purchase has been successfully completed.'))), /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.MessageStyled, null, t('We hope you love it. If you need help from us with your account, you can always find it'), /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.LinkStyled, {
    href: "https://www.cleeng.com",
    target: "_blank",
    rel: "noopener noreferrer"
  }, t('here'), "."))), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
};

exports.PureThankYouPage = ThankYouPage;

/* istanbul ignore next */
ThankYouPage.defaultProps = {
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(ThankYouPage));

exports.default = _default;