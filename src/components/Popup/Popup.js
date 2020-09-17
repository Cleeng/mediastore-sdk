/* eslint-disable no-debugger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Footer from 'components/Footer';
import submitConsents from 'api/Customer/submitConsents';
import getCustomerConsents from 'api/Customer/getCustomerConsents';
import resetPassword from 'api/Auth/resetPassword';
import Auth from 'services/auth';
import MyAccountConsents from 'components/MyAccountConsents';
import { getData } from 'util/appConfigHelper';
import {
  WrapperStyled,
  ContentStyled,
  TitleStyled,
  TextStyled,
  ImageStyled,
  ButtonWrapperStyled,
  ButtonStyled,
  InfoStyled,
  HeaderStyled,
  DotStyled,
  HeaderTitleStyled,
  DotsWrapperStyled,
  InnerWrapperStyled
} from './PopupStyled';
import popupData from './Popup.const';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      updatedConsents: [],
      isLoading: false,
      allowSubmitConsents: false
    };
  }

  componentDidMount() {
    const { consents } = this.props;
    this.setState({
      updatedConsents: consents
    });
    this.checkAccess(consents);
  }

  renderNextStep = () => {
    this.setState(prevState => {
      return { step: prevState.step + 1 };
    });
  };

  handleSubmitConsents = () => {
    const { updatedConsents } = this.state;
    const { setConsents } = this.props;
    const payload = updatedConsents.map(item => {
      return {
        name: item.name,
        version: item.newestVersion,
        state: item.state
      };
    });
    this.setState({
      isLoading: true
    });
    submitConsents([], [], payload).then(() => {
      getCustomerConsents().then(resp => {
        setConsents(resp.responseData.consents);
      });
    });
  };

  logout = () => {
    const { hidePopup } = this.props;
    hidePopup();
    Auth.logout(true);
  };

  resetPassword = async () => {
    const customerEmail = getData('CLEENG_CUSTOMER_EMAIL');
    const publisherId = getData('CLEENG_PUBLISHER_ID');
    this.setState({
      isLoading: true
    });
    const response = await resetPassword('', customerEmail, '', publisherId);
    if (!response.errors.length) {
      this.renderNextStep();
      this.setState({
        isLoading: false
      });
    }
  };

  checkAccess(items) {
    const notCheckedTerm = items.find(
      item => item.required && item.state === 'declined'
    );
    if (notCheckedTerm) {
      this.setState({
        allowSubmitConsents: false
      });
    } else {
      this.setState({
        allowSubmitConsents: true
      });
    }
  }

  render() {
    const { popupType, consents, setConsents, hidePopup, t } = this.props;
    const { step, isLoading, allowSubmitConsents } = this.state;
    const stepData = popupData[popupType].steps[step - 1];
    const { steps } = popupData[popupType];
    const customerEmail = getData('CLEENG_CUSTOMER_EMAIL');
    return (
      <WrapperStyled>
        <HeaderStyled>
          <DotsWrapperStyled currentStep={step}>
            {steps.length > 1 &&
              steps.map(item => <DotStyled key={item.title} />)}
          </DotsWrapperStyled>
          <HeaderTitleStyled>{t(stepData.headerTitle)}</HeaderTitleStyled>
        </HeaderStyled>
        <ContentStyled step={consents.length ? step : 1}>
          {stepData.icon && <ImageStyled src={stepData.icon} />}
          <TitleStyled step={step}>{t(stepData.title)}</TitleStyled>
          <TextStyled step={step}>
            {t(stepData.text)}
            {popupType === 'resetPassword' && step === 1 && customerEmail}
            {t(stepData.secondText) && (
              <>
                <br />
                <br />
                {t(stepData.secondText)}
              </>
            )}
          </TextStyled>
          {step === 2 && consents && popupType !== 'resetPassword' && (
            <MyAccountConsents
              consents={consents}
              showConsentsOnly
              saveConsents={items => {
                this.setState({ updatedConsents: items });
                this.checkAccess(items);
              }}
              setConsents={setConsents}
            />
          )}
        </ContentStyled>
        <ButtonWrapperStyled>
          {step === 2 &&
            (popupType === 'notCheckedTerms' ||
              popupType === 'termsUpdateRequired' ||
              popupType === 'complexUpdate') && (
              <InfoStyled>
                * {t('This term is mandatory for using myAccount')}
              </InfoStyled>
            )}
          <InnerWrapperStyled>
            {stepData.undoButton && (
              <ButtonStyled onClickFn={hidePopup} theme="secondary">
                {t(stepData.undoButton)}
              </ButtonStyled>
            )}
            <ButtonStyled
              onClickFn={this[stepData.buttonAction]}
              disabled={step === 2 && !allowSubmitConsents}
            >
              {(isLoading && t('Loading...')) || t(stepData.buttonText)}
            </ButtonStyled>
          </InnerWrapperStyled>
        </ButtonWrapperStyled>
        <Footer isCheckout={false} />
      </WrapperStyled>
    );
  }
}

Popup.propTypes = {
  setConsents: PropTypes.func,
  popupType: PropTypes.string,
  consents: PropTypes.arrayOf(PropTypes.object),
  hidePopup: PropTypes.func.isRequired,
  t: PropTypes.func
};

Popup.defaultProps = {
  popupType: '',
  setConsents: () => {},
  consents: [],
  t: k => k
};

export { Popup as PurePopup };

export default withTranslation()(labeling()(Popup));
