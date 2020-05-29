/* eslint-disable react/no-unused-state */
/* eslint-disable no-nested-ternary */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

import PrivateRoute from 'services/privateRoute';
import MyAccountMenu from 'components/MyAccountMenu';
import MyAccountUserInfo from 'components/MyAccountUserInfo';
import MyAccountContent from 'components/MyAccountContent';
import QuickActions from 'components/QuickActions';
import PlanDetails from 'components/PlanDetails';
import PaymentInfo from 'components/PaymentInfo';
import UpdateProfile from 'components/UpdateProfile';
import Popup from 'components/Popup/Popup';
import {
  getCustomerSubscriptions,
  getCustomer,
  getCustomerConsents
} from 'api';

import { breakPoints } from 'styles/BreakPoints';
import MyAccountError from 'components/MyAccountError/MyAccountError';
import {
  OverlayStyled,
  WrapperStyled,
  HeaderStyled,
  ContentWrapperStyled
} from './MyAccountStyled';

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
      setConsentsError
    } = this.props;

    document.title = 'My Account';

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
        .catch(err => setConsentsError(err.message));
    }

    if (planDetails.currentPlan.length === 0) {
      getCustomerSubscriptions().then(response => {
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
  }

  componentDidUpdate(prevProps) {
    const {
      userProfile: { consents }
    } = this.props;
    if (prevProps.userProfile.consents !== consents) {
      this.checkTerms();
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

  render() {
    const {
      routeMatch,
      isOverlay,
      planDetails: { currentPlan },
      userProfile: { user, consentsError },
      setConsents,
      popup: { isPopupShown, popupType, consents },
      hidePopup
    } = this.props;
    const { path } = routeMatch;
    const isMobile = window.innerWidth < breakPoints.small;
    const firstPageUrl = isMobile
      ? `${path}/quick-actions`
      : `${path}/plan-details`;

    return (
      <OverlayStyled isOverlay={isOverlay}>
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
        ) : (
          <WrapperStyled>
            <>
              <HeaderStyled>
                <MyAccountUserInfo
                  firstName={user ? user.firstName : ''}
                  lastName={user ? user.lastName : ''}
                  email={user ? user.email : ''}
                  subscription={currentPlan[0] ? currentPlan[0].offerTitle : ''}
                />
                <MyAccountMenu routeMatch={routeMatch} />
              </HeaderStyled>
              <MyAccountContent>
                <ContentWrapperStyled>
                  <Switch>
                    <PrivateRoute
                      isMyAccount
                      exact
                      path={path}
                      component={() => <Redirect to={firstPageUrl} />}
                    />
                    <PrivateRoute
                      isMyAccount
                      path={`${path}/quick-actions`}
                      component={QuickActions}
                    />
                    <PrivateRoute
                      isMyAccount
                      path={`${path}/plan-details`}
                      component={PlanDetails}
                    />
                    <PrivateRoute
                      isMyAccount
                      path={`${path}/payment-info`}
                      component={PaymentInfo}
                    />
                    <PrivateRoute
                      isMyAccount
                      path={`${path}/update-profile`}
                      component={UpdateProfile}
                    />
                  </Switch>
                </ContentWrapperStyled>
              </MyAccountContent>
            </>
          </WrapperStyled>
        )}
      </OverlayStyled>
    );
  }
}

export default MyAccount;

MyAccount.propTypes = {
  setCurrentPlan: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  setConsents: PropTypes.func.isRequired,
  setConsentsError: PropTypes.func.isRequired,
  routeMatch: PropTypes.objectOf(PropTypes.any),
  isOverlay: PropTypes.bool,
  userProfile: PropTypes.objectOf(PropTypes.any),
  planDetails: PropTypes.objectOf(PropTypes.any),
  popup: PropTypes.objectOf(PropTypes.any),
  showPopup: PropTypes.func.isRequired,
  hidePopup: PropTypes.func.isRequired
};

MyAccount.defaultProps = {
  routeMatch: {},
  isOverlay: false,
  userProfile: { user: null },
  planDetails: { currentPlan: [] },
  popup: { isPopupShown: false }
};
