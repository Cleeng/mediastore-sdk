"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureUpdateSubscription = void 0;

var _regenerator = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _updateSubscription = _interopRequireDefault(require("api/Customer/updateSubscription"));

var _planHelper = require("util/planHelper");

var _checkmark = _interopRequireDefault(require("assets/images/checkmark.svg"));

var _Button = _interopRequireDefault(require("components/Button"));

var _Checkbox = _interopRequireDefault(require("components/Checkbox"));

var _InnerPopupWrapper = _interopRequireDefault(require("components/InnerPopupWrapper"));

var _Loader = _interopRequireDefault(require("components/Loader"));

var _InnerPopupWrapperStyled = require("components/InnerPopupWrapper/InnerPopupWrapperStyled");

var _UpdateSubscriptionStyled = require("./UpdateSubscriptionStyled");

var _UpdateSubscription = require("./UpdateSubscription.const");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var UpdateSubscription = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(UpdateSubscription, _Component);

  var _super = (0, _createSuper2.default)(UpdateSubscription);

  function UpdateSubscription(props) {
    var _this;

    (0, _classCallCheck2.default)(this, UpdateSubscription);
    _this = _super.call(this, props);
    _this.unsubscribe = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var offerDetails, checkedReason, response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              offerDetails = _this.props.offerDetails;
              checkedReason = _this.state.checkedReason;
              _context.prev = 2;

              _this.setState({
                isLoading: true
              });

              _context.next = 6;
              return (0, _updateSubscription.default)({
                offerId: offerDetails.offerId,
                status: 'cancelled',
                cancellationType: 'userCancel',
                cancellationReason: checkedReason
              });

            case 6:
              response = _context.sent;

              if (response.errors.length) {
                _this.setState({
                  isError: true,
                  isLoading: false
                });
              } else {
                _this.setState({
                  currentStep: 2,
                  isLoading: false
                });
              }

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);

              _this.setState({
                isError: true,
                isLoading: false
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 10]]);
    }));
    _this.resubscribe = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var offerDetails, response;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              offerDetails = _this.props.offerDetails;
              _context2.prev = 1;

              _this.setState({
                isLoading: true
              });

              _context2.next = 5;
              return (0, _updateSubscription.default)({
                offerId: offerDetails.offerId,
                status: 'active'
              });

            case 5:
              response = _context2.sent;

              if (response.errors.length) {
                _this.setState({
                  isError: true,
                  isLoading: false
                });
              } else {
                _this.setState({
                  currentStep: 2,
                  isLoading: false
                });
              }

              _context2.next = 12;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](1);

              _this.setState({
                isError: true,
                isLoading: false
              });

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 9]]);
    }));
    _this.state = {
      checkedReason: '',
      isError: false,
      isLoading: false,
      currentStep: 1
    };
    return _this;
  }

  (0, _createClass2.default)(UpdateSubscription, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          checkedReason = _this$state.checkedReason,
          isError = _this$state.isError,
          isLoading = _this$state.isLoading,
          currentStep = _this$state.currentStep;
      var _this$props = this.props,
          hideInnerPopup = _this$props.hideInnerPopup,
          offerDetails = _this$props.offerDetails,
          updateList = _this$props.updateList,
          action = _this$props.action,
          t = _this$props.t;
      var price = offerDetails.price ? offerDetails.price.slice(0, -1) : '';
      var priceRounded = Math.round(price * 100) / 100;
      var currency = offerDetails.price ? offerDetails.price.slice(-1) : '';
      var popupContent = _UpdateSubscription.content[action][currentStep - 1];

      var resubscribeText = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("b", null, "".concat(priceRounded).concat(currency)), " ", t(popupContent.startedFrom), ' ', /*#__PURE__*/_react.default.createElement("b", null, (0, _planHelper.dateFormat)(offerDetails.expiresAt), "."));

      return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
        steps: 2,
        popupTitle: t('Manage your plan'),
        isError: isError,
        currentStep: currentStep
      }, currentStep === 1 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t(popupContent.title)), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t(popupContent.text1), ' ', /*#__PURE__*/_react.default.createElement(_UpdateSubscriptionStyled.StrongStyled, null, t(popupContent.buttonText)), ' ', t(popupContent.text2), ' ', action === 'resubscribe' && resubscribeText), popupContent.reasons && /*#__PURE__*/_react.default.createElement(_UpdateSubscriptionStyled.ReasonsWrapper, null, _UpdateSubscription.cancellationReasons.map(function (reason) {
        return /*#__PURE__*/_react.default.createElement(_UpdateSubscriptionStyled.StyledItem, {
          key: reason.key
        }, /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
          isRadioButton: true,
          onClickFn: function onClickFn() {
            return _this2.setState({
              checkedReason: reason.value
            });
          },
          checked: reason.value === checkedReason
        }, t(reason.value)));
      }))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, {
        removeMargin: action === 'unsubscribe'
      }, /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "simple",
        onClickFn: hideInnerPopup
      }, t('No, thanks')), /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: popupContent.buttonTheme,
        onClickFn: this[action],
        disabled: action === 'unsubscribe' && checkedReason === '' || isLoading
      }, isLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) || t(popupContent.buttonText)))) : /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement("img", {
        src: _checkmark.default,
        alt: "checkmark icon"
      }), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, null, t(popupContent.title)), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, null, t(popupContent.text), ' ', action === 'resubscribe' && resubscribeText, /*#__PURE__*/_react.default.createElement("b", null, (0, _planHelper.dateFormat)(offerDetails.expiresAt)), "."), /*#__PURE__*/_react.default.createElement(_Button.default, {
        width: "auto",
        margin: "30px auto 0 auto",
        onClickFn: function onClickFn() {
          hideInnerPopup();
          updateList();
        }
      }, t(popupContent.buttonText))));
    }
  }]);
  return UpdateSubscription;
}(_react.Component);

exports.PureUpdateSubscription = UpdateSubscription;
UpdateSubscription.defaultProps = {
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(UpdateSubscription));

exports.default = _default;