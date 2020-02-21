import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'redux/store';

import MyAccountMenu from 'components/MyAccountMenu';
import MyAccountUserInfo from 'components/MyAccountUserInfo';
import MyAccountContent from 'components/MyAccountContent';
import QuickActions from 'components/QuickActions';
import PlanDetails from 'components/PlanDetails';
import PaymentInfo from 'components/PaymentInfo/PaymentInfo';
import UpdateProfile from 'components/UpdateProfile';
import { breakPoints } from 'styles/BreakPoints';

import { OverlayStyled, WrapperStyled, HeaderStyled } from './MyAccountStyled';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match, overlay } = this.props;
    const { path } = match;

    const isMobile = window.innerWidth < breakPoints.small;
    const firstPageUrl = isMobile
      ? `${path}/quick-actions`
      : `${path}/plan-details`;

    return (
      <OverlayStyled overlay={overlay}>
        <Provider store={store}>
          <WrapperStyled>
            <HeaderStyled>
              <MyAccountUserInfo />
              <MyAccountMenu match={match} />
            </HeaderStyled>
            <MyAccountContent>
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
            </MyAccountContent>
          </WrapperStyled>
        </Provider>
      </OverlayStyled>
    );
  }
}

export default MyAccount;

MyAccount.propTypes = {
  match: PropTypes.objectOf(PropTypes.any),
  overlay: PropTypes.bool
};

MyAccount.defaultProps = {
  match: {},
  overlay: false
};
