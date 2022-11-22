"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocialStyled = exports.SeparatorStyled = exports.LoginWrapperStyled = exports.FromStyled = exports.FormSuccessStyled = exports.FormErrorStyled = exports.ContentWrapperStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var colors = _interopRequireWildcard(require("../../styles/variables"));
var _BreakPoints = require("../../styles/BreakPoints");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var LoginWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__auth-wrapper'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  background: ", ";\n  * {\n    box-sizing: border-box;\n  }\n  box-sizing: border-box;\n"])), colors.BackgroundColor);
exports.LoginWrapperStyled = LoginWrapperStyled;
var ContentWrapperStyled = _styledComponents.default.main.attrs(function () {
  return {
    className: 'msd__auth-content'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  width: 55%;\n  margin: 0 auto;\n  padding-bottom: 70px;\n\n  text-align: center;\n\n  ", "\n"])), _BreakPoints.media.small(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n    width: 80%;\n  "]))));
exports.ContentWrapperStyled = ContentWrapperStyled;
var FromStyled = _styledComponents.default.form.attrs(function () {
  return {
    className: 'msd__auth-wrapper__form'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  padding-top: 40px;\n  & input {\n    position: relative;\n  }\n"])));
exports.FromStyled = FromStyled;
var SocialStyled = _styledComponents.default.div(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  justify-content: space-between;\n\n  width: 100%;\n  margin-top: 10px;\n\n  p {\n    margin-top: 20px;\n  }\n\n  button {\n    width: 48%;\n    margin: 10px 0 0 0;\n  }\n\n  ", "\n"])), _BreakPoints.media.smallest(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n    flex-direction: column;\n    \n    margin-bottom: 20px;\n    \n    button{\n      width: 100%;\n\n      margin: 5px 0;\n    }\n  "]))));
exports.SocialStyled = SocialStyled;
var SeparatorStyled = _styledComponents.default.div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  width: 100%;\n\n  padding: 20px 0;\n\n  color: ", ";\n\n  text-align: center;\n  font-size: 13px;\n\n  overflow: hidden;\n\n  &::before,\n  &::after {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n\n    content: '';\n    height: 1px;\n    width: 40%;\n\n    background-color: ", ";\n  }\n  &::before {\n    right: 5%;\n\n    margin-left: -50%;\n  }\n  &::after {\n    left: 5%;\n    margin-right: -50%;\n  }\n"])), colors.FontColor, colors.MediumGrey);
exports.SeparatorStyled = SeparatorStyled;
var FormErrorStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__form__message--error'
  };
})(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  top: 20px;\n  width: 100%;\n\n  color: ", ";\n\n  font-size: 13px;\n  font-weight: 600;\n\n  a {\n    color: ", ";\n    font-weight: 600;\n    text-decoration: underline;\n  }\n"])), colors.ErrorColor, colors.ErrorColor);
exports.FormErrorStyled = FormErrorStyled;
var FormSuccessStyled = _styledComponents.default.h1.attrs(function () {
  return {
    className: 'msd__form__message--success'
  };
})(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  position: absolute;\n  top: 20px;\n  width: 100%;\n  font-size: 13px;\n  font-weight: 600;\n"])), colors.ConfirmColor);
exports.FormSuccessStyled = FormSuccessStyled;