import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { getData } from 'util/appConfigHelper';
import resetPassword from 'api/Auth/resetPassword';
import Button from 'components/Button';
import Auth from 'services/auth';
import MyAccountError from 'components/MyAccountError';

import data from './EditPassword.const';

import {
  WrapperStyled,
  CardStyled,
  HeaderStyled,
  HeaderTitleStyled,
  DotsWrapperStyled,
  DotStyled,
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled,
  InnerWrapperStyled,
  MailStyled
} from './EditPasswordStyled';

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
    const { hideResetPassword } = this.props;
    hideResetPassword();
    Auth.logout(true);
  };

  resetPassword = async () => {
    const customerEmail = getData('CLEENG_CUSTOMER_EMAIL');
    const publisherId = getData('CLEENG_PUBLISHER_ID');
    this.setState({
      isLoading: true
    });
    const response = await resetPassword('', customerEmail, publisherId);
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
  };

  render() {
    const { step, isLoading, isError } = this.state;
    const { t, hideResetPassword } = this.props;
    const { steps } = data;
    const stepData = steps[step - 1];
    const customerEmail = getData('CLEENG_CUSTOMER_EMAIL');
    return (
      <CardStyled>
        {isError ? (
          <MyAccountError generalError centered />
        ) : (
          <WrapperStyled>
            <HeaderStyled>
              <DotsWrapperStyled currentStep={step}>
                {steps.length > 1 &&
                  steps.map(item => <DotStyled key={item.title} />)}
              </DotsWrapperStyled>
              <HeaderTitleStyled>{t(stepData.headerTitle)}</HeaderTitleStyled>
            </HeaderStyled>
            <ContentStyled>
              <TitleStyled step={step}>{t(stepData.title)}</TitleStyled>
              <TextStyled step={step}>
                {t(stepData.text)}
                {step === 1 && <MailStyled>{customerEmail}</MailStyled>}
                {t(stepData.secondText) && (
                  <>
                    <br />
                    <br />
                    {t(stepData.secondText)}
                  </>
                )}
              </TextStyled>
            </ContentStyled>
            <ButtonWrapperStyled>
              <InnerWrapperStyled>
                {stepData.undoButton && (
                  <Button theme="simple" onClickFn={() => hideResetPassword()}>
                    {t(stepData.undoButton)}
                  </Button>
                )}
                <Button theme="confirm" onClickFn={this[stepData.buttonAction]}>
                  {(isLoading && t('Loading...')) || t(stepData.buttonText)}
                </Button>
              </InnerWrapperStyled>
            </ButtonWrapperStyled>
          </WrapperStyled>
        )}
      </CardStyled>
    );
  }
}

EditPassword.propTypes = {
  hideResetPassword: PropTypes.func.isRequired,
  t: PropTypes.func
};

EditPassword.defaultProps = {
  t: k => k
};

export { EditPassword as PureEditPassword };

export default withTranslation()(labeling()(EditPassword));
