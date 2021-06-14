"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ButtonTextStyled = exports.SubscriptionActionsStyled = exports.ManageButtonWrapStyled = exports.SubscriptionManagementStyled = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _BreakPoints = require("styles/BreakPoints");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject7() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        transform: scaleY(0.8) rotateX(180deg);\n      "]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  position: relative;\n  line-height: 1.2;\n  &:after {\n    position: absolute;\n    right: -17px;\n    bottom: 0;\n    font-size: 11px;\n    transform: scaleY(0.8) rotate(0deg);\n    transition: all 0.3s ease-in-out;\n    content: '\u25BC';\n    ", "\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n    button{\n      font-size:11px;\n      padding: 12px 15px;\n    }\n  "]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      max-height: 500px;\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  max-height: 0px;\n  overflow: hidden;\n  transition: all 0.3s ease-in-out;\n  ", "\n\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  display: flex;\n  justify-content: flex-end;\n\n  button {\n    padding-right: 38px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  margin-top: 22px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-end;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SubscriptionManagementStyled = _styledComponents.default.section(_templateObject());

exports.SubscriptionManagementStyled = SubscriptionManagementStyled;

var ManageButtonWrapStyled = _styledComponents.default.div(_templateObject2());

exports.ManageButtonWrapStyled = ManageButtonWrapStyled;

var SubscriptionActionsStyled = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.isOpened && (0, _styledComponents.css)(_templateObject4());
}, _BreakPoints.media.small(_templateObject5()));

exports.SubscriptionActionsStyled = SubscriptionActionsStyled;

var ButtonTextStyled = _styledComponents.default.span(_templateObject6(), function (props) {
  return props.isExpanded && (0, _styledComponents.css)(_templateObject7());
});

exports.ButtonTextStyled = ButtonTextStyled;