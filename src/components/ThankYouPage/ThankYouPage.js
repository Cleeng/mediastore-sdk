import React from 'react';
import Button from 'components/Button/Button';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import labeling from '../../containers/labeling';
import {
  ThankYouPageStyled,
  TitleStyled,
  MessageStyled,
  LinkStyled,
  SocialsStyled,
  ButtonsStyled,
  ShareStyled
} from './ThankYouPageStyled';

const buttonTypes = {
  google: 'google',
  fb: 'fb'
};

const ThankYouPage = ({ t }) => {
  return (
    <>
      <Header showLogOutButton />
      <ThankYouPageStyled>
        <TitleStyled>{t('Thank You!')}</TitleStyled>
        <MessageStyled>
          <strong>
            {t('You are now a subscriber to our premium package.')}
          </strong>
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
        <SocialsStyled>
          <ButtonsStyled>
            <Button variant={buttonTypes.google} />
            <Button variant={buttonTypes.fb} />
          </ButtonsStyled>
          <ShareStyled>
            {t('Have friends who would like to check this out?')}
            <br />
            {t('Just click to share.')}
          </ShareStyled>
        </SocialsStyled>
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

export default withTranslation()(labeling()(ThankYouPage));
