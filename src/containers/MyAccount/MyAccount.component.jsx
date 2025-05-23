/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import withAddPaymentDetailsFinalizationHandler from 'containers/WithAddPaymentDetailsFinalizationHandler';
import MyAccountMenu from 'components/MyAccountMenu';
import MyAccountUserInfo from 'components/MyAccountUserInfo';
import MyAccountContent from 'components/MyAccountContent';
import PlanDetails from 'containers/PlanDetails';
import PaymentInfo from 'containers/PaymentInfo';
import UpdateProfile from 'containers/UpdateProfile';
import MyAccountConsentsPopup from 'components/MyAccountConsentsPopup/MyAccountConsentsPopup';
import Login from 'components/LoginPage/Login';

import { getCustomer, getCustomerConsents } from 'api';
import Footer from 'components/Footer';

import MyAccountError from 'components/MyAccountError/MyAccountError';
import deletePaymentDetails from 'api/PaymentDetails/deletePaymentDetails';
import Auth from 'services/auth';
import { MYACCCOUNT_TABS } from 'appRedux/myaccountSlice';
import { WrapperStyled, HeaderStyled } from './MyAccountStyled';

const POPUP_TYPE = {
  notCheckedTerms: 'notCheckedTerms',
  complexUpdate: 'complexUpdate',
  termsUpdateRequired: 'termsUpdateRequired',
  consentsUpdateRequired: 'consentsUpdateRequired'
};

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      errors: []
    };
  }

  componentDidMount() {
    const {
      userProfile,
      setCurrentUser,
      setConsents,
      setConsentsError,
      initPublisherConfig,
      adyenConfiguration,
      displayGracePeriodError
    } = this.props;

    document.title = 'My Account';

    if (Auth.isLogged()) {
      if (userProfile.consents.length === 0) {
        getCustomerConsents()
          .then((response) => {
            if (!response.errors.length) {
              setConsents(response.responseData.consents);
              this.checkTerms();
            } else {
              setConsentsError(response.errors[0]);
            }
          })
          .catch(() => setConsentsError('Something went wrong..'));
      }

      if (!userProfile.user) {
        getCustomer().then((response) => {
          if (response.errors.length) {
            this.setState({
              errors: response.errors
            });
          } else {
            setCurrentUser(response.responseData);
          }
        });
      }

      if (adyenConfiguration) {
        initPublisherConfig({
          adyenConfiguration
        });
      }
    }
    if (displayGracePeriodError !== null) {
      initPublisherConfig({ displayGracePeriodError });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      userProfile: { consents },
      userProfile,
      setCurrentUser,
      setConsents,
      setConsentsError
    } = this.props;

    if (prevProps.userProfile.consents !== consents) {
      this.checkTerms();
    }

    if (Auth.isLogged()) {
      if (userProfile.consents.length === 0) {
        getCustomerConsents()
          .then((response) => {
            if (!response.errors.length) {
              setConsents(response.responseData.consents);
              this.checkTerms();
            } else {
              setConsentsError(response.errors[0]);
            }
          })
          .catch(() => setConsentsError('Something went wrong..'));
      }

      if (!userProfile.user) {
        getCustomer().then((response) => {
          if (response.errors.length) {
            this.setState({
              errors: response.errors
            });
          } else {
            setCurrentUser(response.responseData);
          }
        });
      }

      // delete old payment details when paypal payment details were updated successfully
      const paymentDetailsToDelete = new URLSearchParams(
        window.location.search
      ).get('deletepd');
      if (parseInt(paymentDetailsToDelete, 10)) {
        deletePaymentDetails(paymentDetailsToDelete);
      }
    }
  }

  handleLogout = () => {
    this.setState({ isLogged: false });
  };

  checkTerms() {
    const {
      userProfile: { consents }
    } = this.props;
    if (consents.length !== 0) {
      // Not checked required terms
      const notCheckedTerms = consents.filter(
        (item) =>
          item.required &&
          item.state === 'declined' &&
          item.version === item.newestVersion
      );
      if (notCheckedTerms.length) {
        this.renderPopup(true, POPUP_TYPE.notCheckedTerms, notCheckedTerms);
        return;
      }

      // New version of terms and consents
      const consentsUpdateRequired = consents.filter(
        (item) => !item.required && item.needsUpdate === true
      );
      const termsUpdateRequired = consents.filter(
        (item) => item.required && item.version !== item.newestVersion
      );
      if (termsUpdateRequired.length && consentsUpdateRequired.length) {
        this.renderPopup(true, POPUP_TYPE.complexUpdate, [
          ...termsUpdateRequired,
          ...consentsUpdateRequired
        ]);
      } else if (termsUpdateRequired.length) {
        this.renderPopup(
          true,
          POPUP_TYPE.termsUpdateRequired,
          termsUpdateRequired
        );
      } else if (consentsUpdateRequired.length) {
        this.renderPopup(
          true,
          POPUP_TYPE.consentsUpdateRequired,
          consentsUpdateRequired
        );
      } else {
        // hide popup after submitting
        this.renderPopup(false);
      }
    }
  }

  renderPopup(isOpen, type = '', consents = []) {
    const { showMyAccountConsentsPopup, hideMyAccountConsentsPopup } =
      this.props;
    if (isOpen) {
      showMyAccountConsentsPopup({ type, consents });
    } else hideMyAccountConsentsPopup();
  }

  renderMyAccountContent = () => {
    const {
      customCancellationReasons,
      skipAvailableDowngradesStep,
      skipCancellationSurveyStep,
      myaccountState: { activeTab }
    } = this.props;

    switch (activeTab) {
      case MYACCCOUNT_TABS.planDetails:
        return (
          <PlanDetails
            customCancellationReasons={customCancellationReasons}
            skipAvailableDowngradesStep={skipAvailableDowngradesStep}
            skipCancellationSurveyStep={skipCancellationSurveyStep}
          />
        );
      case MYACCCOUNT_TABS.paymentInfo:
        return <PaymentInfo />;
      case MYACCCOUNT_TABS.updateProfile:
        return <UpdateProfile handleLogout={this.handleLogout} />;
      default:
        return null;
    }
  };

  render() {
    const {
      userProfile: { consentsError },
      myAccountConsentsPopup: { isPopupShown },
      myaccountState: { activeTab }
    } = this.props;

    if (consentsError) {
      return <MyAccountError generalError fullHeight />;
    }
    if (isPopupShown) {
      return (
        <WrapperStyled>
          <MyAccountConsentsPopup />
        </WrapperStyled>
      );
    }
    if (Auth.isLogged()) {
      return (
        <WrapperStyled>
          <HeaderStyled>
            <MyAccountUserInfo />
            <MyAccountMenu />
            <Footer isCheckout={false} isTransparent />
          </HeaderStyled>
          <MyAccountContent>
            {this.renderMyAccountContent(activeTab)}
          </MyAccountContent>
        </WrapperStyled>
      );
    }
    return (
      <Login isMyAccount onSuccess={() => this.setState({ isLogged: true })} /> // onSuccess required to rerender
    );
  }
}

MyAccount.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
  setConsents: PropTypes.func.isRequired,
  setConsentsError: PropTypes.func.isRequired,
  userProfile: PropTypes.objectOf(PropTypes.any),
  myAccountConsentsPopup: PropTypes.objectOf(PropTypes.any),
  showMyAccountConsentsPopup: PropTypes.func.isRequired,
  hideMyAccountConsentsPopup: PropTypes.func.isRequired,
  customCancellationReasons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  skipAvailableDowngradesStep: PropTypes.bool,
  skipCancellationSurveyStep: PropTypes.bool,
  initPublisherConfig: PropTypes.func.isRequired,
  adyenConfiguration: PropTypes.objectOf(PropTypes.any),
  displayGracePeriodError: PropTypes.bool,
  myaccountState: PropTypes.shape({
    activeTab: PropTypes.string.isRequired
  }).isRequired
};

MyAccount.defaultProps = {
  userProfile: { user: null },
  adyenConfiguration: null,
  myAccountConsentsPopup: { isPopupShown: false },
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false,
  skipCancellationSurveyStep: false,
  displayGracePeriodError: null
};

export { MyAccount as PureMyAccount };

export default withTranslation()(
  withAddPaymentDetailsFinalizationHandler(MyAccount)
);
