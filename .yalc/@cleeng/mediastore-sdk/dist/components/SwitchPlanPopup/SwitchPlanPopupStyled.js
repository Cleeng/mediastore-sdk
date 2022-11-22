"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubscriptionIconStyled = exports.ImageWrapper = exports.ImageStyled = exports.ArrowStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _SubscriptionIcon = _interopRequireDefault(require("../SubscriptionIcon"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var SubscriptionIconStyled = (0, _styledComponents.default)(_SubscriptionIcon.default)(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  flex: 0 0 70px;\n  max-width: 70px;\n  height: 70px;\n\n  margin: 0 20px;\n  padding: 0;\n\n  line-height: 70px;\n  font-size: 30px;\n  ", "\n"])), function (props) {
  return props.gray && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n      filter: grayscale(80%);\n    "])));
});
exports.SubscriptionIconStyled = SubscriptionIconStyled;
var ImageWrapper = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n\n  padding-top: 10px;\n  margin: 20px auto 40px auto;\n"])));
exports.ImageWrapper = ImageWrapper;
var ArrowStyled = _styledComponents.default.span(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n  width: 13px;\n  height: 13px;\n\n  border-top: 2px solid ", ";\n  border-right: 2px solid ", ";\n\n  transform: translateX(-25%) rotate(45deg);\n"])), _variables.LineColor, _variables.LineColor);
exports.ArrowStyled = ArrowStyled;
var ImageStyled = _styledComponents.default.img(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)([""])));
exports.ImageStyled = ImageStyled;