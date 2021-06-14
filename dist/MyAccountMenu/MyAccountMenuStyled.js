"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemLinkStyled = exports.ItemLabelStyled = exports.ItemIconWrapStyled = exports.ItemWrapStyled = exports.ItemsStyled = exports.WrapStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _BreakPoints = require("styles/BreakPoints");

var _variables = require("styles/variables");

var _reactRouterDom = require("react-router-dom");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject16() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    flex-direction: row;\n    align-items: center;\n\n    padding: 0 26px 0 0;\n    margin-bottom: 16px;\n\n    border-radius: 8px;\n  "]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  padding: 12px 0;\n  border-radius: 12px;\n\n  transition: opacity 0.1s;\n\n  &:hover {\n    ", " {\n      &:after {\n        transform: scaleX(1);\n      }\n      opacity: 1;\n    }\n  }\n\n  &.active {\n    ", " {\n      path {\n        opacity: 1;\n        fill: ", ";\n      }\n    }\n\n    ", " {\n      &:after {\n        transform: scaleX(1);\n      }\n      opacity: 1;\n    }\n  }\n\n  ", "\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    margin: auto auto auto 20px;\n   font-size: 15px;\n  "]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  opacity: 0.4;\n  width: auto;\n  margin: auto;\n\n  color: ", ";\n  font-size: 13px;\n\n  font-weight: 700;\n  line-height: 21px;\n\n  transition: all 0.1s ease-in-out;\n\n  &:after {\n    display: block;\n    content: '';\n    border-bottom: 2px solid ", ";\n    transform: scaleX(0);\n    transition: transform 250ms ease-in-out;\n    transform-origin: 0% 50%;\n  }\n\n  ", "\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    display: flex;\n    border: 0;\n    height: 50px;\n    width: 17px;\n  "]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: none;\n  justify-content: center;\n  align-items: center;\n\n  path {\n    opacity: 0.4;\n    fill: ", ";\n  }\n\n  ", "\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    margin-right: 0;\n  "]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      margin-right: 16px;\n  "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        display: none;\n      "]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      ", "\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  ", "\n\n  &.active {\n    opacity: 1;\n  }\n\n  ", "\n\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    flex-direction: column;\n  "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    justify-content: flex-start;\n  "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n\n  ", "\n\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    padding: 26px 0;\n  "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  padding: 10px 0;\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WrapStyled = _styledComponents.default.nav(_templateObject(), _BreakPoints.mediaFrom.small(_templateObject2()));

exports.WrapStyled = WrapStyled;

var ItemsStyled = _styledComponents.default.div(_templateObject3(), _BreakPoints.mediaFrom.smallest(_templateObject4()), _BreakPoints.mediaFrom.small(_templateObject5()));

exports.ItemsStyled = ItemsStyled;

var ItemWrapStyled = _styledComponents.default.div(_templateObject6(), function (props) {
  return !props.visibleOnDesktop && (0, _styledComponents.css)(_templateObject7(), _BreakPoints.mediaFrom.small(_templateObject8()));
}, _BreakPoints.mediaFrom.smallest(_templateObject9()), _BreakPoints.mediaFrom.small(_templateObject10()));

exports.ItemWrapStyled = ItemWrapStyled;

var ItemIconWrapStyled = _styledComponents.default.div(_templateObject11(), _variables.MyAccountTextGray, _BreakPoints.mediaFrom.small(_templateObject12()));

exports.ItemIconWrapStyled = ItemIconWrapStyled;

var ItemLabelStyled = _styledComponents.default.div(_templateObject13(), _variables.MainColor, _variables.ConfirmColor, _BreakPoints.mediaFrom.small(_templateObject14()));

exports.ItemLabelStyled = ItemLabelStyled;
var ItemLinkStyled = (0, _styledComponents.default)(_reactRouterDom.NavLink)(_templateObject15(), ItemLabelStyled, ItemIconWrapStyled, _variables.ConfirmColor, ItemLabelStyled, _BreakPoints.mediaFrom.small(_templateObject16()));
exports.ItemLinkStyled = ItemLinkStyled;