"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _SkeletonWrapper = _interopRequireDefault(require("components/SkeletonWrapper"));

var _MyAccountUserInfoStyled = require("./MyAccountUserInfoStyled");

var MyAccountUserInfo = function MyAccountUserInfo(_ref) {
  var firstName = _ref.firstName,
      lastName = _ref.lastName,
      email = _ref.email,
      subscription = _ref.subscription,
      isDataLoaded = _ref.isDataLoaded;
  var isNameSetted = firstName || lastName;
  return /*#__PURE__*/_react.default.createElement(_MyAccountUserInfoStyled.WrapStyled, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    circle: true,
    width: 80,
    height: 80
  }, /*#__PURE__*/_react.default.createElement(_MyAccountUserInfoStyled.PhotoStyled, null)), /*#__PURE__*/_react.default.createElement(_MyAccountUserInfoStyled.DetailsStyled, {
    isEmpty: !email
  }, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    height: 26
  }, isNameSetted && /*#__PURE__*/_react.default.createElement(_MyAccountUserInfoStyled.NameStyled, null, "".concat(firstName, " ").concat(lastName))), /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded
  }, /*#__PURE__*/_react.default.createElement(_MyAccountUserInfoStyled.MailStyled, {
    bigger: !isNameSetted
  }, email)), /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
    showChildren: isDataLoaded,
    height: 36,
    margin: "0px"
  }, subscription && /*#__PURE__*/_react.default.createElement(_MyAccountUserInfoStyled.TextStyled, null, subscription))));
};

var _default = MyAccountUserInfo;
exports.default = _default;
MyAccountUserInfo.defaultProps = {
  firstName: '',
  lastName: '',
  email: '',
  subscription: '',
  isDataLoaded: false
};