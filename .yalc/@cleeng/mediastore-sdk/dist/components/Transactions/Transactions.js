"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureTransactions = void 0;
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactI18next = require("react-i18next");
var _labeling = _interopRequireDefault(require("../../containers/labeling"));
var _Card = _interopRequireDefault(require("../Card"));
var _planHelper = require("../../util/planHelper");
var _MyAccountError = _interopRequireDefault(require("../MyAccountError"));
var _Button = _interopRequireDefault(require("../Button"));
var _SkeletonWrapper = _interopRequireDefault(require("../SkeletonWrapper"));
var _Loader = _interopRequireDefault(require("../Loader"));
var _TransactionsStyled = require("./TransactionsStyled");
/* eslint-disable no-nested-ternary */
var noTransactionsIcon = function noTransactionsIcon(props) {
  return /*#__PURE__*/_react.default.createElement("svg", props, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M2.334 64.579H.762A.762.762 0 0 1 0 63.817a.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M8.642 64.579H7.07a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M4.702 62.211a.761.761 0 0 1-.762-.762v-1.572a.761.761 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M4.702 68.52a.761.761 0 0 1-.762-.762v-1.572a.761.761 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M85.967 5.462h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M92.275 5.462h-1.572a.762.762 0 0 1-.762-.762.762.762 0 0 1 .762-.762h1.572a.762.762 0 0 1 .762.762.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M88.334 3.096a.762.762 0 0 1-.762-.762V.762A.762.762 0 0 1 88.334 0a.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M88.334 9.404a.762.762 0 0 1-.762-.762V7.07a.762.762 0 0 1 .762-.762.762.762 0 0 1 .762.762v1.572a.762.762 0 0 1-.762.762Z",
    fill: "#838eaa"
  })))))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M72.482 64.317H23.26a5.377 5.377 0 0 1-5.613-5.09v-41.1q-.015-.174-.016-.347a.633.633 0 0 1 .016-.141v-.023a5.4 5.4 0 0 1 .931-3.553c.85-1.034 2.323-1.537 4.5-1.537a.641.641 0 1 1 0 1.283c-1.773 0-2.923.35-3.514 1.069a4.337 4.337 0 0 0-.64 2.739v.45a2.757 2.757 0 0 0 .922 1.755 4.691 4.691 0 0 0 3.2 1.023h49.431a5.377 5.377 0 0 1 5.613 5.09v33.287a5.378 5.378 0 0 1-5.608 5.095ZM18.93 20.73v38.5a4.1 4.1 0 0 0 4.33 3.807h49.222a4.1 4.1 0 0 0 4.33-3.807V25.943a4.1 4.1 0 0 0-4.33-3.807H23.051a5.853 5.853 0 0 1-4.121-1.407Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M72.315 18.967a.641.641 0 0 1-.641-.642v-2.944a1.716 1.716 0 0 0-1.829-1.569H23.084a.641.641 0 1 1 0-1.283h46.761a2.993 2.993 0 0 1 3.111 2.852v2.944a.641.641 0 0 1-.641.642Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(64.472 36.76)"
  }, /*#__PURE__*/_react.default.createElement("rect", {
    width: "17.254",
    height: "9.984",
    rx: "4.992",
    transform: "translate(.641 .641)",
    fill: "#f2f5fc"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M14.385 11.267H1.155a1.154 1.154 0 0 1-1.152-1.152V1.153A1.153 1.153 0 0 1 1.155.001h13.232a1.154 1.154 0 0 1 1.152 1.152v8.962a1.154 1.154 0 0 1-1.154 1.152Zm-13.1-1.283h12.97v-8.7H1.284Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m27.881 25.279-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m27.881 25.92-4.259-.018a.641.641 0 0 1 0-1.283l4.259.017a.642.642 0 0 1 0 1.283Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m36.494 25.279-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m36.494 25.92-4.259-.018a.641.641 0 0 1 0-1.283l4.259.017a.642.642 0 0 1 0 1.283Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m45.107 25.279-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m45.108 25.92-4.259-.018a.641.641 0 0 1 0-1.283l4.259.017a.642.642 0 0 1 0 1.283Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m53.72 25.279-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m53.72 25.92-4.259-.018a.641.641 0 0 1 0-1.283l4.259.017a.642.642 0 0 1 0 1.283Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m62.333 25.279-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m62.333 25.92-4.259-.018a.641.641 0 0 1 0-1.283l4.259.017a.642.642 0 0 1 0 1.283Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m70.946 25.279-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m70.946 25.92-4.259-.018a.641.641 0 0 1 0-1.283l4.259.017a.642.642 0 0 1 0 1.283Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m27.881 59.829-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m27.881 60.47-4.259-.018a.641.641 0 0 1 0-1.283l4.259.018a.641.641 0 0 1 0 1.283Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m36.494 59.829-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m36.494 60.47-4.259-.018a.641.641 0 0 1 0-1.283l4.259.018a.641.641 0 0 1 0 1.283Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m45.107 59.829-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m45.108 60.47-4.259-.018a.641.641 0 0 1 0-1.283l4.259.018a.641.641 0 0 1 0 1.283Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m53.72 59.829-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m53.72 60.47-4.259-.018a.641.641 0 0 1 0-1.283l4.259.018a.641.641 0 0 1 0 1.283Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m62.333 59.829-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m62.333 60.47-4.259-.018a.641.641 0 0 1 0-1.283l4.259.018a.641.641 0 0 1 0 1.283Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    fill: "#fff",
    d: "m70.946 59.829-4.259-.018"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "m70.946 60.47-4.259-.018a.641.641 0 0 1 0-1.283l4.259.018a.641.641 0 0 1 0 1.283Z",
    fill: "#838eaa"
  }))), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M24.056 16.578 51.693 5.914l.852 2.3",
    fill: "#fff"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M24.055 17.22a.642.642 0 0 1-.231-1.24L51.461 5.316a.642.642 0 0 1 .833.375l.851 2.3a.642.642 0 1 1-1.2.446L51.32 6.75 24.29 17.18a.651.651 0 0 1-.235.04Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "m37.491 16.513 25.4-9.8 3.652 9.067",
    fill: "#f2f5fc"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M37.492 17.155a.642.642 0 0 1-.231-1.24l25.4-9.8a.64.64 0 0 1 .826.358l3.652 9.067a.641.641 0 0 1-1.19.479l-3.416-8.48-24.806 9.571a.643.643 0 0 1-.235.045Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "m39.428 14.86-7.039-.591 18.805-7.252 1.059 2.9",
    fill: "#f2f5fc"
  })), /*#__PURE__*/_react.default.createElement("g", {
    transform: "translate(23.01 30.942)"
  }, /*#__PURE__*/_react.default.createElement("circle", {
    cx: "10.962",
    cy: "10.962",
    r: "10.962",
    transform: "translate(.641 .642)",
    fill: "#f2f5fc"
  }), /*#__PURE__*/_react.default.createElement("path", {
    d: "M11.604 23.209a11.6 11.6 0 1 1 11.6-11.6 11.617 11.617 0 0 1-11.6 11.6Zm0-21.924a10.321 10.321 0 1 0 10.32 10.321 10.332 10.332 0 0 0-10.32-10.323Z",
    fill: "#838eaa"
  })), /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement("path", {
    d: "M34.631 36.631c.595 0 1.452.1 1.47.77a6.353 6.353 0 0 1-.07.77c-.175 1.12-.683 3.868-.98 6.073h-.84c-.245-2.03-.752-4.812-.962-6.02a4.479 4.479 0 0 1-.123-.823c0-.612.875-.77 1.505-.77Zm.017 11.83a1.461 1.461 0 1 1 1.435-1.47 1.383 1.383 0 0 1-1.436 1.47Z",
    fill: "#838eaa"
  }))))));
};
noTransactionsIcon.defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "93.038",
  height: "68.519"
};
var TransactionsSkeleton = function TransactionsSkeleton() {
  return /*#__PURE__*/_react.default.createElement(_Card.default, {
    withBorder: true
  }, (0, _toConsumableArray2.default)(Array(3)).map(function (i, k) {
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/no-array-index-key
      _react.default.createElement(_TransactionsStyled.InsideWrapperStyled, {
        key: "skeleton-item-".concat(k),
        length: 3
      }, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.LeftBoxStyled, null, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.TitleStyled, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
        width: 300
      })), /*#__PURE__*/_react.default.createElement(_TransactionsStyled.SubTitleStyled, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
        width: 100
      }))), /*#__PURE__*/_react.default.createElement(_TransactionsStyled.RightBoxStyled, null, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.IdStyled, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
        width: 80
      })), /*#__PURE__*/_react.default.createElement(_TransactionsStyled.DateStyled, null, /*#__PURE__*/_react.default.createElement(_SkeletonWrapper.default, {
        width: 80
      }))))
    );
  }));
};
var Transactions = function Transactions(_ref) {
  var transactions = _ref.transactions,
    toggleTransactionsList = _ref.toggleTransactionsList,
    isTransactionsItemsLoading = _ref.isTransactionsItemsLoading,
    isExpanded = _ref.isExpanded,
    isShowMoreButtonHidden = _ref.isShowMoreButtonHidden,
    error = _ref.error,
    isTransactionsSectionLoading = _ref.isTransactionsSectionLoading,
    t = _ref.t;
  return isTransactionsSectionLoading ? /*#__PURE__*/_react.default.createElement(TransactionsSkeleton, null) : /*#__PURE__*/_react.default.createElement(_TransactionsStyled.WrapStyled, null, error.length !== 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
    generalError: true
  }) : transactions.length === 0 ? /*#__PURE__*/_react.default.createElement(_MyAccountError.default, {
    icon: noTransactionsIcon,
    title: t('No transactions found!'),
    subtitle: t('The section will show you recent transactions history after first payment')
  }) : /*#__PURE__*/_react.default.createElement(_Card.default, {
    withBorder: true
  }, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.TransactionListStyled, {
    isExpanded: isExpanded,
    length: transactions.length
  }, transactions.map(function (subItem) {
    return /*#__PURE__*/_react.default.createElement(_TransactionsStyled.InsideWrapperStyled, {
      key: subItem.transactionId,
      length: transactions.length
    }, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.LeftBoxStyled, null, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.TitleStyled, null, t("offer-title-".concat(subItem.offerId), subItem.offerTitle)), /*#__PURE__*/_react.default.createElement(_TransactionsStyled.SubTitleStyled, null, t("Paid with"), ' ', subItem.paymentMethod === 'card' ? t('card') : subItem.paymentMethod)), /*#__PURE__*/_react.default.createElement(_TransactionsStyled.RightBoxStyled, null, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.IdStyled, null, subItem.transactionId), /*#__PURE__*/_react.default.createElement(_TransactionsStyled.DateStyled, null, (0, _planHelper.dateFormat)(subItem.transactionDate))));
  })), !isShowMoreButtonHidden && /*#__PURE__*/_react.default.createElement(_Button.default, {
    theme: "primary",
    margin: "20px 0 0 auto",
    width: "unset",
    label: isExpanded && t('Show less') || t('Show more'),
    onClickFn: function onClickFn() {
      return toggleTransactionsList();
    },
    padding: "12px 33px 12px 20px"
  }, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.ButtonTextStyled, {
    isExpanded: isExpanded
  }, isTransactionsItemsLoading && /*#__PURE__*/_react.default.createElement(_Loader.default, {
    buttonLoader: true,
    color: "#ffffff"
  }) || isExpanded && t('Show less') || t('Show more')))));
};
exports.PureTransactions = Transactions;
Transactions.propTypes = {
  transactions: _propTypes.default.arrayOf(_propTypes.default.any),
  error: _propTypes.default.arrayOf(_propTypes.default.any),
  toggleTransactionsList: _propTypes.default.func.isRequired,
  isTransactionsItemsLoading: _propTypes.default.bool,
  isExpanded: _propTypes.default.bool,
  t: _propTypes.default.func,
  isShowMoreButtonHidden: _propTypes.default.bool,
  isTransactionsSectionLoading: _propTypes.default.bool
};
Transactions.defaultProps = {
  transactions: [],
  error: [],
  isTransactionsItemsLoading: false,
  isExpanded: false,
  t: function t(k) {
    return k;
  },
  isShowMoreButtonHidden: false,
  isTransactionsSectionLoading: false
};
var _default = (0, _reactI18next.withTranslation)()((0, _labeling.default)()(Transactions));
exports.default = _default;