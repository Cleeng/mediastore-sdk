import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  number,
  boolean,
  text,
  array
} from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { action } from '@storybook/addon-actions';
import 'styles/index.scss';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input';
import mockOfferDetails from './__mocks__/offerDetails';
import Offer from './Offer';

const OFFER_DETAILS_GROUP_ID = 'Offer Details';

storiesOf('Checkout/Offer', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(story => (
    <div style={{ width: 700, backgroundColor: 'white', position: 'relative' }}>
      {story()}
    </div>
  ))
  .add('Basic Offer', () => (
    <Offer
      offerDetails={{
        imageUrl: text(
          'imageUrl',
          mockOfferDetails.imageUrl,
          OFFER_DETAILS_GROUP_ID
        ),
        title: text('title', mockOfferDetails.title, OFFER_DETAILS_GROUP_ID),
        customerCurrencySymbol: text(
          'customerCurrencySymbol',
          mockOfferDetails.customerCurrencySymbol,
          OFFER_DETAILS_GROUP_ID
        ),
        price: number(
          'price',
          mockOfferDetails.price,
          {},
          OFFER_DETAILS_GROUP_ID
        ),
        priceBeforeDiscount: number(
          'priceBeforeDiscount',
          12,
          {},
          OFFER_DETAILS_GROUP_ID
        ),
        isCouponApplied: boolean(
          'couponApplied',
          false,
          OFFER_DETAILS_GROUP_ID
        ),
        freePeriods: number(
          'freePeriods',
          mockOfferDetails.freePeriods,
          {},
          OFFER_DETAILS_GROUP_ID
        ),
        isTrialAllowed: boolean(
          'isTrialAllowed',
          false,
          OFFER_DETAILS_GROUP_ID
        ),
        periodDescription: text(
          'periodDescription',
          mockOfferDetails.periodDescription,
          OFFER_DETAILS_GROUP_ID
        ),
        description: text(
          'description',
          mockOfferDetails.description,
          OFFER_DETAILS_GROUP_ID
        ),
        errors: array('errors', [], ',', OFFER_DETAILS_GROUP_ID)
      }}
      couponProps={{
        showMessage: false,
        message: '',
        messageType: MESSAGE_TYPE_SUCCESS,
        onSubmit: action('apply-coupon')
      }}
      onPaymentComplete={action('onPaymentComplete')}
    />
  ));
