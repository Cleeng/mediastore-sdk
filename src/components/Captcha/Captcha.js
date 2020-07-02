import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import checkCaptcha from 'api/Auth/checkCaptcha';
import PropTypes from 'prop-types';
import { StyledRecaptcha, StyledErrorDiv } from './CaptchaStyled';

export const isCaptchaRequired = formName =>
  checkCaptcha(formName).then(response => response.responseData.required);

export const validateCaptchaField = (value, showCaptcha) =>
  showCaptcha && value === '' ? 'Please complete the CAPTCHA.' : '';

class Captcha extends Component {
  render() {
    const { recaptchaRef, onChange, error } = this.props;
    return (
      <>
        <StyledRecaptcha>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LcJ_QsUAAAAANPDxN_HZUJs_5Zabd5UoEIeyLtu"
            onChange={onChange}
          />
        </StyledRecaptcha>
        {error !== '' && <StyledErrorDiv lowestPos>{error}</StyledErrorDiv>}
      </>
    );
  }
}

Captcha.propTypes = {
  recaptchaRef: PropTypes.objectOf(PropTypes.any),
  error: PropTypes.string,
  onChange: PropTypes.func
};

Captcha.defaultProps = {
  recaptchaRef: '',
  error: '',
  onChange: () => {}
};

export default Captcha;
