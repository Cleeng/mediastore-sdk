import React from 'react';
import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';
import { WrapStyled } from './MyAccountContentStyled';
import GracePeriodError from '../GracePeriodError/GracePeriodError';

const MyAccountContent = ({ children }) => {
  const currentPlan = useSelector(state => state.planDetails.currentPlan);

  const isPeriodError = currentPlan.some(
    ({ status, expiresAt }) =>
      status === 'active' && new Date(expiresAt) < new Date()
  );

  return (
    <WrapStyled>
      {isPeriodError && <GracePeriodError />}
      {children}
    </WrapStyled>
  );
};

export default MyAccountContent;

MyAccountContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

MyAccountContent.defaultProps = {
  children: ''
};
