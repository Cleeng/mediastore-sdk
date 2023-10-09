import { Trans, useTranslation } from 'react-i18next';
import { ReactComponent as CheckmarkIcon } from 'assets/images/greenCheckmark.svg';
import { getData } from 'util/appConfigHelper';
import { LinkStyled } from 'components/ThankYouPage/ThankYouPageStyled';
import {
  HeaderStyled,
  InfoTextStyled,
  ThankYouPageStyled
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
        <Trans i18nKey="redeem-gift.thank-you-page.manage-text2">
          We hope you love it. If you need help from us with your account, you
          can always find it
          <LinkStyled
            href={getData('CLEENG_MY_ACCOUNT_URL')}
            target="_blank"
            rel="noopener noreferrer"
          >
            here.
          </LinkStyled>
        </Trans>
      </InfoTextStyled>
    </ThankYouPageStyled>
  );
};

export default ThankYouPage;
