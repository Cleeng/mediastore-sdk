"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.RowStyled = exports.MessageStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3;
var WrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__profile-address'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)([""])));
exports.WrapStyled = WrapStyled;
var RowStyled = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n\n  &:first-child {\n    margin-right: 25px;\n  }\n\n  & > * {\n    width: 100%;\n    &:first-child {\n      margin-right: 25px;\n    }\n  }\n"])));
exports.RowStyled = RowStyled;
var MessageStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__profile-message--success'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  text-align: center;\n  margin: 5px 0 15px 0;\n  font-size: 12px;\n  position: relative;\n"])), _variables.ConfirmColor);
exports.MessageStyled = MessageStyled;