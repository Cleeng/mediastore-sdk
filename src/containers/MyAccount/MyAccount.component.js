/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

import MyAccountMenu from 'components/MyAccountMenu';
import MyAccountUserInfo from 'components/MyAccountUserInfo';
import MyAccountContent from 'components/MyAccountContent';
import QuickActions from 'components/QuickActions';
import PlanDetails from 'components/PlanDetails';
import PaymentInfo from 'components/PaymentInfo';
import UpdateProfile from 'components/UpdateProfile';
import Loader from 'components/Loader';
import { getCustomerSubscriptions, getCustomer } from 'api';

import { MyAccountMenuActive } from 'styles/variables';
import { breakPoints } from 'styles/BreakPoints';

import {
  OverlayStyled,
  WrapperStyled,
  HeaderStyled,
  StyledLoaderContainer,
  MyAccountContentWrap
} from './MyAccountStyled';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: null
    };
  }

  componentDidMount() {
    const {
      planDetails,
      userProfile,
      setCurrentPlan,
      setCurrentUser
    } = this.props;

    if (!planDetails.currentPlan.length) {
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
      isLoading,
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
            <MyAccountContentWrap>
              <Switch>
                <Route exact path={path}>
                  <Redirect to={firstPageUrl} />
                </Route>
                <Route path={`${path}/quick-actions`}>
                  <QuickActions />
                </Route>
                <Route path={`${path}/plan-details`}>
                  <PlanDetails />
                </Route>
                <Route path={`${path}/payment-info`}>
                  <PaymentInfo />
                </Route>
                <Route path={`${path}/update-profile`}>
                  <UpdateProfile />
                </Route>
              </Switch>
              {isLoading && (
                <StyledLoaderContainer>
                  <Loader color={MyAccountMenuActive} />
                </StyledLoaderContainer>
              )}
            </MyAccountContentWrap>
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
  isLoading: PropTypes.bool,
  userProfile: PropTypes.objectOf(PropTypes.any),
  planDetails: PropTypes.objectOf(PropTypes.any)
};

MyAccount.defaultProps = {
  routeMatch: {},
  isOverlay: false,
  isLoading: false,
  userProfile: { user: null },
  planDetails: { currentPlan: [] }
};
