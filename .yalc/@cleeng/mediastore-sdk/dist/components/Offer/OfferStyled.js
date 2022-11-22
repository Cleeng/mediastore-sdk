"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledOfferWrapper = exports.StyledOfferDetailsAndCoupon = exports.StyledOfferCouponWrapper = exports.StyledOfferBody = exports.OfferCardWrapperStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var variables = _interopRequireWildcard(require("../../styles/variables"));
var _BreakPoints = require("../../styles/BreakPoints");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var StyledOfferWrapper = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  * {\n    box-sizing: border-box;\n  }\n  box-sizing: border-box;\n  position: relative;\n  width: 100%;\n  background: ", ";\n"])), variables.BackgroundColor);
exports.StyledOfferWrapper = StyledOfferWrapper;
var StyledOfferCouponWrapper = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 16px 0;\n"])));
exports.StyledOfferCouponWrapper = StyledOfferCouponWrapper;
var StyledOfferDetailsAndCoupon = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: flex-end;\n  margin-bottom: 12px;\n"])));
exports.StyledOfferDetailsAndCoupon = StyledOfferDetailsAndCoupon;
var StyledOfferBody = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__checkout-wrapper'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  padding: 25px 35px;\n  ", "\n"])), _BreakPoints.media.small(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n    padding: 0 10px;\n  "]))));
exports.StyledOfferBody = StyledOfferBody;
var OfferCardWrapperStyled = _styledComponents.default.section.attrs(function () {
  return {
    className: 'msd__offer-card'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 12px;\n\n  padding: 20px;\n"])), variables.BackgroundColor, variables.LineColor);
exports.OfferCardWrapperStyled = OfferCardWrapperStyled;