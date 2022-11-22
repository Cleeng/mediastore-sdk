"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageStyled = exports.IconStyled = exports.ErrorPageWrapper = exports.ErrorPageStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var colors = _interopRequireWildcard(require("../../styles/variables"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var ErrorPageWrapper = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__error-page'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  * {\n    box-sizing: border-box;\n  }\n  box-sizing: border-box;\n"])));
exports.ErrorPageWrapper = ErrorPageWrapper;
var ErrorPageStyled = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n\n  width: 100%;\n  min-height: 350px;\n  margin: 0 auto;\n  padding: 80px 120px 70px;\n\n  background-color: ", ";\n  color: ", ";\n\n  font-size: 15px;\n"])), colors.BackgroundColor, colors.FontColor);
exports.ErrorPageStyled = ErrorPageStyled;
var MessageStyled = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 30px;\n\n  font-size: 25px;\n  font-weight: 300;\n  line-height: 1.3em;\n  text-align: center;\n"])));
exports.MessageStyled = MessageStyled;
var IconStyled = _styledComponents.default.div(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100px;\n  height: auto;\n"])));
exports.IconStyled = IconStyled;