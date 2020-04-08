/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import CurrentPlan from 'components/CurrentPlan';
import { getCustomerSubscriptions } from 'api';
import { PropTypes } from 'prop-types';
import MyAccountError from 'components/MyAccountError/MyAccountError';
import { WrapStyled } from './PlanDetailsStyled';

class PlanDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };
  }

  componentDidMount() {
    const { planDetails, setCurrentPlan, showLoader, hideLoader } = this.props;
    if (!planDetails.currentPlan.length) {
      showLoader();
      getCustomerSubscriptions()
        .then(response => {
          if (response.errors.length) {
            this.setState({
              errors: response.errors
            });
            hideLoader();
          } else {
            setCurrentPlan(response.responseData.items);
            hideLoader();
          }
        })
        .catch(err => {
          this.setState({ errors: [err] });
          hideLoader();
        });
    }
  }

  render() {
    const { errors } = this.state;
    const { planDetails, isLoading, t } = this.props;

    return (
      <WrapStyled>
        {!isLoading && (
          <>
            <MyAccountHeading text={t('Current plan')} />
            {errors.length !== 0 ? (
              <MyAccountError serverError />
            ) : (
              <CurrentPlan subscriptions={planDetails.currentPlan} />
            )}
          </>
        )}
      </WrapStyled>
    );
  }
}

PlanDetails.propTypes = {
  setCurrentPlan: PropTypes.func.isRequired,
  showLoader: PropTypes.func.isRequired,
  hideLoader: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  planDetails: PropTypes.objectOf(PropTypes.any),
  t: PropTypes.func
};

PlanDetails.defaultProps = {
  planDetails: { currentPlan: [] },
  t: k => k
};

export { PlanDetails as PurePlanDetails };

export default withTranslation()(labeling()(PlanDetails));
