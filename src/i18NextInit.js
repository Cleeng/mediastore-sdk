import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: false,
    returnEmptyString: false,
    interpolation: {
      escapeValue: false,
      prefix: '{{',
      suffix: '}}'
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    ns: ['translations'],
    defaultNS: 'translations',
    fallbackNS: 'translation',
    updateMissing: true,
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      useSuspense: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  });
