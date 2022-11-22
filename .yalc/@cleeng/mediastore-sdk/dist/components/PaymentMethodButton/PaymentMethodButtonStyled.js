"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledMethodName = exports.StyledButton = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _Button = _interopRequireDefault(require("../Button"));
var variables = _interopRequireWildcard(require("../../styles/variables"));
var _templateObject, _templateObject2;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var StyledButton = (0, _styledComponents.default)(_Button.default)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 160px;\n  height: 90px;\n  border: 1px solid ", ";\n  border-radius: 7px;\n\n  svg {\n    path {\n      fill: ", ";\n    }\n  }\n\n  &:hover,\n  &:focus {\n    color: ", ";\n    svg {\n      path {\n        fill: ", ";\n      }\n    }\n  }\n"])), variables.LineColor, variables.FontColor, variables.White, variables.White);
exports.StyledButton = StyledButton;
var StyledMethodName = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  text-transform: uppercase;\n"])));
exports.StyledMethodName = StyledMethodName;