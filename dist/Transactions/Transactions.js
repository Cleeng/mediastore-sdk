"use strict";

var _interopRequireDefault = require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PureTransactions = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("/Users/iwonakulacz/Documents/repos/msd-package-2/media-store-sdk/node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _labeling = _interopRequireDefault(require("containers/labeling"));

var _Card = _interopRequireDefault(require("components/Card"));

var _planHelper = require("util/planHelper");

var _MyAccountError = _interopRequireDefault(require("components/MyAccountError"));

var _Button = _interopRequireDefault(require("components/Button"));

var _transaction_icon = require("assets/images/errors/transaction_icon.svg");

var _SkeletonWrapper = _interopRequireDefault(require("components/SkeletonWrapper"));

var _Loader = _interopRequireDefault(require("components/Loader"));

var _TransactionsStyled = require("./TransactionsStyled");

/* eslint-disable no-nested-ternary */
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
    icon: _transaction_icon.ReactComponent,
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
    }, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.LeftBoxStyled, null, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.TitleStyled, null, subItem.offerTitle), /*#__PURE__*/_react.default.createElement(_TransactionsStyled.SubTitleStyled, null, t("Paid with"), ' ', subItem.paymentMethod === 'card' ? t('card') : subItem.paymentMethod)), /*#__PURE__*/_react.default.createElement(_TransactionsStyled.RightBoxStyled, null, /*#__PURE__*/_react.default.createElement(_TransactionsStyled.IdStyled, null, subItem.transactionId), /*#__PURE__*/_react.default.createElement(_TransactionsStyled.DateStyled, null, (0, _planHelper.dateFormat)(subItem.transactionDate))));
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