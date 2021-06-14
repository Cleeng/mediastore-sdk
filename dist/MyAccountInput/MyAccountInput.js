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

var _InputStyled = require("components/Input/InputStyled");

var _MyAccountInputStyled = require("./MyAccountInputStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MyAccountInput = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MyAccountInput, _Component);

  var _super = (0, _createSuper2.default)(MyAccountInput);

  function MyAccountInput(props) {
    var _this;

    (0, _classCallCheck2.default)(this, MyAccountInput);
    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  (0, _createClass2.default)(MyAccountInput, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          id = _this$props.id,
          placeholder = _this$props.placeholder,
          type = _this$props.type,
          value = _this$props.value,
          label = _this$props.label,
          onChange = _this$props.onChange,
          onSubmit = _this$props.onSubmit,
          disabled = _this$props.disabled,
          hideInput = _this$props.hideInput,
          error = _this$props.error,
          onBlur = _this$props.onBlur,
          name = _this$props.name,
          autoComplete = _this$props.autoComplete;
      return /*#__PURE__*/_react.default.createElement(_MyAccountInputStyled.WrapStyled, {
        hideInput: hideInput
      }, /*#__PURE__*/_react.default.createElement(_MyAccountInputStyled.InputElementLabelStyled, {
        htmlFor: id
      }, label), /*#__PURE__*/_react.default.createElement(_MyAccountInputStyled.InputElementStyled, {
        error: error,
        id: id,
        placeholder: placeholder,
        type: type,
        value: value,
        disabled: disabled,
        onSubmit: onSubmit,
        onChange: onChange,
        onBlur: onBlur,
        name: name,
        autoComplete: autoComplete
      }), /*#__PURE__*/_react.default.createElement(_InputStyled.ErrorWrapper, {
        id: "".concat(id, "-desc"),
        isMyAccount: true
      }, error));
    }
  }]);
  return MyAccountInput;
}(_react.Component);

var _default = MyAccountInput;
exports.default = _default;
MyAccountInput.defaultProps = {
  id: '',
  placeholder: '',
  type: 'text',
  value: '',
  label: '',
  onChange: function onChange() {},
  onSubmit: function onSubmit() {},
  onBlur: function onBlur() {},
  disabled: false,
  hideInput: false,
  error: '',
  name: '',
  autoComplete: ''
};