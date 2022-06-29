import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
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
    defaultNs: 'translation',
    fallbackNS: 'translation',
    updateMissing: true,
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      useSuspense: false
    }
  });
