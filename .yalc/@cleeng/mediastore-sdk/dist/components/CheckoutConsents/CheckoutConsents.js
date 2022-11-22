"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _api = require("../../api");
var _Header = _interopRequireDefault(require("../Header"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _Button = _interopRequireDefault(require("../Button"));
var _Checkbox = _interopRequireDefault(require("../Checkbox"));
var _CheckoutConsentsStyled = require("./CheckoutConsentsStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var CheckoutConsents = function CheckoutConsents(_ref) {
  var onSuccess = _ref.onSuccess;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    _useTranslation2 = (0, _slicedToArray2.default)(_useTranslation, 1),
    t = _useTranslation2[0];
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    consents = _useState2[0],
    setConsents = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    processing = _useState4[0],
    setProcessing = _useState4[1];
  var _useState5 = (0, _react.useState)(true),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    isLoading = _useState6[0],
    setIsLoading = _useState6[1];
  var _useState7 = (0, _react.useState)(''),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    generalError = _useState8[0],
    setGeneralError = _useState8[1];
  (0, _react.useEffect)(function () {
    (0, _api.getCustomerConsents)().then(function (resp) {
      var consentsToAccept = resp.responseData.consents.filter(function (consent) {
        return consent.newestVersion > consent.version || consent.needsUpdate === true;
      });
      if (consentsToAccept.length === 0) onSuccess();else setConsents(consentsToAccept);
    }).finally(function () {
      return setIsLoading(false);
    });
  }, []);
  var handleClick = function handleClick(e, isConsentDisabled, clicked) {
    var updatedConsents = consents.map(function (consent) {
      if (consent.name === clicked.name) {
        return _objectSpread(_objectSpread({}, consent), {}, {
          state: clicked.state === 'accepted' ? 'declined' : 'accepted'
        });
      }
      return consent;
    });
    setConsents(updatedConsents);
  };
  var validateConsents = function validateConsents() {
    var isError = false;
    var updatedConsents = consents.map(function (consent) {
      if (consent.required && consent.state === 'declined') {
        isError = true;
        return _objectSpread(_objectSpread({}, consent), {}, {
          error: t('This consent is required')
        });
      }
      return consent;
    });
    setConsents(updatedConsents);
    return !isError;
  };
  var updateConsents = function updateConsents() {
    if (validateConsents()) {
      var payload = consents.map(function (consent) {
        return {
          name: consent.name,
          version: consent.newestVersion,
          state: consent.state
        };
      });
      setProcessing(true);
      (0, _api.submitConsents)([], [], payload).then(function () {
        setProcessing(false);
        onSuccess();
      }).catch(function () {
        setGeneralError(t('Something went wrong. Try again later'));
      });
    }
  };
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CheckoutConsentsStyled.CheckoutConsentsStyled, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_CheckoutConsentsStyled.CheckoutConsentsContentStyled, null, isLoading || !consents ? /*#__PURE__*/_react.default.createElement(_Loader.default, null) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CheckoutConsentsStyled.CheckoutConsentsTitleStyled, null, t('Terms & Conditions')), /*#__PURE__*/_react.default.createElement(_CheckoutConsentsStyled.CheckoutConsentsSubTitleStyled, null, t('Please accept Terms & Conditions')), /*#__PURE__*/_react.default.createElement(_CheckoutConsentsStyled.CheckoutConsentsListStyled, null, consents.map(function (consent) {
    return /*#__PURE__*/_react.default.createElement(_CheckoutConsentsStyled.CheckoutConsentsCheckbox, {
      key: consent.name
    }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      isMyAccount: true,
      onClickFn: function onClickFn(e, isConsentDisabled) {
        return handleClick(e, isConsentDisabled, consent);
      },
      checked: consent.state === 'accepted',
      required: consent.required
    }, t(consent.label)), /*#__PURE__*/_react.default.createElement(_CheckoutConsentsStyled.CheckoutConsentsError, null, consent.error));
  }), generalError && /*#__PURE__*/_react.default.createElement(_CheckoutConsentsStyled.CheckoutConsentsError, {
    center: true
  }, generalError)), /*#__PURE__*/_react.default.createElement(_Button.default, {
    size: "big",
    theme: "confirm",
    onClickFn: updateConsents
  }, processing ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) : t('Continue')))), !isLoading && consents && /*#__PURE__*/_react.default.createElement(_Footer.default, {
    isCheckout: false
  })));
};
CheckoutConsents.propTypes = {
  onSuccess: _propTypes.default.func
};
CheckoutConsents.defaultProps = {
  onSuccess: function onSuccess() {}
};
var _default = CheckoutConsents;
exports.default = _default;