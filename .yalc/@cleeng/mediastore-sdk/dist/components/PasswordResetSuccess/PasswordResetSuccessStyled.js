"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledTitle = exports.StyledMessage = exports.StyledLink = exports.PasswordResetSuccessPageStyled = exports.NoteStyled = exports.Loader = exports.Checkmark = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var colors = _interopRequireWildcard(require("../../styles/variables"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PasswordResetSuccessPageStyled = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  width: 80%;\n  margin: 0 auto;\n  padding: 40px 0 60px 0;\n  text-align: center;\n  line-height: 1.3em;\n  font-size: 15px;\n  color: ", ";\n\n  font-weight: bold;\n"])), colors.FontColor);
exports.PasswordResetSuccessPageStyled = PasswordResetSuccessPageStyled;
var StyledTitle = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 25px;\n  margin-top: 35px;\n  margin-bottom: 25px;\n  font-weight: 600;\n"])));
exports.StyledTitle = StyledTitle;
var StyledMessage = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 300;\n  & strong {\n    font-weight: bold;\n  }\n"])));
exports.StyledMessage = StyledMessage;
var StyledLink = _styledComponents.default.span(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  font-weight: bold;\n  &:hover {\n    text-decoration: underline;\n  }\n"])), colors.FontColor);
exports.StyledLink = StyledLink;
var NoteStyled = _styledComponents.default.div(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 5px auto 20px;\n  font-size: 13px;\n"])));
exports.NoteStyled = NoteStyled;
var Loader = _styledComponents.default.div(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-color: #5cb85c;\n  position: relative;\n  display: inline-block;\n  vertical-align: top;\n  border-radius: 50%;\n  width: 7em;\n  height: 7em;\n  transition: border 500ms ease-out;\n"])));
exports.Loader = Loader;
var animateCheckmark = (0, _styledComponents.keyframes)(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n    0% {\n      height: 0;\n      width: 0;\n      opacity: 1;\n    }\n\n    20% {\n      height: 0;\n      width: 1.75em;\n      opacity: 1;\n    }\n\n    40% {\n      height: 3.5em;\n      width: 1.75em;\n      opacity: 1;\n    }\n\n    100% {\n      height: 3.5em;\n      width: 1.75em;\n      opacity: 1;\n    }\n  "])));
var Checkmark = _styledComponents.default.div(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n  animation-duration: 800ms;\n  animation-timing-function: ease;\n  animation-name: ", ";\n  transform: scaleX(-1) rotate(135deg);\n  opacity: 1;\n  height: 3.5em;\n  width: 1.75em;\n  transform-origin: left top;\n  border-right: 3px solid #5cb85c;\n  border-top: 3px solid #5cb85c;\n  content: '';\n  left: 1.75em;\n  top: 3.5em;\n  position: absolute;\n"])), animateCheckmark);
exports.Checkmark = Checkmark;