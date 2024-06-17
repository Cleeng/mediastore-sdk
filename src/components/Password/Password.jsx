import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Card from 'components/Card';
import Button from 'components/Button';
import { POPUP_TYPES } from 'appRedux/innerPopupReducer';
import {
  WrapStyled,
  InnerWrapperStyled,
  OldPasswordStyled
} from './PasswordStyled';

const Password = ({ showInnerPopup }) => {
  const { t } = useTranslation();
  return (
    <WrapStyled>
      <Card withBorder>
        <InnerWrapperStyled>
          <OldPasswordStyled>••••••••</OldPasswordStyled>
          <Button
            width='auto'
            onClickFn={() => showInnerPopup({ type: POPUP_TYPES.editPassword })}
          >
            {t('Edit Password')}
          </Button>
        </InnerWrapperStyled>
      </Card>
    </WrapStyled>
  );
};

Password.propTypes = {
  showInnerPopup: PropTypes.func.isRequired
};

export { Password as PurePassword };

export default Password;
