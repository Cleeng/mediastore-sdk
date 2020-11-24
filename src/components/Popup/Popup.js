/* eslint-disable no-debugger */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Footer from 'components/Footer';
import submitConsents from 'api/Customer/submitConsents';
import getCustomerConsents from 'api/Customer/getCustomerConsents';
import MyAccountConsents from 'components/MyAccountConsents';
import {
  WrapperStyled,
  ContentStyled,
  TitleStyled,
  TextStyled,
  ImageStyled,
  ButtonWrapperStyled,
  ButtonStyled,
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
          <TextStyled step={step}>{t(stepData.text)}</TextStyled>
          {step === 2 && consents && (
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
          <InnerWrapperStyled>
            {stepData.undoButton && (
              <ButtonStyled
                onClickFn={hidePopup}
                theme="secondary"
                width="auto"
              >
                {t(stepData.undoButton)}
              </ButtonStyled>
            )}
            <ButtonStyled
              onClickFn={this[stepData.buttonAction]}
              disabled={step === 2 && !allowSubmitConsents}
              width="auto"
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
