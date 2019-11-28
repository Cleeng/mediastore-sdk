# gummybear-2

This project is the front-end for phase 2 of Web Store SDK aka gummybear.

It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Environments

Scripts containing setups for specific environments are in `config/environments` folder.

All the configs defined there can be accessed in code via a global `ENVIRONMENT_CONFIGURATION` constant.

To select a specific environment for run or build, use the `--environment` flag, e.g. `yarn start --environment=production`.

### Adyen Public Keys

Each origin (protocol + domain + port) requires a specific Adyen public key. In case of development environment there are 2 different origins possible for debugging as application and as storybook. Therefore, the `ADYEN_PUBLIC_KEY` should be a map from every origin possible in the given environment to an appropriate key.

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
