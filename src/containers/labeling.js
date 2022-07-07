import React from 'react';

/* eslint-disable react/prop-types  */
/* eslint-disable react/jsx-props-no-spreading */
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

      async addTranslations() {
        const BASE_URL = window.location.origin;
        const { i18n } = this.props;
        if (typeof i18n === 'undefined') return false;
        const language = i18n.language || 'en';
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
