import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { currencyFormat } from 'util/planHelper';

import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Header from 'components/Header';
import Footer from 'components/Footer';
import labeling from 'containers/labeling';
import checkmarkIconBase from 'assets/images/checkmarkBase';
import { getData } from 'util/appConfigHelper';

import {
  ThankYouPageWrapperStyled,
  ThankYouPageStyled,
  TitleStyled,
  MessageStyled,
  LinkStyled,
  IconStyled
} from './ThankYouPageStyled';

const ThankYouPage = ({ onSuccess, t }) => {
  const {
    payment: { paymentMethod, totalAmount, currency }
  } = useSelector(state => state.finalizeInitialPayment);
  const readablePaymentMethod = {
    card: 'Credit Card',
    paypa: 'PayPal',
    googlepay: 'GooglePay',
    applepay: 'ApplePay'
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      onSuccess();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThankYouPageWrapperStyled>
      <Header />
      <ThankYouPageStyled>
        <IconStyled src={checkmarkIconBase} />
        <TitleStyled>{t('Thank You!')}</TitleStyled>
        <MessageStyled>
          {readablePaymentMethod[paymentMethod] ? (
            <strong>
              {t(
                `Your purchase was successfully processed using ${readablePaymentMethod[paymentMethod]}!`
              )}
            </strong>
          ) : (
            <strong>{t('Your purchase was successfully processed!')}</strong>
          )}
        </MessageStyled>
        <MessageStyled>
          {totalAmount &&
            currency &&
            t(
              `You have been charged ${currencyFormat[currency]}${totalAmount}. `
            )}
          {t('You can manage your account from')}
          <LinkStyled
            href={getData('CLEENG_MY_ACCOUNT_URL')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('here')}.
          </LinkStyled>
        </MessageStyled>
      </ThankYouPageStyled>
      <Footer />
    </ThankYouPageWrapperStyled>
  );
};

ThankYouPage.propTypes = {
  onSuccess: PropTypes.func,
  t: PropTypes.func
};

/* istanbul ignore next */
ThankYouPage.defaultProps = {
  onSuccess: () => {},
  t: k => k
};

export { ThankYouPage as PureThankYouPage };

export default withTranslation()(labeling()(ThankYouPage));
