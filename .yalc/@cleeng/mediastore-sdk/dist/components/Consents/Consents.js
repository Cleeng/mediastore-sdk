"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Consents = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Checkbox = _interopRequireDefault(require("../Checkbox"));
var _api = require("../../api");
var _Loader = _interopRequireDefault(require("../Loader"));
var _ConsentsStyled = require("./ConsentsStyled");
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var regexHrefOpenTag = new RegExp(/<a(.|\n)*?>/);
var regexHrefCloseTag = new RegExp(/<\/a(.|\n)*?>/);
var Consents = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(Consents, _React$Component);
  var _super = _createSuper(Consents);
  function Consents(props) {
    var _this;
    (0, _classCallCheck2.default)(this, Consents);
    _this = _super.call(this, props);
    _this.getConsents = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(publisherId) {
        var consentsIncome, consentsDetails, labels, initArray, disabledRegisterButton;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return (0, _api.getConsents)(publisherId);
              case 3:
                consentsIncome = _context.sent;
                if (consentsIncome.responseData && consentsIncome.responseData.consents) {
                  consentsDetails = consentsIncome.responseData.consents.map(function (element) {
                    return {
                      name: element.name,
                      version: element.version,
                      required: element.required
                    };
                  });
                  labels = consentsIncome.responseData.consents.map(function (element) {
                    return element.label;
                  });
                  initArray = new Array(consentsDetails.length).fill(false);
                  _this.setState({
                    consentDefinitions: consentsDetails,
                    consentLoaded: true,
                    consentsLabels: labels,
                    checked: initArray
                  });
                } else if (consentsIncome.errors.includes('Invalid param publisherId')) {
                  disabledRegisterButton = _this.props.disabledRegisterButton;
                  _this.setState({
                    consentLoaded: true,
                    generalError: 'noPublisherId'
                  });
                  disabledRegisterButton();
                }
                _context.next = 10;
                break;
              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", _context.t0);
              case 10:
                return _context.abrupt("return", false);
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    _this.changeConsentState = function (consentID) {
      var _this$state = _this.state,
        consentDefinitions = _this$state.consentDefinitions,
        checked = _this$state.checked;
      if (consentDefinitions.length > 0) {
        checked[consentID] = !checked[consentID];
        _this.setState({
          checked: checked
        });
      }
      _this.validateConsents();
    };
    _this.validateConsents = function () {
      var onChangeFn = _this.props.onChangeFn;
      var _this$state2 = _this.state,
        consentDefinitions = _this$state2.consentDefinitions,
        checked = _this$state2.checked;
      onChangeFn(checked, consentDefinitions);
    };
    _this.translateConsents = function (consentContent) {
      var t = _this.props.t;
      var openTagContent = regexHrefOpenTag.exec(consentContent);
      var closeTagContent = regexHrefCloseTag.exec(consentContent);
      if (openTagContent) {
        var modifiedConsentContent = consentContent.replace(regexHrefOpenTag, '{{htmltag}}');
        modifiedConsentContent = modifiedConsentContent.replace(regexHrefCloseTag, '{{endhtmltag}}');
        return "".concat(t(modifiedConsentContent, {
          htmltag: openTagContent[0],
          endhtmltag: closeTagContent[0]
        }));
      }
      return t(consentContent);
    };
    _this.state = {
      consentDefinitions: [],
      checked: [],
      consentsLabels: [],
      consentLoaded: false,
      generalError: ''
    };
    return _this;
  }
  (0, _createClass2.default)(Consents, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var publisherId = this.props.publisherId;
      if (publisherId) {
        this.getConsents(publisherId).then(function () {});
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;
      var publisherId = this.props.publisherId;
      if (prevProps.publisherId !== publisherId) {
        this.getConsents(publisherId).then(function () {
          _this2.validateConsents();
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$state3 = this.state,
        checked = _this$state3.checked,
        consentsLabels = _this$state3.consentsLabels,
        consentDefinitions = _this$state3.consentDefinitions,
        consentLoaded = _this$state3.consentLoaded,
        generalError = _this$state3.generalError;
      var _this$props = this.props,
        error = _this$props.error,
        t = _this$props.t;
      if (generalError === 'noPublisherId') {
        return /*#__PURE__*/_react.default.createElement(_ConsentsStyled.GeneralErrorStyled, null, t('Unable to fetch terms & conditions. Publisher is not recognized'));
      }
      return /*#__PURE__*/_react.default.createElement(_ConsentsStyled.ConsentsWrapperStyled, null, !consentLoaded ? /*#__PURE__*/_react.default.createElement(_Loader.default, null) : /*#__PURE__*/_react.default.createElement(_ConsentsStyled.FieldsetStyled, null, /*#__PURE__*/_react.default.createElement(_ConsentsStyled.InvisibleLegend, null, "Consents "), consentDefinitions.map(function (consent, index) {
        return /*#__PURE__*/_react.default.createElement(_Checkbox.default, {
          onClickFn: function onClickFn() {
            return _this3.changeConsentState(index);
          },
          checked: checked[index],
          error: error,
          key: String(index),
          required: consent.required && !checked[index]
        }, consentsLabels[index]);
      })), error && /*#__PURE__*/_react.default.createElement(_ConsentsStyled.ConsentsErrorStyled, null, error));
    }
  }]);
  return Consents;
}(_react.default.Component);
exports.Consents = Consents;
Consents.propTypes = {
  publisherId: _propTypes.default.string,
  error: _propTypes.default.string,
  onChangeFn: _propTypes.default.func,
  disabledRegisterButton: _propTypes.default.func,
  t: _propTypes.default.func
};
Consents.defaultProps = {
  publisherId: '',
  error: '',
  onChangeFn: function onChangeFn() {},
  disabledRegisterButton: function disabledRegisterButton() {},
  t: function t(k) {
    return k;
  }
};
var _default = Consents;
exports.default = _default;