import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import Offer from './Offer';
import mockOfferDetails from './__mocks__/offerDetails';
import '../../styles/index.scss';

const OFFER_DETAILS_GROUP_ID = 'Offer Details';

storiesOf('Offer', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
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
        price: number('price', mockOfferDetails.price, OFFER_DETAILS_GROUP_ID),
        freePeriods: number(
          'freePeriods',
          mockOfferDetails.freePeriods,
          OFFER_DETAILS_GROUP_ID
        ),
        hasTrial: boolean('hasTrial', false, OFFER_DETAILS_GROUP_ID),
        periodDescription: text(
          'periodDescription',
          mockOfferDetails.periodDescription,
          OFFER_DETAILS_GROUP_ID
        ),
        description: text(
          'description',
          mockOfferDetails.description,
          OFFER_DETAILS_GROUP_ID
        )
      }}
      price={number('price', mockOfferDetails.price)}
      priceBeforeDiscount={number('priceBeforeDiscount', 12)}
      couponApplied={boolean('couponApplied', false)}
      error={text('error', '')}
    />
  ));
