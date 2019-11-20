import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ErrorPage from 'components/ErrorPage';
import saveOfferId from '../../util/offerIdHelper';

import {
  ContentWrapperStyled,
  SocialStyled,
  SeparatorStyled
} from '../LoginPage/LoginStyled';
import Button from '../Button/Button';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import RegisterForm from './RegisterForm';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offerId: null,
      isOfferError: false
    };
  }

  componentDidMount() {
    const { urlProps } = this.props;
    saveOfferId(urlProps.location, this.setOfferId);
  }

  setOfferId = value => this.setState({ offerId: value });

  setOfferError = value => this.setState({ isOfferError: value });

  render() {
    const { isOfferError, offerId } = this.state;
    const { onRegistrationComplete } = this.props;
    return isOfferError ? (
      <ErrorPage type="offerNotExist" />
    ) : (
      <>
        <Header showBackIcon />
        <ContentWrapperStyled>
          <RegisterForm
            offerId={offerId}
            onRegistrationComplete={onRegistrationComplete}
            setOfferError={this.setOfferError}
          />
          <Link to="/login">
            <Button variant="secondary">Have an account?</Button>
          </Link>
          <SocialStyled>
            <SeparatorStyled>Or</SeparatorStyled>
            <Button variant="google">Sign up with Google</Button>
            <Button variant="fb">Sign up with Facebook</Button>
          </SocialStyled>
        </ContentWrapperStyled>
        <Footer />
      </>
    );
  }
}
Register.propTypes = {
  onRegistrationComplete: PropTypes.func,
  urlProps: PropTypes.shape({
    location: PropTypes.shape({ search: PropTypes.string })
  })
};

Register.defaultProps = {
  onRegistrationComplete: () => {},
  urlProps: {}
};

export default Register;
