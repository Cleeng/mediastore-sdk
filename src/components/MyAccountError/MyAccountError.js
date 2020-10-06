/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { ReactComponent as serverIcon } from 'assets/images/errors/sad_server.svg';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import {
  WrapStyled,
  TitleStyled,
  SubTitleStyled,
  IconStyled
} from './MyAccountErrorStyled';

const MyAccountError = ({
  title,
  subtitle,
  icon,
  generalError,
  withBorder,
  fullHeight,
  centered,
  t
}) => {
  const IconComponent = generalError ? serverIcon : icon;
  return (
    <WrapStyled
      withBorder={withBorder}
      fullHeight={fullHeight}
      centered={centered}
    >
      {(icon || generalError) && (
        <IconStyled>
          <IconComponent />
        </IconStyled>
      )}
      <TitleStyled>
        {generalError ? t('Oops, something went wrong!') : title}
      </TitleStyled>
      <SubTitleStyled>
        {generalError ? t('Please try again in a few moments.') : subtitle}
      </SubTitleStyled>
      {generalError && (
        <Button
          margin="20px auto auto auto"
          width="auto"
          onClickFn={() => window.location.reload()}
        >
          {t('Try again')}
        </Button>
      )}
    </WrapStyled>
  );
};

MyAccountError.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  generalError: PropTypes.bool,
  withBorder: PropTypes.bool,
  fullHeight: PropTypes.bool,
  centered: PropTypes.bool,
  t: PropTypes.func
};

MyAccountError.defaultProps = {
  title: '',
  subtitle: '',
  icon: '',
  generalError: false,
  withBorder: false,
  fullHeight: false,
  centered: false,
  t: k => k
};

export { MyAccountError as PureMyAccountError };

export default withTranslation()(labeling()(MyAccountError));
