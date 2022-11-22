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
var _reactI18next = require("react-i18next");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Card = _interopRequireDefault(require("../Card"));
var _MyAccountInput = _interopRequireDefault(require("../MyAccountInput"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _useMessage3 = _interopRequireDefault(require("../../hooks/useMessage"));
var _api = require("../../api");
var _MyAccountConsentsStyled = require("../MyAccountConsents/MyAccountConsentsStyled");
var _AddressDetailsStyled = require("./AddressDetailsStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var AddressDetails = function AddressDetails(_ref) {
  var data = _ref.data,
    isLoading = _ref.isLoading,
    updateCaptureOption = _ref.updateCaptureOption;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    _useTranslation2 = (0, _slicedToArray2.default)(_useTranslation, 1),
    t = _useTranslation2[0];
  var _useState = (0, _react.useState)(true),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    isSectionDisabled = _useState2[0],
    setIsSectionDisabled = _useState2[1];
  var _useState3 = (0, _react.useState)(false),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isPending = _useState4[0],
    setIsPending = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    address = _useState6[0],
    setAddress = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    initialAddress = _useState8[0],
    setInitialAddress = _useState8[1];
  var _useMessage = (0, _useMessage3.default)(),
    _useMessage2 = (0, _slicedToArray2.default)(_useMessage, 4),
    message = _useMessage2[0],
    type = _useMessage2[1],
    setMessage = _useMessage2[2],
    resetMessage = _useMessage2[3];
  (0, _react.useEffect)(function () {
    if (data) {
      setAddress(data.answer);
      setInitialAddress(data.answer);
    }
  }, [data]);
  var onAddressChange = function onAddressChange(key, newValue) {
    setAddress(_objectSpread(_objectSpread({}, address), {}, (0, _defineProperty2.default)({}, key, newValue)));
  };
  var onCancel = function onCancel() {
    setAddress(initialAddress);
    setIsSectionDisabled(true);
  };
  var onSubmit = function onSubmit() {
    setIsPending(true);
    (0, _api.updateCaptureAnswers)(_objectSpread({}, address)).then(function () {
      updateCaptureOption({
        key: 'address',
        value: address
      });
      setMessage({
        message: t('Your address details have been changed successfully'),
        type: 'success'
      });
      setIsPending(false);
      setIsSectionDisabled(true);
    }).catch(function () {
      setMessage({
        message: t('Something went wrong. Try again later.'),
        type: 'error'
      });
      setIsPending(false);
      setIsSectionDisabled(true);
    });
  };
  return isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
    isMyAccount: true
  }) : /*#__PURE__*/_react.default.createElement(_AddressDetailsStyled.WrapStyled, null, address && /*#__PURE__*/_react.default.createElement(_Card.default, {
    withBorder: true
  }, message && /*#__PURE__*/_react.default.createElement(_AddressDetailsStyled.MessageStyled, {
    type: type
  }, message), /*#__PURE__*/_react.default.createElement(_MyAccountInput.default, {
    id: "address",
    label: t('Address Line 1'),
    value: address.address || '',
    onChange: function onChange(e) {
      return onAddressChange('address', e.target.value);
    },
    disabled: isSectionDisabled
  }), /*#__PURE__*/_react.default.createElement(_MyAccountInput.default, {
    id: "address2",
    label: t('Address Line 2'),
    value: address.address2 || '',
    onChange: function onChange(e) {
      return onAddressChange('address2', e.target.value);
    },
    disabled: isSectionDisabled
  }), /*#__PURE__*/_react.default.createElement(_MyAccountInput.default, {
    id: "city",
    label: t('City'),
    value: address.city || '',
    onChange: function onChange(e) {
      return onAddressChange('city', e.target.value);
    },
    disabled: isSectionDisabled
  }), /*#__PURE__*/_react.default.createElement(_AddressDetailsStyled.RowStyled, null, /*#__PURE__*/_react.default.createElement(_MyAccountInput.default, {
    id: "state",
    label: t('State'),
    value: address.state || '',
    onChange: function onChange(e) {
      return onAddressChange('state', e.target.value);
    },
    disabled: isSectionDisabled
  }), /*#__PURE__*/_react.default.createElement(_MyAccountInput.default, {
    id: "postCode",
    label: t('Zip/Postal Code'),
    value: address.postCode || '',
    onChange: function onChange(e) {
      return onAddressChange('postCode', e.target.value);
    },
    disabled: isSectionDisabled
  })), /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonWrapperStyled, null, isSectionDisabled ? /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
    onClickFn: function onClickFn() {
      setIsSectionDisabled(false);
      resetMessage();
    },
    width: "100%"
  }, t('Edit Address')) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
    theme: "simple",
    onClickFn: function onClickFn() {
      return onCancel();
    }
  }, t('Cancel')), /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
    onClickFn: onSubmit,
    disabled: isPending,
    type: "submit",
    theme: "confirm"
  }, isPending && /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) || t('Save'))))));
};
AddressDetails.propTypes = {
  isLoading: _propTypes.default.bool,
  data: _propTypes.default.objectOf(_propTypes.default.any),
  updateCaptureOption: _propTypes.default.func
};
AddressDetails.defaultProps = {
  isLoading: false,
  data: {},
  updateCaptureOption: function updateCaptureOption() {}
};
var _default = AddressDetails;
exports.default = _default;