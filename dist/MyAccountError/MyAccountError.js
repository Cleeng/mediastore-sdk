"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureMyAccountError = void 0;

var _react = _interopRequireDefault(require("react"));

var _Button = _interopRequireDefault(require("components/Button"));

var _sad_server = require("assets/images/errors/sad_server.svg");

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _MyAccountErrorStyled = require("./MyAccountErrorStyled");

/* istanbul ignore file */
var MyAccountError = function MyAccountError(_ref) {
  var title = _ref.title,
      subtitle = _ref.subtitle,
      icon = _ref.icon,
      generalError = _ref.generalError,
      withBorder = _ref.withBorder,
      fullHeight = _ref.fullHeight,
      centered = _ref.centered,
      margin = _ref.margin,
      fullWidth = _ref.fullWidth,
      t = _ref.t;
  var IconComponent = generalError ? _sad_server.ReactComponent : icon;
  return /*#__PURE__*/_react.default.createElement(_MyAccountErrorStyled.WrapStyled, {
    withBorder: withBorder,
    fullHeight: fullHeight,
    centered: centered,
    margin: margin,
    fullWidth: fullWidth
  }, (icon || generalError) && /*#__PURE__*/_react.default.createElement(_MyAccountErrorStyled.IconStyled, null, /*#__PURE__*/_react.default.createElement(IconComponent, null)), /*#__PURE__*/_react.default.createElement(_MyAccountErrorStyled.TitleStyled, null, generalError ? t('Oops, something went wrong!') : title), /*#__PURE__*/_react.default.createElement(_MyAccountErrorStyled.SubTitleStyled, null, generalError ? t('Please try again in a few moments.') : subtitle), generalError && /*#__PURE__*/_react.default.createElement(_Button.default, {
    margin: "20px auto auto auto",
    width: "auto",
    onClickFn: function onClickFn() {
      return window.location.reload();
    }
  }, t('Try again')));
};

exports.PureMyAccountError = MyAccountError;
MyAccountError.defaultProps = {
  title: '',
  subtitle: '',
  icon: '',
  generalError: false,
  withBorder: false,
  fullHeight: false,
  centered: false,
  margin: '',
  fullWidth: false,
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(MyAccountError));

exports.default = _default;