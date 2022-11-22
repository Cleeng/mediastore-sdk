"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureMyAccountMenu = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _MyAccountMenu = require("./MyAccountMenu.const");
var _MyAccountMenuStyled = require("./MyAccountMenuStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var MyAccountMenu = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MyAccountMenu, _Component);
  var _super = _createSuper(MyAccountMenu);
  function MyAccountMenu(props) {
    var _this;
    (0, _classCallCheck2.default)(this, MyAccountMenu);
    _this = _super.call(this, props);
    _this.onMenuItemClick = function (id) {
      var goToPage = _this.props.goToPage;
      goToPage(id);
    };
    _this.state = {};
    return _this;
  }
  (0, _createClass2.default)(MyAccountMenu, [{
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        currentPage = _this$props.currentPage,
        t = _this$props.t;
      return /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.WrapStyled, null, /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.ItemsStyled, null, _MyAccountMenu.MenuItems.map(function (menuItem) {
        var IconComponent = menuItem.icon ? menuItem.icon : _react.default.Fragment;
        return /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.ItemWrapStyled, {
          key: menuItem.label,
          visibleOnDesktop: menuItem.visibleOnDesktop,
          onClick: function onClick() {
            return _this2.onMenuItemClick(menuItem.id);
          }
        }, /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.ItemStyled, {
          isActive: currentPage === menuItem.id
        }, /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.ItemIconWrapStyled, null, /*#__PURE__*/_react.default.createElement(IconComponent, null)), /*#__PURE__*/_react.default.createElement(_MyAccountMenuStyled.ItemLabelStyled, null, t(menuItem.label))));
      })));
    }
  }]);
  return MyAccountMenu;
}(_react.Component);
exports.PureMyAccountMenu = MyAccountMenu;
MyAccountMenu.propTypes = {
  currentPage: _propTypes.default.string,
  goToPage: _propTypes.default.func,
  t: _propTypes.default.func
};
MyAccountMenu.defaultProps = {
  currentPage: '',
  goToPage: function goToPage() {},
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(MyAccountMenu));
exports.default = _default;