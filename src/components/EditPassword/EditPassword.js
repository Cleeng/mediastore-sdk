import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import { getData } from 'util/appConfigHelper';
import resetPassword from 'api/Auth/resetPassword';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Auth from 'services/auth';
import InnerPopupWrapper from 'components/InnerPopupWrapper';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled,
  MailStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';

class EditPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      isLoading: false,
      isError: false
    };
  }

  renderNextStep = () => {
    this.setState(prevState => {
      return { step: prevState.step + 1 };
    });
  };

  logout = () => {
    const { hideInnerPopup } = this.props;
    hideInnerPopup();
    Auth.logout();
  };

  resetPassword = async () => {
    const { customerEmail } = this.props;
    const { publisherId } = jwtDecode(getData('CLEENG_AUTH_TOKEN'));
    this.setState({
      isLoading: true
    });
    try {
      const response = await resetPassword(customerEmail, String(publisherId));
      if (!response.errors.length) {
        this.renderNextStep();
        this.setState({
          isLoading: false
        });
      } else {
        this.setState({
          isLoading: false,
          isError: true
        });
      }
    } catch {
      this.setState({
        isLoading: false,
        isError: true
      });
    }
  };

  render() {
    const { step, isLoading, isError } = this.state;
    const { t, customerEmail, hideInnerPopup } = this.props;

    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle={t('Edit Password')}
        isError={isError}
        currentStep={step}
      >
        {step === 1 && (
          <>
            <ContentStyled>
              <TitleStyled step={step}>{t('Edit Password')}</TitleStyled>
              <TextStyled step={step}>
                {t(
                  "If you want to edit your password, click 'YES, Reset' to receive password reset instruction on your mail"
                )}
                <MailStyled> {customerEmail}.</MailStyled>
              </TextStyled>
            </ContentStyled>
            <ButtonWrapperStyled>
              <Button theme="simple" onClickFn={() => hideInnerPopup()}>
                {t('No, thanks')}
              </Button>
              <Button theme="confirm" onClickFn={this.resetPassword}>
                {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
                  t('Yes, Reset')}
              </Button>
            </ButtonWrapperStyled>
          </>
        )}
        {step === 2 && (
          <>
            <ContentStyled>
              <TitleStyled step={step}>{t('Email has been sent!')}</TitleStyled>
              <TextStyled step={step}>
                {t(
                  'Please check your inbox and check the Instruction to change a password'
                )}
              </TextStyled>
            </ContentStyled>
            <ButtonWrapperStyled>
              <Button theme="confirm" onClickFn={this.logout}>
                {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
                  t('Thanks!')}
              </Button>
            </ButtonWrapperStyled>
          </>
        )}
      </InnerPopupWrapper>
    );
  }
}

EditPassword.propTypes = {
  hideInnerPopup: PropTypes.func.isRequired,
  customerEmail: PropTypes.string.isRequired,
  t: PropTypes.func
};

EditPassword.defaultProps = {
  t: k => k
};

export { EditPassword as PureEditPassword };

export default withTranslation()(EditPassword);
