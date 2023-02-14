import { connect } from 'react-redux';
import PaymentInfo from './PaymentInfo.component';

export const mapStateToProps = state => {
  return {
    popupManager: state.popupManager
  };
};

export const mapDispatchToProps = () => {
  return {};
};

const PaymentInfoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentInfo);

export default PaymentInfoContainer;
