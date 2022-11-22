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
var _Loader = _interopRequireDefault(require("../Loader"));
var _MyAccountInput = _interopRequireDefault(require("../MyAccountInput"));
var _Select = _interopRequireWildcard(require("../Select/Select"));
var _Checkbox = _interopRequireDefault(require("../Checkbox"));
var _useMessage3 = _interopRequireDefault(require("../../hooks/useMessage"));
var _api = require("../../api");
var _MyAccountConsentsStyled = require("../MyAccountConsents/MyAccountConsentsStyled");
var _AdditionalProfileInfoStyled = require("./AdditionalProfileInfoStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var AdditionalProfileInfo = function AdditionalProfileInfo(_ref) {
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
    customSettings = _useState6[0],
    setCustomSettings = _useState6[1];
  var _useState7 = (0, _react.useState)(null),
    _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
    initialSettings = _useState8[0],
    setInitialSettings = _useState8[1];
  var _useMessage = (0, _useMessage3.default)(),
    _useMessage2 = (0, _slicedToArray2.default)(_useMessage, 4),
    message = _useMessage2[0],
    type = _useMessage2[1],
    setMessage = _useMessage2[2],
    resetMessage = _useMessage2[3];
  (0, _react.useEffect)(function () {
    if (data) {
      var newData = data.map(function (setting) {
        return _objectSpread(_objectSpread({}, setting), {}, {
          value: setting.answer ? setting.answer : '',
          values: setting.value ? setting.value.split(';').map(function (v) {
            return v.trim();
          }) : []
        });
      });
      setCustomSettings(newData);
      setInitialSettings(newData);
    }
  }, [data]);
  var handleCustomSetting = function handleCustomSetting(key, value) {
    var newArr = customSettings.map(function (item) {
      return _objectSpread(_objectSpread({}, item), {}, {
        value: item.key === key ? value : item.value
      });
    });
    setCustomSettings(newArr);
  };
  var onCancel = function onCancel() {
    setCustomSettings(initialSettings);
    setIsSectionDisabled(true);
  };
  var onSubmit = function onSubmit() {
    setIsPending(true);
    var customAnswers = customSettings.map(function (setting) {
      return {
        questionId: setting.key,
        question: setting.question,
        value: setting.value
      };
    });
    (0, _api.updateCaptureAnswers)({
      customAnswers: customAnswers
    }).then(function () {
      for (var i = 0; i < customSettings.length; i += 1) {
        updateCaptureOption({
          key: customSettings[i].key,
          value: customSettings[i].value
        });
      }
      setMessage({
        message: t('Your answers have been changed successfully'),
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
  }) : /*#__PURE__*/_react.default.createElement(_AdditionalProfileInfoStyled.WrapStyled, null, customSettings && /*#__PURE__*/_react.default.createElement(_Card.default, {
    withBorder: true
  }, message && /*#__PURE__*/_react.default.createElement(_AdditionalProfileInfoStyled.MessageStyled, {
    type: type
  }, message), customSettings.map(function (setting) {
    if (setting.values.length === 0) return /*#__PURE__*/_react.default.createElement(_AdditionalProfileInfoStyled.InputWrapStyled, {
      key: setting.key
    }, /*#__PURE__*/_react.default.createElement(_MyAccountInput.default, {
      id: setting.key,
      label: setting.question,
      value: setting.value,
      onChange: function onChange(e) {
        return handleCustomSetting(setting.key, e.target.value);
      },
      disabled: isSectionDisabled
    }));
    if (setting.values.length === 1) return /*#__PURE__*/_react.default.createElement(_AdditionalProfileInfoStyled.InputWrapStyled, {
      key: setting.key
    }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      isMyAccount: true,
      onClickFn: function onClickFn(e, disabled) {
        return !disabled && handleCustomSetting(setting.key, setting.value ? '' : setting.values[0]);
      },
      checked: setting.value === setting.values[0],
      disabled: isSectionDisabled
    }, setting.question));
    if (setting.values.length === 2) return /*#__PURE__*/_react.default.createElement(_AdditionalProfileInfoStyled.InputWrapStyled, {
      key: setting.key
    }, /*#__PURE__*/_react.default.createElement(_AdditionalProfileInfoStyled.InputLabelStyled, null, setting.question), /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      key: "".concat(setting.key, "-01"),
      onClickFn: function onClickFn(e, disabled) {
        return !disabled && handleCustomSetting(setting.key, setting.values[0]);
      },
      isRadioButton: true,
      disabled: isSectionDisabled,
      checked: setting.value === setting.values[0]
    }, setting.values[0]), /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
      key: "".concat(setting.key, "-02"),
      onClickFn: function onClickFn(e, disabled) {
        return !disabled && handleCustomSetting(setting.key, setting.values[1]);
      },
      isRadioButton: true,
      disabled: isSectionDisabled,
      checked: setting.value === setting.values[1]
    }, setting.values[1]));
    return /*#__PURE__*/_react.default.createElement(_AdditionalProfileInfoStyled.InputWrapStyled, {
      key: setting.key
    }, /*#__PURE__*/_react.default.createElement(_Select.default, {
      isMyAccount: true,
      id: setting.key,
      key: setting.key,
      label: setting.question,
      name: setting.key,
      value: setting.value ? {
        value: setting.value,
        label: setting.value
      } : null,
      values: (0, _Select.mapToSelectFormat)(setting.values),
      disabled: isSectionDisabled,
      onChange: function onChange(key, value) {
        return handleCustomSetting(key, value.value);
      }
    }));
  }), /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonWrapperStyled, null, isSectionDisabled ? /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
    onClickFn: function onClickFn() {
      setIsSectionDisabled(false);
      resetMessage();
    },
    width: "100%"
  }, t('Edit Profile')) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
    theme: "simple",
    onClickFn: onCancel
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
var _default = AdditionalProfileInfo;
exports.default = _default;
AdditionalProfileInfo.propTypes = {
  isLoading: _propTypes.default.bool,
  data: _propTypes.default.arrayOf(_propTypes.default.any),
  updateCaptureOption: _propTypes.default.func
};
AdditionalProfileInfo.defaultProps = {
  isLoading: false,
  data: null,
  updateCaptureOption: function updateCaptureOption() {}
};