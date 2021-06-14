"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorFieldStyled = exports.CheckMarkStyled = exports.CheckFrameStyled = exports.ConsentDefinitionStyled = exports.CheckboxStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _variables = require("styles/variables");

var _tick = _interopRequireDefault(require("assets/images/input/tick.svg"));

var _enable_check = _interopRequireDefault(require("assets/images/input/enable_check.svg"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  width: 100%;\n  margin-top: 10px;\n\n  color: ", ";\n\n  font-size: 12px;\n  font-weight: 300;\n  text-align: center;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      width: 20px;\n      height: 20px;\n      top: -1px;\n      left: -1px;\n      background-image: url(", ");\n      background-position: center;\n      background-size: cover;\n    "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n\n      width: 12px;\n      height: 12px;\n\n      background: ", ";\n      border-radius: 50%;\n    "]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: absolute;\n\n  width: 13px;\n  height: 10px;\n  top: 4px;\n  left: 3px;\n\n  background-image: url(", ");\n  background-repeat: no-repeat;\n  ", "\n  ", "\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      border-color: ", ";\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      border: 1px solid ", ";\n    "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      border-radius: 50%;\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      border-color: ", ";\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  box-sizing: border-box;\n\n  border: 1px solid ", ";\n  border-radius: 2px;\n  width: 20px;\n  min-width: 20px;\n  height: 20px;\n\n  &:focus {\n    outline: 2px solid ", ";\n  }\n  ", "\n  ", "\n  ", "\n\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      opacity: 1;\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  padding-left: 10px;\n  margin-top: 0;\n\n  font-weight: 400;\n  text-align: left;\n  a {\n    color: ", ";\n\n    text-decoration: underline;\n    &:focus {\n      outline: 2px solid ", ";\n    }\n  }\n  opacity: 0.8;\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      opacity: 0.7;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  cursor: pointer;\n  margin-top: 10px;\n\n  align-items: center;\n  font-size: 13px;\n  color: ", ";\n\n  &:focus {\n    outline: none;\n  }\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var CheckboxStyled = _styledComponents.default.div(_templateObject(), _variables.MainColor, function (props) {
  return props.disabled && (0, _styledComponents.css)(_templateObject2());
});

exports.CheckboxStyled = CheckboxStyled;

var ConsentDefinitionStyled = _styledComponents.default.div(_templateObject3(), _variables.MainColor, _variables.FocusColor, function (props) {
  return props.checked && (0, _styledComponents.css)(_templateObject4());
});

exports.ConsentDefinitionStyled = ConsentDefinitionStyled;

var CheckFrameStyled = _styledComponents.default.div(_templateObject5(), _variables.LineColor, _variables.FocusColor, function (props) {
  return props.error && (0, _styledComponents.css)(_templateObject6(), _variables.ErrorColor);
}, function (props) {
  return props.isRadioButton && (0, _styledComponents.css)(_templateObject7());
}, function (props) {
  return props.isRadioButton && props.checked && (0, _styledComponents.css)(_templateObject8(), _variables.ConfirmColor);
}, function (props) {
  return props.isMyAccount && props.checked && (0, _styledComponents.css)(_templateObject9(), _variables.ConfirmColor);
});

exports.CheckFrameStyled = CheckFrameStyled;

var CheckMarkStyled = _styledComponents.default.div(_templateObject10(), _tick.default, function (props) {
  return props.isRadioButton && (0, _styledComponents.css)(_templateObject11(), _variables.ConfirmColor);
}, function (props) {
  return props.isMyAccount && (0, _styledComponents.css)(_templateObject12(), _enable_check.default);
});

exports.CheckMarkStyled = CheckMarkStyled;

var ErrorFieldStyled = _styledComponents.default.div(_templateObject13(), _variables.ErrorColor);

exports.ErrorFieldStyled = ErrorFieldStyled;