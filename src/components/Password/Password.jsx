import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Card from 'components/Card';
import Button from 'components/Button';
import { POPUP_TYPES } from 'appRedux/popupSlice';
import {
  WrapStyled,
  InnerWrapperStyled,
  OldPasswordStyled
} from './PasswordStyled';

const Password = ({ showPopup }) => {
  const { t } = useTranslation();
  return (
    <WrapStyled>
      <Card withBorder>
        <InnerWrapperStyled>
          <OldPasswordStyled>••••••••</OldPasswordStyled>
          <Button
            width='auto'
            onClickFn={() => showPopup({ type: POPUP_TYPES.EDIT_PASSWORD })}
            variant='confirm'
          >
            {t('Edit Password')}
          </Button>
        </InnerWrapperStyled>
      </Card>
    </WrapStyled>
  );
};

Password.propTypes = {
  showPopup: PropTypes.func.isRequired
};

export { Password as PurePassword };

export default Password;
