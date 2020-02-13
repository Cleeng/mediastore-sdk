import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import MyAccountMenu from 'components/MyAccountMenu';
import MyAccountUserInfo from 'components/MyAccountUserInfo';
import MyAccountContent from 'components/MyAccountContent';
import QuickActions from 'components/QuickActions';
import PlanDetails from 'components/PlanDetails';
import PaymentInfo from 'components/PaymentInfo/PaymentInfo';
import UpdateProfile from 'components/UpdateProfile';

import { OverlayStyled, WrapperStyled, HeaderStyled } from './MyAccountStyled';

class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match, overlay } = this.props;
    const { path } = match;

    return (
      <OverlayStyled overlay={overlay}>
        <WrapperStyled>
          <HeaderStyled>
            <MyAccountUserInfo />
            <MyAccountMenu match={match} />
          </HeaderStyled>
          <MyAccountContent>
            <Switch>
              <Route exact path={path}>
                <h3>My Account</h3>
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
  match: { path: '' },
  overlay: false
};
