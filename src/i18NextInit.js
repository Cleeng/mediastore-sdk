import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import ChainedBackend from 'i18next-chained-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import en from './translations/en/translations.json';

const bundledResources = {
  en: {
    translations: en
  }
};

i18n
  .use(LanguageDetector)
  .use(ChainedBackend)
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
    ns: ['translations'],
    defaultNS: 'translations',
    updateMissing: true,
    react: {
      wait: true,
      bindI18n: 'languageChanged loaded',
      useSuspense: false
    },
    backend: {
      backends: [HttpBackend, resourcesToBackend(bundledResources)],
      backendOptions: [
        {
          loadPath: '/cleeng-translations/{{lng}}/{{ns}}.json'
        }
      ]
    },
    returnNull: false
  });
