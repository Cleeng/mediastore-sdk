# MediaStore SDK

This is the Cleeng official component library for using with ReactJS

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

You should start configoration by setting publisher settings like publisherId, offerId or environment if its needed.
You can do this by using Config class which has few important methods to do it.

Setting publisherId:

```javascript
Config.setPublisher("publisherId");
```

where publisherId is your publisher ID in Cleeng system.

Setting offerId

```javascript
Config.setOffer("offerId");
```

where offerId is ID of the offer created for your publisher in Cleeng system.

Setting environment:

```javascript
Config.setEnvironment("environment");
```

where environment is one of the environments listed below:

- `staging`
- `sandbox`
- `production`

You can also style the application by using one of the Config.setTheme() method but there will be more information about that in [Styling](#styling-header) section.

### Available components

#### Login

Login component is a basic Cleeng login form. You can pass a function that will be called after successful login process by using `onSuccess` prop.

Usage:

```javascript
<Login onSuccess={() => hideModal()} />
```

#### Register

Register component is a basic Cleeng registration form. You can pass a function that will be called after successful registration process by using `onSuccess` prop.

Usage:

```javascript
<Register onSuccess={() => hideModal()} />
```

#### PasswordReset

PasswordReset is basic reset password form that can be used for resseting password. You can pass a function that will be called after successful processing the request with `onSuccess` prop.

Usage:

```javascript
<PasswordReset onSuccess={() => console.log("success")} />
```

#### Purchase

Purchase is a component that gives a possibility to buy an offer in Cleeng system. You have to be logged in before showing that component. To do so use Login/Register component. You can pass a function that will be called after successful payment process by using `onPaymentComplete` prop.

Usage:

```javascript
<Purchase onPaymentComplete={() => hideModal()} />
```

#### Subscriptions

Subscriptions is a component that will list all subscriptions that are linked with logged subscriber. There is an option to cancel or resume selected subscription from list of subscription.

Usage:

```javascript
<Subscriptions />
```

#### SubscriptionSwitches

List of available switches for subscription passed in `offerId` prop.

Usage:

```javascript
<SubscriptionSwitches offerId={"S538257415_PL"} />
```

#### PlanDetails

Plan Details is a component that contains previously described components(Subscriptions and SubscriptionSwitches).

Usage:

```javascript
<PlanDetails />
```

#### PaymentInfo

PaymentInfo is a component that contains all information about customer payments. Customer will be able to see or change his payment methods and check all transactions that took plase in the past.

Usage:

```javascript
<PaymentInfo />
```

#### TransactionList

TransactionList is a part of PaymentInfo component and contains only information about all transactions that took plase in the past

Usage:

```javascript
<TransactionList />
```

#### UpdateProfile

UpdateProfile is a component that displays all information about current Customer. It also gives posibility to change that profile information. From UpdateProfile component Customer will also be able to reset his password or update terms.

Usage:

```javascript
<UpdateProfile />
```

#### CheckoutConsents

CheckoutConsents is a siple form that contains all consents that have to be confirmed by Customer.

After successful form submition user will be redirected into url that is passed via `redirectUrl`.

Usage:

```javascript
<CheckoutConsents redirectUrl={["/acc"]} />
```

#### Capture

Capture component is a form that was created for collecting user data that publisher want to collect. Publisher can enable capture feature and configure those settings in Cleeng publisher dashboard.

After successful form submition or if there is no available capture fields user will be redirected into url that is passed via `redirectUrl`.

Usage:

```javascript
<Capture redirectUrl={["/acc"]} />
```

#### MyAccount

My account is a big component that contains the whole my account feature. Sections that are available in My Account:

- Plan Details (manage subscriptions)
- Payments
- Profile Details

Usage:

```javascript
<CleengMyAccount routeMatch={match} />
```

where routeMatch is an match object passed from from Route component.

### <a id="styling-header"></a>Styling

#### SetTheme function

There are two ways of styling mediastore-sdk components. First one is using setTheme() function which gives a possibility to change basic colors for whole mediastore-sdk components.

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

#### Custom styles

Another way of styling componets from library is creating custom styles and overriding default styles by those that you have created.
Every mediastore-sdk library component has many classes that can be used to select element that needs to be styled. Their names are based on BEM.

Here is a simple exapmle how styles can be added:

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

**Here you can find documentation:**

- [MediaStore SDK tutorial](https://developers.cleeng.com/docs/prerequisites)
- [API documentation](https://developers.cleeng.com/reference/getting-started)

# License

The Cleeng Media Store SDK is open source and available under the BSD 3-Clause License. See the [LICENSE](LICENSE.md) file for more info.
