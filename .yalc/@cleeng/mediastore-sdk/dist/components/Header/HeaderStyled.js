"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogoStyled = exports.HeaderStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var colors = _interopRequireWildcard(require("../../styles/variables"));
var _logoBase = _interopRequireDefault(require("./img/logoBase64"));
var _templateObject, _templateObject2, _templateObject3;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var HeaderStyled = _styledComponents.default.header.attrs(function () {
  return {
    className: 'msd__header'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  position: relative;\n\n  padding: 0;\n\n  background-color: ", ";\n  border-bottom: 1px ", " solid;\n\n  text-align: center;\n\n  ", "\n"])), colors.BackgroundColor, colors.LineColor, function (props) {
  return props.switchOff && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n      display: none;\n    "])));
});
exports.HeaderStyled = HeaderStyled;
var LogoStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__header__logo'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  height: 80px;\n  width: 100%;\n\n  background-image: url(", ");\n  background-size: auto 35%;\n  background-position: center;\n  background-repeat: no-repeat;\n"])), _logoBase.default);
exports.LogoStyled = LogoStyled;