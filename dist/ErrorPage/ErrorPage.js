"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _auth = _interopRequireDefault(require("services/auth"));

var _BackButton = _interopRequireDefault(require("components/BackButton"));

var _close = _interopRequireDefault(require("assets/images/errors/close.svg"));

var _deleteCreditCard = _interopRequireDefault(require("assets/images/errors/deleteCreditCard.svg"));

var _lock = _interopRequireDefault(require("assets/images/errors/lock.svg"));

var _warning = _interopRequireDefault(require("assets/images/errors/warning.svg"));

var _Logout = _interopRequireDefault(require("components/Logout"));

var _Header = _interopRequireDefault(require("components/Header"));

var _ErrorPageStyled = require("./ErrorPageStyled");

/* eslint-disable import/no-dynamic-require */
var errorTypes = {
  offerNotExist: {
    icon: _close.default,
    description: 'Offer does not exist or is not provided.'
  },
  generalError: {
    icon: _warning.default,
    description: 'Whoops'
  },
  alreadyHaveAccess: {
    icon: _lock.default,
    description: 'Good news! Your account already gives you access to the content that comes with this plan.'
  },
  cannotPurchase: {
    icon: _deleteCreditCard.default,
    description: 'We are sorry! The content you are trying to access is not available in your country.'
  }
};

var ErrorPage = function ErrorPage(_ref) {
  var type = _ref.type,
      error = _ref.error,
      resetError = _ref.resetError;
  var typeParams = errorTypes[type];
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_Header.default, null, _auth.default.isLogged() ? /*#__PURE__*/_react.default.createElement(_Logout.default, null) : type !== 'generalError' && /*#__PURE__*/_react.default.createElement(_BackButton.default, {
    onClickFn: resetError
  })), /*#__PURE__*/_react.default.createElement(_ErrorPageStyled.ErrorPageStyled, null, /*#__PURE__*/_react.default.createElement(_ErrorPageStyled.IconStyled, {
    src: typeParams.icon
  }), /*#__PURE__*/_react.default.createElement(_ErrorPageStyled.MessageStyled, null, error || typeParams.description)));
};

ErrorPage.defaultProps = {
  type: 'generalError',
  error: '',
  resetError: function resetError() {}
};
var _default = ErrorPage;
exports.default = _default;