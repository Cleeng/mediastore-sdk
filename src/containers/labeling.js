import React from 'react';

/* eslint-disable react/prop-types */
export default function customLabeling() {
  // ...and returns another component...
  return WrappedComponent =>
    class extends React.Component {
      constructor(props) {
        super(props);
        this.state = { dataLoaded: false };
      }

      componentDidMount() {
        this.addTranslations();
      }

      componentDidUpdate() {
        const { i18n } = this.props;
        const languageParam = new URLSearchParams(window.location.search).get(
          'lng'
        );

        if (!languageParam) {
          return;
        }

        if (i18n && i18n?.language !== languageParam) {
          this.setLanguage(i18n, languageParam);
        }
      }

      /* eslint-disable class-methods-use-this */
      async setLanguage(i18n, language) {
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
      }

      async addTranslations() {
        const { i18n } = this.props;
        const language = i18n?.language || 'en';

        await this.setLanguage(i18n, language);
        this.setState({ dataLoaded: true });

        return true;
      }

      render() {
        const { dataLoaded } = this.state;
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        return dataLoaded && <WrappedComponent {...this.props} />;
      }
    };
}
