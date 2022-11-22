"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectStyled = exports.ReactSelectStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _reactSelect = _interopRequireDefault(require("react-select"));
var Colors = _interopRequireWildcard(require("../../styles/variables"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var SelectStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__select__wrapper'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  position: relative;\n\n  width: 100%;\n"])));
exports.SelectStyled = SelectStyled;
var ReactSelectStyled = (0, _styledComponents.default)(_reactSelect.default).attrs(function () {
  return {
    className: 'msd__select'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  &:focus-within,\n  &:focus {\n    border-color: ", ";\n  }\n  .react-select__control {\n    background: white;\n    border: 1px solid ", ";\n    border-radius: 0;\n    transition: 0.2s ease-in-out;\n    &--is-focused {\n      &:focus-within,\n      &:focus {\n        border-color: ", ";\n        box-shadow: none;\n      }\n    }\n    &--is-disabled {\n      background-color: ", ";\n    }\n  }\n  .react-select__placeholder {\n    color: ", ";\n  }\n  .react-select__value-container {\n    padding: 13px 15px 14px;\n    color: ", ";\n  }\n  .react-select__menu {\n    border-radius: 0px;\n  }\n  .react-select__menu-list {\n  }\n  .react-select__option {\n    padding: 13px 15px 14px;\n    text-align: left;\n    &--is-focused {\n      background-color: ", ";\n    }\n    &--is-selected {\n      color: ", ";\n      background-color: #fff;\n    }\n  }\n  ", "\n  ", "\n"])), Colors.ConfirmColor, Colors.MediumGrey, Colors.ConfirmColor, Colors.BackgroundColor, Colors.FontColor, Colors.FontColor, Colors.MediumGrey, Colors.ConfirmColor, function (props) {
  return props.isMyAccount && (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n      .react-select__control {\n        border: 1px solid #d3dbe6;\n        border-radius: 4px;\n      }\n      .react-select__value-container {\n        padding: 0 16px;\n        font-size: 13px;\n      }\n    "])));
}, function (props) {
  return props.required && (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n      .react-select__value-container {\n        &::after {\n          display: block;\n          position: absolute;\n          right: 16px;\n          top: 50%;\n          transform: translate(0, -50%);\n          content: '*';\n          height: 9px;\n          font-size: 12px;\n          line-height: 12px;\n          color: ", ";\n        }\n      }\n    "])), Colors.ErrorColor);
});
exports.ReactSelectStyled = ReactSelectStyled;