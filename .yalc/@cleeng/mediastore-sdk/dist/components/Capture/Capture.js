"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = _interopRequireWildcard(require("react"));
var _reactI18next = require("react-i18next");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Header = _interopRequireDefault(require("../Header"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _getCaptureStatus = _interopRequireDefault(require("../../api/Customer/getCaptureStatus"));
var _CaptureForm = _interopRequireDefault(require("./CaptureForm/CaptureForm"));
var _CaptureStyled = require("./CaptureStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Capture = function Capture(_ref) {
  var settings = _ref.settings,
    onSuccess = _ref.onSuccess;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    _useTranslation2 = (0, _slicedToArray2.default)(_useTranslation, 1),
    t = _useTranslation2[0];
  var _useState = (0, _react.useState)(null),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    captureSettings = _useState2[0],
    setCaptureSettings = _useState2[1];
  var _useState3 = (0, _react.useState)(true),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  (0, _react.useEffect)(function () {
    if (settings.length) {
      setCaptureSettings(settings);
      setIsLoading(false);
    } else {
      (0, _getCaptureStatus.default)().then(function (resp) {
        if (resp.responseData.shouldCaptureBeDisplayed === true) {
          setCaptureSettings(resp.responseData.settings);
          setIsLoading(false);
        } else {
          onSuccess();
        }
      });
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement(_CaptureStyled.CaptureStyled, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_CaptureStyled.CaptureContentStyled, null, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, null) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_CaptureStyled.CaptureTitle, null, t('Confirm Registration')), /*#__PURE__*/_react.default.createElement(_CaptureForm.default, {
    settings: captureSettings,
    onSuccess: onSuccess
  }))), !isLoading && captureSettings && /*#__PURE__*/_react.default.createElement(_Footer.default, {
    isCheckout: false
  }));
};
Capture.propTypes = {
  settings: _propTypes.default.arrayOf(_propTypes.default.any),
  onSuccess: _propTypes.default.func
};
Capture.defaultProps = {
  settings: [],
  onSuccess: function onSuccess() {}
};
var _default = Capture;
exports.default = _default;