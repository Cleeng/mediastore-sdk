/* eslint-disable import/prefer-default-export */
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'appRedux/store';
import { bankPaymentMethods, getStandardCopy } from 'util/paymentMethodHelper';
import { DisclaimerStyled, TermsLinkStyled } from './DisclaimerStyled';

export const Disclaimer = () => {
  const { t } = useTranslation();

  const offer = useAppSelector((state) => state.offer.offer);
  const order = useAppSelector((state) => state.order.order);
  const termsUrl = useAppSelector((state) => state.publisherConfig.termsUrl);
  const deliveryDetails = useAppSelector((state) => state.deliveryDetails);
  const selectedPaymentMethod = useAppSelector(
    (state) => state.paymentMethods.selectedPaymentMethod
  );

  const { totalPrice, offerId } = order;

  const getBankCopy = () => {
    const isFree = totalPrice === 0;
    const isSubscription = offerId?.charAt(0) === 'S';
    if (isFree && isSubscription) {
      return t(
        'offer-bank-consent-copy.free-subscription',
        'By ticking this, you agree to the Terms and Conditions of our service. Your account will be charged €0.10 for authentication purposes. This amount will be refunded once the transaction is completed. Your account will be charged on a recurring basis for the full subscription amount. Your subscription will continue until you cancel.'
      );
    }

    if (isSubscription) {
      return t(
        'offer-bank-consent-copy.paid-subscription',
        'By ticking this, you agree to the Terms and Conditions of our service. Your account will be charged on a recurring basis for the full subscription amount. Your subscription will continue until you cancel.'
      );
    }

    return t(
      'offer-bank-consent-copy.paid-not-subscription',
      'By ticking this, you agree to the Terms and Conditions of our service.'
    );
  };

  if (!selectedPaymentMethod) {
    return null;
  }

  const isBankMethod = bankPaymentMethods.includes(
    selectedPaymentMethod.methodName
  );

  return (
    <DisclaimerStyled>
      {isBankMethod
        ? getBankCopy()
        : getStandardCopy(false, offer, order, deliveryDetails?.isGift)}
      <br />
      <TermsLinkStyled href={termsUrl} target='_blank' rel='noreferrer'>
        {t('checkbox.terms-link', 'Terms & Conditions')}
      </TermsLinkStyled>
    </DisclaimerStyled>
  );
};
