"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecurityStyled = exports.ProductByStyled = exports.FooterStyled = exports.CleengLogoWrapperStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var colors = _interopRequireWildcard(require("../../styles/variables"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var FooterStyled = _styledComponents.default.footer.attrs(function (props) {
  return {
    className: "msd__footer ".concat(props.isTransparent ? 'msd__footer--transparent' : '')
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n\n  width: 100%;\n  padding: 10px 34px;\n\n  border-top: 1px solid ", ";\n  background-color: ", ";\n\n  ", "\n\n  ", "\n"])), colors.LineColor, function (props) {
  return props.isTransparent ? 'transparent' : colors.BackgroundColor;
}, function (props) {
  return props.isTransparent && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n      border: none;\n    "])));
}, function (props) {
  return props.isInPopup && (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n      position: fixed;\n      left: 0;\n    "])));
});
exports.FooterStyled = FooterStyled;
var ProductByStyled = _styledComponents.default.span.attrs(function () {
  return {
    className: 'msd__footer__label--left'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  align-items: center;\n\n  color: ", ";\n\n  font-size: 12px;\n  font-weight: 300;\n  & a {\n    padding: 0 5px;\n  }\n"])), colors.FontColor);
exports.ProductByStyled = ProductByStyled;
var SecurityStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__footer__label--right'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n\n  font-size: 14px;\n  min-width: 135px;\n\n  & svg {\n    padding-right: 5px;\n    margin-bottom: -1px;\n    max-height: 13px;\n  }\n"])), colors.ConfirmColor);
exports.SecurityStyled = SecurityStyled;
var CleengLogoWrapperStyled = _styledComponents.default.a(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  svg {\n    max-height: 12px;\n    margin-bottom: -1px;\n    width: 100%;\n  }\n"])));
exports.CleengLogoWrapperStyled = CleengLogoWrapperStyled;