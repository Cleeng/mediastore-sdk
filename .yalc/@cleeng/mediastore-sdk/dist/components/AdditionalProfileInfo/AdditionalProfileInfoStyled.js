"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.MessageStyled = exports.InputWrapStyled = exports.InputLabelStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var WrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__profile-capture__wrapper'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)([""])));
exports.WrapStyled = WrapStyled;
var MessageStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__profile-capture__message'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  text-align: center;\n  margin: 5px 0 15px 0;\n  font-size: 12px;\n  position: relative;\n"])), _variables.ConfirmColor);
exports.MessageStyled = MessageStyled;
var InputWrapStyled = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 20px;\n"])));
exports.InputWrapStyled = InputWrapStyled;
var InputLabelStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__profile-capture__label'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  margin-bottom: 12px;\n  color: ", ";\n  font-size: 13px;\n"])), _variables.FontColor);
exports.InputLabelStyled = InputLabelStyled;