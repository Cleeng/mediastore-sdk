"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentWrapperStyled = exports.PaymentStyled = exports.PaymentErrorStyled = exports.LegalTextStyled = exports.LegalNoteWrapperStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var colors = _interopRequireWildcard(require("../../styles/variables"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var PaymentStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  padding: 20px 35px 70px 35px;\n  width: 100%;\n  background-color: ", ";\n  border-top: 1px solid ", ";\n  border-bottom: 1px solid ", ";\n"])), colors.BackgroundColor, colors.LineColor, colors.LineColor);
exports.PaymentStyled = PaymentStyled;
var PaymentWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment__wrapper'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 375px;\n  margin: 12px auto 0 auto;\n"])));
exports.PaymentWrapperStyled = PaymentWrapperStyled;
var PaymentErrorStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment--error'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  text-align: center;\n  font-size: 15px;\n  color: ", ";\n"])), colors.ErrorColor);
exports.PaymentErrorStyled = PaymentErrorStyled;
var LegalNoteWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment__legal'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 25px auto 0 auto;\n  text-align: center;\n  max-width: 550px;\n"])));
exports.LegalNoteWrapperStyled = LegalNoteWrapperStyled;
var LegalTextStyled = _styledComponents.default.p(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 11px;\n  line-height: 17px;\n  font-weight: 400;\n  color: ", ";\n"])), colors.MyAccountTextGray);
exports.LegalTextStyled = LegalTextStyled;