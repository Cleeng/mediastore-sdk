"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _addonKnobs = require("@storybook/addon-knobs");

var _addonActions = require("@storybook/addon-actions");

var _storybookAddonJsx = require("storybook-addon-jsx");

var _storybookState = require("@sambego/storybook-state");

var _Input = require("components/Input");

var _CouponInput = require("./CouponInput");

require("styles/index.scss");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var wrapperState = new _storybookState.Store({
  value: '',
  isOpened: false
});

var CouponInputFeedbackWrapper = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(CouponInputFeedbackWrapper, _Component);

  var _super = (0, _createSuper2.default)(CouponInputFeedbackWrapper);

  function CouponInputFeedbackWrapper(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CouponInputFeedbackWrapper);
    _this = _super.call(this, props);

    _this.onSubmit = function (value) {
      (0, _addonActions.action)('onSubmit')(value);
      var messageType = _this.props.messageType;
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          _this.setState({
            showMessage: true
          });

          if (messageType === _Input.MESSAGE_TYPE_SUCCESS) {
            resolve();
          } else {
            reject();
          }
        }, 200);
      });
    };

    _this.state = {
      showMessage: false,
      inputValue: ''
    };
    return _this;
  }

  (0, _createClass2.default)(CouponInputFeedbackWrapper, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          messageType = _this$props.messageType,
          message = _this$props.message;
      var _this$state = this.state,
          showMessage = _this$state.showMessage,
          inputValue = _this$state.inputValue;
      return /*#__PURE__*/_react.default.createElement(_CouponInput.PureCouponInput, {
        onSubmit: this.onSubmit,
        showMessage: showMessage,
        message: message,
        messageType: messageType,
        value: inputValue,
        onChange: function onChange(e) {
          return _this2.setState({
            inputValue: e
          });
        }
      });
    }
  }]);
  return CouponInputFeedbackWrapper;
}(_react.Component);

(0, _react2.storiesOf)('Checkout/CouponInput', module).addDecorator(_addonKnobs.withKnobs).addDecorator(_storybookAddonJsx.jsxDecorator).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: 600,
      backgroundColor: 'white',
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 20
    }
  }, story());
}).addDecorator(function (story) {
  return /*#__PURE__*/_react.default.createElement(_storybookState.State, {
    store: wrapperState
  }, function (state) {
    return story(state);
  });
}).add('All options', function (state) {
  return /*#__PURE__*/_react.default.createElement(_CouponInput.PureCouponInput, {
    value: state.value,
    onChange: function onChange(e) {
      return wrapperState.set({
        value: e
      });
    },
    showMessage: (0, _addonKnobs.boolean)('showMessage', false),
    message: (0, _addonKnobs.text)('message', 'Message'),
    messageType: (0, _addonKnobs.select)('messageType', {
      success: _Input.MESSAGE_TYPE_SUCCESS,
      fail: _Input.MESSAGE_TYPE_FAIL
    }, _Input.MESSAGE_TYPE_SUCCESS),
    onSubmit: (0, _addonActions.action)('onSubmit')
  });
}).add('UC: Accept any code', function () {
  return /*#__PURE__*/_react.default.createElement(CouponInputFeedbackWrapper, {
    message: "Your coupon has been applied! Enjoy your 50% discount.",
    messageType: _Input.MESSAGE_TYPE_SUCCESS
  });
}).add('UC: Reject any code', function () {
  return /*#__PURE__*/_react.default.createElement(CouponInputFeedbackWrapper, {
    message: "This is not a valid coupon code for this offer. Please check the code on your coupon and try again.",
    messageType: _Input.MESSAGE_TYPE_FAIL
  });
});