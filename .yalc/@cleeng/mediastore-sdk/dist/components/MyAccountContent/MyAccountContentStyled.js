"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _variables = require("../../styles/variables");
var _BreakPoints = require("../../styles/BreakPoints");
var _templateObject, _templateObject2;
// eslint-disable-next-line import/prefer-default-export
var WrapStyled = _styledComponents.default.main.attrs(function () {
  return {
    className: 'msd__account-content'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  display: flex;\n  flex-grow: 1;\n  min-height: 100%;\n\n  padding: 35px 26px;\n\n  background-color: ", ";\n  border-top: 1px solid ", ";\n  border-left: none;\n\n  ", "\n"])), _variables.BackgroundColor, _variables.LineColor, _BreakPoints.mediaFrom.small(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    border-left: 1px solid ", ";\n    border-top: none;\n    padding: 35px;\n  "])), _variables.LineColor));
exports.WrapStyled = WrapStyled;