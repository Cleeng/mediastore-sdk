"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureFreeOffer = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _submitPaymentWithoutDetails = _interopRequireDefault(require("../../api/Payment/submitPaymentWithoutDetails"));
var _appConfigHelper = require("../../util/appConfigHelper");
var _planHelper = require("../../util/planHelper");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _Button = _interopRequireDefault(require("../Button"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _FreeOfferStyled = require("./FreeOfferStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FreeOffer = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(FreeOffer, _Component);
  var _super = _createSuper(FreeOffer);
  function FreeOffer(props) {
    var _this;
    (0, _classCallCheck2.default)(this, FreeOffer);
    _this = _super.call(this, props);
    _this.generateDescriptionForFreeOffer = function (period, expiresAt, startTime) {
      var offerType = (0, _appConfigHelper.getData)('CLEENG_OFFER_ID').charAt(0);
      switch (offerType) {
        case 'S':
          {
            return "Free subscription";
          }
        case 'P':
          {
            if (!period) {
              return "Access until ".concat((0, _planHelper.dateFormat)(expiresAt, true));
            }
            return "".concat(_planHelper.periodMapper[period].accessText, " free pass");
          }
        case 'E':
          {
            return "Free event ".concat(startTime ? (0, _planHelper.dateFormat)(startTime, true) : '');
          }
        case 'R':
          {
            return "".concat(_planHelper.periodMapper[period].accessText, " free access");
          }
        case 'A':
          return 'Unlimited access';
        default:
          return '';
      }
    };
    _this.getAccessToFreeOffer = function () {
      var _this$props = _this.props,
        onPaymentComplete = _this$props.onPaymentComplete,
        t = _this$props.t;
      _this.setState({
        isLoading: true,
        error: ''
      });
      (0, _submitPaymentWithoutDetails.default)().then(function (paymentReponse) {
        if (paymentReponse.errors.length) {
          if (paymentReponse.errors[0].includes("Order doesn't have paymentMethodId")) {
            _this.setState({
              isLoading: false,
              error: t('Unable to proceed, because of wrong offer settings. Please, contact the owner of the offer')
            });
          } else {
            _this.setState({
              isLoading: false,
              error: t('Oops, something went wrong! Please, reload the page and try again')
            });
          }
        } else {
          onPaymentComplete();
        }
      });
    };
    _this.state = {
      isLoading: false,
      error: ''
    };
    return _this;
  }
  (0, _createClass2.default)(FreeOffer, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        icon = _this$props2.icon,
        period = _this$props2.period,
        expiresAt = _this$props2.expiresAt,
        startTime = _this$props2.startTime,
        title = _this$props2.title,
        offerId = _this$props2.offerId,
        t = _this$props2.t;
      var _this$state = this.state,
        isLoading = _this$state.isLoading,
        error = _this$state.error;
      return /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.WrapStyled, null, /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.CardStyled, null, /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.SubscriptionIconStyled, {
        icon: icon
      }), /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.TitleStyled, null, t("offer-title-".concat(offerId), title)), /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.DescriptionStyled, null, this.generateDescriptionForFreeOffer(period, expiresAt, startTime)), /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.ButtonWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "confirm",
        width: "200px",
        onClickFn: this.getAccessToFreeOffer,
        disabled: isLoading
      }, isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) : t('Get Access')), error && /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.ErrorMessageStyled, null, error)), /*#__PURE__*/_react.default.createElement(_FreeOfferStyled.SubTextStyled, null, t('Free, no additional cost'))));
    }
  }]);
  return FreeOffer;
}(_react.Component);
exports.PureFreeOffer = FreeOffer;
FreeOffer.propTypes = {
  icon: _propTypes.default.string,
  title: _propTypes.default.string,
  period: _propTypes.default.string,
  expiresAt: _propTypes.default.string,
  startTime: _propTypes.default.number,
  onPaymentComplete: _propTypes.default.func.isRequired,
  offerId: _propTypes.default.string,
  t: _propTypes.default.func
};
FreeOffer.defaultProps = {
  icon: '',
  title: '',
  period: '',
  expiresAt: null,
  startTime: null,
  offerId: '',
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(FreeOffer));
exports.default = _default;