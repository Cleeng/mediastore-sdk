import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Header from 'components/Header';
import Logout from 'components/Logout';
import Footer from 'components/Footer';
import labeling from 'containers/labeling';
import checkmarkIcon from 'assets/images/checkmark.svg';

import {
  ThankYouPageStyled,
  TitleStyled,
  MessageStyled,
  LinkStyled,
  IconStyled
} from './ThankYouPageStyled';

const ThankYouPage = ({ t }) => {
  return (
    <>
      <Header>
        <Logout />
      </Header>
      <ThankYouPageStyled>
        <IconStyled src={checkmarkIcon} alt="checkmark icon" />
        <TitleStyled>{t('Thank You!')}</TitleStyled>
        <MessageStyled>
          <strong>{t('Your purchase has been successfully completed.')}</strong>
        </MessageStyled>
        <MessageStyled>
          {t(
            'We hope you love it. If you need help from us with your account, you can always find it'
          )}
          <LinkStyled
            href="https://www.cleeng.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('here')}.
          </LinkStyled>
        </MessageStyled>
      </ThankYouPageStyled>
      <Footer />
    </>
  );
};

ThankYouPage.propTypes = {
  t: PropTypes.func
};

/* istanbul ignore next */
ThankYouPage.defaultProps = {
  t: k => k
};

export { ThankYouPage as PureThankYouPage };

export default withTranslation()(labeling()(ThankYouPage));
