"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SkeletonCard = exports.PureCurrentPlan = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _planHelper = require("../../util/planHelper");
var _MyAccountError = _interopRequireDefault(require("../MyAccountError"));
var _OfferCard = _interopRequireDefault(require("../OfferCard"));
var _SubscriptionManagement = _interopRequireDefault(require("../SubscriptionManagement"));
var _MessageBox = _interopRequireDefault(require("../MessageBox"));
var _MyAccountErrorStyled = require("../MyAccountError/MyAccountErrorStyled");
var _CurrentPlanStyled = require("./CurrentPlanStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var NoSubscriptionsIcon = function NoSubscriptionsIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M77.763 43.205h-4.766a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h4.766a1.382 1.382 0 0 0 1.381-1.38v-7.907a7.824 7.824 0 0 1-4.821-2.467 7.826 7.826 0 0 1-2.084-5.326 7.826 7.826 0 0 1 2.084-5.326 7.824 7.824 0 0 1 4.821-2.467V8.901a1.382 1.382 0 0 0-1.381-1.38H22.391a1.382 1.382 0 0 0-1.38 1.38v1.033a.762.762 0 0 1-.762.762.762.762 0 0 1-.762-.762V8.901a2.908 2.908 0 0 1 2.9-2.9h55.372a2.908 2.908 0 0 1 2.9 2.9v8.183a1.224 1.224 0 0 1-1.115 1.213 6.3 6.3 0 0 0-4.111 2.011 6.307 6.307 0 0 0-1.679 4.292 6.307 6.307 0 0 0 1.679 4.292 6.3 6.3 0 0 0 4.111 2.011 1.224 1.224 0 0 1 1.115 1.213v8.183a2.908 2.908 0 0 1-2.896 2.906Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M22.391 43.204a2.908 2.908 0 0 1-2.9-2.9v-8.181a1.223 1.223 0 0 1 1.12-1.214 6.3 6.3 0 0 0 4.129-2 6.3 6.3 0 0 0 1.688-4.3 6.3 6.3 0 0 0-1.688-4.3 6.3 6.3 0 0 0-4.129-2 .762.762 0 0 1-.7-.82.762.762 0 0 1 .82-.7 7.823 7.823 0 0 1 5.125 2.486 7.823 7.823 0 0 1 2.094 5.338 7.823 7.823 0 0 1-2.094 5.338 7.823 7.823 0 0 1-4.843 2.459v7.9a1.382 1.382 0 0 0 1.38 1.38.762.762 0 0 1 .762.762.762.762 0 0 1-.764.752Z",
    fill: "#838eaa"
  })))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M33.516 10.616a.762.762 0 0 1-.762-.762V7.003a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v2.851a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M33.516 20.027a.762.762 0 0 1-.762-.762V14.66a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v4.605a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M33.516 27.684a.762.762 0 0 1-.762-.762v-4.605a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v4.605a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M33.516 35.342a.762.762 0 0 1-.762-.762v-4.605a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v4.605a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M33.516 42.999a.762.762 0 0 1-.762-.762v-4.605a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v4.605a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M63.165 30.518a7.088 7.088 0 0 1 6.488-7.062.455.455 0 0 0 .417-.454v-8.183a2.142 2.142 0 0 0-2.143-2.142H12.555a2.142 2.142 0 0 0-2.142 2.142V23a.455.455 0 0 0 .418.454 7.088 7.088 0 0 1 6.518 7.065 7.088 7.088 0 0 1-6.518 7.065.455.455 0 0 0-.418.454v8.181a2.142 2.142 0 0 0 2.142 2.142h55.372a2.142 2.142 0 0 0 2.143-2.142v-8.184a.455.455 0 0 0-.417-.454 7.088 7.088 0 0 1-6.488-7.063Z",
    fill: "#f2f5fc"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M67.927 49.122H12.553a2.907 2.907 0 0 1-2.9-2.9v-8.181a1.223 1.223 0 0 1 1.12-1.214 6.3 6.3 0 0 0 4.129-2 6.3 6.3 0 0 0 1.688-4.3 6.3 6.3 0 0 0-1.688-4.3 6.3 6.3 0 0 0-4.129-2 1.223 1.223 0 0 1-1.12-1.214v-8.181a2.907 2.907 0 0 1 2.9-2.9h55.372a2.907 2.907 0 0 1 2.9 2.9v8.183a1.224 1.224 0 0 1-1.115 1.213 6.3 6.3 0 0 0-4.111 2.011 6.3 6.3 0 0 0-1.679 4.292 6.3 6.3 0 0 0 1.679 4.292 6.3 6.3 0 0 0 4.111 2.011 1.224 1.224 0 0 1 1.115 1.213v8.183a2.907 2.907 0 0 1-2.898 2.892ZM11.174 38.31v7.9a1.382 1.382 0 0 0 1.381 1.38h55.372a1.382 1.382 0 0 0 1.38-1.38v-7.9a7.823 7.823 0 0 1-4.821-2.467 7.825 7.825 0 0 1-2.084-5.326 7.825 7.825 0 0 1 2.084-5.326 7.823 7.823 0 0 1 4.821-2.467v-7.907a1.382 1.382 0 0 0-1.38-1.38H12.553a1.382 1.382 0 0 0-1.381 1.38v7.9a7.823 7.823 0 0 1 4.842 2.459 7.824 7.824 0 0 1 2.094 5.338 7.824 7.824 0 0 1-2.094 5.338 7.823 7.823 0 0 1-4.84 2.458Zm58.415.025Z",
    fill: "#838eaa"
  })))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "M23.68 12.92v4.605"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M23.68 18.287a.762.762 0 0 1-.762-.762V12.92a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v4.605a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "M23.68 20.577v4.605"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M23.68 25.944a.762.762 0 0 1-.762-.762v-4.605a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v4.605a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "M23.68 28.234v4.605"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M23.68 33.601a.762.762 0 0 1-.762-.762v-4.605a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v4.605a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "M23.68 35.892v4.605"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M23.68 41.259a.762.762 0 0 1-.762-.762v-4.605a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v4.605a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "M23.68 43.549v4.605"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M23.68 48.916a.762.762 0 0 1-.762-.762v-4.605a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v4.605a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M52.719 38.344a.762.762 0 0 1-.722-.52 8.177 8.177 0 0 0-7.76-5.577 8.179 8.179 0 0 0-7.756 5.564.762.762 0 0 1-.966.478.762.762 0 0 1-.478-.966 9.7 9.7 0 0 1 9.2-6.6 9.7 9.7 0 0 1 9.2 6.616.762.762 0 0 1-.48.965.759.759 0 0 1-.238.04Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(34.663 23.453)"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    cx: "2.039",
    cy: "2.039",
    r: "2.039",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M36.704 27.559a2.069 2.069 0 0 1-2.067-2.067 2.069 2.069 0 0 1 2.067-2.067 2.069 2.069 0 0 1 2.067 2.067 2.069 2.069 0 0 1-2.067 2.067Zm0-4.078a2.013 2.013 0 0 0-2.011 2.011 2.013 2.013 0 0 0 2.011 2.011 2.013 2.013 0 0 0 2.011-2.011 2.013 2.013 0 0 0-2.011-2.011Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(49.738 23.453)"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    cx: "2.039",
    cy: "2.039",
    r: "2.039",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M51.776 27.559a2.069 2.069 0 0 1-2.067-2.067 2.069 2.069 0 0 1 2.067-2.067 2.069 2.069 0 0 1 2.066 2.067 2.069 2.069 0 0 1-2.066 2.067Zm0-4.078a2.014 2.014 0 0 0-2.012 2.011 2.014 2.014 0 0 0 2.012 2.011 2.013 2.013 0 0 0 2.011-2.011 2.013 2.013 0 0 0-2.011-2.011Z",
    fill: "#838eaa"
  }))))))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M81.701 51.579h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M88.009 51.579h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M84.069 49.211a.761.761 0 0 1-.762-.762v-1.572a.761.761 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M84.069 55.52a.761.761 0 0 1-.762-.762v-1.572a.761.761 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M2.334 5.462H.762A.762.762 0 0 1 0 4.7a.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M8.642 5.462H7.07a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M4.701 3.096a.762.762 0 0 1-.762-.762V.762A.762.762 0 0 1 4.701 0a.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M4.701 9.404a.762.762 0 0 1-.762-.762V7.07a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))))));
};
NoSubscriptionsIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "88.77",
  height: "55.519"
};
var SkeletonCard = function SkeletonCard() {
  return /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionStyled, null, /*#__PURE__*/_react.default.createElement(_OfferCard.default, {
    isDataLoaded: false
  }));
};
exports.SkeletonCard = SkeletonCard;
var supportedPaymentGateways = ['paypal', 'card', 'adyen'];
var CurrentPlan = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2.default)(CurrentPlan, _PureComponent);
  var _super = _createSuper(CurrentPlan);
  function CurrentPlan(props) {
    var _this;
    (0, _classCallCheck2.default)(this, CurrentPlan);
    _this = _super.call(this, props);
    _this.showMessageBox = function (type, text, subscriptionId) {
      _this.setState({
        messageBoxType: type,
        messageBoxText: text,
        isMessageBoxOpened: true,
        messageSubscriptionId: subscriptionId
      });
    };
    _this.state = {
      isMessageBoxOpened: false,
      messageBoxType: null,
      messageBoxText: '',
      messageSubscriptionId: null
    };
    return _this;
  }

  // eslint-disable-next-line class-methods-use-this
  (0, _createClass2.default)(CurrentPlan, [{
    key: "getInfoBoxType",
    value: function getInfoBoxType(subscription) {
      if (subscription.offerType !== 'S') return '';
      if (subscription.status === 'active' && subscription.pendingSwitchId) return 'SWITCH';
      if (supportedPaymentGateways.includes(subscription.paymentGateway)) return '';
      return 'INAPP_SUBSCRIPTION';
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$state = this.state,
        isMessageBoxOpened = _this$state.isMessageBoxOpened,
        messageBoxType = _this$state.messageBoxType,
        messageBoxText = _this$state.messageBoxText,
        messageSubscriptionId = _this$state.messageSubscriptionId;
      var _this$props = this.props,
        subscriptions = _this$props.subscriptions,
        isLoading = _this$props.isLoading,
        errors = _this$props.errors,
        showInnerPopup = _this$props.showInnerPopup,
        setOfferToSwitch = _this$props.setOfferToSwitch,
        offerToSwitch = _this$props.offerToSwitch,
        updateList = _this$props.updateList,
        t = _this$props.t;
      return isLoading ? /*#__PURE__*/_react.default.createElement(SkeletonCard, null) : /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.WrapStyled, null, errors.length !== 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
        generalError: true
      }) : subscriptions.length === 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountErrorStyled.WrapStyled, null, /*#__PURE__*/_react.default.createElement(_MyAccountErrorStyled.IconStyled, null, /*#__PURE__*/_react.default.createElement(NoSubscriptionsIcon, null)), /*#__PURE__*/_react.default.createElement(_MyAccountErrorStyled.TitleStyled, null, t('No offers yet!')), /*#__PURE__*/_react.default.createElement(_MyAccountErrorStyled.SubTitleStyled, null, (0, _appConfigHelper.getData)('CLEENG_OFFER_SELECTION_URL') ? /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
        i18nKey: "myaccount-nooffers-withlink"
      }, "If you", ' ', /*#__PURE__*/_react.default.createElement("a", {
        href: (0, _appConfigHelper.getData)('CLEENG_OFFER_SELECTION_URL'),
        target: "_blank",
        rel: "noreferrer"
      }, "choose your plan"), ", you will be able to manage your offers here.") : t('If you choose your plan, you will be able to manage your offers here.'))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, subscriptions.map(function (subItem) {
        var description;
        var price;
        var currency;
        var renewalDate;
        switch (subItem.offerType) {
          case 'S':
            price = subItem.nextPaymentPrice;
            currency = subItem.nextPaymentCurrency;
            renewalDate = (0, _planHelper.dateFormat)(subItem.expiresAt);
            if (subItem.status === 'active' && !subItem.pendingSwitchId) {
              description = "".concat(t('Renews automatically on {{renewalDate}}', {
                renewalDate: renewalDate
              }));
            } else if (subItem.status === 'cancelled') {
              description = "".concat(t('This plan will expire on {{renewalDate}}', {
                renewalDate: renewalDate
              }));
            } else {
              description = '';
            }
            break;
          case 'P':
            price = subItem.totalPrice;
            currency = subItem.customerCurrency;
            description = "".concat(t('Expires on'), " ").concat((0, _planHelper.dateFormat)(subItem.expiresAt));
            break;
          default:
            break;
        }
        return /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.SubscriptionStyled, {
          key: subItem.offerId,
          onClick: function onClick() {
            if (subscriptions.length > 1 && subItem.offerType === 'S' && subItem.status === 'active') setOfferToSwitch(subItem);
          },
          cursorPointer: subscriptions.length > 1 && subItem.status === 'active' && subItem.offerType === 'S',
          isSelected: subscriptions.length > 1 && offerToSwitch.offerId === subItem.offerId
        }, /*#__PURE__*/_react.default.createElement(_OfferCard.default, {
          period: subItem.period,
          offerType: subItem.offerType,
          title: subItem.offerTitle,
          description: description,
          currency: _planHelper.currencyFormat[currency],
          price: price,
          isMyAccount: true,
          showInfoBox: _this2.getInfoBoxType(subItem),
          paymentMethod: subItem.paymentMethod,
          pendingSwitchId: subItem.pendingSwitchId,
          expiresAt: (0, _planHelper.dateFormat)(subItem.expiresAt),
          showInnerPopup: showInnerPopup,
          offerId: subItem.offerId
        }), isMessageBoxOpened && messageSubscriptionId === subItem.subscriptionId && /*#__PURE__*/_react.default.createElement(_CurrentPlanStyled.StatusMessageWrapStyled, null, /*#__PURE__*/_react.default.createElement(_MessageBox.default, {
          type: messageBoxType,
          message: messageBoxText
        })), subItem.offerType === 'S' && supportedPaymentGateways.includes(subItem.paymentGateway) && /*#__PURE__*/_react.default.createElement(_SubscriptionManagement.default, {
          subscription: subItem,
          showInnerPopup: showInnerPopup,
          updateList: updateList,
          showMessageBox: _this2.showMessageBox,
          setOfferToSwitch: setOfferToSwitch
        }));
      })));
    }
  }]);
  return CurrentPlan;
}(_react.PureComponent);
exports.PureCurrentPlan = CurrentPlan;
CurrentPlan.propTypes = {
  subscriptions: _propTypes.default.arrayOf(_propTypes.default.shape({
    subscriptionId: _propTypes.default.number,
    offerId: _propTypes.default.string,
    status: _propTypes.default.string,
    startedAt: _propTypes.default.number,
    expiresAt: _propTypes.default.number,
    nextPaymentPrice: _propTypes.default.number,
    nextPaymentCurrency: _propTypes.default.string,
    nextPaymentAt: _propTypes.default.number,
    paymentGateway: _propTypes.default.string,
    paymentMethod: _propTypes.default.string,
    externalPaymentId: _propTypes.default.string,
    inTrial: _propTypes.default.bool,
    offerTitle: _propTypes.default.string,
    period: _propTypes.default.string,
    totalPrice: _propTypes.default.number
  })),
  isLoading: _propTypes.default.bool,
  errors: _propTypes.default.arrayOf(_propTypes.default.string),
  showInnerPopup: _propTypes.default.func.isRequired,
  setOfferToSwitch: _propTypes.default.func.isRequired,
  offerToSwitch: _propTypes.default.shape({
    subscriptionId: _propTypes.default.number,
    offerId: _propTypes.default.string,
    status: _propTypes.default.string,
    startedAt: _propTypes.default.number,
    expiresAt: _propTypes.default.number,
    nextPaymentPrice: _propTypes.default.number,
    nextPaymentCurrency: _propTypes.default.string,
    nextPaymentAt: _propTypes.default.number,
    paymentGateway: _propTypes.default.string,
    paymentMethod: _propTypes.default.string,
    externalPaymentId: _propTypes.default.string,
    inTrial: _propTypes.default.bool,
    offerTitle: _propTypes.default.string,
    period: _propTypes.default.string,
    totalPrice: _propTypes.default.number
  }),
  updateList: _propTypes.default.func.isRequired,
  switchDetails: _propTypes.default.shape((0, _defineProperty2.default)({}, _propTypes.default.string, _propTypes.default.shape({
    id: _propTypes.default.string,
    customerId: _propTypes.default.number,
    direction: _propTypes.default.string,
    algorithm: _propTypes.default.string,
    fromOfferId: _propTypes.default.string,
    toOfferId: _propTypes.default.string,
    subscriptionId: _propTypes.default.string,
    status: _propTypes.default.string,
    createdAt: _propTypes.default.number,
    updatedAt: _propTypes.default.number
  }))),
  t: _propTypes.default.func
};
CurrentPlan.defaultProps = {
  subscriptions: [],
  isLoading: false,
  errors: [],
  offerToSwitch: {},
  switchDetails: {},
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(CurrentPlan));
exports.default = _default;