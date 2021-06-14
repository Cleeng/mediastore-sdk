"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureCouponInput = void 0;

var _regenerator = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _Input = require("components/Input");

var _Loader = _interopRequireDefault(require("components/Loader"));

var _Button = _interopRequireDefault(require("components/Button"));

var _xmark = require("assets/images/xmark.svg");

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _CouponInputStyled = require("./CouponInputStyled");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FADE_OUT_DELAY = 5000;

var CouponInput = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(CouponInput, _Component);

  var _super = (0, _createSuper2.default)(CouponInput);

  function CouponInput(props) {
    var _this;

    (0, _classCallCheck2.default)(this, CouponInput);
    _this = _super.call(this, props);

    _this.disableSuppressMessage = function () {
      return _this.setState({
        suppressMessage: false
      });
    };

    _this.clearFadeOutTimeout = function () {
      var timeoutId = _this.state.timeoutId;

      if (timeoutId) {
        clearTimeout(timeoutId);

        _this.setState({
          timeoutId: 0
        });
      }
    };

    _this.scheduleFadeOut = function () {
      var timeoutId = setTimeout(function () {
        _this.setState({
          suppressMessage: true,
          timeoutId: 0
        });
      }, FADE_OUT_DELAY);

      _this.setState({
        timeoutId: timeoutId
      });
    };

    _this.handleSubmit = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(event) {
        var onSubmit;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                onSubmit = _this.props.onSubmit;
                event.target.blur();
                _context.next = 4;
                return onSubmit(event.target.value);

              case 4:
                _this.setState({
                  suppressMessage: false
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.onRedeemClick = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var isOpened, _this$props, onSubmit, onInputToggle, value;

      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              isOpened = _this.state.isOpened;
              _this$props = _this.props, onSubmit = _this$props.onSubmit, onInputToggle = _this$props.onInputToggle, value = _this$props.value;

              if (isOpened) {
                _context2.next = 7;
                break;
              }

              onInputToggle();

              _this.setState({
                isOpened: true
              });

              _context2.next = 9;
              break;

            case 7:
              _context2.next = 9;
              return onSubmit(value);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    _this.onCloseClick = function () {
      var isOpened = _this.state.isOpened;
      var onClose = _this.props.onClose;

      if (isOpened) {
        _this.setState({
          isOpened: false
        });

        onClose();
      }
    };

    _this.state = {
      suppressMessage: false,
      timeoutId: 0,
      isOpened: false
    };
    return _this;
  }

  (0, _createClass2.default)(CouponInput, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props2 = this.props,
          showMessage = _this$props2.showMessage,
          message = _this$props2.message,
          messageType = _this$props2.messageType;

      if (showMessage !== prevProps.showMessage || message !== prevProps.message || messageType !== prevProps.messageType) {
        this.disableSuppressMessage();
        this.clearFadeOutTimeout();

        if (showMessage) {
          this.scheduleFadeOut();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearFadeOutTimeout();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props3 = this.props,
          showMessage = _this$props3.showMessage,
          fullWidth = _this$props3.fullWidth,
          message = _this$props3.message,
          messageType = _this$props3.messageType,
          value = _this$props3.value,
          _onChange = _this$props3.onChange,
          couponLoading = _this$props3.couponLoading,
          t = _this$props3.t;
      var _this$state = this.state,
          suppressMessage = _this$state.suppressMessage,
          isOpened = _this$state.isOpened;
      return /*#__PURE__*/_react.default.createElement(_CouponInputStyled.InputComponentStyled, {
        isOpened: isOpened,
        fullWidth: fullWidth
      }, /*#__PURE__*/_react.default.createElement(_CouponInputStyled.InputElementWrapperStyled, {
        showMessage: showMessage && !suppressMessage,
        messageType: messageType
      }, /*#__PURE__*/_react.default.createElement(_CouponInputStyled.CloseButtonStyled, {
        onClick: function onClick() {
          return _this2.onCloseClick();
        },
        isInputOpened: isOpened
      }, _xmark.ReactComponent && /*#__PURE__*/_react.default.createElement(_xmark.ReactComponent, null)), /*#__PURE__*/_react.default.createElement(_CouponInputStyled.InputElementStyled, {
        isOpened: isOpened,
        placeholder: t('Your coupon'),
        onKeyDown: function onKeyDown(event) {
          if (event.key === 'Enter') {
            _this2.handleSubmit(event);
          }
        },
        onFocus: function onFocus() {
          _this2.setState({
            suppressMessage: true
          });
        },
        autoComplete: "off",
        value: value,
        onChange: function onChange(event) {
          return _onChange(event.target.value);
        },
        type: "text",
        readOnly: couponLoading,
        fullWidth: fullWidth,
        "aria-label": t('Your coupon'),
        "aria-required": false
      }), /*#__PURE__*/_react.default.createElement(_Button.default, {
        width: "auto",
        onClickFn: function onClickFn() {
          return _this2.onRedeemClick();
        }
      }, /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, couponLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }), !couponLoading && isOpened && t('Redeem'), !couponLoading && !isOpened && t('Redeem coupon')))), isOpened && /*#__PURE__*/_react.default.createElement(_CouponInputStyled.MessageStyled, {
        showMessage: showMessage && !suppressMessage,
        messageType: messageType
      }, message));
    }
  }]);
  return CouponInput;
}(_react.Component);

exports.PureCouponInput = CouponInput;
CouponInput.defaultProps = {
  value: '',
  showMessage: false,
  fullWidth: false,
  message: null,
  messageType: _Input.MESSAGE_TYPE_FAIL,
  onChange: function onChange() {},
  onClose: function onClose() {},
  onInputToggle: function onInputToggle() {},
  t: function t(k) {
    return k;
  },
  couponLoading: false
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(CouponInput));

exports.default = _default;