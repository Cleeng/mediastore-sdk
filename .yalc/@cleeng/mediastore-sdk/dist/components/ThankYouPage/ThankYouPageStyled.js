"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TitleStyled = exports.ThankYouPageWrapperStyled = exports.ThankYouPageStyled = exports.MessageStyled = exports.LinkStyled = exports.IconStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var colors = _interopRequireWildcard(require("../../styles/variables"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ThankYouPageWrapperStyled = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  box-sizing: border-box;\n  * {\n    box-sizing: border-box;\n  }\n"])));
exports.ThankYouPageWrapperStyled = ThankYouPageWrapperStyled;
var ThankYouPageStyled = _styledComponents.default.main(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  margin: 0 auto;\n  padding: 50px 120px 80px;\n  text-align: center;\n  line-height: 1.3em;\n  font-size: 15px;\n  background-color: ", ";\n  color: ", ";\n  font-weight: bold;\n"])), colors.BackgroundColor, colors.FontColor);
exports.ThankYouPageStyled = ThankYouPageStyled;
var TitleStyled = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 25px;\n  margin: 30px 0;\n  font-weight: 600;\n"])));
exports.TitleStyled = TitleStyled;
var MessageStyled = _styledComponents.default.div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 300;\n  & strong {\n    font-weight: bold;\n  }\n"])));
exports.MessageStyled = MessageStyled;
var LinkStyled = _styledComponents.default.a(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  padding-left: 4px;\n  font-weight: bold;\n  &:hover {\n    text-decoration: underline;\n  }\n"])), colors.FontColor);
exports.LinkStyled = LinkStyled;
var IconStyled = _styledComponents.default.img(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)([""])));
exports.IconStyled = IconStyled;