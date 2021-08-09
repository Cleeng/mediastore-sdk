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

You can set your publisher by calling

```
Config.setPublisher('publisherId');
```

where publisherId is an your publisher ID in Cleeng system.

You can also set your offer by calling

```
Config.setOffer('offerId');
```

where offerId is ID of the offer in Cleeng system.

### Available components

#### Login

Login component is a basic Cleeng login form. You can pass a function that will be called after successful login process by using onSuccess prop.

Usage:

```
<Login
  urlProps={{location: {search: 'offerId=S538257415_PL'}}
  onSuccess={() => hideModal()}
/>
```

#### Register

Register component is a basic Cleeng registration form. You can pass a function that will be called after successful registration process by using onSuccess prop.

Usage:

```
<Register
  urlProps={{location: {search: 'offerId=S538257415_PL'}}}
  onSuccess={() => hideModal()}
/>
```

#### OfferContainer

OfferContainer is a component that gives a possibility to buy an offer in Cleeng system. You have to be logged in before showing that component. To do so use Login/Register component. You can pass a function that will be called after successful payment process by using onPaymentComplete prop.

Usage:

```
<OfferContainer
  urlProps={{location: {search: 'offerId=S538257415_PL'}}}
  onPaymentComplete={() => hideModal()}
/>
```

#### MyAccount

My account is a big components that contains the whole my account feature. Sections that are available in My Account:

- Plan Details (manage subscriptions)
- Payments
- Profile Details

Usage:

```
<CleengMyAccount
  routeMatch={match}
/>
```

where routeMatch is an match object passed from from Route component.

**Here you can find documentation:**

- [MediaStore SDK tutorial](https://developers.cleeng.com/docs/prerequisites)
- [API documentation](https://developers.cleeng.com/reference/getting-started)

# License

The Cleeng Media Store SDK is open source and available under the BSD 3-Clause License. See the [LICENSE](LICENSE.md) file for more info.
