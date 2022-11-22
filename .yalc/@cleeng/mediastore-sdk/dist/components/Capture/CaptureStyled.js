"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CaptureTitle = exports.CaptureStyled = exports.CaptureContentStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var colors = _interopRequireWildcard(require("../../styles/variables"));
var _BreakPoints = require("../../styles/BreakPoints");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CaptureStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__capture'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  * {\n    box-sizing: border-box;\n  }\n  box-sizing: border-box;\n  position: relative;\n"])));
exports.CaptureStyled = CaptureStyled;
var CaptureContentStyled = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  width: 100%;\n  margin: 0 auto;\n  padding: 80px 120px 120px;\n\n  background-color: ", ";\n\n  text-align: center;\n\n  ", "\n"])), colors.BackgroundColor, _BreakPoints.media.small(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n    width: 80%;\n  "]))));
exports.CaptureContentStyled = CaptureContentStyled;
var CaptureTitle = _styledComponents.default.div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 16px;\n  font-size: 16px;\n  line-height: 22px;\n  text-align: center;\n  text-transform: uppercase;\n  font-weight: 700;\n\n  color: ", ";\n"])), colors.FontColor);
exports.CaptureTitle = CaptureTitle;