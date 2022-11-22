"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.OldPasswordStyled = exports.InnerWrapperStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3;
var WrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__profile-password'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)([""])));
exports.WrapStyled = WrapStyled;
var InnerWrapperStyled = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n"])));
exports.InnerWrapperStyled = InnerWrapperStyled;
var OldPasswordStyled = _styledComponents.default.span.attrs(function () {
  return {
    className: 'msd__profile-password__old'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  letter-spacing: 2px;\n  font-weight: 700;\n"])), _variables.FontColor);
exports.OldPasswordStyled = OldPasswordStyled;