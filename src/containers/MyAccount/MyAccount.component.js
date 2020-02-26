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
    this.state = {};
  }

  render() {
    const { routeMatch, isOverlay, isLoading } = this.props;
    const { path } = routeMatch;

    const isMobile = window.innerWidth < breakPoints.small;
    const firstPageUrl = isMobile
      ? `${path}/quick-actions`
      : `${path}/plan-details`;

    return (
      <OverlayStyled isOverlay={isOverlay}>
        <WrapperStyled>
          <HeaderStyled>
            <MyAccountUserInfo />
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
  routeMatch: PropTypes.objectOf(PropTypes.any),
  isOverlay: PropTypes.bool,
  isLoading: PropTypes.bool
};

MyAccount.defaultProps = {
  routeMatch: {},
  isOverlay: false,
  isLoading: false
};
