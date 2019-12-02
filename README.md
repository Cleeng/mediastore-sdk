# Web Store SDK

An example sign-up process for SVOD using Cleeng API.

This repo contains example app as a set of instructions and code snippets for the web to help implement tailored and custom checkout.

To check Cleeng API documentation, visit [Cleeng Developers](https://developers.cleeng.com/reference).

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environments

Scripts containing setups for specific environments are in `config/environments` folder.

All the configs defined there can be accessed in code via a global `ENVIRONMENT_CONFIGURATION` constant.

To select a specific environment for run or build, use the `--environment` flag, e.g. `yarn start --environment=production`.

Scripts containing setups are in js format. `staging.js` and `development.js` files are not committed and is ignored via `.gitignore`. You will need to create local file and set some variables within it.

Here's an example `production.js` file:

```
module.exports = {
  ENVIRONMENT_CONFIGURATION: {
    GB_API_URL: JSON.stringify(
      'https://hc0f1jaa70.execute-api.eu-west-1.amazonaws.com/staging'
    ),
    ADYEN_PUBLIC_KEY: {
      'https://example.cleeng.com': JSON.stringify('pub.v2.xxx')
    },
    WEB_API: JSON.stringify('https://cleeng.com')
  }
};
```

- **GB_API_URL** identifies the host of REST API
- **WEB_API** identifies the host of the Cleeng Web API
- **ADYEN_PUBLIC_KEY** identifies Adyen's Public Key, you can find out more below.

### Adyen Public Keys

Each origin (protocol + domain + port) requires a specific Adyen public key. In case of development environment there are 2 different origins possible for debugging as application and as storybook. Therefore, the `ADYEN_PUBLIC_KEY` should be a map from every origin possible in the given environment to an appropriate key.

### API Mocks

If some APIs on which the application depends are still in development, use `USE_API_MOCK` field to switch between mock endpoints and actual endpoints.

### Translations system

Translations are done on react-i18n library, without backend-side features. Therefore the translations bundle for every language is done on build or start dev server. It's always avaliable under url (domain_name)/locales/(language_code)/translations.json.<br>

The translations file for language merge content of any json files in the folder /translations/(language_code), and because of it folders name for languages and code of languages declared in i18n init needs to be consistent.<br>

To connect new page in router with translations, it's important to use both withTranslations() and labeling() higher order components. Labeling is a custom method that dynamically loading translations bundle from public folder for choosen language if bundle not already loaded. You can change language using [languageDetector](https://github.com/i18next/i18next-browser-languageDetector)<br>

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn storybook`

Launches the storybooks locally on the localhost:6006 port <br>
On staging storybook will be available on [https://gummybear-staging.cleeng.com/storybook-static](https://gummybear-staging.cleeng.com/storybook-static)

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Style Guide

### Files

Each component should have an accompanying `ComponentStyled.js` file which contains `styled-components` objects for this component.

### CSS Property Order

Keep CSS props in the following order, with empty newlines between sections:

- Layout Properties (position, float, clear, display)
- Box Model Properties (width, height, margin, padding)
- Visual Properties (color, background, border, box-shadow)
- Typography Properties (font-size, font-family, text-align, text-transform)
- Misc Properties (cursor, overflow, z-index)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#yarn-run-build-fails-to-minify

# License

The Cleeng Web Store SDK is open source and available under the BSD 3-Clause License. See the [LICENSE](LICENSE.md) file for more info.
