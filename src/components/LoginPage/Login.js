import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Button from 'components/Button';
import Header from 'components/Header';
import Footer from 'components/Footer';
import saveOfferId from 'util/offerIdHelper';
import savePublisherId from 'util/publisherIdHelper';
import { getData } from 'util/appConfigHelper';

import { ContentWrapperStyled, LoginWrapperStyled } from './LoginStyled';
import LoginForm from './LoginForm';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerId: '',
      publisherId: '',
      emailChanged: false
    };
  }

  componentDidMount() {
    const { urlProps } = this.props;
    if (urlProps.location) {
      saveOfferId(urlProps.location, this.setOfferId);
      savePublisherId(urlProps.location, this.setPublisherId);

      if (urlProps.location.search.includes('emailChanged=true')) {
        this.setState({
          emailChanged: true
        });
      }
    } else {
      this.setOfferId(getData('CLEENG_OFFER_ID'));
      this.setPublisherId(getData('CLEENG_PUBLISHER_ID'));
    }
  }

  setOfferId = value => this.setState({ offerId: value });

  setPublisherId = value => this.setState({ publisherId: value });

  render() {
    const { offerId, publisherId, emailChanged } = this.state;
    const {
      isMyAccount,
      onSuccess,
      onPasswordResetClick,
      onRegisterClick,
      t
    } = this.props;

    return (
      <LoginWrapperStyled>
        <Header />
        <ContentWrapperStyled>
          <LoginForm
            t={t}
            offerId={offerId}
            publisherId={publisherId}
            isMyAccount={isMyAccount}
            emailChanged={emailChanged}
            onSuccess={onSuccess}
          />
          {!isMyAccount && (
            <>
              <Button
                theme="secondary"
                size="big"
                onClickFn={() => onRegisterClick()}
              >
                {t('Go to register')}
              </Button>
            </>
          )}
          {!isMyAccount && (
            <Button
              theme="link"
              margin="20px auto 0 auto"
              onClickFn={() => onPasswordResetClick()}
            >
              {t('Forgot password?')}
            </Button>
          )}
        </ContentWrapperStyled>
        <Footer isCheckout={!isMyAccount} />
      </LoginWrapperStyled>
    );
  }
}
Login.propTypes = {
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }),
  isMyAccount: PropTypes.bool,
  onSuccess: PropTypes.func,
  onRegisterClick: PropTypes.func,
  onPasswordResetClick: PropTypes.func,
  t: PropTypes.func
};
Login.defaultProps = {
  urlProps: {},
  isMyAccount: false,
  onSuccess: () => null,
  onRegisterClick: () => null,
  onPasswordResetClick: () => null,
  t: k => k
};

export { Login as PureLogin };

export default withTranslation()(Login);
