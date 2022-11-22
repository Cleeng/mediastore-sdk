"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var logoBase64 = 'data:image/png;base64,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';
var _default = logoBase64;
exports.default = _default;