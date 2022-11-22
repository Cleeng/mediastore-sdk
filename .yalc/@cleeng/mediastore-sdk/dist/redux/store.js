"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _rootReducer = _interopRequireDefault(require("./rootReducer"));
var store = (0, _toolkit.configureStore)({
  reducer: _rootReducer.default
});
var _default = store;
exports.default = _default;