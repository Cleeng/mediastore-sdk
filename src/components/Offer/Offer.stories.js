import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import Offer from './Offer';
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
          'https://webstoresdk.cleeng.com/assets/ff1e5e2f.png',
          OFFER_DETAILS_GROUP_ID
        ),
        title: text(
          'title',
          'Some test offer (ID: S123456789)',
          OFFER_DETAILS_GROUP_ID
        ),
        customerCurrencySymbol: text(
          'customerCurrencySymbol',
          '$',
          OFFER_DETAILS_GROUP_ID
        ),
        price: number('price', 12, OFFER_DETAILS_GROUP_ID),
        freePeriods: number('freePeriods', 2, OFFER_DETAILS_GROUP_ID),
        hasTrial: boolean('hasTrial', false, OFFER_DETAILS_GROUP_ID),
        periodDescription: text(
          'periodDescription',
          '',
          OFFER_DETAILS_GROUP_ID
        ),
        description: text(
          'description',
          'Monthly plan. Renews automatically. Cancel anytime you want.',
          OFFER_DETAILS_GROUP_ID
        )
      }}
      price={number('price', 12)}
      priceBeforeDiscount={number('priceBeforeDiscount', 12)}
      couponApplied={boolean('couponApplied', false)}
      error={text('error', '')}
    />
  ));
