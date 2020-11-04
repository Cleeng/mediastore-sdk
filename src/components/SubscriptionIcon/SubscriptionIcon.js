import React from 'react';
import PropTypes from 'prop-types';
import { periodMapper } from 'util/planHelper';

import WrapperStyled from './SubscriptionIconStyled';

const SubscriptionIcon = ({ icon }) => {
  const { color, bg, label, border } =
    periodMapper[icon] || periodMapper.default;
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
  icon: PropTypes.string
};

SubscriptionIcon.defaultProps = {
  icon: 'default'
};

export default SubscriptionIcon;
