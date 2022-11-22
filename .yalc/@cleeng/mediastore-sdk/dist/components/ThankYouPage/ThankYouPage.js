"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureThankYouPage = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _Header = _interopRequireDefault(require("../Header"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _checkmarkBase = _interopRequireDefault(require("../../assets/images/checkmarkBase"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _ThankYouPageStyled = require("./ThankYouPageStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ThankYouPage = function ThankYouPage(_ref) {
  var onSuccess = _ref.onSuccess,
    t = _ref.t;
  (0, _react.useEffect)(function () {
    var timer = setTimeout(function () {
      onSuccess();
    }, 3000);
    return function () {
      return clearTimeout(timer);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.ThankYouPageWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.ThankYouPageStyled, null, /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.IconStyled, {
    src: _checkmarkBase.default
  }), /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.TitleStyled, null, t('Thank You!')), /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.MessageStyled, null, /*#__PURE__*/_react.default.createElement("strong", null, t('Your purchase has been successfully completed.'))), /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.MessageStyled, null, t('We hope you love it. You can manage your account from'), /*#__PURE__*/_react.default.createElement(_ThankYouPageStyled.LinkStyled, {
    href: (0, _appConfigHelper.getData)('CLEENG_MY_ACCOUNT_URL'),
    target: "_blank",
    rel: "noopener noreferrer"
  }, t('here'), "."))), /*#__PURE__*/_react.default.createElement(_Footer.default, null));
};
exports.PureThankYouPage = ThankYouPage;
ThankYouPage.propTypes = {
  onSuccess: _propTypes.default.func,
  t: _propTypes.default.func
};

/* istanbul ignore next */
ThankYouPage.defaultProps = {
  onSuccess: function onSuccess() {},
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(ThankYouPage));
exports.default = _default;