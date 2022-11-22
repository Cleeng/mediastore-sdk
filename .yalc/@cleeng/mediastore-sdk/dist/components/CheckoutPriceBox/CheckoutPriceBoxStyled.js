"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledTotalOfferPrice = exports.StyledTotalLabel = exports.StyledPriceWrapper = exports.StyledPriceBoxWrapper = exports.StyledPriceBox = exports.StyledOfferPrice = exports.StyledLabel = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireDefault(require("styled-components"));
var variables = _interopRequireWildcard(require("../../styles/variables"));
var _BreakPoints = require("../../styles/BreakPoints");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var StyledLabel = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__price-summary__label'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 16px;\n  color: ", ";\n"])), variables.FontColor);
exports.StyledLabel = StyledLabel;
var StyledOfferPrice = _styledComponents.default.h3.attrs(function () {
  return {
    className: 'msd__price-summary__ammount'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  float: right;\n  font-size: 16px;\n  color: ", ";\n\n  & span {\n    font-size: 12px;\n  }\n\n  ", "\n"])), variables.FontColor, _BreakPoints.media.small(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n    width: auto;\n  "]))));
exports.StyledOfferPrice = StyledOfferPrice;
var StyledTotalLabel = (0, _styledComponents.default)(StyledLabel).attrs(function () {
  return {
    className: 'msd__price-summary__total--label'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  font-weight: ", ";\n  text-transform: uppercase;\n"])), variables.BoldFont);
exports.StyledTotalLabel = StyledTotalLabel;
var StyledTotalOfferPrice = (0, _styledComponents.default)(StyledOfferPrice).attrs(function () {
  return {
    className: 'msd__price-summary__total--ammount'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 25px;\n  font-weight: ", ";\n"])), variables.MediumFontWeight);
exports.StyledTotalOfferPrice = StyledTotalOfferPrice;
var StyledPriceBox = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__price-summary'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  padding: 16px 0;\n"])));
exports.StyledPriceBox = StyledPriceBox;
var StyledPriceBoxWrapper = _styledComponents.default.div(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  width: 400px;\n\n  ", "\n"])), _BreakPoints.media.small(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n    width: 100%;\n  "]))));
exports.StyledPriceBoxWrapper = StyledPriceBoxWrapper;
var StyledPriceWrapper = _styledComponents.default.div(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n"])));
exports.StyledPriceWrapper = StyledPriceWrapper;