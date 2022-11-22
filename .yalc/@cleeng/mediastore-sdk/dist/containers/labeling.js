"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = customLabeling;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _react = _interopRequireDefault(require("react"));
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
/* eslint-disable react/prop-types  */
/* eslint-disable react/jsx-props-no-spreading */
function customLabeling() {
  // ...and returns another component...
  return function (WrappedComponent) {
    return /*#__PURE__*/function (_React$Component) {
      (0, _inherits2.default)(_class, _React$Component);
      var _super = _createSuper(_class);
      function _class(props) {
        var _this;
        (0, _classCallCheck2.default)(this, _class);
        _this = _super.call(this, props);
        _this.state = {
          dataLoaded: false
        };
        return _this;
      }
      (0, _createClass2.default)(_class, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.addTranslations();
        }
      }, {
        key: "addTranslations",
        value: function () {
          var _addTranslations = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
            var BASE_URL, i18n, language, data;
            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    BASE_URL = window.location.origin;
                    i18n = this.props.i18n;
                    if (!(typeof i18n === 'undefined')) {
                      _context.next = 4;
                      break;
                    }
                    return _context.abrupt("return", false);
                  case 4:
                    language = i18n.language || 'en';
                    if (i18n.hasResourceBundle(language, 'translation')) {
                      _context.next = 10;
                      break;
                    }
                    _context.next = 8;
                    return fetch("".concat(BASE_URL, "/cleeng-translations/").concat(language, "/translations.json")).then(function (response) {
                      return response.json();
                    }).catch(function () {});
                  case 8:
                    data = _context.sent;
                    i18n.addResourceBundle(language, 'translation', data, true, true);
                  case 10:
                    this.setState({
                      dataLoaded: true
                    });
                    return _context.abrupt("return", true);
                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function addTranslations() {
            return _addTranslations.apply(this, arguments);
          }
          return addTranslations;
        }()
      }, {
        key: "render",
        value: function render() {
          var dataLoaded = this.state.dataLoaded;
          // ... and renders the wrapped component with the fresh data!
          // Notice that we pass through any additional props
          return dataLoaded && /*#__PURE__*/_react.default.createElement(WrappedComponent, this.props);
        }
      }]);
      return _class;
    }(_react.default.Component);
  };
}