"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WrapStyled = exports.TextStyled = exports.PhotoStyled = exports.NameStyled = exports.MailStyled = exports.DetailsStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _BreakPoints = require("../../styles/BreakPoints");
var _variables = require("../../styles/variables");
var _avatarBase = _interopRequireDefault(require("./img/avatarBase64"));
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var WrapStyled = _styledComponents.default.header.attrs(function () {
  return {
    className: 'msd__account-header'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n\n  padding-bottom: 10px;\n\n  ", "\n"])), _BreakPoints.mediaFrom.small(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    flex-direction: column;\n    align-items: center;\n    border-bottom: 1px solid ", ";\n    padding-bottom: 26px;\n  "])), _variables.LineColor));
exports.WrapStyled = WrapStyled;
var PhotoStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-header__avatar'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  width: 64px;\n  height: 64px;\n  min-width: 64px;\n\n  border-radius: 50%;\n  background-image: url(", ");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n\n  ", "\n"])), _avatarBase.default, _BreakPoints.mediaFrom.small(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n    width: 84px;\n    height: 84px;\n    margin-bottom: 20px;\n  "]))));
exports.PhotoStyled = PhotoStyled;
var NameStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-header__name'
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 100%;\n\n  margin-bottom: 6px;\n\n  font-size: 20px;\n  line-height: 24px;\n  font-weight: 700;\n  color: ", ";\n  text-overflow: ellipsis;\n  overflow: hidden;\n\n  ", ";\n"])), _variables.FontColor, _BreakPoints.mediaFrom.small(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n    font-size: 26px;\n    line-height: 29px;\n    margin-bottom: 10px;\n    text-align: center;\n  "]))));
exports.NameStyled = NameStyled;
var MailStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-header__mail'
  };
})(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 100%;\n\n  margin-bottom: 6px;\n\n  color: ", ";\n\n  font-size: ", ";\n  font-weight: 500;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  line-height: 1.2;\n\n  ", "\n\n  ", "\n"])), _variables.FontColor, _variables.SmallFont, function (props) {
  return props.bigger && (0, _styledComponents.css)(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n      font-size: 14px;\n      font-weight: 700;\n    "])));
}, _BreakPoints.mediaFrom.small(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n    margin-bottom: 14px;\n  "]))));
exports.MailStyled = MailStyled;
var TextStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-header__label'
  };
})(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  padding: 5px 16px;\n  background-color: #f0f0ff;\n  border-radius: 14px;\n  border: 1px solid #d7d7f5;\n  color: #7172c9;\n  font-size: 9px;\n  line-height: 12px;\n  text-align: center;\n  font-weight: ", ";\n  min-height: 19px;\n  max-width: max-content;\n"])), _variables.MediumFontWeight);
exports.TextStyled = TextStyled;
var DetailsStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__account-header__wrapper'
  };
})(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n  justify-content: center;\n\n  max-width: calc(100% - 78px);\n  margin-left: 14px;\n\n  color: ", ";\n\n  ", "\n\n  ", "\n"])), _variables.FontColor, function (props) {
  return props.isEmpty && (0, _styledComponents.css)(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n      ", " {\n        background-color: ", ";\n        width: 100%;\n        border-radius: 10px;\n\n        min-height: 24px;\n      }\n      ", " {\n        background-color: ", ";\n        width: 100%;\n        border-radius: 5px;\n      }\n      ", " {\n        width: 100%;\n      }\n    "])), NameStyled, _variables.MyAccountTextLightGray, MailStyled, _variables.MyAccountTextLightGray, TextStyled);
}, _BreakPoints.mediaFrom.small(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n    width: 100%;\n    max-width: unset;\n    align-items: center;\n  \n    margin-left: 0;\n  "]))));
exports.DetailsStyled = DetailsStyled;