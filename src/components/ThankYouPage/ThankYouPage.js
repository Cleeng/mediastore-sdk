import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Header from 'components/Header';
import Footer from 'components/Footer';
import labeling from 'containers/labeling';
import checkmarkIcon from 'assets/images/checkmarkIB.svg';

import {
  ThankYouPageWrapperStyled,
  ThankYouPageStyled,
  TitleStyled,
  MessageStyled,
  LinkStyled,
  IconStyled
} from './ThankYouPageStyled';

const ThankYouPage = ({ onSuccess, t }) => {
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
