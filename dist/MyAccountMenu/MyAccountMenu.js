"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureMyAccountMenu = void 0;

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _MyAccountMenu = require("./MyAccountMenu.const");

var _MyAccountMenuStyled = require("./MyAccountMenuStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MyAccountMenu = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MyAccountMenu, _Component);

  var _super = (0, _createSuper2.default)(MyAccountMenu);

  function MyAccountMenu(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MyAccountMenu);
    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(MyAccountMenu, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          url = _this$props.routeMatch.url,
          t = _this$props.t;
      return /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.WrapStyled, null, /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.ItemsStyled, null, _MyAccountMenu.MenuItems.map(function (menuItem) {
        var IconComponent = menuItem.icon ? menuItem.icon : _react.default.Fragment;
        return /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.ItemWrapStyled, {
          key: menuItem.label,
          visibleOnDesktop: menuItem.visibleOnDesktop
        }, /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.ItemLinkStyled, {
          to: "".concat(url, "/").concat(menuItem.link)
        }, /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.ItemIconWrapStyled, null, /*#__PURE__*/_react.default.createElement(IconComponent, null)), /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.ItemLabelStyled, null, t(menuItem.label))));
      })));
    }
  }]);
  return MyAccountMenu;
}(_react.Component);

exports.PureMyAccountMenu = MyAccountMenu;
MyAccountMenu.defaultProps = {
  routeMatch: {},
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(MyAccountMenu));

exports.default = _default;