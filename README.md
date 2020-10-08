# Installation

MediaStore SDK repo is marked as a template so you can easily move it directly to your GitHub account. To do so, login to your Github account and use the template option as shown in the screenshot below.

<div style="display: flex; align-items: center; flex-direction: column">
  <img src="src/assets/images/readme/use_template.png" style="margin: 20px auto;" alt="Use template button"/>
  <img src="src/assets/images/readme/create_repo.png" style="margin: 20px auto;" alt="Create repo"/>
</div>

Upon creating the repository, please proceed with the below steps

1. Clone repo to your pc (use the link from your GitHub if you used a template)

`git clone https://github.com/Cleeng/media-store-sdk`

2. Go to the repo (name can be changed if you use a template)

`cd media-store-sdk`

3. Install packages with yarn

`yarn install`

4. Create a script `development.js` in `config/environments` containing setups for the development environment.

Here is an example of a file to connect to the sandbox. You can use it for your development.

```
module.exports = {
  ENVIRONMENT_CONFIGURATION: {
    API_URL: JSON.stringify('https://mediastore-sandbox.cleeng.com'),
    ADYEN_CLIENT_KEY: JSON.stringify('test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K'), //write to BSS team to add your origin to the whitelist
  }
};
```

All the configs defined in `config/environments` can be accessed in code via a global ENVIRONMENT_CONFIGURATION constant.

To select a specific environment for a run or build, use the `--environment` flag, e.g. `yarn start --environment=production`.

Scripts containing setups are in `js` format.

<table>
<tr>
    <th>Configuration</th>
    <th>Description</th>
</tr>
<tr><td>API_URL</td><td>identifies the host of REST API</td></tr>
<tr><td>ADYEN_CLIENT_KEY</td>
  <td>
    identifies Adyen's Client Key. Finde more details <a href="https://developers.apidoc.cleeng.com/docs/checkout-implementation#purchase-using-adyen">here</a>. Values:
    testing `test_I4OFGUUCEVB5TI222AS3N2Y2LY6PJM3K`,
    production `live_BQDOFBYTGZB3XKF62GBYSLPUJ4YW2TPL`
  </td></tr>
</table>

5. Runs the app in the development mode, using

`yarn start`

Open `http://localhost:3003` to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

That’s it! Your MediaStore SDK app is running locally.

Below you can find a list with available scripts.

<table>
<tr>
    <th>Command</th>
    <th>Description</th>
</tr>
<tr><td>yarn build</td>
<td>Builds the app for production to the build folder.
  It correctly bundles React in production mode and optimizes the build for the best performance.
  The build is minified and the filenames include the hashes.
  Your app is ready to be deployed!
  See the section about <a href="https://create-react-app.dev/docs/deployment/" target="_blank">deployment</a> for more information.
  </td></tr>
<tr><td>yarn test</td>
  <td>
   Launches the test runner in the interactive watch mode.
    See the section about <a href="https://create-react-app.dev/docs/running-tests/" target="_blank">running</a> tests for more information.
  </td></tr>
<tr><td>yarn storybook</td>
  <td>
  Launches the storybooks locally on the localhost:6006 port 
  On staging, the storybook is available on <a href="https://gummybear-staging.cleeng.com/storybook-static">https://gummybear-staging.cleeng.com/storybook-static</a>
  </td></tr>
</table>

# Project overview

## MediaStore SDK

This repo is an example app which shows how to integrate with Cleeng MediaStore API. It consists of components that will empower you to build and design a seamless checkout process, help visitors become subscribers, and then allow them to manage their subscription.

**Check the demo app [here](https://mediastoresdk-demo.cleeng.com/login?offer=S817681481_PL&publisher=933103327).**

**Here you can find documentation:**

- [MediaStore SDK tutorial](https://developers.apidoc.cleeng.com/docs/what-is-mediastore-sdk)
- [API documentation](https://developers.apidoc.cleeng.com/reference/getting-started)

**Looking for specific details?**

- [features](https://developers.apidoc.cleeng.com/docs/what-is-mediastore-sdk#features)
- [authorisation](https://developers.apidoc.cleeng.com/docs/what-is-mediastore-sdk#authorisation)
- [translations](https://developers.apidoc.cleeng.com/docs/what-is-mediastore-sdk#translation)

## Architecture overview

MediaStore SDK is a frontend application build with React. It was bootstrapped with Create React App. We are using a webpack to build it, Jest, and Enzyme for testing, Styled Components for styles.

This application is communicating with the backend REST API. All methods available can be found [here](https://developers.apidoc.cleeng.com/reference/getting-started).

<b>The app requires params to working properly. </b>

To enable login action pass `offerId` to the app. Login is also possible using `publisherId`, but in the sample app, we use `offerId`.
To enable registration, pass `publisherId` which is required to fetch terms and conditions.

You can pass it in two ways:

In URL as a param `?offer=S1234567` / `?publisher=123456789` and this is the most important one

In local storage as `CLEENG_OFFER_ID` / `CLEENG_PUBLISHER_ID`

<b>Sample:`http://localhost:3003/login?offer=S279420927_PL&publisher=384784683`</b>

# License

The Cleeng Media Store SDK is open source and available under the BSD 3-Clause License. See the [LICENSE](LICENSE.md) file for more info.

## Other links

### Learn More

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
