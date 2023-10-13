import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

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
    nsSeparator: false,
    keySeparator: false,
    fallbackLng: false,
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
