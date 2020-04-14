/* eslint-disable react/no-unused-state */
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
import { getCustomerSubscriptions, getCustomer } from 'api';

import { breakPoints } from 'styles/BreakPoints';
import {
  OverlayStyled,
  WrapperStyled,
  HeaderStyled,
  ContentWrapperStyled
} from './MyAccountStyled';

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
      setCurrentUser
    } = this.props;

    document.title = 'My Account';

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

  render() {
    const {
      routeMatch,
      isOverlay,
      planDetails: { currentPlan },
      userProfile: { user }
    } = this.props;
    const { path } = routeMatch;

    const isMobile = window.innerWidth < breakPoints.small;
    const firstPageUrl = isMobile
      ? `${path}/quick-actions`
      : `${path}/plan-details`;

    return (
      <OverlayStyled isOverlay={isOverlay}>
        <WrapperStyled>
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
        </WrapperStyled>
      </OverlayStyled>
    );
  }
}

export default MyAccount;

MyAccount.propTypes = {
  setCurrentPlan: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
  routeMatch: PropTypes.objectOf(PropTypes.any),
  isOverlay: PropTypes.bool,
  userProfile: PropTypes.objectOf(PropTypes.any),
  planDetails: PropTypes.objectOf(PropTypes.any)
};

MyAccount.defaultProps = {
  routeMatch: {},
  isOverlay: false,
  userProfile: { user: null },
  planDetails: { currentPlan: [] }
};
