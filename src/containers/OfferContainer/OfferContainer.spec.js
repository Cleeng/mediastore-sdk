import React from 'react';
import { shallow } from 'enzyme';
import OfferContainer from './OfferContainer';
import saveOfferId from '../../util/offerIdHelper';

jest.mock('../../util/offerIdHelper', () => jest.fn());

describe('Offer Container', () => {
  describe('@renders', () => {
    const onPaymentCompleteMock = jest.fn();
    const urlPropsMock = {
      location: {
        search: 'location.pl?offer=123'
      }
    };

    it('should save url props', () => {
      shallow(
        <OfferContainer
          onPaymentComplete={onPaymentCompleteMock}
          urlProps={urlPropsMock}
        />
      );

      expect(saveOfferId).toHaveBeenCalled();
    });
  });
});
