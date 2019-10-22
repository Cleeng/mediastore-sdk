import React from 'react';
import Button from 'components/Button/Button';
import {
  StyledThankYouPage,
  StyledTitle,
  StyledMessage,
  StyledLink,
  StyledSocials,
  StyledButtons,
  StyledShare
} from './StyledThankYouPage';

const buttonTypes = {
  google: 'google',
  fb: 'fb'
};

const ThankYouPage = () => (
  <StyledThankYouPage>
    <StyledTitle>Thank You!</StyledTitle>
    <StyledMessage>
      <strong>You are now a subscriber to our premium package.</strong>
    </StyledMessage>
    <StyledMessage>
      We hope you love it. If you need help from us with your account, you can
      always find it
      <StyledLink
        href="https://www.cleeng.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        here.
      </StyledLink>
    </StyledMessage>
    <StyledSocials>
      <StyledButtons>
        <Button variant={buttonTypes.google} />
        <Button variant={buttonTypes.fb} />
      </StyledButtons>
      <StyledShare>
        Have friends who would like to check this out?
        <br />
        Just click to share.
      </StyledShare>
    </StyledSocials>
  </StyledThankYouPage>
);

export default ThankYouPage;
