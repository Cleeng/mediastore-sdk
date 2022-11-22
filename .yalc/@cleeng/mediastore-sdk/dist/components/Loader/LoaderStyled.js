"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoaderStyled = exports.LoaderKeyframeStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var LoaderKeyframeStyled = (0, _styledComponents.keyframes)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  0%,\n  20%,\n  80%,\n  100% {\n    transform: scale(1);\n  }\n\n  50% {\n    transform: scale(1.5);\n  }\n"])));
exports.LoaderKeyframeStyled = LoaderKeyframeStyled;
var LoaderStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__spinner'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 auto;\n  position: relative;\n  width: 64px;\n  height: 64px;\n  ", ";\n\n  ", "\n\n  & div {\n    position: absolute;\n    width: 5px;\n    height: 5px;\n    background: ", ";\n    border-radius: 50%;\n    animation: ", " 1.2s linear infinite;\n    ", ";\n  }\n\n  & div:nth-child(1) {\n    animation-delay: 0s;\n    top: 29px;\n    left: 53px;\n  }\n\n  & div:nth-child(2) {\n    animation-delay: -0.1s;\n    top: 18px;\n    left: 50px;\n  }\n\n  & div:nth-child(3) {\n    animation-delay: -0.2s;\n    top: 9px;\n    left: 41px;\n  }\n\n  & div:nth-child(4) {\n    animation-delay: -0.3s;\n    top: 6px;\n    left: 29px;\n  }\n\n  & div:nth-child(5) {\n    animation-delay: -0.4s;\n    top: 9px;\n    left: 18px;\n  }\n\n  & div:nth-child(6) {\n    animation-delay: -0.5s;\n    top: 18px;\n    left: 9px;\n  }\n\n  & div:nth-child(7) {\n    animation-delay: -0.6s;\n    top: 29px;\n    left: 6px;\n  }\n\n  & div:nth-child(8) {\n    animation-delay: -0.7s;\n    top: 41px;\n    left: 9px;\n  }\n\n  & div:nth-child(9) {\n    animation-delay: -0.8s;\n    top: 50px;\n    left: 18px;\n  }\n\n  & div:nth-child(10) {\n    animation-delay: -0.9s;\n    top: 53px;\n    left: 29px;\n  }\n\n  & div:nth-child(11) {\n    animation-delay: -1s;\n    top: 50px;\n    left: 41px;\n  }\n\n  & div:nth-child(12) {\n    animation-delay: -1.1s;\n    top: 41px;\n    left: 50px;\n  }\n\n  ", "\n\n  ", "\n"])), function (props) {
  return props.isMyAccount && (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n      margin: 50px auto;\n    "])));
}, function (props) {
  return props.centered && (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n    "])));
}, function (props) {
  return props.color ? props.color : '#d4d4d4';
}, LoaderKeyframeStyled, function (props) {
  return props.isMyAccount && (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n        background: ", ";\n      "])), _variables.FontColor);
}, function (props) {
  return props.buttonLoader && (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n      width: 18px;\n      height: 18px;\n      transform: scale(0.4) translate(-20px, -25px);\n    "])));
}, function (props) {
  return props.smallLoader && (0, _styledComponents.css)(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n      position: absolute;\n      right: 0;\n      top: 0;\n\n      height: 11px;\n      width: 13px;\n      transform: translateY(100%) translateX(-100%) scale(0.3);\n    "])));
});
exports.LoaderStyled = LoaderStyled;