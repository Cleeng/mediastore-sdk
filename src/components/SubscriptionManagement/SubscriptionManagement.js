import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';

import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

import {
  SubscriptionManagementStyled,
  ManageButtonWrapStyled,
  SubscriptionActionsStyled,
  ButtonTextStyled
} from './SubscriptionManagementStyled';

const SubscriptionManagement = ({ isOpened, children, onClose, t }) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(isOpened);

  const toggle = e => {
    e.stopPropagation();
    setIsOptionsVisible(isVisible => !isVisible);
    if (isOptionsVisible) onClose();
  };

  return (
    <SubscriptionManagementStyled>
      <ManageButtonWrapStyled>
        <Button theme="simple" width="unset" onClickFn={e => toggle(e)}>
          <ButtonTextStyled isExpanded={isOptionsVisible}>
            {t('Manage')}
          </ButtonTextStyled>
        </Button>
      </ManageButtonWrapStyled>
      {isOptionsVisible && (
        <SubscriptionActionsStyled>{children}</SubscriptionActionsStyled>
      )}
    </SubscriptionManagementStyled>
  );
};

SubscriptionManagement.propTypes = {
  isOpened: PropTypes.bool,
  children: PropTypes.node,
  onClose: PropTypes.func,
  t: PropTypes.func
};

SubscriptionManagement.defaultProps = {
  isOpened: false,
  children: '',
  onClose: () => {},
  t: k => k
};

export { SubscriptionManagement as PureSubscriptionManagement };

export default withTranslation()(labeling()(SubscriptionManagement));
