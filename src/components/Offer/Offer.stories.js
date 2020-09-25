import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
import { action } from '@storybook/addon-actions';
import 'styles/index.scss';
import { MESSAGE_TYPE_SUCCESS } from 'components/Input';
import withMock from 'storybook-addon-mock';
import mockOfferDetails from './__mocks__/offerDetails';

import Offer from './Offer';

const OFFER_DETAILS_GROUP_ID = 'Offer Details';

storiesOf('Pages/Offer', module)
  .addDecorator(withKnobs)
  .addDecorator(jsxDecorator)
  .addDecorator(withMock)
  .addDecorator(story => (
    <div
      style={{
        minHeight: '100%',
        backgroundColor: 'white',
        position: 'relative'
      }}
    >
      {story()}
    </div>
  ))
  .add(
    'Basic Offer',
    () => (
      <Offer
        offerDetails={{
          offerTitle: text(
            'title',
            mockOfferDetails.title,
            OFFER_DETAILS_GROUP_ID
          ),
          customerCurrencySymbol: text(
            'customerCurrencySymbol',
            mockOfferDetails.customerCurrencySymbol,
            OFFER_DETAILS_GROUP_ID
          ),
          description: text(
            'description',
            mockOfferDetails.description,
            OFFER_DETAILS_GROUP_ID
          ),
          trialAvailable: boolean(
            'trialAvailable',
            false,
            OFFER_DETAILS_GROUP_ID
          ),
          freePeriods: number(
            'freePeriods',
            mockOfferDetails.freePeriods,
            {},
            OFFER_DETAILS_GROUP_ID
          ),
          freeDays: number(
            'freeDays',
            mockOfferDetails.freeDays,
            {},
            OFFER_DETAILS_GROUP_ID
          ),
          period: text(
            'period',
            mockOfferDetails.period,
            OFFER_DETAILS_GROUP_ID
          )
        }}
        orderDetails={{
          priceBreakdown: {
            offerPrice: number(
              'price',
              mockOfferDetails.price,
              {},
              OFFER_DETAILS_GROUP_ID
            ),
            discountAmount: number(
              'discountAmount',
              mockOfferDetails.discountAmount,
              {},
              OFFER_DETAILS_GROUP_ID
            ),
            taxValue: number(
              'taxValue',
              mockOfferDetails.taxValue,
              {},
              OFFER_DETAILS_GROUP_ID
            ),
            customerServiceFee: number(
              'customerServiceFee',
              mockOfferDetails.customerServiceFee,
              {},
              OFFER_DETAILS_GROUP_ID
            )
          },
          discount: {
            applied: boolean('discount applied', false, OFFER_DETAILS_GROUP_ID)
          },
          totalPrice: number(
            'totalPrice',
            mockOfferDetails.totalPrice,
            {},
            OFFER_DETAILS_GROUP_ID
          ),
          requiredPaymentDetails: boolean(
            'requiredPaymentDetails',
            mockOfferDetails.requiredPaymentDetails,
            OFFER_DETAILS_GROUP_ID
          )
        }}
        couponProps={{
          showMessage: false,
          message: '',
          messageType: MESSAGE_TYPE_SUCCESS,
          onSubmit: action('apply-coupon')
        }}
        onPaymentComplete={action('onPaymentComplete')}
      />
    ),
    {
      mockData: [
        {
          url: `${ENVIRONMENT_CONFIGURATION.API_URL}/payment-methods`,
          method: 'GET',
          status: 200,
          response: {
            responseData: {
              paymentMethods: [
                {
                  id: 881885683,
                  methodName: 'card',
                  logoUrl: ''
                },
                {
                  id: 386925084,
                  methodName: 'paypal',
                  logoUrl: ''
                }
              ],
              message: 'Payment method settings for publisher 105664357',
              status: 200
            },
            errors: []
          }
        }
      ]
    }
  );
