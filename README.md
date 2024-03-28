# <div align="center"> MediaStore SDK</div>

> **Warning**
>
> Breaking changes in version 4.0. See the [imports](#1-import-the-required-css) section of this file for more information.

This is the Cleeng official component library to be used with React.js.

MediaStore SDK Library consists of components that will allow you to build a seamless checkout process, help visitors become subscribers, and then allow them to manage their subscriptions.

To find out more about MediaStore SDK, see:

- [MediaStore SDK Components Library](https://developers.cleeng.com/docs/components-library)
- [API documentation](https://developers.cleeng.com/reference/getting-started)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Available components](#available-components)
  - [Checkout](#checkout)
  - [MyAccount](#myaccount)
  - [Register](#register)
  - [Login](#login)
  - [Capture](#capture)
  - [Checkout Consents](#checkoutconsents)
  - [Purchase](#purchase)
  - [PasswordReset](#passwordreset)
  - [Subscriptions](#subscriptions)
  - [SubscriptionSwitches](#subscriptionswitches)
  - [PlanDetails](#plandetails)
  - [PaymentInfo](#paymentinfo)
  - [TransactionList](#transactionlist)
  - [UpdateProfile](#updateprofile)
  - [RedeemGift](#redeemgift)
- [Styling](#styling)
- [Communication (events)](#communication)
- [Adyen configuration](#adyen-configuration)
- [Translations](#translations)
- [Security](#security)
- [Documentation](#related-documentation)
- [License](#license)

## Installation

#### Prerequisites

- Node v14.15.0
- React (v18.2.0)

#### Installation

```
// npm
npm i @cleeng/mediastore-sdk styled-components
// or yarn
yarn add @cleeng/mediastore-sdk styled-components

```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Usage

#### 1. Import the required CSS

**We removed CSS imports from third-party libraries in version 4.0** to improve compatibility with Next.js (which, [somewhat controversially](https://github.com/vercel/next.js/discussions/27953), doesn't currently allow CSS imports from the `node_modules` directory). You'll have to import them manually in your app:

```javascript
// import the following stylesheets in _app.js for Next.js projects, or your main App component for other use cases

import '@adyen/adyen-web/dist/adyen.css';
import 'react-loading-skeleton/dist/skeleton.css';
```

#### 2. Configuration

If you have the package downloaded locally and you want to begin to use it, you should start with the configuration. You can do this by using the `Config` class which has a few important methods to do it. Components may require additional config, so check the requirements for a component that you want to use.

Config functions save data to local storage (as `CLEENG_*` items). These data are required to make components work. <b>You need to call these functions, before MSSDK components mount, usually only once.</b>

#### Config methods

| Method                          | Param                                                        | Description                                                                                                                                                             |
| ------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setEnvironment`                | `'sandbox'` &#124; `'production'`                            | Required for all components. Default: `sandbox`                                                                                                                         |
| `setJWT`                        | `JWT :string`                                                | Customer authorization token received from login / registration / SSO endpoint                                                                                          |
| `setRefreshToken`               | `refeshToken :string`                                        | Customer refresh token received from login / registration / SSO endpoint                                                                                                |
| `setPublisher`                  | `publisherId :string`                                        | Your broadcaster ID in the Cleeng system                                                                                                                                |
| `setOffer`                      | `offerId :string`                                            | `offerId` is the ID of the offer created for your broadcaster in the Cleeng system                                                                                      |
| `setCheckoutPayPalUrls`         | `{successURL: string, cancelUrl: string,errorUrl: string }`  | PayPal redirection URLs, required for Paypal payment                                                                                                                    |
| `setMyAccountPayPalUrls`        | `{successURL: string, cancelUrl: string, errorUrl: string }` | PayPal redirection URLs, required for update PayPal payment details. Query param 'message' with a readable error message will be added to errorUrl when an error occurs |
| `setMyAccountUrl`               | `url: string`                                                | My account URL. Needed for checkout legal notes                                                                                                                         |
| `setOfferSelectionUrl`          | `url: string`                                                | Url to offer selection page. Recommended for CTA when the customer has no active plan                                                                                   |
| `setTheme`                      | `styles:object`                                              | More information in the [Styling](#styling) section.                                                                                                                    |
| `setVisibleAdyenPaymentMethods` | `paymentMethods: string[]`                                   | Array of payment methods names that should be presented in Checkout and MyAccount. Available options: `applepay`, `card`, `googlepay`, `ideal`, `sofort`                |
| `setHidePayPal`                 | -                                                            | Option to hide PayPal, by default PayPal will be visible when configured                                                                                                |
| `setEnable3DSRedirectFlow`      | -                                                            | Set to true to force 3DS redirect flow.                                                                                                                                 |
| `setLanguage`                   | `language :string`                                           | Option to change language without reloading page                                                                                                                        |
| `setTermsUrl`                   | `termsUrl :string`                                           | Option to Provide a URL for Terms & Conditions: This feature will display a link to them adjacent to the payment method.                                                |
| `setResetUrl`                   | `resetUrl :string`                                           | Option to Provide a URL for custom password reset page. This URL will be sent in an email with additional parameters: `email`, `resetPasswordToken`, `publisherId`      |

**Usage sample**

```javascript
import { Config } from '@cleeng/mediastore-sdk';

Config.setEnvironment('sandbox');
Config.setPublisher('123456789');
Config.setOffer('S123456789_US');
Config.setVisibleAdyenPaymentMethods(['card', 'applepay']);
Config.setHidePayPal();
Config.setEnable3DSRedirectFlow();
Config.setLanguage('es');
Config.setTermsUrl('https://your_terms_and_conditions-url.com');
```

#### Auth methods

| Method     | Param | Description                                                                                            |
| ---------- | ----- | ------------------------------------------------------------------------------------------------------ |
| `isLogged` | -     | Returns `true` if the customer is authenticated (valid JWT or existing refresh token in local storage) |
| `logout`   | clb   | removes all Cleeng data from local storage and redux. clb - optional callback function                 |

```javascript
Auth.isLogged();
Auth.logout(() => console.log('The customer has been logged out')));
```

#### 3. Embed component (sample)

**Each component needs to be wrapped into Provider, as in the example below.**
Component should be rendered in the browser - if you are using NextJS, turn off SSR for MSSDK components.

```javascript
import { useEffect } from 'react';
import { Config, Purchase, Auth, store  } from '@cleeng/mediastore-sdk';
import { Provider } from "react-redux";

// for NextJS:
import dynamic from "next/dynamic";

const Purchase = dynamic(
  () => import("@cleeng/mediastore-sdk").then(mod => mod.Purchase),
  { ssr: false }
);
// end of 'for NextJS'

export default function Home() {
  Config.setEnvironment("sandbox");
  Config.setPublisher('123456789');
  Config.setJWT('customer-jwt-from-your-middleware');
  Config.setRefreshToken('customer-refresh-token-from-your-middleware');

  useEffect(() => {
    // your logic on mount
  }, []);

  return (
    <>
     {Auth.isLogged() ? (
        <Provider store={store}>
          <Purchase offerId="S222222222_US"/>
        </Provider>
      ) : (
        <YourCustomLogin>
      )}
    </>
  )
}
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Available components

You can build a complete flow - allowing customers to buy your offering and use their customer accounts - with two main components:

- [Checkout](#checkout) - a full purchase flow (starting from registration to purchase)
- [MyAccount](#myaccount) - a complete customer account environment

If you prefer smaller components, you can use these to implement the exact features you need:

- [Register](#register)
- [Login](#login)
- [Capture](#capture)
- [Checkout Consents](#checkoutconsents)
- [Purchase](#purchase)
- [PasswordReset](#passwordreset)
- [Subscriptions](#subscriptions)
- [SubscriptionSwitches](#subscriptionswitches)
- [PlanDetails](#plandetails)
- [PaymentInfo](#paymentinfo)
- [TransactionList](#transactionlist)
- [UpdateProfile](#updateprofile)

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Checkout

`Checkout` is a complex component that covers the whole checkout process, from the registration to the purchase. It contains components listed below:

- [Register](#register)
- [Login](#login)
- [Capture](#capture)
- [Checkout Consents](#checkoutconsents)
- [Purchase](#purchase)
- [PasswordReset](#passwordreset)

**Config methods**

```javascript
Config.setPublisherId('123456789'); // required
Config.setMyAccountUrl('https://client-website.com/my-account'); // required for legal notes
Config.setCheckoutPayPalUrls({
  // PayPal redirection URLs, required for PayPal payment
  successUrl: 'https://client-website.com/checkout/success',
  cancelUrl: 'https://client-website.com/checkout',
  errorUrl: 'https://client-website.com/checkout/error'
});
Config.setVisibleAdyenPaymentMethods(['card', 'googlepay']); // array of presented payment methods
```

**Props**

- `offerId` \* - ID of Cleeng offer, for which Checkout component should be opened. Accepts `offerId` with or without the country suffix, eg. `S531234647_PL`, `S531234647`.
- `onSuccess` - function called after a successful checkout process.
- `resetPasswordCallback` - function called after a successful reset password request, when customer clicks 'Go back to the login page'
- `adyenConfiguration` - an optional parameter that can be used to customize look and feel of the Adyen payment in purchase section. Read more information about Adyen configuration [here](#adyen-configuration).
- `couponCode` - coupon code that should be automatically applied
- `hideRedeemButton` - an optional parameter that can be used to hide 'Redeem here' button

**Usage**

```javascript
import { Checkout, store } from '@cleeng/mediastore-sdk';
import { Provider } from 'react-redux';
import adyenConfiguration from './adyenConfiguration';

<Provider store={store}>
  <Checkout
    onSuccess={() => console.log('success')}
    offerId={'S531234647_PL'}
    adyenConfiguration={adyenConfiguration}
    resetPasswordCallback={() =>
      console.log('redirect customer to the login page')
    }
  />
</Provider>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## MyAccount

`MyAccount` is a big component that contains all profile-management-related features. The following sections are available in `MyAccount`:

- [Login](#login)
- [PlanDetails (manage subscriptions)](#plandetails)
- [PaymentsInfo](#paymentinfo)
- [UpdateProfile](#updateprofile)

**Config methods**

```javascript
Config.setPublisher('111111111'); // required when JWT or refreshToken are not provided
Config.setJWT('xxx'); // optional, when Login should be skipped
Config.setRefreshToken('yyy'); // optional
Config.setMyAccountPayPalUrls({
  // PayPal redirection URLs, required for update PayPal payment details
  successUrl: 'https://client-website.com/my-account/payment-info',
  cancelUrl: 'https://client-website.com/my-account/payment-info',
  errorUrl: 'https://client-website.com/my-account/paypal-error'
});
Config.setVisibleAdyenPaymentMethods(['card', 'googlepay']); // array of presented payment methods
```

**Props**

- `customCancellationReasons` - array of the custom cancellation reasons. List of these reasons will be displayed in unsubscribe popup. The provided cancellation reasons will replace our default ones. Every cancellation reason should have value and key. You can use this key in your translations file, otherwise value will be always displayed.
- `skipAvailableDowngradesStep` - an optional parameter that can be used to skip available downgrades step in the unsubscribe process.
- `skipAvailableFreeExtensionStep` - an optional parameter that can be used to skip available Free Extension step in the unsubscribe process.
- `adyenConfiguration` - an optional parameter that can be used to customize look and feel of the Adyen payment in update payment details section. Read more information about adyen configuration [here](#adyen-configuration).
- `displayGracePeriodError` - an optional parameter that can be used to display error when customer is in a grace period.

**Usage sample**

```javascript
import { MyAccount, store } from '@cleeng/mediastore-sdk';
import { Provider } from 'react-redux';
import adyenConfiguration from './adyenConfiguration';

const customCancellationReasons = [
  {
    value: 'Poor customer support',
    key: 'custom-cancellation-reason.poor-customer-support'
  },
  {
    value: 'Switch to a different service',
    key: 'custom-cancellation-reason.switch-to-different-service'
  }
];

<Provider store={store}>
  <MyAccount
    customCancellationReasons={customCancellationReasons}
    adyenConfiguration={adyenConfiguration}
    skipAvailableDowngradesStep
    displayGracePeriodError
  />
</Provider>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Register

`Register` component is a basic Cleeng registration form (see an example [here](https://developers.cleeng.com/docs/purchase-flow#register)).

**Config methods**

```javascript
Config.setPublisher('111111111'); // required
```

**Props**

- `onSuccess` \* - callback function called after successful registration
- `onHaveAccountClick` \* - function called when customer clicks **Have an account?** below the registration form

\* - required

**Usage sample**

```javascript
import {Auth, Config, Register} from '@cleeng/mediastore-sdk';

Config.setPublisher("111111111");

{Auth.isLogged() ? (
   // your logic, when the customer is logged in
  ) : (
    <Register
      onSuccess={() => console.log("success")}
      onHaveAccountClick={() => console.log("have an account clicked")}
    />
)}

```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Login

`Login` component is a basic Cleeng login form (see an example [here](https://developers.cleeng.com/docs/purchase-flow#login)).

**Config methods**

```javascript
Config.setPublisher('111111111'); // required
Config.setOffer('S123456789_US'); // optional, can be used as a replacement of setPublisher
```

**Props**

- `onSuccess` \* - callback function called after successful login
- `onRegisterClick` - function called when customer clicks `Go to register` button
- `onPasswordResetClick` - function called when customer clicks `Forgot password?` button

\* - required

**Usage sample**

```javascript
Config.setPublisher('111111111');

<Login
  onSuccess={() => console.log('success')}
  onRegisterClick={() => console.log('register button clicked')}
  onPasswordResetClick={() => console.log('password reset button clicked')}
/>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## PasswordReset

`PasswordReset` is a basic reset password form that can be used for resetting passwords (see an example [here](https://developers.cleeng.com/docs/purchase-flow#passwordreset)). You can pass a function that will be called after successful processing of the request with `onSuccess` prop.

**Config methods**

```javascript
Config.setPublisher('111111111'); // required
```

**Props**

- `onSuccess` \* - callback function called after a successful reset password request

**Usage sample**

```javascript
<PasswordReset onSuccess={() => console.log('success')} />
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Purchase

`Purchase` is a component that gives you a possibility to buy an offer in the Cleeng system. You have to be logged in before showing that component.

**Props**

- `offerId` \* - ID of Cleeng offer, for which Purchase component should be opened. If not provided, it will use the item from local storage with name 'CLEENG_OFFER_ID'
- `onSuccess` - function called after a successful payment process \* - required
- `adyenConfiguration` - an optional parameter that can be used to customize look and feel of the Adyen payment in purchase section. Read more information about adyen configuration [here](#adyen-configuration).
- `couponCode` - coupon code that should be automatically applied

**Config methods**

```javascript
Config.setJWT('xxx'); // required conditionally, if Login or Register component is not used
Config.setRefreshToken('yyy'); // optional
Config.setMyAccountUrl('https://client-website.com/my-account'); // required for legal notes
Config.setCheckoutPayPalUrls({
  // PayPal redirection URLs, required for PayPal payment
  successUrl: 'https://client-website.com/my-account',
  cancelUrl: 'https://client-website.com/my-account',
  errorUrl: 'https://client-website.com/my-account/paypal-error'
});
Config.setVisibleAdyenPaymentMethods(['card', 'googlepay']); // array of presented payment methods
```

**Usage sample**

```javascript
import { Purchase, Config, store } from '@cleeng/mediastore-sdk';
import { Provider } from 'react-redux';
import adyenConfiguration from './adyenConfiguration';

<Provider store={store}>
  <Purchase
    offerId="S538257415_PL"
    adyenConfiguration={adyenConfiguration}
    onSuccess={() => console.log('success')}
  />
</Provider>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Subscriptions

`Subscriptions` is a component that will list all subscriptions that are linked with a given logged in customer. There is an option to cancel or resume the selected subscription from the list of subscriptions.

**Props**

- `skipAvailableDowngradesStep` - an optional parameter that can be used to skip available downgrades step in the unsubscribe process.
- `skipAvailableFreeExtensionStep` - an optional parameter that can be used to skip available Free Extension step in the unsubscribe process.

**Config methods**

```javascript
Config.setJWT('xxx'); // required
Config.setRefreshToken('yyy'); // optional
```

**Usage sample**

```javascript
import { Subscriptions, store } from '@cleeng/mediastore-sdk';
import { Provider } from 'react-redux';

<Provider store={store}>
  <Subscriptions skipAvailableDowngradesStep />
</Provider>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## SubscriptionSwitches

This component shows a list of available switches for a given subscription passed in `offerId` prop.

**Config methods**

```javascript
Config.setJWT('xxx'); // required
Config.setRefreshToken('yyy'); // optional
```

**Props**

- `offerId` \* - ID of Cleeng offer, for which possible switches should be displayed. Customer has to have access to this offer

- `toOfferId` - Use to open the switch popup by default. It's a ID of Cleeng offer to which customer wants to switch.
- `onCancel` - required when `toOfferId` is provided. A function that will be called when the customer resigns from the switch. This function should, at least, unmount the SubscriptionSwitches component
- `onSwitchSuccess` - required when `toOfferId` is provided. A function will be called when the switch succeeds and the customer clicked the 'Back to My Account' button. This function should, at least, unmount the SubscriptionSwitches component
- `onSwitchError` - required when `toOfferId` is provided. A function will be called when the switch failed and the customer clicked the 'Back to My Account' button. This function should, at least, unmount the SubscriptionSwitches component

If you are providing the `toOfferId` prop you need to validate if this switch is possible for the customer (to do so, use [get available switches endpoint](https://developers.cleeng.com/reference/fetch-available-switches)).

**Usage sample**

```javascript
Config.setJWT('xxx'); // required
Config.setRefreshToken('yyy'); // optional
```

**Usage sample**

```javascript
import { SubscriptionSwitches, store } from '@cleeng/mediastore-sdk';
import { Provider } from 'react-redux';

<Provider store={store}>
  <SubscriptionSwitches offerId={'S538257415_PL'} />
</Provider>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## PlanDetails

`PlanDetails` is a component that contains previously described components

- [Subscriptions](#subscriptions-header)
- [SubscriptionSwitches](#subscription-switches-header)

**Config methods**

```javascript
Config.setJWT('xxx'); // required
Config.setRefreshToken('yyy'); // optional
```

**Props**

- `customCancellationReasons` - array of the custom cancellation reasons. List of that reasons will be displayed on unsubscribe popup. The provided cancellation reasons will replace our default ones. Every cancellation reason should have key and value. You can use this key in your translations file, otherwise value will be always displayed.
- `skipAvailableDowngradesStep` - an optional parameter that can be used to skip available downgrades step in the unsubscribe process.
- `skipAvailableFreeExtensionStep` - an optional parameter that can be used to skip available Free Extension step in the unsubscribe process.
- `displayGracePeriodError` - an optional parameter that can be used to display error when customer is in a grace period.

**Usage sample**

```javascript
import { PlanDetails } from '@cleeng/mediastore-sdk';
import { Provider } from 'react-redux';

const customCancellationReasons = [
  {
    value: 'Poor customer support',
    key: 'custom-cancellation-reason.poor-customer-support'
  },
  {
    value: 'Switch to a different service',
    key: 'custom-cancellation-reason.switch-to-different-service'
  }
];

<Provider store={store}>
  <PlanDetails
    customCancellationReasons={customCancellationReasons}
    skipAvailableDowngradesStep
    displayGracePeriodError
  />
</Provider>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## PaymentInfo

PaymentInfo is a component that contains all information about customer payments. A customer will be able to:

- see or change his/her payment methods, and
- check all transactions that took place in the past.

**Config methods**

```javascript
Config.setJWT('xxx'); // required
Config.setRefreshToken('yyy'); // optional
Config.setMyAccountPayPalUrls({
  // PayPal redirection URLs, required for update PayPal payment details
  successUrl: 'https://client-website.com/my-account/payment-info',
  cancelUrl: 'https://client-website.com/my-account/payment-info',
  errorUrl: 'https://client-website.com/my-account/paypal-error'
});
Config.setVisibleAdyenPaymentMethods(['card', 'googlepay']); // array of presented payment methods
```

**Props**

- `adyenConfiguration` - an optional parameter that can be used to customize look and feel of the Adyen payment in update payment details section. Read more information about adyen configuration [here](#adyen-configuration).
- `displayGracePeriodError` - an optional parameter that can be used to display error when customer is in a grace period.

**Usage sample**

```javascript
import { PaymentInfo, store } from '@cleeng/mediastore-sdk';
import { Provider } from 'react-redux';
import adyenConfiguration from './adyenConfiguration';

<Provider store={store}>
  <PaymentInfo
    adyenConfiguration={adyenConfiguration}
    displayGracePeriodError
  />
</Provider>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## TransactionList

`TransactionList` is a part of the `PaymentInfo` component and contains only information about all transactions that took place in the past.

**Config methods**

```javascript
Config.setJWT('xxx'); // required
Config.setRefreshToken('yyy'); // optional
```

**Usage sample**

```javascript
import { TransactionList, store } from '@cleeng/mediastore-sdk';
import { Provider } from 'react-redux';

<Provider store={store}>
  <TransactionList />
</Provider>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## UpdateProfile

`UpdateProfile` is a component that displays all information about the current customer. It also gives the possibility to change that profile information.

Customers will also be able to reset their password or update consents from the `UpdateProfile` component.

**Config methods**

```javascript
Config.setJWT('xxx'); // required
Config.setRefreshToken('yyy'); // optional
```

**Props**

- `displayGracePeriodError` - an optional parameter that can be used to display error when customer is in a grace period.

**Usage sample**

```javascript
import { UpdateProfile, store } from '@cleeng/mediastore-sdk';
import { Provider } from 'react-redux';

<Provider store={store}>
  <UpdateProfile displayGracePeriodError />
</Provider>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## CheckoutConsents

`CheckoutConsents` is a simple form that contains all consents that have to be confirmed by a customer.

**Config methods**

```javascript
Config.setJWT('xxx'); // required
Config.setRefreshToken('yyy'); // optional
```

**Props**

- `onSuccess` \* - callback function called after successful form submission, or immediately if there are no available consents fields to update

```javascript
<CheckoutConsents onSuccess={() => console.log('success')} />
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Capture

`Capture` component is a form that was created for collecting customer data that a broadcaster wants to collect. A broadcaster can enable the capture feature and configure its settings in the Cleeng broadcaster dashboard. For more information, see [Cleeng Capture](https://publisher.support.cleeng.com/hc/en-us/articles/222325667-Cleeng-Capture).

If there are any required, and unanswered, capture questions, this component will show a proper form. If there are no available capture fields and no `onSuccess` it will show the loader.

**Config methods**

```javascript
Config.setJWT('xxx'); // required
Config.setRefreshToken('yyy'); // optional
```

**Props**

- `onSuccess` \* - callback function called after successful form submission, or, if there are no available capture fields, immediate

**Usage sample**

```javascript
<Capture onSuccess={() => console.log('success')} />
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## RedeemGift

`RedeemGift` is a component that gives possibility to redeem the gift code and obtain access to the offer received as a gift.
`RedeemGift` component is available only for authenticated users.
If user is not logged in, `MSSDK:auth-failed` event will be emitted.

[Communication (events)](#communication)

**Config methods**

```javascript
Config.setJWT('xxx'); // required
Config.setRefreshToken('yyy'); // optional
```

**Props**

- `onSuccess` - callback function called after successful gift code redemption
- `onBackClick` - callback function enabling the user to go back to the previous view

**Usage sample**

```javascript
import { RedeemGift, store } from '@cleeng/mediastore-sdk';
import { Provider } from 'react-redux';

<Provider store={store}>
  <RedeemGift
    onBackClick={() => console.log('Back to the Checkout')}
    onSuccess={() => console.log('success')}
  />
</Provider>;
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Styling

#### Font

If your application doesn't have a font specified, you can apply the default font (OpenSans) for all MSSDK components by:

```javascript
import '@cleeng/mediastore-sdk/dist/styles/msdFont.css';
```

#### Styling options

There are two ways of styling MediaStore SDK components:

- [SetTheme function](#settheme-function)
- [Custom styles](#custom-styles)

##### SetTheme function

The `setTheme()` function gives you a possibility to change basic colors for all MediaStore SDK components.

Here is an example how to do it:

```javascript
Config.setTheme({
  fontColor: '#ffffff',
  backgroundColor: '#292525',
  cardColor: '#675d5d',
  successColor: '#435dc5',
  primaryColor: '#435dc5',
  loaderColor: '#cccccc',
  errorColor: 'red',
  logoUrl: 'link-to-the-logo'
});
```

##### Custom styles

Another way of styling components from the library is creating custom styles and overriding default styles by those that you have created.
Every MediaStore SDK library component has many classes that can be used to select an element that needs to be styled. Their names are based on BEM.

Here is a simple example how styles can be added:

```css
.msd__header {
  background: #292525;
  border-bottom: none;
}
.msd__header div {
  background-image: url('./logo\ —\ white.png');
  background-size: auto 60%;
}
.msd__auth-wrapper {
  background: #292525;
}
.msd__input {
  color: #fff;
}
.msd__input__label {
  background: #292525;
  color: #fff;
}
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Communication

Components provide a way of communication with your application. Components send the events when important actions occur. Most of the events send additional data that is returned in the `detail` field. The `Event detail` column, in the table below, presents what is returned from `detail` object.
To react to events, add an event listener, like in the sample below:

```javascript
window.addEventListener('MSSDK:Purchase-loaded', () =>
  console.log('Purchase component loaded')
);
window.addEventListener('MSSDK:redeem-coupon-failed', evt =>
  console.log('Customer tried to apply coupon:', evt.detail.coupon)
);
```

##### List of available events

| Event                                           | Event detail                                                                                                                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MSSDK:Purchase-loaded`                         | `{order: {...orderObject } }`                                                                                                                                                                       | The event will be emitted when Purchase component data is loaded.                                                                                                                                                                                                                                                                                                                                                                         |
| `MSSDK:purchase-successful`                     | `{payment: { ...paymentResponse} }`                                                                                                                                                                 | The event will be emitted after successful Adyen payment action. `paymentResponse` object is just as the repsonse from [Adyen payment response](https://developers.cleeng.com/reference/adyen-initial-payment)                                                                                                                                                                                                                            |
| `MSSDK:purchase-failed`                         | `{reason: "Rejection reason"} }`                                                                                                                                                                    | The event will be emitted after failed Adyen payment action.                                                                                                                                                                                                                                                                                                                                                                              |
| `MSSDK:Adyen-error`                             | `{error: "Error message", fieldType: "fieldType"}`                                                                                                                                                  | The event will be emitted when any of the Adyen errors occur, or when the customer fixes the input and the error message disappears. <ul><li>`error` - string with an error message. It will be empty when the error message disappears from the form.</li><li>`fieldType` - informs for which field error occurred. Possible values:<br/> - `encryptedCardNumber`<br/> - `encryptedExpiryDate`<br/> - `encryptedSecurityCode`.</li></ul> |
| `MSSDK:redeem-coupon-success`                   | <code>{coupon: "coupon code", source: "checkout"&#124;"myaccount", order: { ...orderObject }}</code>                                                                                                | The event will be emitted after a successful coupon application in the checkout or in my account.                                                                                                                                                                                                                                                                                                                                         |
| `MSSDK:redeem-coupon-failed`                    | <code>{coupon: "coupon code", source: "checkout"&#124;"myaccount"</code>                                                                                                                            | The event will be emitted after a failed coupon application in the checkout or in my account.                                                                                                                                                                                                                                                                                                                                             |
| `MSSDK:redeem-coupon-button-clicked`            | <code>{source: "checkout"&#124;"myaccount"}</code>                                                                                                                                                  | The event will be emitted after clicking 'Redeem coupon' button in the checkout or my account.                                                                                                                                                                                                                                                                                                                                            |
| `MSSDK:redeem-button-clicked`                   | <code>{coupon: "coupon code", source: "checkout"&#124;"myaccount"}</code>                                                                                                                           | The event will be emitted after clicking 'Redeem' button in the checkout or my account.                                                                                                                                                                                                                                                                                                                                                   |
| `MSSDK:unsubscribe-button-clicked`              | `{offerId: "S123456789_US"}`                                                                                                                                                                        | The event will be emitted after clicking the 'Unsubscribe' button in my account. This button opens an unsubscribe pop up.                                                                                                                                                                                                                                                                                                                 |
| `MSSDK:unsubscribe-action-confirmed`            | `{cancellationReason: "Selected reason", offerId: "S123456789_US"}`                                                                                                                                 | The event will be emitted after clicking 'confirm unsubscribe' button in my account. This button cancels the subscription.                                                                                                                                                                                                                                                                                                                |
| `MSSDK:unsubscribe-action-cancelled`            | `null`                                                                                                                                                                                              | The event will be emitted after clicking unsubscribe cancellation button in my account unsubscribe popup. This button cancels the unsubscribe process.                                                                                                                                                                                                                                                                                    |
| `MSSDK:resume-button-clicked`                   | `{offerId: "S123456789_US"}`                                                                                                                                                                        | The event will be emitted after clicking the 'Resume' button in my account. This button opens a resume pop up.                                                                                                                                                                                                                                                                                                                            |
| `MSSDK:resume-action-confirmed`                 | `{offerId: "S123456789_US"}`                                                                                                                                                                        | The event will be emitted after clicking 'Confirm resume' button in my account. This button reactivates the subscription.                                                                                                                                                                                                                                                                                                                 |
| `MSSDK:resume-action-cancelled`                 | `null`                                                                                                                                                                                              | This event will be emitted when the customer resigns to resume the subscription. This button cancels the subscription reactivation process and closes the resume popup.                                                                                                                                                                                                                                                                   |
| `MSSDK:switch-button-clicked`                   | `{fromOfferId: "S123456789_US", toOfferId: "S123336741_US", switchDirection: "upgrade", algorithm: "DEFERRED"}`                                                                                     | The event will be emitted after clicking the subscription switch (upgrade/downgrade) button in my account. This button opens an offer switch pop up.                                                                                                                                                                                                                                                                                      |
| `MSSDK:switch-popup-action-cancelled`           | `{fromOfferId: "S123456789_US", toOfferId: "S987654321_US", switchDirection: "downgrade", algorithm: "DEFERRED"}`                                                                                   | The event will be emitted when the customer resigns from switching the subscription (upgrading/downgrading). This button cancels the subscription switch process and closes an offer switch popup.                                                                                                                                                                                                                                        |
| `MSSDK:switch-popup-action-successful`          | `{fromOfferId: "S123456789_US", toOfferId: "S123336741_US", switchDirection: "upgrade", algorithm: "DEFERRED", subscriptionId: "123456789", subscriptionSwitchId: "abcd-efgh-ijkl-mnqrs-tuvw-xyz"}` | The event will be emitted when a request to switch the subscription succeeds.                                                                                                                                                                                                                                                                                                                                                             |
| `MSSDK:switch-popup-action-failed`              | `{reason: "Error message"}`                                                                                                                                                                         | The event will be emitted when a request to switch the subscription fails.                                                                                                                                                                                                                                                                                                                                                                |
| `MSSDK:cancel-switch-button-clicked`            | `{ pendingSwitchId: 'aaa-bbb', fromOfferId: 'S123456789_US', toOfferId: 'S987654321_US'}`                                                                                                           | The event will be emitted when a customer clicks the 'Cancel switch' button.                                                                                                                                                                                                                                                                                                                                                              |
| `MSSDK:cancel-switch-action-cancelled`          | `{ pendingSwitchId: 'aaa-bbb', fromOfferId: 'S123456789_US', toOfferId: 'S987654321_US'}`                                                                                                           | The event will be emitted when a customer resigns from canceling the switch.                                                                                                                                                                                                                                                                                                                                                              |
| `MSSDK:cancel-switch-action-triggered`          | `{ pendingSwitchId: 'aaa-bbb', fromOfferId: 'S123456789_US', toOfferId: 'S987654321_US'}`                                                                                                           | The event will be emitted when a customer confirms the intention to stop the switch.                                                                                                                                                                                                                                                                                                                                                      |
| `MSSDK:cancel-switch-action-successful`         | `{ pendingSwitchId: 'aaa-bbb', fromOfferId: 'S123456789_US', toOfferId: 'S987654321_US'}`                                                                                                           | The event will be emitted when a request to stop the switch succeeds.                                                                                                                                                                                                                                                                                                                                                                     |
| `MSSDK:cancel-switch-action-failed`             | `{ pendingSwitchId: 'aaa-bbb', fromOfferId: 'S123456789_US', toOfferId: 'S987654321_US'}, reason: "Reason message"`                                                                                 | The event will be emitted when a request to stop the switch fails.                                                                                                                                                                                                                                                                                                                                                                        |
| `MSSDK:edit-payment-button-clicked`             | `{paymentMethod: "card"}`                                                                                                                                                                           | The event will be emitted after clicking the 'Edit Payment' button in my account.                                                                                                                                                                                                                                                                                                                                                         |
| `MSSDK:update-payment-details-successful`       | `null`                                                                                                                                                                                              | The event will be emitted when a request to update payment method succeeds.                                                                                                                                                                                                                                                                                                                                                               |
| `MSSDK:update-payment-details-failed`           | `null`                                                                                                                                                                                              | The event will be emitted when a request to update payment details fails.                                                                                                                                                                                                                                                                                                                                                                 |
| `MSSDK:remove-payment-details-button-clicked`   | `null`                                                                                                                                                                                              | The event will be emitted after clicking 'Remove your payment method' button in my account.                                                                                                                                                                                                                                                                                                                                               |
| `MSSDK:remove-payment-details-action-confirmed` | `null`                                                                                                                                                                                              | The event will be emitted after clicking 'Remove' button in my account update payment details survey. This button removes selected payment method.                                                                                                                                                                                                                                                                                        |
| `MSSDK:remove-payment-details-action-cancelled` | `null`                                                                                                                                                                                              | This event will be emitted when the customer resigns to remove payment details.                                                                                                                                                                                                                                                                                                                                                           |
| `MSSDK:auth-failed`                             | `null`                                                                                                                                                                                              | This event will be emitted when JWT token expires and there is no refreshToken or fetching refresh token fails.                                                                                                                                                                                                                                                                                                                           |
| `MSSDK:good-news-page`                          | `null`                                                                                                                                                                                              | This event will be emitted when "Good news" page is displayed.                                                                                                                                                                                                                                                                                                                                                                            |
| `MSSDK:payment-page`                            | `null`                                                                                                                                                                                              | This event will be emitted when "Payment" page is displayed.                                                                                                                                                                                                                                                                                                                                                                              |

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Adyen configuration

By passing a special prop `adyenConfiguration` we are giving a possibility to customize an Adyen instance. Components that accept this prop are [MyAccount](#myaccount), [Checkout](#checkout), [PaymentInfo](#paymentinfo) and [Purchase](#purchase).

If the payment method is not presented in the `paymentMethodConfiguration` object, then it doesn't have any optional configuration available, eg. sofort.

The example Adyen configuration object with described properties is shown below:

```javascript
{
  checkoutReturnUrl: 'https://www.test.com', // Optional - use only if you provide support to payment finalization in checkoutReturnUrl. The url to return the customer in case of a redirection during the payment process in checkout component. By default customer is redirected to the page where the payment was triggered and components handle payment finalization.
  myaccountReturnUrl: 'https://www.test.com', // Optional - use only if you provide support to add payment details finalization in myaccountReturnUrl. The url to return the customer in case of a redirection during add/update payment details process in my account component. By default customer is redirected to the page where the action was triggered and components handle finalization.
  analytics: {
      enabled: false, // Indicates if you're sending analytics data to Adyen. Default: true.
  },
  paymentMethodsConfiguration: {
    card: {
      name: 'Credit Card', //	String that is used to display the payment method name to the shopper.
      billingAddressRequired: true, // Set to true to collect the shopper's billing address and mark the fields as required. Default: false
      billingAddressMode: 'partial', // If billingAddressRequired is set to true, you can set this to partial to require the shopper's postal code instead of the full address. Default: 'full'
      brands: ['visa'], // Array of card brands that will be recognized. For a list of possible values, refer to https://docs.adyen.com/payment-methods/cards/custom-card-integration#supported-card-types. Default: ['mc','visa','amex']
      brandsConfiguration: { // Object where you can customize the icons for different brands.
        visa: {
            icon: 'https://...'
        }
      },
      showBrandIcon: true, // Set to false to not show the brand logo when the card brand has been recognized. Default: true
      showBrandsUnderCardNumber: true, // Shows brand logos under the card number field when the shopper selects the card payment method. Default: true
      positionHolderNameOnTop: true, // Renders the cardholder name field at the top of the payment form. Default: false
      styles: {}, // Set a style object to customize the card input fields. For a list of supported properties, refer to https://docs.adyen.com/payment-methods/cards/custom-card-integration#styling
      billingAddressAllowedCountries: ['US', 'CA', 'BR', 'PL'], // Specify allowed country codes for the billing address. Default: The Country field dropdown menu shows a list of all countries.
      minimumExpiryDate: '05/26', // If a shopper enters a date that is earlier than specified here, they will see the following error: "Your card expires before check out date." Format: 'mm/yy'
      autoFocus: true // Automatically move the focus from date field to the CVC field. The focus also moves to the date field when the entered card number reaches the expected length. Default: true
    },
    googlePay: {
      buttonColor: 'white', // default: A Google-selected default value. Currently black but it may change over time.
      // black: A black button suitable for use on white or light backgrounds.
      // white: A white button suitable for use on colorful backgrounds.
      buttonType: 'buy', // The type of button you want displayed on your payments form.
      // For a list of supported properties, refer to https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions
      // Default: 'buy'
      buttonLocale: 'en', // The language on the button. Defaults to the locale set on the current AdyenCheckout instance. Supported locales include en, ar, bg, ca, cs, da, de, el, es, et, fi, fr, hr, id, it, ja, ko, ms, nl, no, pl, pt, ru, sk, sl, sr, sv, th, tr, uk, and zh.
      buttonSizeMode: 'fill' // Specifies whether the button changes to fill the size of its container, or has a static width and height.
      // static: Button has a static width and height
      // fill: Button size changes to fill the size of its container.
      // Default: 'fill'
    },
    applePay: {
      buttonColor: 'black', // The color of button to be displayed on the payment form. Possible values:
      // 'black' - Use on white or light-color backgrounds that provide sufficient contrast. Don’t use on black or dark backgrounds.
      // 'white' - Use on dark-color backgrounds that provide sufficient contrast.
      // 'white-with-line' - Use the white button with black outline on white or very light backgrounds that don’t provide sufficient contrast for a plain white button. Don’t place this button on dark or saturated color backgrounds. Use the white button instead.
      buttonType: 'plain' // The type of button to fit best with the terminology and flow of your purchase or payment experience.
      // The default value is 'plain' which displays basic "Apple Pay" logo button.
      // 'buy': 'buy with Apple Pay'
      // 'check-out': 'Check out with Apple Pay'
      // 'subscribe': 'Subscribe with Apple Pay'
      // For all possible values and styling guidance, see https://developer.apple.com/design/human-interface-guidelines/technologies/apple-pay/buttons-and-marks
    },
    ideal: {
      showImage: true, //	Set to false to remove the bank logos from the iDEAL form. Default: true
      issuer: "0031", // Optional. Set to an iDEAL issuer ID to preselect a specific bank, refer to: https://docs.adyen.com/payment-methods/ideal/web-drop-in?tab=live_payments_2#issuer-ids
      highlightedIssuers: ['0761', '0802'] // Optional. Set to the iDEAL issuer IDs for banks you want to show on top of the dropdown menu.
      placeholder: 'Choose your bank' // Optional. The string you want to show as the dropdown menu text. Custom translation configuration overrides this value. Default: 'Select your bank'
    },
  },
  locale: 'en-US', // The language used in the Drop-in UI. For possible values, see the https://docs.adyen.com/online-payments/web-drop-in/customization#supported-languages,
  translations: {}, // The text displayed in each localization can be customized, allowing you to replace the default text with your own. You can read more about it here https://docs.adyen.com/online-payments/web-drop-in/customization#customizing-a-localization
  openFirstPaymentMethod: true // When enabled, Drop-in opens the first payment method automatically on page load. Default: (screen < 991px) false / (screen > 991px) true.
}
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Translations

<b>This feature is during the development process. Some texts may not be ready for translation yet.</b>

Translations allow you to add a new language version or to change default wording.
Currently, `mediastore-sdk` components are available only in English.

Below, you can find a short guide on how to implement custom copies or translations.

1. Create a `cleeng-translations` folder inside `/public` folder in your application
2. In previously created folder you can create separate folders for needed languages, eg. `/es` for Spanish.
3. Create a new file in a language folder and name it `translations.json`. Copy the content from [English version](https://github.com/Cleeng/mediastore-sdk/tree/main/src/translations/en) and translate the values in that file to the needed language. If you only want to modify wording, you can add and update only the needed keys with values.
4. To enable a new language, you have to add `?lng=es` at the end of your url or set an entry in your local storage.

```javascript
localStorage.setItem('i18nextLng', 'es');
```

5. To change language without reloading the page you can use Config method, it will automatically change i18nextLng in local storage.

```javascript
Config.setLanguage('es');
```

Some of the languages require different directions than the default left-to-right. MediaStore SDK components library support right-to-left direction which can be enabled by adding the `dir` attribute to `html` tag.

```html
<html dir="rtl"></html>
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Security

Website security is a crucial thing nowadays and it is good to secure the website as much as it can be. Because part of the `mediastore-sdk` components library is a payment process, we wanna give you the possibility to make your website secure and safe.

One of the possibilities to secure your website is [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) and it is also an [Adyen recommendation](https://docs.adyen.com/pt/development-resources/integration-security-guide#third-party-components) to do so.

There are several ways to implement Content Security Policy. One of the ways is to add the `<meta>` element in the header of the web application.
Below you can find an example of the Content Security Policy which can be set to secure your website. This one example allows an application only to use resources that are needed for `mediastore-sdk`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="
    default-src 'self';
    script-src 'self' https://*.adyen.com https://*.payments-amazon.com https://*.paypal.com https://*.google.com;
    style-src 'self' https://*.adyen.com https://*.media-amazon.com https://*.paypal.com https://*.google.com 'unsafe-inline';
    img-src 'self' data: https://*.adyen.com https://*.media-amazon.com https://*.paypal.com https://*.google.com https://*.gstatic.com;
    connect-src 'self' *.amazonaws.com *.adyen.com;
    frame-src 'self' *.adyen.com *.google.com;"
/>
```

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## Related documentation

- [Integration guide - quick start, screenshots, testing](https://developers.cleeng.com/docs/components-integration-guide)
- [What is MediaStore SDK?](https://publisher.support.cleeng.com/hc/en-us/articles/360017107279-What-is-MediaStore-SDK-And-any-additional-information-you-may-need-to-know)
- [MSSDK API documentation](https://developers.cleeng.com/reference/getting-started)

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>

## License

The Cleeng MediaStore SDK is open source and available under the BSD 3-Clause License. See the [LICENSE](LICENSE.md) file for more information.

<div align="right">[ <a href="#table-of-contents">↑ Back to top ↑</a> ]</div>
