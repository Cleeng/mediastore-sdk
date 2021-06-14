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

var _CheckboxStyled = require("./CheckboxStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Checkbox = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Checkbox, _Component);

  var _super = (0, _createSuper2.default)(Checkbox);

  function Checkbox(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Checkbox);
    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(Checkbox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          onClickFn = _this$props.onClickFn,
          error = _this$props.error,
          checked = _this$props.checked,
          required = _this$props.required,
          isMyAccount = _this$props.isMyAccount,
          className = _this$props.className,
          disabled = _this$props.disabled,
          isRadioButton = _this$props.isRadioButton;
      return /*#__PURE__*/_react.default.createElement(_CheckboxStyled.CheckboxStyled, {
        onClick: function onClick(e) {
          return onClickFn(e, disabled);
        },
        role: "checkbox",
        tabIndex: "-1",
        "aria-checked": "false",
        checked: checked,
        "aria-label": children,
        className: className,
        disabled: disabled
      }, /*#__PURE__*/_react.default.createElement(_CheckboxStyled.CheckFrameStyled, {
        error: error && required && !checked,
        tabIndex: "0",
        onKeyDown: function onKeyDown(e) {
          return e.keyCode === 32 ? onClickFn() : null;
        },
        isMyAccount: isMyAccount,
        isRadioButton: isRadioButton,
        checked: checked
      }, checked && /*#__PURE__*/_react.default.createElement(_CheckboxStyled.CheckMarkStyled, {
        isMyAccount: isMyAccount,
        isRadioButton: isRadioButton
      })), /*#__PURE__*/_react.default.createElement(_CheckboxStyled.ConsentDefinitionStyled, {
        dangerouslySetInnerHTML: {
          __html: "".concat(children).concat(required && isMyAccount ? '*' : '')
        },
        checked: checked
      }));
    }
  }]);
  return Checkbox;
}(_react.Component);

Checkbox.defaultProps = {
  error: '',
  checked: false,
  required: false,
  onClickFn: function onClickFn() {},
  children: '',
  isMyAccount: false,
  className: '',
  disabled: false,
  isRadioButton: false
};
var _default = Checkbox;
exports.default = _default;