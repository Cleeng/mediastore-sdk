import React from 'react';
import PropTypes from 'prop-types';
import { periodMapper } from 'util/planHelper';

import WrapperStyled from './SubscriptionIconStyled';

const SubscriptionIcon = ({ period }) => {
  const { color, bg, label, border } =
    periodMapper[period] || periodMapper.default;
  return (
    <WrapperStyled
      color={color || null}
      bg={bg || null}
      border={border || null}
    >
      {label || ''}
    </WrapperStyled>
  );
};

SubscriptionIcon.propTypes = {
  period: PropTypes.string
};

SubscriptionIcon.defaultProps = {
  period: 'default'
};

export default SubscriptionIcon;
