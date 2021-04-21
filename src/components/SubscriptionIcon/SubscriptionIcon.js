import React from 'react';
import PropTypes from 'prop-types';
import { periodMapper } from 'util/planHelper';

import { WrapperStyled, LabelStyled } from './SubscriptionIconStyled';

const SubscriptionIcon = ({ period, showLabel, className }) => {
  const { color, bg, label, border } =
    periodMapper[period] || periodMapper.default;
  return (
    <>
      <WrapperStyled
        color={color || null}
        bg={bg || null}
        border={border || null}
        className={className}
      >
        {showLabel && <LabelStyled label={showLabel}>{showLabel}</LabelStyled>}
        {label || ''}
      </WrapperStyled>
    </>
  );
};

SubscriptionIcon.propTypes = {
  period: PropTypes.string,
  showLabel: PropTypes.string,
  className: PropTypes.string
};

SubscriptionIcon.defaultProps = {
  period: 'default',
  showLabel: '',
  className: ''
};

export default SubscriptionIcon;
