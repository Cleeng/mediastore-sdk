"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledSkeleton = exports.SkeletonWrapperStyled = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties"));

var _taggedTemplateLiteral2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral"));

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reactLoadingSkeleton = _interopRequireWildcard(require("react-loading-skeleton"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject6() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      border-radius: 50% !important;\n    "]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  border-radius: 16px !important;\n\n  ", "\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      text-align: ", ";\n    "]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n        margin: ", ";\n      "]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n      width: ", "px;\n    "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  max-width: 100%;\n  margin: 0 0 10px;\n  overflow: hidden;\n  text-align: center;\n\n  ", "\n\n    ", "\n\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

var SkeletonWrapperStyled = _styledComponents.default.div(_templateObject(), function (props) {
  return props.width && (0, _styledComponents.css)(_templateObject2(), props.width);
}, function (props) {
  return props.margin && (0, _styledComponents.css)(_templateObject3(), props.margin);
}, function (props) {
  return props.align && (0, _styledComponents.css)(_templateObject4(), props.align);
});

exports.SkeletonWrapperStyled = SkeletonWrapperStyled;
var StyledSkeleton = (0, _styledComponents.default)(_reactLoadingSkeleton.default)(_templateObject5(), function (props) {
  return props.circle && (0, _styledComponents.css)(_templateObject6());
});
exports.StyledSkeleton = StyledSkeleton;

var SkeletonWrapper = function SkeletonWrapper(_ref) {
  var showChildren = _ref.showChildren,
      children = _ref.children,
      margin = _ref.margin,
      width = _ref.width,
      props = (0, _objectWithoutProperties2.default)(_ref, ["showChildren", "children", "margin", "width"]);
  return showChildren ? children : /*#__PURE__*/_react.default.createElement(SkeletonWrapperStyled, {
    width: width,
    margin: margin
  }, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.SkeletonTheme, {
    color: "#eeeff2"
  }, /*#__PURE__*/_react.default.createElement(StyledSkeleton, props)));
};

SkeletonWrapper.defaultProps = {
  showChildren: false,
  children: '',
  margin: '',
  width: null
};
var _default = SkeletonWrapper;
exports.default = _default;