import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const RedirectWithQuery = ({ location }) => {
  return <Redirect to={{ ...location, pathname: '/login' }} />;
};

RedirectWithQuery.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string })
};
RedirectWithQuery.defaultProps = {
  location: {}
};

export default RedirectWithQuery;
