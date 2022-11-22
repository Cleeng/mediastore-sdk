"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PurePopup = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _submitConsents = _interopRequireDefault(require("../../api/Customer/submitConsents"));
var _getCustomerConsents = _interopRequireDefault(require("../../api/Customer/getCustomerConsents"));
var _MyAccountConsents = _interopRequireDefault(require("../MyAccountConsents"));
var _PopupStyled = require("./PopupStyled");
var _Popup = _interopRequireDefault(require("./Popup.const"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Popup = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Popup, _Component);
  var _super = _createSuper(Popup);
  function Popup(props) {
    var _this;
    (0, _classCallCheck2.default)(this, Popup);
    _this = _super.call(this, props);
    _this.renderNextStep = function () {
      _this.setState(function (prevState) {
        return {
          step: prevState.step + 1
        };
      });
    };
    _this.handleSubmitConsents = function () {
      var updatedConsents = _this.state.updatedConsents;
      var setConsents = _this.props.setConsents;
      var payload = updatedConsents.map(function (item) {
        return {
          name: item.name,
          version: item.newestVersion,
          state: item.state
        };
      });
      _this.setState({
        isLoading: true
      });
      (0, _submitConsents.default)([], [], payload).then(function () {
        (0, _getCustomerConsents.default)().then(function (resp) {
          setConsents(resp.responseData.consents);
        });
      });
    };
    _this.state = {
      step: 1,
      updatedConsents: [],
      isLoading: false,
      allowSubmitConsents: false
    };
    return _this;
  }
  (0, _createClass2.default)(Popup, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var consents = this.props.consents;
      this.setState({
        updatedConsents: consents
      });
      this.checkAccess(consents);
    }
  }, {
    key: "checkAccess",
    value: function checkAccess(items) {
      var notCheckedTerm = items.find(function (item) {
        return item.required && item.state === 'declined';
      });
      if (notCheckedTerm) {
        this.setState({
          allowSubmitConsents: false
        });
      } else {
        this.setState({
          allowSubmitConsents: true
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        popupType = _this$props.popupType,
        consents = _this$props.consents,
        setConsents = _this$props.setConsents,
        hidePopup = _this$props.hidePopup,
        t = _this$props.t;
      var _this$state = this.state,
        step = _this$state.step,
        isLoading = _this$state.isLoading,
        allowSubmitConsents = _this$state.allowSubmitConsents;
      var stepData = _Popup.default[popupType].steps[step - 1];
      var steps = _Popup.default[popupType].steps;
      return /*#__PURE__*/_react.default.createElement(_PopupStyled.WrapperStyled, null, /*#__PURE__*/_react.default.createElement(_PopupStyled.HeaderStyled, null, /*#__PURE__*/_react.default.createElement(_PopupStyled.DotsWrapperStyled, {
        currentStep: step
      }, steps.length > 1 && steps.map(function (item) {
        return /*#__PURE__*/_react.default.createElement(_PopupStyled.DotStyled, {
          key: item.title
        });
      })), /*#__PURE__*/_react.default.createElement(_PopupStyled.HeaderTitleStyled, null, t(stepData.headerTitle))), /*#__PURE__*/_react.default.createElement(_PopupStyled.ContentStyled, {
        step: consents.length ? step : 1
      }, stepData.icon && /*#__PURE__*/_react.default.createElement(_PopupStyled.ImageStyled, {
        src: stepData.icon
      }), /*#__PURE__*/_react.default.createElement(_PopupStyled.TitleStyled, {
        step: step
      }, t(stepData.title)), /*#__PURE__*/_react.default.createElement(_PopupStyled.TextStyled, {
        step: step
      }, t(stepData.text)), step === 2 && consents && /*#__PURE__*/_react.default.createElement(_MyAccountConsents.default, {
        consents: consents,
        showConsentsOnly: true,
        saveConsents: function saveConsents(items) {
          _this2.setState({
            updatedConsents: items
          });
          _this2.checkAccess(items);
        },
        setConsents: setConsents
      })), /*#__PURE__*/_react.default.createElement(_PopupStyled.ButtonWrapperStyled, null, /*#__PURE__*/_react.default.createElement(_PopupStyled.InnerWrapperStyled, null, stepData.undoButton && /*#__PURE__*/_react.default.createElement(_PopupStyled.ButtonStyled, {
        onClickFn: hidePopup,
        theme: "secondary",
        width: "auto"
      }, t(stepData.undoButton)), /*#__PURE__*/_react.default.createElement(_PopupStyled.ButtonStyled, {
        onClickFn: this[stepData.buttonAction],
        disabled: step === 2 && !allowSubmitConsents,
        width: "auto"
      }, isLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) || t(stepData.buttonText)))), /*#__PURE__*/_react.default.createElement(_Footer.default, {
        isCheckout: false
      }));
    }
  }]);
  return Popup;
}(_react.Component);
exports.PurePopup = Popup;
Popup.propTypes = {
  setConsents: _propTypes.default.func,
  popupType: _propTypes.default.string,
  consents: _propTypes.default.arrayOf(_propTypes.default.object),
  hidePopup: _propTypes.default.func.isRequired,
  t: _propTypes.default.func
};
Popup.defaultProps = {
  popupType: '',
  setConsents: function setConsents() {},
  consents: [],
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Popup));
exports.default = _default;