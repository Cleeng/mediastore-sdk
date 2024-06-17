import React from 'react';
import PropTypes from 'prop-types';
import { periodMapper } from 'util/planHelper';
import PauseIcon from 'assets/images/pause.svg';

import { WrapperStyled, LabelStyled } from './SubscriptionIconStyled';

const SubscriptionIcon = ({ period, showLabel, className, isPaused }) => {
  const { color, bg, label, border } =
    periodMapper[period] || periodMapper.default;
  return (
    <>
      <WrapperStyled
        $color={color || null}
        $bg={bg || null}
        $border={border || null}
        className={className}
      >
        {showLabel && <LabelStyled $label={showLabel}>{showLabel}</LabelStyled>}
        {isPaused ? <PauseIcon /> : label || ''}
      </WrapperStyled>
    </>
  );
};

SubscriptionIcon.propTypes = {
  period: PropTypes.string,
  showLabel: PropTypes.string,
  className: PropTypes.string,
  isPaused: PropTypes.bool
};

SubscriptionIcon.defaultProps = {
  period: 'default',
  showLabel: '',
  className: '',
  isPaused: false
};

export default SubscriptionIcon;
