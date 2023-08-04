import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translations/en/translations.json';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    returnEmptyString: false,
    interpolation: {
      escapeValue: false,
      prefix: '{{',
      suffix: '}}'
    },
    resources: {
      en: {
        translations: en
      }
    },
    nsSeparator: false,
    keySeparator: false,
    ns: ['translations'],
    defaultNS: 'translations',
    updateMissing: true,
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      useSuspense: false
    },
    backend: {
      loadPath: '/cleeng-translations/{{lng}}/{{ns}}.json'
    },
    returnNull: false
  });
