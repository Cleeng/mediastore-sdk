# MediaStore SDK

This is the Cleeng official component library to be used with React.js.

MediaStore SDK Library consists of components that will allow you to build a seamless checkout process, help visitors become subscribers, and then allow them to manage their subscriptions.

To find out more about MediaStore SDK, see:

- [MediaStore SDK Components Library](https://developers.cleeng.com/docs/components-library)
- [API documentation](https://developers.cleeng.com/reference/getting-started)

## Prerequisites

- node v14.15.0
- react v16.14.0

## Installation

Install the package with:

**NPM**

```
npm i @cleeng/mediastore-sdk
```

or

**Yarn**

```
yarn add @cleeng/mediastore-sdk
```

## Usage

### Configuration

If you have the package downloaded locally and you want to begin to use it, you should start configuration by setting broadcaster settings such as: `publisherId` (see more it [here](https://developers.cleeng.com/docs/prerequisites#step-3-obtain-publisher-token)), `offerId` (see more it [here](https://developers.cleeng.com/docs/prerequisites#step-4-create-an-offer)) or environment (if it's needed).
You can do this by using the Config class which has few important methods to do it.

1. Setting `publisherId`:

```javascript
Config.setPublisher("publisherId");
```

where `publisherId` is your broadcaster ID in the Cleeng system.

2. Setting `offerId`

```javascript
Config.setOffer("offerId");
```

where `offerId` is the ID of the offer created for your broadcaster in the Cleeng system.

3. Setting environment:

```javascript
Config.setEnvironment("environment");
```

where environment is one of the environments listed below:

- `staging`
- `sandbox`
- `production`

4. Setting PayPal urls

```javascript
// needed for Checkout Paypal payments
Config.setPaypalUrls({
  successUrl: "http://localhost:3000/my-account",
  cancelUrl: "http://localhost:3000/",
  errorUrl: "http://localhost:3000/error"
});
```

5. Setting My Account url

```javascript
// needed for MyAccount update payment details
Config.setMyAccountUrl("http://localhost:3000/acc");
```

You can also style the application by using one of the Config.setTheme() methods but there will be more information about that in the [Styling](#styling-header) section.

### Available components

You can build a complete flow - allowing customers to buy your offering and use their customer accounts - with two main components:

- [Checkout](#checkout-header) - a full purchase flow (starting from registration to purchase)
- [MyAccount](#my-account-header) - a complete customer account environment

If you prefer smaller components, you can use these to implement the exact features you need:

- [Register](#register-header)
- [Login](#login-header)
- [Capture](#capture-header)
- [Checkout Consents](#checkout-consents-header)
- [Purchase](#purchase-header)
- [PasswordReset](#password-reset-header)
- [Subscriptions](#subscriptions-header)
- [SubscriptionSwitches](#subscription-switches-header)
- [PlanDetails](#plan-details-header)
- [PaymentInfo](#payment-info-header)
- [TransactionList](#transaction-list-header)
- [UpdateProfile](#update-profile-header)

#### <a id="checkout-header"></a>Checkout

`Checkout` is a big component that contains the whole checkout process (from registration to purchase). It contains components listed below:

- [Register](#register-header)
- [Login](#login-header)
- [Capture](#capture-header)
- [Checkout Consents](#checkout-consents-header)
- [Purchase](#purchase-header)
- [PasswordReset](#password-reset-header)

You can pass a function that will be called after a successful checkout process by using `onSuccess` prop. You can also select which offer should be purchased by passing `offerId` prop.

Usage:

```javascript
<Checkout
  onSuccess={() => console.log("success")}}
  offerId={'S531234647_PL'}
>
```

#### <a id="my-account-header"></a>MyAccount

`MyAccount` is a big component that contains the whole **My Account** feature. The following sections are available in `MyAccount`:

- [Login](#login-header)
- [PlanDetails (manage subscriptions)](#plan-details-header)
- [PaymentsInfo](#payment-info-header)
- [UpdateProfile](#update-profile-header)

Usage:

```javascript
<MyAccount />
```

#### <a id="register-header"></a>Register

`Register` component is a basic Cleeng registration form (see an example [here](https://developers.cleeng.com/docs/purchase-flow#register)). You can pass a function that will be called after a successful registration process by using `onSuccess` prop.

There is also a **Have an account?** button on that form. You can set what exactly will happen on clicking by using `onHaveAccountClick` prop.

Usage:

```javascript
<Register
  onSuccess={() => console.log("success")}
  onHaveAccountClick={() => console.log("have an account clicked")}
/>
```

#### <a id="login-header"></a>Login

`Login` component is a basic Cleeng login form (see an example [here](https://developers.cleeng.com/docs/purchase-flow#login)). You can pass a function that will be called after a successful login process by using `onSuccess` prop.

There are two additional buttons on that form: **Go to register** and **Forgot password?**. You can set what exactly will happen on clicking each of them by using `onRegisterClick` and `onPasswordResetClick` props.

Usage:

```javascript
<Login
  onSuccess={() => console.log("success")}
  onRegisterClick={() => console.log("register button clicked")}
  onPasswordResetClick={() => console.log("password reset button clicked")}
/>
```

#### <a id="password-reset-header"></a>PasswordReset

`PasswordReset` is a basic reset password form that can be used for resetting passwords (see an example [here](https://developers.cleeng.com/docs/purchase-flow#passwordreset)). You can pass a function that will be called after successful processing of the request with `onSuccess` prop.

Usage:

```javascript
<PasswordReset onSuccess={() => console.log("success")} />
```

#### <a id="purchase-header"></a>Purchase

`Purchase` is a component that gives you a possibility to buy an offer in the Cleeng system. You have to be logged in before showing that component. To do so, use the [Login](#login-header) / [Register](#register-header) component.

You can pass a function that will be called after a successful payment process by using `onSuccess` prop. You can also select which offer should be purchased by passing `offerId` prop.

Usage:

```javascript
<Purchase offerId={"S538257415_PL"} onSuccess={() => console.log("success")} />
```

#### <a id="subscriptions-header"></a>Subscriptions

`Subscriptions` is a component that will list all subscriptions that are linked with a given logged in subscriber. There is an option to cancel or resume the selected subscription from the list of subscriptions.

Usage:

```javascript
<Subscriptions />
```

#### <a id="subscription-switches-header"></a>SubscriptionSwitches

This component shows a list of available switches (upgrade options) for a given subscription passed in `offerId` prop.

Usage:

```javascript
<SubscriptionSwitches offerId={"S538257415_PL"} />
```

#### <a id="plan-details-header"></a>PlanDetails

`PlanDetails` is a component that contains previously described components

- [Subscriptions](#subscriptions-header)
- [SubscriptionSwitches](#subscription-switches-header)

Usage:

```javascript
<PlanDetails />
```

#### <a id="payment-info-header"></a>PaymentInfo

PaymentInfo is a component that contains all information about customer payments. A customer will be able to:

- see or change his/her payment methods, and
- check all transactions that took place in the past.

Usage:

```javascript
<PaymentInfo />
```

#### <a id="transaction-list-header"></a>TransactionList

`TransactionList` is a part of the `PaymentInfo` component and contains only information about all transactions that took place in the past.

Usage:

```javascript
<TransactionList />
```

#### <a id="update-profile-header"></a>UpdateProfile

`UpdateProfile` is a component that displays all information about a current customer. It also gives the possibility to change that profile information.

Customers will also be able to reset their password or update consents from the `UpdateProfile` component.

Usage:

```javascript
<UpdateProfile />
```

#### <a id="checkout-consents-header"></a>CheckoutConsents

`CheckoutConsents` is a simple form that contains all consents that have to be confirmed by a customer.

You can pass a function that will be called after successful form submission with `onSuccess` prop.

Usage:

```javascript
<CheckoutConsents onSuccess={() => console.log("success")} />
```

#### <a id="capture-header"></a>Capture

`Capture` component is a form that was created for collecting user data that a broadcaster wants to collect. A broadcaster can enable the capture feature and configure its settings in the Cleeng broadcaster dashboard. For more information, see [Cleeng Capture](https://publisher.support.cleeng.com/hc/en-us/articles/222325667-Cleeng-Capture).

You can pass a function that will be called after successful form submission or if there are no available capture fields with `onSuccess` prop.

Usage:

```javascript
<Capture onSuccess={() => console.log("success")} />
```

### <a id="styling-header"></a>Styling

There are two ways of styling MediaStore SDK components:

- [SetTheme function](#set-theme-header)
- [Custom styles](#custom-styles-header)

#### <a id="set-theme-header"></a>SetTheme function

The setTheme() function gives you a possibility to change basic colors for all MediaStore SDK components.

Here is an example how to do it:

```javascript
Config.setTheme({
  fontColor: "#ffffff",
  backgroundColor: "#292525",
  cardColor: "#675d5d",
  successColor: "#435dc5",
  primaryColor: "#435dc5",
  loaderColor: "#cccccc",
  errorColor: "red",
  logoUrl: "link-to-the-logo"
});
```

#### <a id="custom-styles-header"></a>Custom styles

Another way of styling components from the library is creating custom styles and overriding default styles by those that you have created.
Every MediaStore SDK library component has many classes that can be used to select an element that needs to be styled. Their names are based on BEM.

Here is a simple example how styles can be added:

```css
.msd__header {
  background: #292525;
  border-bottom: none;
}
.msd__header div {
  background-image: url("./logo\ —\ white.png");
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

# Related documentation:

- [MediaStore SDK Reference Materials](https://developers.cleeng.com/docs/mediastore-overview)
- [API documentation](https://developers.cleeng.com/reference/getting-started)

# License

The Cleeng MediaStore SDK is open source and available under the BSD 3-Clause License. See the [LICENSE](LICENSE.md) file for more information.
