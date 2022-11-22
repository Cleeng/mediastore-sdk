"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _appConfigHelper = require("./appConfigHelper");
var savePublisherId = function savePublisherId(location, setPublisherId) {
  var publisherIdFromQuery = new URLSearchParams(location.search).get('publisher');
  if (publisherIdFromQuery) {
    setPublisherId(publisherIdFromQuery);
    (0, _appConfigHelper.setData)('CLEENG_PUBLISHER_ID', publisherIdFromQuery);
  } else {
    setPublisherId((0, _appConfigHelper.getData)('CLEENG_PUBLISHER_ID') || '');
  }
};
var _default = savePublisherId;
exports.default = _default;