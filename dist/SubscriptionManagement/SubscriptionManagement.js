"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureSubscriptionManagement = void 0;

var _slicedToArray2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _Button = _interopRequireDefault(require("components/Button"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _SubscriptionManagementStyled = require("./SubscriptionManagementStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var SubscriptionManagement = function SubscriptionManagement(_ref) {
  var isOpened = _ref.isOpened,
      children = _ref.children,
      onClose = _ref.onClose,
      t = _ref.t;

  var _useState = (0, _react.useState)(isOpened),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isOptionsVisible = _useState2[0],
      setIsOptionsVisible = _useState2[1];

  var toggle = function toggle(e) {
    e.stopPropagation();
    setIsOptionsVisible(function (isVisible) {
      return !isVisible;
    });
    if (isOptionsVisible) onClose();
  };

  return /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.SubscriptionManagementStyled, null, /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.ManageButtonWrapStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "simple",
    width: "unset",
    onClickFn: function onClickFn(e) {
      return toggle(e);
    }
  }, /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.ButtonTextStyled, {
    isExpanded: isOptionsVisible
  }, t('Manage')))), /*#__PURE__*/_react.default.createElement(_SubscriptionManagementStyled.SubscriptionActionsStyled, {
    isOpened: isOptionsVisible
  }, children));
};

exports.PureSubscriptionManagement = SubscriptionManagement;
SubscriptionManagement.defaultProps = {
  isOpened: false,
  children: '',
  onClose: function onClose() {},
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(SubscriptionManagement));

exports.default = _default;