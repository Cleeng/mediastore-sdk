import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import updateSubscription from 'api/Customer/updateSubscription';
import { dateFormat } from 'util/planHelper';
import checkmarkIcon from 'assets/images/checkmark.svg';

import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import InnerPopupWrapper from 'components/InnerPopupWrapper';

import {
  ContentStyled,
  TitleStyled,
  TextStyled,
  ButtonWrapperStyled
} from 'components/InnerPopupWrapper/InnerPopupWrapperStyled';
import {
  ReasonsWrapper,
  StyledItem,
  StrongStyled
} from './UpdateSubscriptionStyled';

import { cancellationReasons, content } from './UpdateSubscription.const';

class UpdateSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedReason: '',
      isError: false,
      isLoading: false,
      currentStep: 1
    };
  }

  unsubscribe = async () => {
    const { offerDetails } = this.props;
    const { checkedReason } = this.state;
    try {
      this.setState({
        isLoading: true
      });
      const response = await updateSubscription({
        offerId: offerDetails.offerId,
        status: 'cancelled',
        cancellationType: 'userCancel',
        cancellationReason: checkedReason
      });
      if (response.errors.length) {
        this.setState({
          isError: true,
          isLoading: false
        });
      } else {
        this.setState({
          currentStep: 2,
          isLoading: false
        });
      }
    } catch {
      this.setState({
        isError: true,
        isLoading: false
      });
    }
  };

  resubscribe = async () => {
    const { offerDetails } = this.props;
    try {
      this.setState({
        isLoading: true
      });
      const response = await updateSubscription({
        offerId: offerDetails.offerId,
        status: 'active'
      });
      if (response.errors.length) {
        this.setState({
          isError: true,
          isLoading: false
        });
      } else {
        this.setState({
          currentStep: 2,
          isLoading: false
        });
      }
    } catch {
      this.setState({
        isError: true,
        isLoading: false
      });
    }
  };

  render() {
    const { checkedReason, isError, isLoading, currentStep } = this.state;
    const { hideInnerPopup, offerDetails, updateList, action, t } = this.props;
    const price = offerDetails.price ? offerDetails.price.slice(0, -1) : '';
    const priceRounded = Math.round(price * 100) / 100;
    const currency = offerDetails.price ? offerDetails.price.slice(-1) : '';
    const popupContent = content[action][currentStep - 1];
    const resubscribeText = (
      <>
        <b>{`${priceRounded}${currency}`}</b> {t(popupContent.startedFrom)}{' '}
        <b>{dateFormat(offerDetails.expiresAt)}.</b>
      </>
    );
    return (
      <InnerPopupWrapper
        steps={2}
        popupTitle={t('Manage your plan')}
        isError={isError}
        currentStep={currentStep}
      >
        {currentStep === 1 ? (
          <>
            <ContentStyled>
              <TitleStyled>{t(popupContent.title)}</TitleStyled>
              <TextStyled>
                {t(popupContent.text1)}{' '}
                <StrongStyled>{t(popupContent.buttonText)}</StrongStyled>{' '}
                {t(popupContent.text2)}{' '}
                {action === 'resubscribe' && resubscribeText}
              </TextStyled>
              {popupContent.reasons && (
                <ReasonsWrapper>
                  {cancellationReasons.map(reason => (
                    <StyledItem key={reason.key}>
                      <Checkbox
                        isRadioButton
                        onClickFn={() =>
                          this.setState({ checkedReason: reason.value })
                        }
                        checked={reason.value === checkedReason}
                      >
                        {t(reason.value)}
                      </Checkbox>
                    </StyledItem>
                  ))}
                </ReasonsWrapper>
              )}
            </ContentStyled>
            <ButtonWrapperStyled removeMargin={action === 'unsubscribe'}>
              <Button theme="simple" onClickFn={hideInnerPopup}>
                {t('No, thanks')}
              </Button>
              <Button
                theme={popupContent.buttonTheme}
                onClickFn={this[action]}
                disabled={
                  (action === 'unsubscribe' && checkedReason === '') ||
                  isLoading
                }
              >
                {(isLoading && t('Loading...')) || t(popupContent.buttonText)}
              </Button>
            </ButtonWrapperStyled>
          </>
        ) : (
          <ContentStyled>
            <img src={checkmarkIcon} alt="checkmark icon" />
            <TitleStyled>{t(popupContent.title)}</TitleStyled>
            <TextStyled>
              {t(popupContent.text)}{' '}
              {action === 'resubscribe' && resubscribeText}
              <b>{dateFormat(offerDetails.expiresAt)}</b>.
            </TextStyled>
            <Button
              width="auto"
              margin="30px auto 0 auto"
              onClickFn={() => {
                hideInnerPopup();
                updateList();
              }}
            >
              {t(popupContent.buttonText)}
            </Button>
          </ContentStyled>
        )}
      </InnerPopupWrapper>
    );
  }
}

UpdateSubscription.propTypes = {
  hideInnerPopup: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  action: PropTypes.string.isRequired,
  offerDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  t: PropTypes.func
};

UpdateSubscription.defaultProps = {
  t: k => k
};

export { UpdateSubscription as PureUpdateSubscription };

export default withTranslation()(labeling()(UpdateSubscription));
