/* eslint-disable no-debugger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Footer from 'components/Footer/Footer';
import submitConsents from 'api/submitConsents';
import getCustomerConsents from 'api/getCustomerConsents';
import MyAccountConsents from 'components/MyAccountConsents/MyAccountConsents';
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
  DotsWrapperStyled
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
    const { popupType, consents, setConsents, t } = this.props;
    const { step, isLoading, allowSubmitConsents } = this.state;
    const stepData = popupData[popupType].steps[step - 1];
    const { steps } = popupData[popupType];

    return (
      <WrapperStyled>
        <HeaderStyled>
          <DotsWrapperStyled currentStep={step}>
            {steps.length > 1 &&
              steps.map(item => <DotStyled key={item.title} />)}
          </DotsWrapperStyled>
          <HeaderTitleStyled>{stepData.headerTitle}</HeaderTitleStyled>
        </HeaderStyled>
        <ContentStyled step={step}>
          {stepData.icon && <ImageStyled src={stepData.icon} />}
          <TitleStyled step={step}>{stepData.title}</TitleStyled>
          <TextStyled step={step}>
            {stepData.text}
            {stepData.secondText && (
              <>
                <br />
                <br />
                {stepData.secondText}
              </>
            )}
          </TextStyled>
          {step === 2 && consents && (
            <MyAccountConsents
              consents={consents}
              onlyConsents
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
                * This term is mandatory for using myAccount
              </InfoStyled>
            )}
          <ButtonStyled
            onClickFn={this[stepData.buttonAction]}
            disabled={step === 2 && !allowSubmitConsents}
          >
            {(isLoading && t('Loading...')) || stepData.buttonText}
          </ButtonStyled>
        </ButtonWrapperStyled>
        <Footer />
      </WrapperStyled>
    );
  }
}

Popup.propTypes = {
  setConsents: PropTypes.func.isRequired,
  popupType: PropTypes.string,
  consents: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.func
};

Popup.defaultProps = {
  popupType: '',
  t: k => k
};

export { Popup as PurePopup };

export default withTranslation()(labeling()(Popup));
