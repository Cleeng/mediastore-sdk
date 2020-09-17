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
        this.addTranslations();
      }

      async addTranslations() {
        const { i18n } = this.props;
        if (typeof i18n === 'undefined') return false;
        const language = i18n.language || 'en';
        if (!i18n.hasResourceBundle(language, 'translations')) {
          const data = await fetch(`/locales/${language}/translations.json`)
            .then(response => response.json())
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
