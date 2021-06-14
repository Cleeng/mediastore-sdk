"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CouponWrapStyled = exports.StatusMessageWrapStyled = exports.ButtonTextStyled = exports.SubscriptionManageWrapStyled = exports.FullWidthButtonStyled = exports.SimpleButtonStyled = exports.SubscriptionActionsStyled = exports.SubscriptionStyled = exports.WrapStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _variables = require("styles/variables");

var _BreakPoints = require("styles/BreakPoints");

var _Button = _interopRequireDefault(require("components/Button"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject13() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n  width: 100%;\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  margin-top: 20px;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  margin-right: 17px;\n  font-family: inherit;\n  font-weight: inherit;\n\n  &:after {\n    position: absolute;\n    right: -17px;\n    bottom: 0;\n    font-size: 11px;\n    ", ";\n  }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      width: unset;\n      max-width: unset;\n    "]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  ", "\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      margin: 0;\n      width: unset;\n      max-width: unset;\n    "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 48%;\n\n  text-transform: capitalize;\n  &:disabled:hover {\n    opacity: 0.9;\n  }\n  ", "\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n  align-items: flex-start;\n\n  border-top: 1px solid ", ";\n  margin-top: 17px;\n  padding-top: 17px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      &::after {\n        opacity: 1;\n      }\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      cursor: pointer;\n    "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 12px;\n\n  padding: 20px 18px;\n\n  ", "\n  &:not(:last-child) {\n    margin-bottom: 20px;\n    padding-bottom: 20px;\n  }\n\n  position: relative;\n  z-index: 1;\n\n  &::after {\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: -1px;\n    left: -1px;\n\n    content: '';\n    z-index: -1;\n\n    border-radius: 12px;\n    border: 1px solid ", ";\n    box-shadow: 0px 3px 20px #6767672c;\n\n    opacity: 0;\n    transition: opacity 0.2s ease-out;\n  }\n  ", "\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n\n  margin-bottom: 20px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var WrapStyled = _styledComponents.default.div(_templateObject());

exports.WrapStyled = WrapStyled;

var SubscriptionStyled = _styledComponents.default.div(_templateObject2(), _variables.White, _variables.LineColor, function (props) {
  return props.onClick && props.cursorPointer && (0, _styledComponents.css)(_templateObject3());
}, _variables.ConfirmColor, function (props) {
  return props.isSelected && (0, _styledComponents.css)(_templateObject4());
});

exports.SubscriptionStyled = SubscriptionStyled;

var SubscriptionActionsStyled = _styledComponents.default.div(_templateObject5(), _variables.IconsColor);

exports.SubscriptionActionsStyled = SubscriptionActionsStyled;
var SimpleButtonStyled = (0, _styledComponents.default)(_Button.default)(_templateObject6(), _BreakPoints.mediaFrom.small && (0, _styledComponents.css)(_templateObject7()));
exports.SimpleButtonStyled = SimpleButtonStyled;
var FullWidthButtonStyled = (0, _styledComponents.default)(_Button.default)(_templateObject8(), _BreakPoints.mediaFrom.small && (0, _styledComponents.css)(_templateObject9()));
exports.FullWidthButtonStyled = FullWidthButtonStyled;

var SubscriptionManageWrapStyled = _styledComponents.default.div(_templateObject10());

exports.SubscriptionManageWrapStyled = SubscriptionManageWrapStyled;

var ButtonTextStyled = _styledComponents.default.span(_templateObject11(), function (props) {
  return props.isExpanded ? "content: '▲'" : "content: '▼'";
});

exports.ButtonTextStyled = ButtonTextStyled;

var StatusMessageWrapStyled = _styledComponents.default.div(_templateObject12());

exports.StatusMessageWrapStyled = StatusMessageWrapStyled;

var CouponWrapStyled = _styledComponents.default.div(_templateObject13());

exports.CouponWrapStyled = CouponWrapStyled;