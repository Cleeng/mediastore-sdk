"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorFieldStyled = exports.ConsentDefinitionStyled = exports.CheckboxStyled = exports.CheckMarkStyled = exports.CheckFrameStyled = void 0;
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _variables = require("../../styles/variables");
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var CheckboxStyled = _styledComponents.default.div.attrs(function (props) {
  return {
    className: "msd__consents ".concat(props.disabled ? 'msd__consents--disabled' : '')
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  margin-top: 10px;\n\n  align-items: center;\n  font-size: 13px;\n  color: ", ";\n\n  &:focus {\n    outline: none;\n  }\n  &:first-of-type {\n    margin-top: 0px;\n  }\n  ", "\n"])), _variables.FontColor, function (props) {
  return props.disabled && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n      opacity: 0.7;\n    "])));
});
exports.CheckboxStyled = CheckboxStyled;
var ConsentDefinitionStyled = _styledComponents.default.div.attrs(function (props) {
  return {
    className: "msd__consents__text ".concat(props.checked ? 'msd__consents__text--checked' : '')
  };
})(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  padding-left: 10px;\n  margin-top: 0;\n\n  font-weight: 400;\n  text-align: left;\n  a {\n    color: ", ";\n\n    text-decoration: underline;\n    &:focus {\n      outline: 2px solid ", ";\n    }\n  }\n  opacity: 0.8;\n  ", "\n"])), _variables.FontColor, _variables.FocusColor, function (props) {
  return props.checked && (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n      opacity: 1;\n    "])));
});
exports.ConsentDefinitionStyled = ConsentDefinitionStyled;
var CheckFrameStyled = _styledComponents.default.div.attrs(function (props) {
  return {
    className: "msd__consents__frame ".concat(props.error ? 'msd__consents__frame--error' : '', " ").concat(props.checked ? 'msd__consents__frame--checked' : '', "\n  ").concat(props.isRadioButton ? 'msd__consents__frame--radio' : '', " ").concat(props.isMyAccount ? 'msd__consents__frame--account' : '')
  };
})(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  box-sizing: border-box;\n\n  border: 1px solid ", ";\n  border-radius: 2px;\n  width: 20px;\n  min-width: 20px;\n  height: 20px;\n\n  &:focus {\n    outline: 2px solid ", ";\n  }\n  ", "\n  ", "\n  ", "\n\n  ", "\n"])), _variables.LineColor, _variables.FocusColor, function (props) {
  return props.error && (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n      border-color: ", ";\n    "])), _variables.ErrorColor);
}, function (props) {
  return props.isRadioButton && (0, _styledComponents.css)(_templateObject7 || (_templateObject7 = (0, _taggedTemplateLiteral2.default)(["\n      border-radius: 50%;\n    "])));
}, function (props) {
  return props.isRadioButton && props.checked && (0, _styledComponents.css)(_templateObject8 || (_templateObject8 = (0, _taggedTemplateLiteral2.default)(["\n      border: 1px solid ", ";\n    "])), _variables.ConfirmColor);
}, function (props) {
  return props.isMyAccount && props.checked && (0, _styledComponents.css)(_templateObject9 || (_templateObject9 = (0, _taggedTemplateLiteral2.default)(["\n      border-color: ", ";\n    "])), _variables.ConfirmColor);
});
exports.CheckFrameStyled = CheckFrameStyled;
var CheckMarkStyled = _styledComponents.default.div.attrs(function (props) {
  return {
    className: "msd__consents__check-mark ".concat(props.isRadioButton ? 'msd__consents__check-mark--radio' : '', " ").concat(props.isMyAccount ? 'msd__consents__check-mark--account' : '')
  };
})(_templateObject10 || (_templateObject10 = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n\n  width: 13px;\n  height: 10px;\n  top: 4px;\n  left: 3px;\n  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMi44MjgiIGhlaWdodD0iOS44MjgiIHZpZXdCb3g9IjAgMCAxMi44MjggOS44MjgiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOm5vbmU7c3Ryb2tlOiM3YzhjYTU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLXdpZHRoOjJweDt9PC9zdHlsZT48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4My4wODYgLTM5OS4wODYpIj48bGluZSBjbGFzcz0iYSIgeDI9IjMiIHkyPSIzIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODQuNSA0MDQuNSkiLz48bGluZSBjbGFzcz0iYSIgeDE9IjciIHkyPSI3IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxODcuNSA0MDAuNSkiLz48L2c+PC9zdmc+');\n  background-repeat: no-repeat;\n  ", "\n  ", "\n"])), function (props) {
  return props.isRadioButton && (0, _styledComponents.css)(_templateObject11 || (_templateObject11 = (0, _taggedTemplateLiteral2.default)(["\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n\n      width: 12px;\n      height: 12px;\n\n      background: ", ";\n      border-radius: 50%;\n    "])), _variables.ConfirmColor);
}, function (props) {
  return props.isMyAccount && (0, _styledComponents.css)(_templateObject12 || (_templateObject12 = (0, _taggedTemplateLiteral2.default)(["\n      width: 20px;\n      height: 20px;\n      top: -1px;\n      left: -1px;\n      background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIyMyIgdmlld0JveD0iMCAwIDIzIDIzIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjNEVCN0ExOwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgICAgc3Ryb2tlOiAjZmZmOwogICAgICAgIHN0cm9rZS1saW5lY2FwOiByb3VuZDsKICAgICAgICBzdHJva2UtbGluZWpvaW46IHJvdW5kOwogICAgICAgIHN0cm9rZS13aWR0aDogMi4zcHg7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJHcm91cF8yNDQ0IiBkYXRhLW5hbWU9Ikdyb3VwIDI0NDQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yNjMwIC0zMjUpIj4KICAgIDxnIGlkPSJHcm91cF8yNDM5IiBkYXRhLW5hbWU9Ikdyb3VwIDI0MzkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMjYwIC01MzYpIj4KICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZV8yOTA3IiBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyOTA3IiBjbGFzcz0iY2xzLTEiIHdpZHRoPSIyMyIgaGVpZ2h0PSIyMyIgcng9IjQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQ4OTAgODYxKSIvPgogICAgICA8cGF0aCBpZD0iUGF0aF8xOTQyIiBkYXRhLW5hbWU9IlBhdGggMTk0MiIgY2xhc3M9ImNscy0yIiBkPSJNOTYzNS40MzItNzE0NS40MjdsMy43NjQsMy43OTEsNC4yMTUtNC4yNDQsMy45ODktNC4wMTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00NzM5LjkzMSA4MDE4LjM5NykiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo=');\n      background-position: center;\n      background-size: cover;\n    "])));
});
exports.CheckMarkStyled = CheckMarkStyled;
var ErrorFieldStyled = _styledComponents.default.div(_templateObject13 || (_templateObject13 = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  width: 100%;\n  margin-top: 10px;\n\n  color: ", ";\n\n  font-size: 12px;\n  font-weight: 300;\n  text-align: center;\n"])), _variables.ErrorColor);
exports.ErrorFieldStyled = ErrorFieldStyled;