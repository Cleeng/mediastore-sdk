"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaptureRowStyled = exports.CaptureQuestionStyled = exports.CaptureGroupStyled = exports.CaptureFormStyled = exports.CaptureError = exports.CaptureBoxStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CaptureFormStyled = _styledComponents.default.form(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)([""])));
exports.CaptureFormStyled = CaptureFormStyled;
var CaptureRowStyled = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n"])));
exports.CaptureRowStyled = CaptureRowStyled;
var CaptureGroupStyled = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)([""])));
exports.CaptureGroupStyled = CaptureGroupStyled;
var CaptureBoxStyled = _styledComponents.default.div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  padding: 10px;\n"])));
exports.CaptureBoxStyled = CaptureBoxStyled;
var CaptureQuestionStyled = _styledComponents.default.div(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  text-align: left;\n  ", "\n"])), function (props) {
  return props.required && (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n      &::after {\n        content: '*';\n        margin-left: 4px;\n        height: 9px;\n        font-size: 12px;\n        line-height: 12px;\n        color: ", ";\n      }\n    "])), _variables.ErrorColor);
});
exports.CaptureQuestionStyled = CaptureQuestionStyled;
var CaptureError = _styledComponents.default.div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 13px;\n  margin-top: 8px;\n  content: '';\n  color: ", ";\n  -webkit-transition: 0.2s ease-in-out;\n  transition: 0.2s ease-in-out;\n  font-size: 13px;\n  text-align: left;\n"])), _variables.ErrorColor);
exports.CaptureError = CaptureError;