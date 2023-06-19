import en from '../translations/en/translations.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    returnNull: false;
    resources: {
      en: typeof en;
    };
  }
}
