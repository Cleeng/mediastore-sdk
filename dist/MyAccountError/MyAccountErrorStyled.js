"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconStyled = exports.SubTitleStyled = exports.TitleStyled = exports.WrapStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _variables = require("styles/variables");

var _BreakPoints = require("styles/BreakPoints");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin: 0 auto 10px auto;\n  svg {\n    max-width: 100%;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  color: ", ";\n\n  font-size: 13px;\n\n  max-width: 310px;\n  margin: auto;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  max-width: 380px;\n  margin: auto auto 5px auto;\n\n  color: ", ";\n\n  font-size: 16px;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        margin: auto;\n      "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        min-height: 100vh;\n      "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      height: 100%;\n      margin: auto;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      flex-direction: column;\n      ", "\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      border: 1px dashed ", ";\n      border-radius: 20px;\n      padding: 35px 0;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  max-width: ", ";\n\n  padding: 18px;\n  margin: ", " ;\n\n  text-align: center;\n  line-height: 1.4;\n\n  ", "\n\n  ", "\n\n    ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WrapStyled = _styledComponents.default.div(_templateObject(), function (props) {
  return props.fullWidth ? 'unset' : '320px';
}, function (props) {
  return props.margin ? props.margin : '0 auto 32px auto';
}, function (props) {
  return props.withBorder && (0, _styledComponents.css)(_templateObject2(), _variables.MainColor);
}, function (props) {
  return props.fullHeight && (0, _styledComponents.css)(_templateObject3(), _BreakPoints.media.small(_templateObject4()));
}, function (props) {
  return props.centered && (0, _styledComponents.css)(_templateObject5());
});

exports.WrapStyled = WrapStyled;

var TitleStyled = _styledComponents.default.div(_templateObject6(), _variables.MainColor);

exports.TitleStyled = TitleStyled;

var SubTitleStyled = _styledComponents.default.div(_templateObject7(), _variables.MainColor);

exports.SubTitleStyled = SubTitleStyled;

var IconStyled = _styledComponents.default.div(_templateObject8());

exports.IconStyled = IconStyled;