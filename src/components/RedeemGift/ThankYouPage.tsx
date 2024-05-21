import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as CheckmarkIcon } from 'assets/images/greenCheckmark.svg';
import { getData } from 'util/appConfigHelper';
import { LinkStyled } from 'components/ThankYouPage/ThankYouPageStyled';
import {
  HeaderStyled,
  InfoTextStyled,
  ThankYouPageStyled,
  InfoTextWrapper
} from './ThankYouPage.styled';

const ThankYouPage = () => {
  const { t } = useTranslation();

  return (
    <ThankYouPageStyled>
      <CheckmarkIcon />
      <HeaderStyled>
        {t('redeem-gift.thank-you-page.header', 'Thank You!')}
      </HeaderStyled>
      <InfoTextStyled>
        <p>
          {t(
            'redeem-gift.thank-you-page.manage-text1',
            'Your gift have been successfully redeemed.'
          )}
        </p>
        {t(
          'redeem-gift.thank-you-page.payment-method-text',
          'We hope you love it. Remember that in order to keep your access after your gift expires, you will need to add a payment method to your account.'
        )}
        <InfoTextWrapper>
          <Trans i18nKey='redeem-gift.thank-you-page.manage-text2'>
            If you need help from us with your account, you can always find it
            <LinkStyled
              href={getData('CLEENG_MY_ACCOUNT_URL')}
              target='_blank'
              rel='noopener noreferrer'
            >
              here.
            </LinkStyled>
          </Trans>
        </InfoTextWrapper>
      </InfoTextStyled>
    </ThankYouPageStyled>
  );
};

export default ThankYouPage;
