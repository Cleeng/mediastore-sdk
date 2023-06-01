import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { currencyFormat } from 'util/planHelper';

import PropTypes from 'prop-types';
import { Trans, useTranslation } from 'react-i18next';
import Header from 'components/Header';
import Footer from 'components/Footer';
import checkmarkIconBase from 'assets/images/checkmarkBase';
import { getData } from 'util/appConfigHelper';
import formatNumber from 'util/formatNumber';

import {
  ThankYouPageWrapperStyled,
  ThankYouPageStyled,
  TitleStyled,
  MessageStyled,
  LinkStyled,
  IconStyled
} from './ThankYouPageStyled';

const ThankYouPage = ({ onSuccess }) => {
  const {
    payment: { paymentMethod, totalAmount: totalAmountFromStore, currency }
  } = useSelector(state => state.finalizeInitialPayment);

  const { t } = useTranslation();

  const readablePaymentMethod = {
    card: 'Card',
    paypa: 'PayPal',
    googlepay: 'GooglePay',
    applepay: 'ApplePay'
  };

  const paymentMethodName = readablePaymentMethod[paymentMethod];
  const currencySymbol = currencyFormat[currency];
  const totalAmount = formatNumber(totalAmountFromStore);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSuccess();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThankYouPageWrapperStyled data-testid="ThankYouPage-component">
      <Header />
      <ThankYouPageStyled>
        <IconStyled src={checkmarkIconBase} />
        <TitleStyled>{t('thank-you-page.header', 'Thank You!')}</TitleStyled>
        <MessageStyled>
          {readablePaymentMethod[paymentMethod] ? (
            <strong>
              {t(
                'thank-you-page.text-with-payment-method',
                `Your purchase was successfully processed using {{paymentMethodName}}!`,
                { paymentMethodName }
              )}
            </strong>
          ) : (
            <strong>
              {t(
                'thank-you-page.text',
                'Your purchase was successfully processed!'
              )}
            </strong>
          )}
        </MessageStyled>
        <MessageStyled>
          {totalAmount
            ? currencySymbol &&
              t(
                'thank-you-page.sub-text-with-price',
                `You have been charged {{currencySymbol}}{{totalAmount}}.`,
                {
                  currencySymbol,
                  totalAmount
                }
              )
            : null}
          <Trans i18nKey="thank-you-page.manage-text">
            You can manage your account from
            <LinkStyled
              href={getData('CLEENG_MY_ACCOUNT_URL')}
              target="_blank"
              rel="noopener noreferrer"
            >
              here.
            </LinkStyled>
          </Trans>
        </MessageStyled>
      </ThankYouPageStyled>
      <Footer />
    </ThankYouPageWrapperStyled>
  );
};

ThankYouPage.propTypes = {
  onSuccess: PropTypes.func
};

ThankYouPage.defaultProps = {
  onSuccess: () => {}
};

export { ThankYouPage as PureThankYouPage };

export default ThankYouPage;
