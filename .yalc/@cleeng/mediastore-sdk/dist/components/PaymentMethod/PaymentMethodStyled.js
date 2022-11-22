"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.Message = exports.CardsWrapper = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var WrapStyled = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  margin-bottom: 30px;\n"])));
exports.WrapStyled = WrapStyled;
var CardsWrapper = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment-method__wrapper'
  };
})(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  grid-gap: 10px;\n  @media only screen and (max-width: 900px) {\n    grid-template-columns: 1fr;\n    > div {\n      justify-self: center;\n    }\n  }\n  ", "\n"])), function (props) {
  return props.numberOfItems === 1 && (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n      grid-template-columns: 1fr;\n      > div {\n        justify-self: center;\n      }\n    "])));
});
exports.CardsWrapper = CardsWrapper;
var Message = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__payment-method__message'
  };
})(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 24px;\n  font-size: 12px;\n  font-weight: 500;\n  text-align: center;\n  color: ", ";\n  align-self: center;\n"])), _variables.MyAccountTextGray);
exports.Message = Message;