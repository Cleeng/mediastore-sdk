import React from 'react';
import Button from 'components/Button/Button';
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

const ThankYouPage = () => (
  <ThankYouPageStyled>
    <TitleStyled>Thank You!</TitleStyled>
    <MessageStyled>
      <strong>You are now a subscriber to our premium package.</strong>
    </MessageStyled>
    <MessageStyled>
      We hope you love it. If you need help from us with your account, you can
      always find it
      <LinkStyled
        href="https://www.cleeng.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        here.
      </LinkStyled>
    </MessageStyled>
    <SocialsStyled>
      <ButtonsStyled>
        <Button variant={buttonTypes.google} />
        <Button variant={buttonTypes.fb} />
      </ButtonsStyled>
      <ShareStyled>
        Have friends who would like to check this out?
        <br />
        Just click to share.
      </ShareStyled>
    </SocialsStyled>
  </ThankYouPageStyled>
);

export default ThankYouPage;
