import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';
import { ReactComponent as serverIcon } from 'assets/images/errors/sad_server.svg';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import {
  WrapStyled,
  TitleStyled,
  SubTitleStyled,
  IconStyled
} from './MyAccountErrorStyled';

class MyAccountError extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, subtitle, icon, serverError, withBorder, t } = this.props;
    const IconComponent = serverError ? serverIcon : icon;

    return (
      <WrapStyled withBorder={withBorder}>
        {(icon || serverError) && (
          <IconStyled>
            <IconComponent />
          </IconStyled>
        )}
        <TitleStyled>
          {serverError ? t('Oops, something went wrong!') : title}
        </TitleStyled>
        <SubTitleStyled>
          {serverError ? t('Please try again in a few moments.') : subtitle}
        </SubTitleStyled>
        {serverError && (
          <Button
            size="small"
            margin="20px 0 0 0"
            fontWeight="600"
            fontSize="12px"
            onClickFn={() => window.location.reload()}
          >
            {t('Try again')}
          </Button>
        )}
      </WrapStyled>
    );
  }
}

MyAccountError.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.any, PropTypes.string]),
  serverError: PropTypes.bool,
  withBorder: PropTypes.bool,
  t: PropTypes.func
};

MyAccountError.defaultProps = {
  title: '',
  subtitle: '',
  icon: '',
  serverError: false,
  withBorder: false,
  t: k => k
};

export default withTranslation()(labeling()(MyAccountError));
