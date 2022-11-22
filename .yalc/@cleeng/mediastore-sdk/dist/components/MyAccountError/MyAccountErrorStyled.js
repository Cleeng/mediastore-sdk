"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.TitleStyled = exports.SubTitleStyled = exports.IconStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _BreakPoints = require("../../styles/BreakPoints");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var TitleStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__info-box__title'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 380px;\n  margin: 10px auto 0 auto;\n\n  color: ", ";\n\n  font-size: 16px;\n"])), _variables.FontColor);
exports.TitleStyled = TitleStyled;
var SubTitleStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__info-box__subtitle'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n\n  font-size: 13px;\n\n  max-width: 310px;\n  margin: 5px auto 0 auto;\n\n  a {\n    text-decoration: underline;\n  }\n"])), _variables.FontColor);
exports.SubTitleStyled = SubTitleStyled;
var IconStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__info-box__icon'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  margin: auto auto 10px auto;\n  svg {\n    max-width: 490px;\n  }\n"])));
exports.IconStyled = IconStyled;
var WrapStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__info-box'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n * {\n    box-sizing: border-box;\n  }\n  box-sizing: border-box;\n  position: relative;\n  max-width: ", ";\n\n  padding: 18px;\n  margin: ", " ;\n\n  text-align: center;\n  line-height: 1.4;\n  \n  ", "\n\n  ", "\n\n    ", "\n\n  ", "\n    ", "\n"])), function (props) {
  return props.fullWidth ? 'unset' : '320px';
}, function (props) {
  return props.margin ? props.margin : '0 auto 32px auto';
}, function (props) {
  return props.withBorder && (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n      border: 1px dashed ", ";\n      border-radius: 20px;\n      padding: 35px 0;\n    "])), _variables.IconsColor);
}, function (props) {
  return props.fullHeight && (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n      height: 100%;\n      margin: auto;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      flex-direction: column;\n      ", "\n    "])), _BreakPoints.media.small(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n        min-height: 100vh;\n      "]))));
}, function (props) {
  return props.centered && (0, _styledComponents.css)(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n        margin: auto;\n      "])));
}, function (props) {
  return props.onClick && (0, _styledComponents.css)(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n      cursor: pointer;\n      &:after {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        content: '';\n        opacity: 0;\n        border-radius: 20px;\n        box-shadow: 0px 0px 14px 0px #86868642;\n        transition: opacity 0.2s ease-in-out;\n      }\n      &:hover {\n        &:after {\n          opacity: 1;\n        }\n      }\n    "])));
}, function (props) {
  return props.isSmallCard && (0, _styledComponents.css)(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n        width: 265px;\n        padding: 26px 0;\n        height: 160px;\n        margin: 0 auto;\n        ", " {\n          font-size: 14px;\n        }\n        ", " {\n          font-size: 12px;\n        }\n        ", " {\n          margin: auto auto 5px auto;\n        }\n      "])), TitleStyled, SubTitleStyled, IconStyled);
});
exports.WrapStyled = WrapStyled;