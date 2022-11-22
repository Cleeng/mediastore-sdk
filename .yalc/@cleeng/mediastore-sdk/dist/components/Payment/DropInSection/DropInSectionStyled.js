"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapperStyled = exports.TitleStyled = exports.TextStyled = exports.PaymentStyled = exports.IconWrapperStyled = exports.ChevronIconWrapperStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var colors = _interopRequireWildcard(require("../../../styles/variables"));
var _BreakPoints = require("../../../styles/BreakPoints");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PaymentStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  padding: 20px 35px 70px 35px;\n  width: 100%;\n  background-color: ", ";\n  border-top: 1px solid ", ";\n  border-bottom: 1px solid ", ";\n"])), colors.BackgroundColor, colors.LineColor, colors.LineColor);
exports.PaymentStyled = PaymentStyled;
var WrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  min-height: 58px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  border-radius: ", ";\n  cursor: pointer;\n  background-color: ", ";\n  border: 1px solid\n    ", ";\n"])), function (_ref) {
  var isCardAvailable = _ref.isCardAvailable;
  return isCardAvailable ? '0 0 12px 12px' : '12px;';
}, colors.White, function (_ref2) {
  var isSelected = _ref2.isSelected;
  return isSelected ? colors.ConfirmColor : '#D3DBE6';
});
exports.WrapperStyled = WrapperStyled;
var TextStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment-text'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 550px;\n  margin: 0;\n  padding: 16px 16px 16px 25px;\n  text-align: center;\n  line-height: 1.4em;\n  color: #00112c;\n  cursor: pointer;\n  font-size: 1em;\n  font-weight: 400;\n  display: flex;\n  align-items: center;\n  ", "\n"])), _BreakPoints.media.small(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n    width: 90%;\n    max-width: 400px;\n  "]))));
exports.TextStyled = TextStyled;
var TitleStyled = _styledComponents.default.span(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  margin-left: 15px;\n"])));
exports.TitleStyled = TitleStyled;
var IconWrapperStyled = _styledComponents.default.div(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  border: 1px solid #a9a9bf;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 40px;\n  height: 26px;\n  border-radius: 4px;\n"])));
exports.IconWrapperStyled = IconWrapperStyled;
var ChevronIconWrapperStyled = _styledComponents.default.div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  margin-left: auto;\n  svg {\n    rotate: ", ";\n  }\n"])), function (_ref3) {
  var isSelected = _ref3.isSelected;
  return isSelected ? '180deg' : 0;
});
exports.ChevronIconWrapperStyled = ChevronIconWrapperStyled;