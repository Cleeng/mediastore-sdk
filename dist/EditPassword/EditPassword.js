"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureEditPassword = void 0;

var _regenerator = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createClass"));

var _inherits2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/inherits"));

var _createSuper2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/createSuper"));

var _react = _interopRequireWildcard(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _appConfigHelper = require("util/appConfigHelper");

var _resetPassword = _interopRequireDefault(require("api/Auth/resetPassword"));

var _Button = _interopRequireDefault(require("components/Button"));

var _Loader = _interopRequireDefault(require("components/Loader"));

var _auth = _interopRequireDefault(require("services/auth"));

var _InnerPopupWrapper = _interopRequireDefault(require("components/InnerPopupWrapper"));

var _InnerPopupWrapperStyled = require("components/InnerPopupWrapper/InnerPopupWrapperStyled");

var _EditPassword = _interopRequireDefault(require("./EditPassword.const"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var EditPassword = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2.default)(EditPassword, _PureComponent);

  var _super = (0, _createSuper2.default)(EditPassword);

  function EditPassword(props) {
    var _this;

    (0, _classCallCheck2.default)(this, EditPassword);
    _this = _super.call(this, props);

    _this.renderNextStep = function () {
      _this.setState(function (prevState) {
        return {
          step: prevState.step + 1
        };
      });
    };

    _this.logout = function () {
      var hideInnerPopup = _this.props.hideInnerPopup;
      hideInnerPopup();

      _auth.default.logout(true);
    };

    _this.resetPassword = /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
      var customerEmail, publisherId, response;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              customerEmail = (0, _appConfigHelper.getData)('CLEENG_CUSTOMER_EMAIL');
              publisherId = (0, _appConfigHelper.getData)('CLEENG_PUBLISHER_ID');

              _this.setState({
                isLoading: true
              });

              _context.prev = 3;
              _context.next = 6;
              return (0, _resetPassword.default)('', customerEmail, publisherId);

            case 6:
              response = _context.sent;

              if (!response.errors.length) {
                _this.renderNextStep();

                _this.setState({
                  isLoading: false
                });
              } else {
                _this.setState({
                  isLoading: false,
                  isError: true
                });
              }

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);

              _this.setState({
                isLoading: false,
                isError: true
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 10]]);
    }));
    _this.state = {
      step: 1,
      isLoading: false,
      isError: false
    };
    return _this;
  }

  (0, _createClass2.default)(EditPassword, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          step = _this$state.step,
          isLoading = _this$state.isLoading,
          isError = _this$state.isError;
      var _this$props = this.props,
          t = _this$props.t,
          hideInnerPopup = _this$props.hideInnerPopup;
      var steps = _EditPassword.default.steps;
      var stepData = steps[step - 1];
      var customerEmail = (0, _appConfigHelper.getData)('CLEENG_CUSTOMER_EMAIL');
      return /*#__PURE__*/_react.default.createElement(_InnerPopupWrapper.default, {
        steps: 2,
        popupTitle: "Edit Password",
        isError: isError,
        currentStep: step
      }, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ContentStyled, null, /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TitleStyled, {
        step: step
      }, t(stepData.title)), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.TextStyled, {
        step: step
      }, t(stepData.text), step === 1 && /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.MailStyled, null, customerEmail), t(stepData.secondText) && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement("br", null), t(stepData.secondText)))), /*#__PURE__*/_react.default.createElement(_InnerPopupWrapperStyled.ButtonWrapperStyled, null, stepData.undoButton && /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "simple",
        onClickFn: function onClickFn() {
          return hideInnerPopup();
        }
      }, t(stepData.undoButton)), /*#__PURE__*/_react.default.createElement(_Button.default, {
        theme: "confirm",
        onClickFn: this[stepData.buttonAction]
      }, isLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
        buttonLoader: true,
        color: "#ffffff"
      }) || t(stepData.buttonText))));
    }
  }]);
  return EditPassword;
}(_react.PureComponent);

exports.PureEditPassword = EditPassword;
EditPassword.defaultProps = {
  t: function t(k) {
    return k;
  }
};

var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(EditPassword));

exports.default = _default;