"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperStyled = exports.LabelStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _BreakPoints = require("../../styles/BreakPoints");
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3;
var WrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__subscription-card__icon'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  padding: 10px;\n  margin-right: 10px;\n  border-radius: 8px;\n  flex: 0 0 40px;\n\n  max-width: 50px;\n\n  font-size: 16px;\n  font-weight: ", ";\n  text-align: center;\n\n  background-color: ", ";\n  color: ", ";\n  border: 1px solid ", ";\n\n  ", "\n"])), _variables.BoldFont, function (props) {
  return props.bg;
}, function (props) {
  return props.color;
}, function (props) {
  return props.border;
}, _BreakPoints.mediaFrom.small(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    flex: 0 0 50px;\n    margin-right: 15px;\n    padding: 14px 10px;\n    \n    font-size: 20px;\n  "]))));
exports.WrapperStyled = WrapperStyled;
var LabelStyled = _styledComponents.default.span(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  position: absolute;\n  top: 0;\n  left: 50%;\n  height: 18px;\n  width: 48px;\n\n  background: ", ";\n  border-radius: 10px;\n\n  color: ", ";\n  font-size: 9px;\n  font-weight: 600;\n\n  transform: translate(-50%, -10px);\n"])), function (props) {
  return props.label === 'New' ? _variables.ConfirmColor : _variables.FontColor;
}, _variables.White);
exports.LabelStyled = LabelStyled;