"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseButtonStyled = exports.InputElementStyled = exports.InputElementWrapperStyled = exports.MessageStyled = exports.InputComponentStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var Colors = _interopRequireWildcard(require("styles/variables"));

var _BreakPoints = require("styles/BreakPoints");

var _InputConstants = require("components/Input/InputConstants");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      opacity: 1;\n    "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n  height: 22px;\n  width: 22px;\n  top: 50%;\n  left: 7px;\n  transform: translate(0, -50%);\n  background-color: ", ";\n  opacity: 0;\n  border: 0;\n  border-radius: 50%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  cursor: pointer;\n\n  svg {\n    width: 8px;\n    height: 8px;\n    fill: ", ";\n  }\n\n  ", "\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      opacity: 0.5;\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n          width: 100%;\n          max-width: 100%;\n        "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        width: 100%;\n        max-width: 100%;\n      "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      width: 198px\n      max-width: 198px;\n      left: 37px;\n      padding-right: 25px;\n      ", "\n\n      ", "\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  flex-grow: 1;\n  position: relative;\n  width: 0px;\n\n  color: ", ";\n  padding: 0;\n\n  border: none;\n  outline: none;\n\n  font-size: 15px;\n  line-height: 1.3;\n  ", "\n\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  position: relative;\n  margin-bottom: 8px;\n\n  border: 1px solid ", ";\n  border-radius: 30px;\n\n  background: white;\n  transition: 0.2s ease-in-out;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n  border-radius: 5px;\n\n  font-size: 12px;\n\n  opacity: ", ";\n  transition: opacity 250ms linear;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      max-width: 100%;\n      width: 100%;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n\n  max-width: 300px;\n\n  ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var InputComponentStyled = _styledComponents.default.div(_templateObject(), function (props) {
  return props.fullWidth && props.isOpened && (0, _styledComponents.css)(_templateObject2());
});

exports.InputComponentStyled = InputComponentStyled;

var MessageStyled = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.messageType === _InputConstants.MESSAGE_TYPE_SUCCESS ? Colors.ConfirmColor : Colors.ErrorColor;
}, function (props) {
  return props.showMessage ? 1 : 0;
});

exports.MessageStyled = MessageStyled;

var InputElementWrapperStyled = _styledComponents.default.div(_templateObject4(), Colors.LineColor);

exports.InputElementWrapperStyled = InputElementWrapperStyled;

var InputElementStyled = _styledComponents.default.input(_templateObject5(), Colors.MainColor, function (props) {
  return props.isOpened && (0, _styledComponents.css)(_templateObject6(), _BreakPoints.media.small(_templateObject7()), props.fullWidth && (0, _styledComponents.css)(_templateObject8()));
}, function (props) {
  return props.readOnly && (0, _styledComponents.css)(_templateObject9());
});

exports.InputElementStyled = InputElementStyled;

var CloseButtonStyled = _styledComponents.default.button(_templateObject10(), Colors.LineColor, Colors.White, function (props) {
  return props.isInputOpened && (0, _styledComponents.css)(_templateObject11());
});

exports.CloseButtonStyled = CloseButtonStyled;