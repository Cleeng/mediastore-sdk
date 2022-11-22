"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _appConfigHelper = require("./appConfigHelper");
var saveOfferId = function saveOfferId(location, setOfferId) {
  var offerIdFromQuery = new URLSearchParams(location.search).get('offer');
  if (offerIdFromQuery) {
    setOfferId(offerIdFromQuery);
    (0, _appConfigHelper.setData)('CLEENG_OFFER_ID', offerIdFromQuery);
  } else {
    setOfferId((0, _appConfigHelper.getData)('CLEENG_OFFER_ID') || '');
  }
};
var _default = saveOfferId;
exports.default = _default;