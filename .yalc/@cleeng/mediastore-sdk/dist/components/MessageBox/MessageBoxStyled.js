"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageBoxStyled = exports.MessageBoxMessageStyled = exports.MessageBoxIconWrapStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3;
var MessageBoxStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__message-box'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n  padding: 12px;\n  background-color: ", ";\n  border: 1px solid ", ";\n  border-radius: 7px;\n"])), _variables.BackgroundColor, _variables.LineColor);
exports.MessageBoxStyled = MessageBoxStyled;
var MessageBoxIconWrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__message-box__icon'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  width: 18px;\n  height: 18px;\n  background-color: ", ";\n  border-radius: 3px;\n\n  svg {\n    height: 12px;\n    fill: #fff;\n  }\n"])), _variables.ConfirmColor);
exports.MessageBoxIconWrapStyled = MessageBoxIconWrapStyled;
var MessageBoxMessageStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__message-box__text'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  margin-left: 13px;\n  font-size: 12px;\n  color: ", ";\n"])), _variables.ConfirmColor);
exports.MessageBoxMessageStyled = MessageBoxMessageStyled;