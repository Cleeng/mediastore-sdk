import { connect } from 'react-redux';
import MyAccount from './MyAccount.component';

export const mapStateToProps = state => {
  return {
    isLoading: state.loader.isLoading
  };
};

const MyAccountContainer = connect(
  mapStateToProps,
  null
)(MyAccount);

export default MyAccountContainer;
