"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _reactCustomScrollbars = require("react-custom-scrollbars");

var _BreakPoints = require("styles/BreakPoints");

var _MyAccountContentStyled = require("./MyAccountContentStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable react/jsx-props-no-spreading */
var MyAccountContent = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MyAccountContent, _Component);

  var _super = (0, _createSuper2.default)(MyAccountContent);

  function MyAccountContent(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MyAccountContent);
    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(MyAccountContent, [{
    key: "render",
    value: function render() {
      var children = this.props.children;
      var isMobile = window.innerWidth < _BreakPoints.breakPoints.small;
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, isMobile ? /*#__PURE__*/_react.default.createElement(_MyAccountContentStyled.WrapStyled, null, children) : /*#__PURE__*/_react.default.createElement(_reactCustomScrollbars.Scrollbars, {
        style: {
          flexGrow: '1',
          width: 'unset'
        },
        renderTrackHorizontal: function renderTrackHorizontal(props) {
          return /*#__PURE__*/_react.default.createElement("div", Object.assign({}, props, {
            style: {
              display: 'none'
            }
          }));
        }
      }, /*#__PURE__*/_react.default.createElement(_MyAccountContentStyled.WrapStyled, null, children)));
    }
  }]);
  return MyAccountContent;
}(_react.Component);

var _default = MyAccountContent;
exports.default = _default;
MyAccountContent.defaultProps = {
  children: ''
};