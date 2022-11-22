"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureMyAccountConsents = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _Loader = _interopRequireDefault(require("../Loader"));
var _submitConsents = _interopRequireDefault(require("../../api/Customer/submitConsents"));
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _MyAccountConsentsStyled = require("./MyAccountConsentsStyled");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var MyAccountConsents = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MyAccountConsents, _Component);
  var _super = _createSuper(MyAccountConsents);
  function MyAccountConsents(props) {
    var _this;
    (0, _classCallCheck2.default)(this, MyAccountConsents);
    _this = _super.call(this, props);
    _this.toggleState = function (state) {
      return state === 'accepted' ? 'declined' : 'accepted';
    };
    _this.state = {
      updatedConsents: [],
      isSectionDisabled: true,
      isLoading: false,
      isSubmittingPending: false,
      showButtonToUpdate: true
    };
    return _this;
  }
  (0, _createClass2.default)(MyAccountConsents, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var consents = this.props.consents;
      if (consents.length !== 0) {
        this.saveConsentsInState();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var consents = this.props.consents;
      if (prevProps.consents !== consents) {
        this.saveConsentsInState();
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(e, isConsentDisabled, item) {
      var _this2 = this;
      var _this$props = this.props,
        showConsentsOnly = _this$props.showConsentsOnly,
        saveConsents = _this$props.saveConsents;
      if (e.target.tagName.toLowerCase() === 'a') return; // enable to open link
      if (isConsentDisabled || !showConsentsOnly && item.required) return;
      var updatedConsents = this.state.updatedConsents;
      var itemIndex = updatedConsents.findIndex(function (el) {
        return el.name === item.name;
      });
      this.setState(function (prevState) {
        var copyConsentObj = _objectSpread({}, prevState.updatedConsents[itemIndex]);
        copyConsentObj.state = _this2.toggleState(copyConsentObj.state);
        var stateCopy = (0, _toConsumableArray2.default)(prevState.updatedConsents);
        stateCopy[itemIndex] = copyConsentObj;
        if (showConsentsOnly) {
          saveConsents(stateCopy);
        }
        return _objectSpread(_objectSpread({}, prevState), {}, {
          updatedConsents: stateCopy
        });
      });
    }
  }, {
    key: "saveConsentsInState",
    value: function saveConsentsInState() {
      var consents = this.props.consents;
      var showButtonToUpdate = consents.find(function (el) {
        return !el.required;
      });
      this.setState({
        updatedConsents: consents,
        showButtonToUpdate: !!showButtonToUpdate
      });
    }
  }, {
    key: "updateConsents",
    value: function updateConsents() {
      var _this3 = this;
      var updatedConsents = this.state.updatedConsents;
      var setConsents = this.props.setConsents;
      var payload = updatedConsents.map(function (item) {
        return {
          name: item.name,
          version: item.newestVersion,
          state: item.state
        };
      });
      this.setState({
        isSubmittingPending: true
      });
      (0, _submitConsents.default)([], [], payload).then(function () {
        _this3.setState({
          isSectionDisabled: true,
          isSubmittingPending: false
        });
        setConsents(updatedConsents);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var _this$props2 = this.props,
        t = _this$props2.t,
        consents = _this$props2.consents,
        isLoading = _this$props2.isLoading,
        showConsentsOnly = _this$props2.showConsentsOnly;
      var _this$state = this.state,
        updatedConsents = _this$state.updatedConsents,
        isSectionDisabled = _this$state.isSectionDisabled,
        isSubmittingPending = _this$state.isSubmittingPending,
        showButtonToUpdate = _this$state.showButtonToUpdate;
      var sortedConsents = updatedConsents.slice().sort(function (a, b) {
        return a.required === b.required ? 0 : a.required ? -1 : 1;
      });
      return isLoading ? /*#__PURE__*/_react.default.createElement(_Loader.default, {
        isMyAccount: true
      }) : /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.CardStyled, {
        showConsentsOnly: showConsentsOnly,
        withBorder: true
      }, sortedConsents.map(function (item) {
        return /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.CheckboxStyled, {
          isMyAccount: true,
          onClickFn: function onClickFn(e, isConsentDisabled) {
            return _this4.handleClick(e, isConsentDisabled, item);
          },
          checked: item.state === 'accepted',
          key: item.name,
          disabled: (isSectionDisabled || item.required) && !showConsentsOnly,
          required: item.required,
          hide: showConsentsOnly && !item.required
        }, t(item.label));
      }), !showConsentsOnly && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showButtonToUpdate && /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonWrapperStyled, null, isSectionDisabled ? /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
        onClickFn: function onClickFn() {
          return _this4.setState({
            isSectionDisabled: false
          });
        },
        width: "100%"
      }, t('Update Terms')) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
        theme: "simple",
        onClickFn: function onClickFn() {
          return _this4.setState({
            isSectionDisabled: true,
            updatedConsents: consents
          });
        }
      }, t('Cancel')), /*#__PURE__*/_react.default.createElement(_MyAccountConsentsStyled.ButtonStyled, {
        theme: "confirm",
        onClickFn: function onClickFn() {
          return _this4.updateConsents();
        },
        disabled: isSubmittingPending
      }, isSubmittingPending && /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) || t('Save'))))));
    }
  }]);
  return MyAccountConsents;
}(_react.Component);
exports.PureMyAccountConsents = MyAccountConsents;
MyAccountConsents.propTypes = {
  consents: _propTypes.default.arrayOf(_propTypes.default.object),
  setConsents: _propTypes.default.func.isRequired,
  isLoading: _propTypes.default.bool,
  showConsentsOnly: _propTypes.default.bool,
  saveConsents: _propTypes.default.func,
  t: _propTypes.default.func
};
MyAccountConsents.defaultProps = {
  consents: [],
  isLoading: false,
  showConsentsOnly: false,
  saveConsents: function saveConsents() {},
  t: function t(k) {
    return k;
  }
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(MyAccountConsents));
exports.default = _default;