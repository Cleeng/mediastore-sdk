"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _i18next = _interopRequireDefault(require("i18next"));
var _reactI18next = require("react-i18next");
var _i18nextBrowserLanguagedetector = _interopRequireDefault(require("i18next-browser-languagedetector"));
_i18next.default.use(_reactI18next.initReactI18next).use(_i18nextBrowserLanguagedetector.default).init({
  fallbackLng: false,
  returnEmptyString: false,
  interpolation: {
    escapeValue: false,
    prefix: '{{',
    suffix: '}}'
  },
  nsSeparator: false,
  // namespace separator
  keySeparator: false,
  // key separator
  defaultNs: 'translation',
  fallbackNS: 'translation',
  updateMissing: true,
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    useSuspense: false
  }
});