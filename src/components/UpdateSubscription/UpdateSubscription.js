import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import updateSubscription from 'api/Customer/updateSubscription';
import serverIcon from 'assets/images/errors/sad_server.svg';
import labeling from 'containers/labeling';
import { dateFormat } from 'util/planHelper';
import roundNumber from 'util/roundNumber';
import checkmarkIcon from 'assets/images/checkmark.svg';
import {
  SurveyCard,
  WrapperStyled,
  HeaderStyled,
  SubTitleStyled,
  ReasonsWrapper,
  ButtonsWrapper,
  StyledItem,
  UnsubscribedWrapper,
  FooterStyled,
  StrongStyled
} from './UpdateSubscriptionStyled';
import { cancellationReasons, content } from './UpdateSubscription.const';

const LAYOUT = {
  CONFIRM: 'confirm',
  SUCCESS: 'success'
};

class UpdateSubscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedReason: '',
      isError: false,
      layout: LAYOUT.CONFIRM,
      isLoading: false
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
          layout: LAYOUT.SUCCESS,
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
          layout: LAYOUT.SUCCESS,
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
    const { checkedReason, isError, layout, isLoading } = this.state;
    const { hideSurvey, offerDetails, updateList, action, t } = this.props;

    const price = offerDetails.price ? offerDetails.price.slice(0, -1) : '';
    const priceRounded = roundNumber(price);
    const currency = offerDetails.price ? offerDetails.price.slice(-1) : '';

    if (isError) {
      return (
        <SurveyCard>
          <WrapperStyled>
            <UnsubscribedWrapper>
              <img src={serverIcon} alt="server icon" />
              <HeaderStyled> {t('Oops, something went wrong!')}</HeaderStyled>
              <SubTitleStyled>
                {t('Please try again in a few moments.')}
              </SubTitleStyled>
              <Button
                width="auto"
                margin="30px auto 0 auto"
                onClickFn={() => {
                  hideSurvey();
                  updateList();
                }}
              >
                {t('Back to settings')}
              </Button>
            </UnsubscribedWrapper>
          </WrapperStyled>
          <FooterStyled isInPopup isCheckout={false} />
        </SurveyCard>
      );
    }
    if (layout === LAYOUT.SUCCESS) {
      const popupContent = content[action].success;
      const resubscribeText = (
        <>
          <b>{`${priceRounded}${currency}`}</b> {t(popupContent.startedFrom)}{' '}
        </>
      );
      return (
        <SurveyCard>
          <WrapperStyled>
            <UnsubscribedWrapper>
              <img src={checkmarkIcon} alt="checkmark icon" />
              <HeaderStyled>{t(popupContent.title)}</HeaderStyled>
              <SubTitleStyled>
                {t(popupContent.text)}{' '}
                {action === 'resubscribe' && resubscribeText}
                <b>{dateFormat(offerDetails.expiresAt)}</b>.
              </SubTitleStyled>
              <Button
                width="auto"
                margin="30px auto 0 auto"
                onClickFn={() => {
                  hideSurvey();
                  updateList();
                }}
              >
                {t(popupContent.buttonText)}
              </Button>
            </UnsubscribedWrapper>
          </WrapperStyled>
          <FooterStyled isInPopup isCheckout={false} />
        </SurveyCard>
      );
    }
    const popupContent = content[action].confirm;
    const resubscribeText = (
      <>
        <b>{dateFormat(offerDetails.expiresAt)} </b>
        {t(popupContent.andWillBe)} <b>{`${priceRounded}${currency}`}.</b>
      </>
    );
    return (
      <SurveyCard>
        <WrapperStyled>
          <HeaderStyled>{t(popupContent.title)}</HeaderStyled>
          <SubTitleStyled>
            {t(popupContent.text1)}{' '}
            {action === 'unsubscribe' && (
              <StrongStyled>{`${t(popupContent.buttonText)} `}</StrongStyled>
            )}
            {t(popupContent.text2)}{' '}
            {action === 'resubscribe' && resubscribeText}
          </SubTitleStyled>
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
          <ButtonsWrapper>
            <Button theme="simple" onClickFn={hideSurvey}>
              {t(popupContent.backButtonText)}
            </Button>
            <Button
              theme={popupContent.buttonTheme}
              onClickFn={this[action]}
              disabled={
                (action === 'unsubscribe' && checkedReason === '') || isLoading
              }
            >
              {(isLoading && t('Loading...')) || t(popupContent.buttonText)}
            </Button>
          </ButtonsWrapper>
        </WrapperStyled>
        <FooterStyled isInPopup isCheckout={false} />
      </SurveyCard>
    );
  }
}

UpdateSubscription.propTypes = {
  hideSurvey: PropTypes.func.isRequired,
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
