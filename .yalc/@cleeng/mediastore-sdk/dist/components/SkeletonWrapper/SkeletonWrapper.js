"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledSkeleton = exports.SkeletonWrapperStyled = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _taggedTemplateLiteral2 = _interopRequireDefault(require("@babel/runtime/helpers/taggedTemplateLiteral"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styledComponents = _interopRequireWildcard(require("styled-components"));
var _reactLoadingSkeleton = _interopRequireWildcard(require("react-loading-skeleton"));
var _variables = require("../../styles/variables");
require("react-loading-skeleton/dist/skeleton.css");
var _excluded = ["showChildren", "children", "margin", "width"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var SkeletonWrapperStyled = _styledComponents.default.div.attrs(function () {
  return {
    className: 'msd__skeleton'
  };
})(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n  width: 100%;\n  max-width: 100%;\n  margin: 0 0 10px;\n  overflow: hidden;\n  text-align: center;\n\n  ", "\n\n    ", "\n\n  ", "\n"])), function (props) {
  return props.width && (0, _styledComponents.css)(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n      width: ", "px;\n    "])), props.width);
}, function (props) {
  return props.margin && (0, _styledComponents.css)(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n        margin: ", ";\n      "])), props.margin);
}, function (props) {
  return props.align && (0, _styledComponents.css)(_templateObject4 || (_templateObject4 = (0, _taggedTemplateLiteral2.default)(["\n      text-align: ", ";\n    "])), props.align);
});
exports.SkeletonWrapperStyled = SkeletonWrapperStyled;
var StyledSkeleton = (0, _styledComponents.default)(_reactLoadingSkeleton.default)(_templateObject5 || (_templateObject5 = (0, _taggedTemplateLiteral2.default)(["\n  border-radius: 16px !important;\n\n  ", "\n"])), function (props) {
  return props.circle && (0, _styledComponents.css)(_templateObject6 || (_templateObject6 = (0, _taggedTemplateLiteral2.default)(["\n      border-radius: 50% !important;\n    "])));
});
exports.StyledSkeleton = StyledSkeleton;
var SkeletonWrapper = function SkeletonWrapper(_ref) {
  var showChildren = _ref.showChildren,
    children = _ref.children,
    margin = _ref.margin,
    width = _ref.width,
    props = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return showChildren ? children : /*#__PURE__*/_react.default.createElement(SkeletonWrapperStyled, {
    width: width,
    margin: margin
  }, /*#__PURE__*/_react.default.createElement(_reactLoadingSkeleton.SkeletonTheme, {
    baseColor: _variables.LoaderColor
  }, /*#__PURE__*/_react.default.createElement(StyledSkeleton, props)));
};
SkeletonWrapper.propTypes = {
  showChildren: _propTypes.default.bool,
  children: _propTypes.default.node,
  margin: _propTypes.default.string,
  width: _propTypes.default.number
};
SkeletonWrapper.defaultProps = {
  showChildren: false,
  children: '',
  margin: '',
  width: null
};
var _default = SkeletonWrapper;
exports.default = _default;