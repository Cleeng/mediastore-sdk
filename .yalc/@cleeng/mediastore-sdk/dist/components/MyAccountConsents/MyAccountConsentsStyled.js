"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessMessageStyled = exports.InfoStyled = exports.CheckboxStyled = exports.CardStyled = exports.ButtonWrapperStyled = exports.ButtonStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _Button = _interopRequireDefault(require("../Button"));
var _Checkbox = _interopRequireDefault(require("../Checkbox"));
var _Card = _interopRequireDefault(require("../Card"));
var _BreakPoints = require("../../styles/BreakPoints");
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CardStyled = (0, _styledComponents.default)(_Card.default).attrs(function () {
  return {
    className: 'msd__profile-consents__card'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  margin-bottom: 0;\n\n  ", "\n"])), function (props) {
  return props.showConsentsOnly && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n      padding: 0 0 20px 0;\n      border: none;\n      background: transparent;\n      &:first-child {\n        margin-top: 0;\n      }\n    "])));
});
exports.CardStyled = CardStyled;
var ButtonStyled = (0, _styledComponents.default)(_Button.default).attrs(function () {
  return {
    className: 'msd__profile-consents__button'
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  margin: 20px 0 10px 0;\n  width: 48%;\n  min-width: 100px;\n\n  ", "\n\n  ", "\n"])), function (props) {
  return props.width && (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n      width: ", ";\n    "])), props.width);
}, _BreakPoints.mediaFrom.small && (0, _styledComponents.css)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n      margin: 20px 0 0 5px;\n      width: unset;\n      max-width: unset;\n    "]))));
exports.ButtonStyled = ButtonStyled;
var CheckboxStyled = (0, _styledComponents.default)(_Checkbox.default).attrs(function () {
  return {
    className: 'msd__profile-consents__checkbox'
  };
})(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n  align-items: flex-start;\n  line-height: 1.3rem;\n\n  ", "\n\n  ", "\n"])), function (props) {
  return props.disabled && (0, _styledComponents.css)(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n      cursor: default;\n    "])));
}, function (props) {
  return props.hide && (0, _styledComponents.css)(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n      display: none;\n    "])));
});
exports.CheckboxStyled = CheckboxStyled;
var ButtonWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__profile-buttons__wrapper'
  };
})(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n"])));
exports.ButtonWrapperStyled = ButtonWrapperStyled;
var InfoStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__profile__info'
  };
})(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  font-size: 13px;\n  opacity: 0.6;\n  margin-top: 15px;\n"])));
exports.InfoStyled = InfoStyled;
var SuccessMessageStyled = _styledComponents.default.h6.attrs(function () {
  return {
    className: 'msd__message--success'
  };
})(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  text-align: center;\n  margin: 5px 0 15px 0;\n  font-size: 12px;\n  position: relative;\n"])), _variables.ConfirmColor);
exports.SuccessMessageStyled = SuccessMessageStyled;