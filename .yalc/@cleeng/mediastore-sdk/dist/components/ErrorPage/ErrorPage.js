"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _Header = _interopRequireDefault(require("../Header"));
var _ErrorPageStyled = require("./ErrorPageStyled");
var Close = function Close(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("style", null, ".a", "{", "fill:#cb4477", "}")), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M83.448 13.624V0H0v80.042h11.921v11.921h81.745V13.624ZM3.406 76.636V3.406h76.636v10.218H11.921v63.012ZM90.26 88.557H15.327V17.03H90.26Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M67.244 38.343a1.7 1.7 0 0 0-2.408 0L52.793 50.385 40.751 38.343a1.703 1.703 0 0 0-2.408 2.408l12.042 12.042-12.042 12.042a1.703 1.703 0 1 0 2.408 2.408l12.042-12.042 12.042 12.043a1.703 1.703 0 0 0 2.408-2.408L55.201 52.793l12.043-12.042a1.7 1.7 0 0 0 0-2.408Z"
  }));
};
Close.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "93.667",
  height: "91.963"
};
var DeleteCreditCard = function DeleteCreditCard(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("style", null, ".a", "{", "fill:#cb4477", "}")), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M14.828 26.36h9.885a4.943 4.943 0 0 0 4.943-4.943v-6.59a4.943 4.943 0 0 0-4.943-4.942h-9.885a4.943 4.943 0 0 0-4.943 4.943v6.59a4.943 4.943 0 0 0 4.943 4.943Zm9.885-3.3h-1.648v-3.3h3.3v1.648a1.648 1.648 0 0 1-1.652 1.657Zm1.648-8.238v1.653h-3.3v-3.29h1.648a1.648 1.648 0 0 1 1.651 1.643Zm-13.18 0a1.648 1.648 0 0 1 1.647-1.637h4.943v9.88h-4.943a1.648 1.648 0 0 1-1.643-1.647ZM56.016 13.18h3.3v6.59h-3.3ZM62.607 13.18h3.3v6.59h-3.3ZM69.197 13.18h3.3v6.59h-3.3ZM28.008 39.541a8.218 8.218 0 0 0-4.961 1.674 8.238 8.238 0 1 0 0 13.128 8.238 8.238 0 1 0 4.961-14.802Zm-9.885 13.18a4.943 4.943 0 1 1 4.943-4.943 4.943 4.943 0 0 1-4.943 4.943Zm9.885 0a4.91 4.91 0 0 1-2.768-.873 7.951 7.951 0 0 0 0-8.139 4.934 4.934 0 1 1 2.768 9.012ZM39.541 29.656h6.59v3.3h-6.59ZM52.721 29.656h6.59v3.3h-6.59ZM65.902 29.656h6.59v3.3h-6.59ZM79.082 29.656h6.59v3.3h-6.59Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M95.557 53.875V8.238A8.248 8.248 0 0 0 87.32 0H8.238A8.248 8.248 0 0 0 0 8.238v49.426A8.248 8.248 0 0 0 8.238 65.9h54.453a18.123 18.123 0 1 0 32.866-12.025ZM3.3 57.664V8.238A4.943 4.943 0 0 1 8.238 3.3H87.32a4.943 4.943 0 0 1 4.943 4.943v42.042a18.106 18.106 0 0 0-29.572 12.322H8.238A4.943 4.943 0 0 1 3.3 57.664Zm77.43 21.418a14.828 14.828 0 1 1 14.827-14.828A14.828 14.828 0 0 1 80.73 79.082Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M86.555 58.429a1.648 1.648 0 0 0-2.33 0l-3.5 3.5-3.5-3.5a1.648 1.648 0 1 0-2.33 2.33l3.5 3.5-3.5 3.5a1.648 1.648 0 1 0 2.33 2.33l3.5-3.5 3.5 3.5a1.648 1.648 0 1 0 2.33-2.33l-3.5-3.5 3.5-3.5a1.648 1.648 0 0 0 0-2.33ZM75.787 13.18h3.3v6.59h-3.3ZM82.377 13.18h3.3v6.59h-3.3ZM60.959 42.836H44.484a1.648 1.648 0 0 0-1.648 1.648v6.59a1.648 1.648 0 0 0 1.648 1.648h16.475a1.648 1.648 0 0 0 1.648-1.648v-6.59a1.648 1.648 0 0 0-1.648-1.648Zm-1.648 6.59H46.136v-3.29h13.18ZM49.426 13.18h3.3v6.59h-3.3Z"
  }));
};
DeleteCreditCard.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "98.867",
  height: "82.439"
};
var Lock = function Lock(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("defs", null, /*#__PURE__*/_react.default.createElement("style", null, ".a", "{", "fill:#5db98f", "}")), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M56.375 23.917a10.25 10.25 0 1 0-20.5 0v1.708a1.708 1.708 0 1 0 3.417 0v-1.708a6.834 6.834 0 1 1 13.667 0v11.958H27.333v32.459h37.583V35.875h-8.541Zm5.125 41H30.75V39.292H61.5Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M46.125 42.708a6.819 6.819 0 0 0-1.708 13.424v3.659a1.708 1.708 0 0 0 3.417 0v-3.659a6.819 6.819 0 0 0-1.709-13.424Zm0 10.25a3.417 3.417 0 1 1 3.417-3.417 3.42 3.42 0 0 1-3.417 3.417Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    className: "a",
    d: "M46.125 0a46.12 46.12 0 0 0-3.945 92.071l-7.513 7.513A1.708 1.708 0 1 0 37.083 102l10.248-10.249a1.692 1.692 0 0 0 .371-.557 1.713 1.713 0 0 0-.371-1.862L37.083 79.084a1.708 1.708 0 1 0-2.416 2.416l7.114 7.114A42.71 42.71 0 1 1 76.468 76.18a1.71 1.71 0 1 0 2.432 2.405A46.126 46.126 0 0 0 46.125 0Z"
  }));
};
Lock.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "92.25",
  height: "102.5"
};
var Warning = function Warning(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M93.648 5.464h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#cb4477"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M99.956 5.464h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#cb4477"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M96.016 3.096a.761.761 0 0 1-.762-.762V.762A.761.761 0 0 1 96.016 0a.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#cb4477"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M96.016 9.405a.761.761 0 0 1-.762-.762V7.071a.761.761 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#cb4477"
  })))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "m4.437 65.45-1.111-1.112a.762.762 0 0 1 0-1.078.762.762 0 0 1 1.077 0l1.112 1.112a.762.762 0 0 1 0 1.078.762.762 0 0 1-1.078 0Z",
    fill: "#cb4477"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "m8.898 69.91-1.112-1.112a.762.762 0 0 1 0-1.077.762.762 0 0 1 1.078 0l1.111 1.111a.762.762 0 0 1 0 1.078.762.762 0 0 1-1.077 0Z",
    fill: "#cb4477"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M7.784 65.45a.762.762 0 0 1 0-1.077l1.111-1.112a.762.762 0 0 1 1.078 0 .762.762 0 0 1 0 1.078L8.862 65.45a.762.762 0 0 1-1.078 0Z",
    fill: "#cb4477"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M3.323 69.91a.762.762 0 0 1 0-1.077l1.112-1.111a.762.762 0 0 1 1.078 0 .762.762 0 0 1 0 1.077L4.4 69.911a.762.762 0 0 1-1.078 0Z",
    fill: "#cb4477"
  }))))), /*#__PURE__*/_react.default.createElement("g", {
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M9.471 5.838a3 3 0 1 1-3 3 3 3 0 0 1 3-3Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M9.471 6.838c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2m0-1a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
    fill: "#cb4477"
  })), /*#__PURE__*/_react.default.createElement("g", {
    fill: "none"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M96.471 59.838a3 3 0 1 1-3 3 3 3 0 0 1 3-3Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M96.471 60.838c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2m0-1a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
    fill: "#cb4477"
  })))))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(31 11.838)",
    fill: "#cb4477",
    stroke: "#cb4477"
  }, /*#__PURE__*/_react.default.createElement("path", {
    d: "M44.767 35.584c-3.008-6.169-8.049-14.92-12.5-22.64-2.327-4.041-4.526-7.856-6.115-10.756a4 4 0 0 0-7.129 0c-1.59 2.9-3.79 6.721-6.12 10.764C8.458 20.667 3.418 29.417.412 35.584A4.012 4.012 0 0 0 0 37.35a4.054 4.054 0 0 0 4.035 4.064h37.108a4.054 4.054 0 0 0 4.035-4.064 4.011 4.011 0 0 0-.411-1.766Zm-3.623 3.948H4.037a2.171 2.171 0 0 1-2.153-2.182 2.14 2.14 0 0 1 .221-.941c2.978-6.109 8-14.826 12.431-22.517 2.335-4.053 4.54-7.881 6.139-10.8a2.18 2.18 0 0 1 3.827 0c1.6 2.917 3.8 6.742 6.135 10.791 4.433 7.693 9.457 16.414 12.436 22.525a2.135 2.135 0 0 1 .222.942 2.171 2.171 0 0 1-2.151 2.182Z"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M22.589 9.413a.941.941 0 0 0-.941.941v18.824a.941.941 0 1 0 1.883 0V10.354a.941.941 0 0 0-.942-.941Z"
  }), /*#__PURE__*/_react.default.createElement("circle", {
    cx: ".941",
    cy: ".941",
    r: ".941",
    transform: "translate(21.648 33.884)"
  })))));
};
Warning.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "100.718",
  height: "73.237"
};
var errorTypes = {
  offerNotExist: {
    icon: Close,
    description: 'Offer does not exist or is not provided.'
  },
  generalError: {
    icon: Warning,
    description: 'Whoops'
  },
  alreadyHaveAccess: {
    icon: Lock,
    description: 'Good news! Your account already gives you access to the content that comes with this plan.'
  },
  cannotPurchase: {
    icon: DeleteCreditCard,
    description: 'We are sorry! The content you are trying to access is not available in your country.'
  },
  inactive: {
    icon: Close,
    description: 'We are sorry! This offer is no longer available'
  }
};
var ErrorPage = function ErrorPage(_ref) {
  var type = _ref.type,
    error = _ref.error;
  var _useTranslation = (0, _reactI18next.useTranslation)(),
    t = _useTranslation.t;
  var typeParams = errorTypes[type];
  var Icon = typeParams.icon;
  return /*#__PURE__*/_react.default.createElement(_ErrorPageStyled.ErrorPageWrapper, null, /*#__PURE__*/_react.default.createElement(_Header.default, null), /*#__PURE__*/_react.default.createElement(_ErrorPageStyled.ErrorPageStyled, null, /*#__PURE__*/_react.default.createElement(_ErrorPageStyled.IconStyled, null, /*#__PURE__*/_react.default.createElement(Icon, null)), /*#__PURE__*/_react.default.createElement(_ErrorPageStyled.MessageStyled, null, error || t(typeParams.description))));
};
ErrorPage.propTypes = {
  type: _propTypes.default.oneOf(Object.keys(errorTypes)),
  error: _propTypes.default.string
};
ErrorPage.defaultProps = {
  type: 'generalError',
  error: ''
};
var _default = ErrorPage;
exports.default = _default;