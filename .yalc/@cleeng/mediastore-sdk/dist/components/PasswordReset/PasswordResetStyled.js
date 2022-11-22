"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledTitle = exports.StyledMessage = exports.PasswordResetWrapperStyled = exports.PasswordResetPageStyled = exports.FormStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var colors = _interopRequireWildcard(require("../../styles/variables"));
var _BreakPoints = require("../../styles/BreakPoints");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PasswordResetWrapperStyled = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  background: ", ";\n  box-sizing: border-box;\n  * {\n    box-sizing: border-box;\n  }\n"])), colors.BackgroundColor);
exports.PasswordResetWrapperStyled = PasswordResetWrapperStyled;
var PasswordResetPageStyled = _styledComponents.default.main.attrs(function () {
  return {
    className: 'msd__reset-password'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  margin: 0 auto;\n  padding: 40px 10%;\n\n  color: ", ";\n\n  text-align: center;\n  line-height: 1.3em;\n  font-size: 15px;\n\n  font-weight: bold;\n  & button {\n    margin-top: 30px;\n  }\n\n  ", "\n"])), colors.FontColor, _BreakPoints.media.smallest(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n    width:90%;\n    & button {\n      margin-top: 50px;\n    }\n  "]))));
exports.PasswordResetPageStyled = PasswordResetPageStyled;
var StyledTitle = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__reset-password__title'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 40px 0 25px 0;\n\n  font-size: 25px;\n  font-weight: 600;\n"])));
exports.StyledTitle = StyledTitle;
var StyledMessage = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__reset-password__message'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: 300;\n  & strong {\n    font-weight: bold;\n  }\n"])));
exports.StyledMessage = StyledMessage;
var FormStyled = _styledComponents.default.form.attrs(function () {
  return {
    className: 'msd__reset-password__form'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  width: 80%;\n\n  margin: 30px auto 50px auto;\n\n  ", "\n"])), _BreakPoints.media.smallest(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n    width:100%;\n  "]))));
exports.FormStyled = FormStyled;