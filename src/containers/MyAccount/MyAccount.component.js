/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import AddPaymentDetailsFinalizationHandler from 'containers/AddPaymentDetailsFinalizationHandler';
import MyAccountMenu from 'components/MyAccountMenu';
import MyAccountUserInfo from 'components/MyAccountUserInfo';
import MyAccountContent from 'components/MyAccountContent';
import PlanDetails from 'containers/PlanDetails';
import PaymentInfo from 'containers/PaymentInfo';
import UpdateProfile from 'containers/UpdateProfile';
import Popup from 'components/Popup/Popup';
import Login from 'components/LoginPage/Login';

import { getCustomerOffers, getCustomer, getCustomerConsents } from 'api';
import Footer from 'components/Footer';

import MyAccountError from 'components/MyAccountError/MyAccountError';
import deletePaymentDetails from 'api/PaymentDetails/deletePaymentDetails';
import Auth from 'services/auth';
import { MYACCCOUNT_TABS } from 'redux/myaccountSlice';
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
      planDetails,
      userProfile,
      setCurrentPlan,
      setCurrentUser,
      setConsents,
      setConsentsError,
      initPublisherConfig,
      displayGracePeriodError
    } = this.props;

    document.title = 'My Account';

    if (Auth.isLogged()) {
      if (userProfile.consents.length === 0) {
        getCustomerConsents()
          .then(response => {
            if (!response.errors.length) {
              setConsents(response.responseData.consents);
              this.checkTerms();
            } else {
              setConsentsError(response.errors[0]);
            }
          })
          .catch(() => setConsentsError('Something went wrong..'));
      }

      if (planDetails.currentPlan.length === 0) {
        getCustomerOffers().then(response => {
          if (response.errors?.length) {
            this.setState({
              errors: response.errors
            });
          } else {
            setCurrentPlan(response.items);
          }
        });
      }

      if (!userProfile.user) {
        getCustomer().then(response => {
          if (response.errors.length) {
            this.setState({
              errors: response.errors
            });
          } else {
            setCurrentUser(response.responseData);
          }
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
          .then(response => {
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
        getCustomer().then(response => {
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

  checkTerms() {
    const {
      userProfile: { consents }
    } = this.props;
    if (consents.length !== 0) {
      // Not checked required terms
      const notCheckedTerms = consents.filter(
        item =>
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
        item => !item.required && item.needsUpdate === true
      );
      const termsUpdateRequired = consents.filter(
        item => item.required && item.version !== item.newestVersion
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
    const { showPopup, hidePopup } = this.props;
    if (isOpen) {
      showPopup({ type, consents });
    } else hidePopup();
  }

  renderMyAccountContent = () => {
    const {
      customCancellationReasons,
      skipAvailableDowngradesStep,
      myaccountState: { activeTab }
    } = this.props;

    switch (activeTab) {
      case MYACCCOUNT_TABS.planDetails:
        return (
          <PlanDetails
            customCancellationReasons={customCancellationReasons}
            skipAvailableDowngradesStep={skipAvailableDowngradesStep}
          />
        );
      case MYACCCOUNT_TABS.paymentInfo:
         return <PaymentInfo />;
      case MYACCCOUNT_TABS.updateProfile:
        return <UpdateProfile />;
      default:
        return null;
    }
  };

  render() {
    const {
      userProfile: { consentsError },
      popup: { isPopupShown },
      myaccountState: { activeTab }
    } = this.props;

    if (consentsError) {
      return <MyAccountError generalError fullHeight />;
    }
    if (isPopupShown) {
      return <Popup />;
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
  setCurrentPlan: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setConsents: PropTypes.func.isRequired,
  setConsentsError: PropTypes.func.isRequired,
  userProfile: PropTypes.objectOf(PropTypes.any),
  planDetails: PropTypes.objectOf(PropTypes.any),
  popup: PropTypes.objectOf(PropTypes.any),
  showPopup: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired,
  customCancellationReasons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ),
  skipAvailableDowngradesStep: PropTypes.bool,
  displayGracePeriodError: PropTypes.bool,
  initPublisherConfig: PropTypes.func.isRequired,
  myaccountState: PropTypes.shape({
    activeTab: PropTypes.string.isRequired
  }).isRequired
};

MyAccount.defaultProps = {
  userProfile: { user: null },
  planDetails: { currentPlan: [] },
  popup: { isPopupShown: false },
  customCancellationReasons: null,
  skipAvailableDowngradesStep: false,
  displayGracePeriodError: null
};

export { MyAccount as PureMyAccount };

export default withTranslation()(
  labeling()(AddPaymentDetailsFinalizationHandler(MyAccount))
);
