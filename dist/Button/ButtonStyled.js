"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var colors = _interopRequireWildcard(require("styles/variables"));

var _BreakPoints = require("styles/BreakPoints");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject18() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      &::before {\n        position: absolute;\n        display: inline-block;\n\n        width: 20px;\n        height: 20px;\n        left: 15px;\n        top: 50%;\n        transform: translateY(-50%);\n        content: url(", ");\n      }\n    "]);

  _templateObject18 = function _templateObject18() {
    return data;
  };

  return data;
}

function _templateObject17() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      padding: ", ";\n    "]);

  _templateObject17 = function _templateObject17() {
    return data;
  };

  return data;
}

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      filter: opacity(0.7);\n    "]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      width: ", ";\n    "]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      margin: ", ";\n    "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      font-size: ", ";\n    "]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      font-weight: ", ";\n    "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        display: inline-block;\n\n        width: auto;\n        height: auto;\n        padding: 0px;\n\n        border-radius: none;\n        background-color: transparent;\n        color: ", ";\n\n        text-decoration: underline;\n        letter-spacing: 0.025em;\n        font-weight: 300;\n        font-size: 12px;\n\n        &:hover,\n        &:focus {\n          background-color: transparent;\n          font-weight: bold;\n        }\n      "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n          top: 15px;\n          left: 10px;\n        "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        position: absolute;\n        top: 50%;\n        left: 35px;\n\n        height: auto;\n        width: auto;\n        border-radius: none;\n        padding: 0;\n\n        transform: translateY(-45%);\n        background-color: transparent;\n        color: ", ";\n        font-size: 16px;\n        letter-spacing: 0.025em;\n        font-weight: 500;\n\n        &::before {\n          content: '<';\n          margin-right: 10px;\n        }\n        &:hover,\n        &:focus {\n          font-weight: 700;\n          text-decoration: none;\n        }\n        ", "\n      "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        background-color: transparent;\n        border: 1px solid ", ";\n        color: ", ";\n        &:not(:disabled):hover,\n        &:focus {\n          cursor: pointer;\n          background-color: ", ";\n        }\n        &:active {\n          border: 1px solid ", ";\n        }\n      "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        background-color: ", ";\n        border: 1px solid ", ";\n        color: ", ";\n        &:hover,\n        &:focus,\n        &:active {\n          cursor: pointer;\n          background-color: ", ";\n          border: 1px solid ", ";\n        }\n      "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n          width: 100%;\n        "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        height: 48px;\n        width: 30%;\n        min-width: max-content;\n\n        padding: 15px;\n        border-radius: 6px;\n\n        color: ", ";\n        background-color: ", ";\n\n        font-size: 14px;\n\n        ", "\n\n        &:hover,\n        &:focus {\n          cursor: pointer;\n          opacity: 0.9;\n        }\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        color: ", ";\n        background-color: ", ";\n        opacity: 0.9;\n        &:hover,\n        &:focus {\n          cursor: pointer;\n          opacity: 1;\n        }\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        color: ", ";\n        background-color: ", ";\n        opacity: 0.9;\n        &:hover,\n        &:focus {\n          cursor: pointer;\n          opacity: 1;\n        }\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      padding: 20px;\n      font-size: 16px;\n      font-weight: 400;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  width: 100%;\n  min-width: min-content;\n\n  border-radius: 30px;\n  outline: 0;\n  border: none;\n\n  text-align: center;\n  text-decoration: none;\n  letter-spacing: 0.025em;\n  font-size: 13px;\n  padding: 12px 25px;\n  font-weight: 600;\n  line-height: initial;\n\n  transition: opacity 0.1s ease-in-out;\n  cursor: pointer;\n\n  &:active {\n    outline: none;\n  }\n\n  &:disabled {\n    &:hover {\n      cursor: not-allowed;\n    }\n  }\n\n  ", "\n  \n  ", "\n\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var ButtonStyled = _styledComponents.default.button(_templateObject(), function (props) {
  return props.size === 'big' && (0, _styledComponents.css)(_templateObject2());
}, function (props) {
  return props.theme === 'confirm' && (0, _styledComponents.css)(_templateObject3(), colors.White, colors.ConfirmColor) || props.theme === 'primary' && (0, _styledComponents.css)(_templateObject4(), colors.White, colors.MainColor) || props.theme === 'payment' && (0, _styledComponents.css)(_templateObject5(), colors.White, colors.PaymentButtonBgn, _BreakPoints.media.small(_templateObject6())) || props.theme === 'secondary' && (0, _styledComponents.css)(_templateObject7(), colors.BackgroundColor, colors.BackgroundColor, colors.MainColor, colors.LineColor, colors.LineColor) || props.theme === 'simple' && (0, _styledComponents.css)(_templateObject8(), colors.LineColor, colors.MainColor, colors.BackgroundColor, colors.LineColor) || props.theme === 'navLink' && (0, _styledComponents.css)(_templateObject9(), colors.MainColor, _BreakPoints.media.small(_templateObject10())) || props.theme === 'link' && (0, _styledComponents.css)(_templateObject11(), colors.MainColor);
}, function (props) {
  return props.fontWeight && (0, _styledComponents.css)(_templateObject12(), props.fontWeight);
}, function (props) {
  return props.fontSize && (0, _styledComponents.css)(_templateObject13(), props.fontSize);
}, function (props) {
  return props.margin && (0, _styledComponents.css)(_templateObject14(), props.margin);
}, function (props) {
  return props.width && (0, _styledComponents.css)(_templateObject15(), props.width);
}, function (props) {
  return props.disabled && (0, _styledComponents.css)(_templateObject16());
}, function (props) {
  return props.padding && (0, _styledComponents.css)(_templateObject17(), props.padding);
}, function (props) {
  return props.icon && (0, _styledComponents.css)(_templateObject18(), props.icon);
});

var _default = ButtonStyled;
exports.default = _default;