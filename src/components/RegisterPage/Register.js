import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  ContentWrapperStyled,
  LoginWrapperStyled as RegisterWrapperStyled
} from 'components/LoginPage/LoginStyled';
import Button from 'components/Button';
import Header from 'components/Header';
import Footer from 'components/Footer';
import savePublisherId from 'util/publisherIdHelper';
import { getData } from 'util/appConfigHelper';
import RegisterForm from './RegisterForm';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publisherId: null
    };
  }

  componentDidMount() {
    const { urlProps } = this.props;
    if (urlProps.location) {
      savePublisherId(urlProps.location, this.setPublisherId);
    } else {
      this.setPublisherId(getData('CLEENG_PUBLISHER_ID'));
    }
  }

  setPublisherId = value => this.setState({ publisherId: value });

  render() {
    const { publisherId } = this.state;
    const { t, onSuccess, onHaveAccountClick } = this.props;
    return (
      <RegisterWrapperStyled>
        <Header />
        <ContentWrapperStyled>
          <RegisterForm t={t} publisherId={publisherId} onSuccess={onSuccess} />
          <Button
            theme="secondary"
            size="big"
            onClickFn={() => onHaveAccountClick()}
          >
            {t('Have an account?')}
          </Button>
        </ContentWrapperStyled>
        <Footer />
      </RegisterWrapperStyled>
    );
  }
}
Register.propTypes = {
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  }),
  onSuccess: PropTypes.func,
  onHaveAccountClick: PropTypes.func,
  t: PropTypes.func
};

Register.defaultProps = {
  urlProps: {},
  onSuccess: () => null,
  onHaveAccountClick: () => null,
  t: k => k
};

export { Register as PureRegister };

export default withTranslation()(Register);
