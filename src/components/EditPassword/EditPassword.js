import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import jwtDecode from 'jwt-decode';
import labeling from 'containers/labeling';
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
import data from './EditPassword.const';

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
    const { steps } = data;
    const stepData = steps[step - 1];
    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle="Edit Password"
        isError={isError}
        currentStep={step}
      >
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
          {stepData.undoButton && (
            <Button theme="simple" onClickFn={() => hideInnerPopup()}>
              {t(stepData.undoButton)}
            </Button>
          )}
          <Button theme="confirm" onClickFn={this[stepData.buttonAction]}>
            {(isLoading && <Loader buttonLoader color="#ffffff" />) ||
              t(stepData.buttonText)}
          </Button>
        </ButtonWrapperStyled>
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

export default withTranslation()(labeling()(EditPassword));
