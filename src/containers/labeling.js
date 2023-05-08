import React, { useEffect, useState } from 'react';

/* eslint-disable react/prop-types */
const customLabeling = () =>
  // ...and returns another component...
  WrappedComponent => props => {
    const [dataLoaded, setDataLoaded] = useState(false);

    /* eslint-disable class-methods-use-this */
    const setLanguage = async (i18n, language) => {
      if (typeof i18n === 'undefined') return false;

      const BASE_URL = window.location.origin;

      if (!i18n.hasResourceBundle(language, 'translation')) {
        const data = await fetch(
          `${BASE_URL}/cleeng-translations/${language}/translations.json`
        )
          .then(response => {
            return response.json();
          })
          .catch(() => {});
        i18n.addResourceBundle(language, 'translation', data, true, true);
      }
      i18n.changeLanguage(language);

      return true;
    };

    const addTranslations = async () => {
      const { i18n } = props;
      const language = i18n?.language || 'en';

      await setLanguage(i18n, language);
      setDataLoaded(true);

      return true;
    };

    useEffect(() => {
      addTranslations()
        .then(() => {})
        .catch(() => {});
    }, []);

    useEffect(() => {
      const languageParam = new URLSearchParams(window.location.search).get(
        'lng'
      );

      if (!languageParam) {
        return;
      }

      const { i18n } = props;

      if (i18n && i18n?.language !== languageParam) {
        setLanguage(i18n, languageParam)
          .then(() => {})
          .catch(() => {});
      }
    }, [window.location.search]);

    return dataLoaded && <WrappedComponent {...props} />;
  };

export default customLabeling;
