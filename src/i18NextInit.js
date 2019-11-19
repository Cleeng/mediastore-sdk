import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const fetchTranslations = async language => {
  const data = await fetch(
    `${process.env.PUBLIC_URL}/locales/${language}/translations.json`
  ).then(response => response.json());
  return data;
};

i18n.use(initReactI18next).init({
  lngs: ['en', 'pl'],
  fallbackLng: 'en',
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
    bindI18n: 'languageChanged loaded'
  }
});
fetchTranslations('en').then(data => {
  i18n.addResourceBundle('en', 'translation', data, true, true);
});
i18n.changeLanguage('pl');
