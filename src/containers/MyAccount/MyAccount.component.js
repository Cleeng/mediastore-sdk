/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
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
import { validatePaymentMethods } from 'util/paymentMethodHelper';
import { WrapperStyled, HeaderStyled } from './MyAccountStyled';

const POPUP_TYPE = {
  notCheckedTerms: 'notCheckedTerms',
  complexUpdate: 'complexUpdate',
  termsUpdateRequired: 'termsUpdateRequired',
  consentsUpdateRequired: 'consentsUpdateRequired'
};

export const MY_ACCOUNT_PAGES = {
  planDetails: 'planDetails',
  paymentInfo: 'paymentInfo',
  updateProfile: 'updateProfile'
};

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      currentPage: MY_ACCOUNT_PAGES.planDetails,
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
      setPublisherPaymentMethods,
      availablePaymentMethods
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
          if (response.errors.length) {
            this.setState({
              errors: response.errors
            });
          } else {
            setCurrentPlan(response.responseData.items);
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

      if (validatePaymentMethods(availablePaymentMethods, true)) {
        setPublisherPaymentMethods(availablePaymentMethods);
      }
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

  goToPage = pageName => {
    this.setState({
      currentPage: pageName
    });
  };

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

  renderMyAccountContent = currentPage => {
    const {
      customCancellationReasons,
      skipAvailableDowngradesStep
    } = this.props;

    switch (currentPage) {
      case MY_ACCOUNT_PAGES.planDetails:
        return (
          <PlanDetails
            customCancellationReasons={customCancellationReasons}
            skipAvailableDowngradesStep={skipAvailableDowngradesStep}
          />
        );
      case MY_ACCOUNT_PAGES.paymentInfo:
        return <PaymentInfo />;
      case MY_ACCOUNT_PAGES.updateProfile:
        return <UpdateProfile />;
      default:
        return null;
    }
  };

  render() {
    const {
      planDetails: { currentPlan },
      userProfile: { user, consentsError },
      setConsents,
      popup: { isPopupShown, popupType, consents },
      hidePopup,
      t
    } = this.props;
    const { currentPage } = this.state;

    return (
      <>
        {consentsError ? (
          <MyAccountError generalError fullHeight />
        ) : isPopupShown ? (
          <Popup
            setConsents={setConsents}
            popupType={popupType}
            consents={consents}
            customerEmail={user ? user.email : ''}
            hidePopup={hidePopup}
          />
        ) : !Auth.isLogged() ? (
          <Login
            isMyAccount
            onSuccess={() => this.setState({ isLogged: true })}
          />
        ) : (
          <WrapperStyled>
            <HeaderStyled>
              <MyAccountUserInfo
                firstName={user ? user.firstName : ''}
                lastName={user ? user.lastName : ''}
                email={user ? user.email : ''}
                subscription={
                  currentPlan[0]
                    ? t(
                        `offer-title-${currentPlan[0].offerId}`,
                        currentPlan[0].offerTitle
                      )
                    : ''
                }
                isDataLoaded={!!user && !!currentPlan}
              />
              <MyAccountMenu
                currentPage={currentPage}
                goToPage={this.goToPage}
              />
              <Footer isCheckout={false} isTransparent />
            </HeaderStyled>
            <MyAccountContent>
              {this.renderMyAccountContent(currentPage)}
            </MyAccountContent>
          </WrapperStyled>
        )}
      </>
    );
  }
}

MyAccount.propTypes = {
  setCurrentPlan: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setConsents: PropTypes.func.isRequired,
  setConsentsError: PropTypes.func.isRequired,
  setPublisherPaymentMethods: PropTypes.func.isRequired,
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
  availablePaymentMethods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      methodName: PropTypes.string,
      default: PropTypes.bool
    })
  ),
  t: PropTypes.func
};

MyAccount.defaultProps = {
  userProfile: { user: null },
  planDetails: { currentPlan: [] },
  popup: { isPopupShown: false },
  customCancellationReasons: null,
  availablePaymentMethods: null,
  t: k => k,
  skipAvailableDowngradesStep: false
};

export { MyAccount as PureMyAccount };

export default withTranslation()(labeling()(MyAccount));
