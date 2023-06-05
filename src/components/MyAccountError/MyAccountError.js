/* istanbul ignore file */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button';
import { ReactComponent as serverIcon } from 'assets/images/errors/sad_server.svg';
import {
  WrapStyled,
  TitleStyled,
  SubTitleStyled,
  IconStyled,
  DetailsStyled
} from './MyAccountErrorStyled';

const MyAccountError = ({
  title,
  subtitle,
  icon,
  generalError,
  withBorder,
  fullHeight,
  centered,
  margin,
  fullWidth,
  onClick,
  isSmallCard,
  direction
}) => {
  const { t } = useTranslation();

  const IconComponent = generalError ? serverIcon : icon;
  return (
    <WrapStyled
      withBorder={withBorder}
      fullHeight={fullHeight}
      centered={centered}
      margin={margin}
      fullWidth={fullWidth}
      onClick={onClick}
      isSmallCard={isSmallCard}
      direction={direction}
    >
      {(icon || generalError) && (
        <IconStyled>
          <IconComponent />
        </IconStyled>
      )}
      <DetailsStyled>
        <TitleStyled>
          {generalError
            ? t('oops-something-went-wrong', 'Oops! Something went wrong.')
            : t(title)}
        </TitleStyled>
        <SubTitleStyled>
          {generalError ? t('Please try again in a few moments.') : t(subtitle)}
        </SubTitleStyled>
      </DetailsStyled>
      {generalError && (
        <Button
          margin="20px auto auto auto"
          width="auto"
          onClickFn={() => window.location.reload()}
        >
          Try again
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
  margin: PropTypes.string,
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  isSmallCard: PropTypes.bool,
  direction: PropTypes.oneOf(['row', 'column'])
};

MyAccountError.defaultProps = {
  title: '',
  subtitle: '',
  icon: '',
  generalError: false,
  withBorder: false,
  fullHeight: false,
  centered: false,
  margin: '',
  fullWidth: false,
  onClick: null,
  isSmallCard: false,
  direction: 'column'
};

export default MyAccountError;
