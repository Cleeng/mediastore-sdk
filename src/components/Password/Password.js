import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import Card from 'components/Card';
import Button from 'components/Button';
import {
  WrapStyled,
  InnerWrapperStyled,
  OldPasswordStyled
} from './PasswordStyled';

const Password = ({ showResetPassword, t }) => (
  <WrapStyled>
    <Card withBorder>
      <InnerWrapperStyled>
        <OldPasswordStyled>••••••••</OldPasswordStyled>
        <Button width="auto" onClickFn={() => showResetPassword()}>
          {t('Edit Password')}
        </Button>
      </InnerWrapperStyled>
    </Card>
  </WrapStyled>
);

Password.propTypes = {
  showResetPassword: PropTypes.func.isRequired,
  t: PropTypes.func
};

Password.defaultProps = {
  t: k => k
};

export { Password as PurePassword };

export default withTranslation()(labeling()(Password));
