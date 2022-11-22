"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperStyled = exports.ScrollBarWrapper = exports.HeaderStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _BreakPoints = require("../../styles/BreakPoints");
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var WrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-wrapper'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  * {\n    box-sizing: border-box;\n  }\n  box-sizing: border-box;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n\n  height: 100%;\n\n  padding-top: 44px;\n\n  background-color: ", ";\n\n  ", "\n"])), _variables.White, _BreakPoints.mediaFrom.small(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    flex-direction: row;\n    min-height: unset;\n    height: 700px;\n\n    padding: 0;\n  "]))));
exports.WrapperStyled = WrapperStyled;
var HeaderStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-sidebar'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  padding: 0 26px;\n\n  background: ", ";\n\n  footer {\n    display: none;\n  }\n\n  ", "\n"])), _variables.BackgroundColor, _BreakPoints.mediaFrom.small(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n    width: 288px;\n    padding: 30px 34px;\n\n    footer {\n      display: block;\n      padding: 23px 34px;\n    }\n  "]))));
exports.HeaderStyled = HeaderStyled;
var ScrollBarWrapper = _styledComponents.default.div(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n"])));
exports.ScrollBarWrapper = ScrollBarWrapper;