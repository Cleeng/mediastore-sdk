import React from 'react';
import PropTypes from 'prop-types';
import { periodMapper } from 'util/planHelper';

import WrapperStyled from './SubscriptionIconStyled';

const SubscriptionIcon = ({ icon, className }) => {
  const { color, bg, label, border } =
    periodMapper[icon] || periodMapper.default;
  return (
    <WrapperStyled
      color={color || null}
      bg={bg || null}
      border={border || null}
      className={className}
    >
      {label || ''}
    </WrapperStyled>
  );
};

SubscriptionIcon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string
};

SubscriptionIcon.defaultProps = {
  icon: 'default',
  className: ''
};

export default SubscriptionIcon;
