# MediaStore SDK

This is the Cleeng official component library for using with ReactJS.

MediaStore SDK Library consists of components that will allow you to build a seamless checkout process, help visitors become subscribers, and then allow them to manage their subscriptions.

To find out more about MediaStore SDK, see:

- [MediaStore SDK Reference Materials](https://developers.cleeng.com/docs/mediastore-overview)
- [API documentation](https://developers.cleeng.com/reference/getting-started)

## Prerequisites

- node v14.15.0
- react

## Installation

**NPM**

```
npm i @cleeng/mediastore-sdk
```

**Yarn**

```
yarn add @cleeng/mediastore-sdk
```

## Using of the library

### Configuration

You should start configuration by setting publisher settings such as: `publisherId`, `offerId` or environment (if it's needed).
You can do this by using Config class which has few important methods to do it.

1. Setting `publisherId`:

```javascript
Config.setPublisher("publisherId");
```

where `publisherId` is your publisher ID in the Cleeng system.

2. Setting `offerId`

```javascript
Config.setOffer("offerId");
```

where `offerId` is the ID of the offer created for your publisher in the Cleeng system.

3. Setting environment:

```javascript
Config.setEnvironment("environment");
```

where environment is one of the environments listed below:

- `staging`
- `sandbox`
- `production`

You can also style the application by using one of the Config.setTheme() method but there will be more information about that in the [Styling](#styling-header) section.

### Available components

- [Register](#register-header)
- [Login](#login-header)
- [PasswordReset](#password-reset-header)
- [Purchase](#purchase-header)
- [Subscriptions](#subscriptions-header)
- [SubscriptionSwitches](#subscription-switches-header)
- [PlanDetails (contains Subscriptions and SubscriptionSwitches)](#plan-details-header)
- [PaymentInfo](#payment-info-header)
- [TransactionList](#transaction-list-header)
- [UpdateProfile](#update-profile-header)
- [Checkout Consents](#checkout-consents-header)
- [Capture](#capture-header)
- [MyAccount](#my-account-header)
- [Checkout](#checkout-header)

#### <a id="register-header"></a>Register

`Register` component is a basic Cleeng registration form. You can pass a function that will be called after a successful registration process by using `onSuccess` prop. There is also have an account button on that form. You can set what excacly will happend on click by using `onHaveAccountClick` prop.

Usage:

```javascript
<Register
  onSuccess={() => console.log("success")}
  onHaveAccountClick={() => console.log("have an account clicked")}
/>
```

#### <a id="login-header"></a>Login

`Login` component is a basic Cleeng login form. You can pass a function that will be called after a successful login process by using `onSuccess` prop. There are two buttons on that form. You can set what excacly will happend on click by using `onRegisterClick` and `onPasswordResetClick` props.

Usage:

```javascript
<Login
  onSuccess={() => console.log("success")}
  onRegisterClick={() => console.log("register button clicked")}
  onPasswordResetClick={() => console.log("password reset button clicked")}
/>
```

#### <a id="password-reset-header"></a>PasswordReset

`PasswordReset` is a basic reset password form that can be used for resetting passwords. You can pass a function that will be called after successful processing of the request with `onSuccess` prop.

Usage:

```javascript
<PasswordReset onSuccess={() => console.log("success")} />
```

#### <a id="purchase-header"></a>Purchase

`Purchase` is a component that gives a possibility to buy an offer in the Cleeng system. You have to be logged in before showing that component. To do so, use the Login/Register component. You can pass a function that will be called after successful payment process by using `onSuccess` prop. You can also select which offer should be purchased by passing `offerId` prop.

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

`Capture` component is a form that was created for collecting user data that a publisher wants to collect. A publisher can enable the capture feature and configure its settings in the Cleeng publisher dashboard. For more information, see [Cleeng Capture](https://publisher.support.cleeng.com/hc/en-us/articles/222325667-Cleeng-Capture)

You can pass a function that will be called after successful form submission or if there are no available capture fields with `onSuccess` prop.

Usage:

```javascript
<Capture onSuccess={() => console.log("success")} />
```

#### <a id="my-account-header"></a>MyAccount

`MyAccount` is a big component that contains the whole **My Account** feature. The following sections are available in `MyAccount`:

- [PlanDetails (manage subscriptions)](#plan-details-header)
- [PaymentsInfo](#payment-info-header)
- [UpdateProfile](#update-profile-header)

Usage:

```javascript
<CleengMyAccount routeMatch={match} />
```

where `routeMatch` is a match object passed from Route component.

#### <a id="checkout-header"></a>Checkout

`Checkout` is a big component that contains the whole **Checkout** process. The whole checkout flow contains components listed below:

- [Register](#register-header)
- [Login](#login-header)
- [Capture](#capture-header)
- [Checkout Consents](#checkout-consents-header)
- [Purchase](#purchase-header)
- [PasswordReset](#password-reset-header)

You can pass a function that will be called after successful checkout process by using `onSuccess` prop. You can also select which offer should be purchased by passing `offerId` prop.

Usage:

```javascript
<Checkout
  onSuccess={() => console.log("success")}}
  offerId={'S531234647_PL'}
>
```

### <a id="styling-header"></a>Styling

There are two ways of styling MediaStore SDK components:

- [SetTheme function](#set-theme-header)
- [Custom styles](#custom-styles-header)

#### <a id="set-theme-header"></a>SetTheme function

The setTheme() function gives a possibility to change basic colors for all MediaStore SDK components.

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
