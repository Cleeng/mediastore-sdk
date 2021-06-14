"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputRequiredStyled = exports.InputIconStyled = exports.StyledButton = exports.StyledPasswordVisibility = exports.ErrorWrapper = exports.InputElementStyled = exports.InputElementWrapperStyled = exports.LabelStyled = exports.InputComponentStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var Colors = _interopRequireWildcard(require("styles/variables"));

var _BreakPoints = require("styles/BreakPoints");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject19() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: block;\n  position: absolute;\n  right: 16px;\n  height: 9px;\n  font-size: 12px;\n  line-height: 12px;\n  top: 50%;\n  color: ", ";\n  transform: translate(0, -50%);\n  z-index: 1;\n"]);

  _templateObject19 = function _templateObject19() {
    return data;
  };

  return data;
}

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  height: 18px;\n  width: 18px;\n  margin-left: 14px;\n\n  svg {\n    height: 100%;\n    width: auto;\n    fill: ", ";\n  }\n"]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: transparent;\n  border: none;\n  border-radius: 50%;\n  display: flex;\n  padding: 0;\n  position: relative;\n  margin-right: 15px;\n  &::after {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    transform: scale(1.5);\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.08);\n    z-index: 0;\n    content: '';\n    border-radius: 50%;\n    opacity: 0;\n    transition: opacity 0.3s ease;\n  }\n  &:hover::after,\n  &:focus::after {\n    opacity: 1;\n  }\n"]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  height: 20px;\n  width: 20px;\n  filter: ", ";\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      position: relative;\n      margin: 5px 0 10px 0;\n      top: unset;\n    "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      color: ", ";\n    "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  height: 13px;\n  margin-top: 8px;\n\n  content: '';\n  color: ", ";\n  transition: 0.2s ease-in-out;\n\n  ", "\n\n  font-size: 13px;\n  text-align: left;\n\n  ", "\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      text-transform: uppercase;\n      &::-webkit-inner-spin-button,\n      &::-webkit-calendar-picker-indicator {\n        display: none;\n        -webkit-appearance: none;\n      }\n      & + label {\n        transform: translate(-26px, -25px) scaleY(0.9);\n        &::after {\n          opacity: 1;\n        }\n      }\n    "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    width: 100%;\n  "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      & + label {\n        transform: translate(0, -25px) scaleY(0.9);\n        &::after {\n          opacity: 1;\n        }\n      }\n    "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        transform: translate(-26px, -25px) scaleY(0.9);\n      "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  flex-grow: 1;\n  position: relative;\n  width: auto;\n\n  margin: 0 15px;\n\n  color: ", ";\n  border: none;\n  outline: none;\n\n  font-size: 15px;\n  line-height: 1.3;\n\n  &:focus + label {\n    transform: translate(0, -25px) scaleY(0.9);\n    color: ", ";\n    ", "\n    &::after {\n      opacity: 1;\n    }\n  }\n\n  ", "\n\n  ", "\n\n  ", "\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      &::before {\n        content: url(", ");\n      }\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n\n  padding: 13px 0 14px;\n\n  background: white;\n  border: 1px solid ", ";\n  transition: 0.2s ease-in-out;\n\n  &:focus-within {\n    border-color: ", ";\n    ", " {\n      color: ", ";\n      transform: translate(0, -25px) scaleY(0.9);\n      &::after {\n        opacity: 1;\n      }\n    }\n  }\n\n  ", ";\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      transform: translate(-26px, -25px) scaleY(0.9);\n    "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      transform: translate(0, -25px) scaleY(0.9);\n      &::after {\n        opacity: 1;\n      }\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      left: 40px;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  top: 17px;\n  left: 14px;\n\n  margin: 0;\n  padding: 0 3px;\n\n  color: ", ";\n  transition: 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;\n\n  ", "\n\n  &::after {\n    position: absolute;\n    content: '';\n    top: 0;\n    left: 0;\n\n    width: 100%;\n    height: 15px;\n\n    background: #fff;\n\n    z-index: -1;\n    opacity: 0;\n  }\n\n  ", "\n\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  position: relative;\n\n  padding: 10px;\n  width: 100%;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var InputComponentStyled = _styledComponents.default.div(_templateObject());

exports.InputComponentStyled = InputComponentStyled;

var LabelStyled = _styledComponents.default.label(_templateObject2(), Colors.MainColor, function (props) {
  return props.withIcon && (0, _styledComponents.css)(_templateObject3());
}, function (props) {
  return props.hasValue && (0, _styledComponents.css)(_templateObject4());
}, function (props) {
  return props.hasValue && props.withIcon && (0, _styledComponents.css)(_templateObject5());
});

exports.LabelStyled = LabelStyled;

var InputElementWrapperStyled = _styledComponents.default.div(_templateObject6(), Colors.MediumGrey, Colors.ConfirmColor, LabelStyled, Colors.ConfirmColor, function (props) {
  return props.icon && (0, _styledComponents.css)(_templateObject7(), props.icon);
});

exports.InputElementWrapperStyled = InputElementWrapperStyled;

var InputElementStyled = _styledComponents.default.input(_templateObject8(), Colors.MainColor, Colors.ConfirmColor, function (props) {
  return props.withIcon && (0, _styledComponents.css)(_templateObject9());
}, function (props) {
  return props.floatingLabels === false && (0, _styledComponents.css)(_templateObject10());
}, _BreakPoints.media.small(_templateObject11()), function (props) {
  return props.type === 'date' && (0, _styledComponents.css)(_templateObject12());
});

exports.InputElementStyled = InputElementStyled;

var ErrorWrapper = _styledComponents.default.div(_templateObject13(), Colors.ErrorColor, function (props) {
  return props.passwordStrength && (0, _styledComponents.css)(_templateObject14(), Colors[props.passwordStrength]);
}, function (props) {
  return props.isMyAccount && (0, _styledComponents.css)(_templateObject15());
});

exports.ErrorWrapper = ErrorWrapper;

var StyledPasswordVisibility = _styledComponents.default.img(_templateObject16(), Colors.TextFieldBorderFilter);

exports.StyledPasswordVisibility = StyledPasswordVisibility;

var StyledButton = _styledComponents.default.button(_templateObject17());

exports.StyledButton = StyledButton;

var InputIconStyled = _styledComponents.default.div(_templateObject18(), Colors.MediumGrey);

exports.InputIconStyled = InputIconStyled;

var InputRequiredStyled = _styledComponents.default.span(_templateObject19(), Colors.ErrorColor);

exports.InputRequiredStyled = InputRequiredStyled;