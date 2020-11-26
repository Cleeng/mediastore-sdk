import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import submitPaymentWithoutDetails from 'api/Offer/submitPaymentWithoutDetails';
import { getData } from 'util/appConfigHelper';
import { periodMapper, dateFormat } from 'util/planHelper';
import labeling from 'containers/labeling';
import Button from 'components/Button';
import {
  WrapStyled,
  TitleStyled,
  DescriptionStyled,
  SubTextStyled,
  CardStyled,
  SubscriptionIconStyled,
  ButtonWrapperStyled,
  ErrorMessageStyled
} from './FreeOfferStyled';

class FreeOffer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: ''
    };
  }

  generateDescriptionForFreeOffer = (period, expiresAt, startTime) => {
    const offerType = getData('CLEENG_OFFER_TYPE');
    switch (offerType) {
      case 'S': {
        return `Free subscription`;
      }
      case 'P': {
        if (!period) {
          return `Access until ${dateFormat(expiresAt, true)}`;
        }
        return `${periodMapper[period].accessText} free pass`;
      }
      case 'E': {
        return `Free event ${startTime ? dateFormat(startTime, true) : ''}`;
      }
      case 'R': {
        return `${periodMapper[period].accessText} free access`;
      }
      case 'A':
        return 'Unlimited access';
      default:
        return '';
    }
  };

  getAccessToFreeOffer = () => {
    const { onPaymentComplete, t } = this.props;
    this.setState({
      isLoading: true,
      error: ''
    });
    submitPaymentWithoutDetails().then(paymentReponse => {
      if (paymentReponse.errors.length) {
        if (
          paymentReponse.errors[0].includes(
            "Order doesn't have paymentMethodId"
          )
        ) {
          this.setState({
            isLoading: false,
            error: t(
              'Unable to proceed, because of wrong offer settings. Please, contact the owner of the offer'
            )
          });
        } else {
          this.setState({
            isLoading: false,
            error: t(
              'Oops, something went wrong! Please, reload the page and try again'
            )
          });
        }
      } else {
        onPaymentComplete();
      }
    });
  };

  render() {
    const { icon, period, expiresAt, startTime, title, t } = this.props;
    const { isLoading, error } = this.state;
    return (
      <WrapStyled>
        <CardStyled>
          <SubscriptionIconStyled icon={icon} />
          <TitleStyled>{title}</TitleStyled>
          <DescriptionStyled>
            {this.generateDescriptionForFreeOffer(period, expiresAt, startTime)}
          </DescriptionStyled>
          <ButtonWrapperStyled>
            <Button
              theme="confirm"
              width="200px"
              onClickFn={this.getAccessToFreeOffer}
              disabled={isLoading}
            >
              {isLoading ? t('Loading...') : t('Get Access')}
            </Button>
            {error && <ErrorMessageStyled>{error}</ErrorMessageStyled>}
          </ButtonWrapperStyled>
          <SubTextStyled>{t('Free, no additional cost')}</SubTextStyled>
        </CardStyled>
      </WrapStyled>
    );
  }
}

FreeOffer.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  period: PropTypes.string,
  expiresAt: PropTypes.string,
  startTime: PropTypes.number,
  onPaymentComplete: PropTypes.func.isRequired,
  t: PropTypes.func
};

FreeOffer.defaultProps = {
  icon: '',
  title: '',
  period: '',
  expiresAt: null,
  startTime: null,
  t: k => k
};

export { FreeOffer as PureFreeOffer };

export default withTranslation()(labeling()(FreeOffer));
