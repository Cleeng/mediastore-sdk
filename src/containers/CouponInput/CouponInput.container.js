import CouponInput from 'components/CouponInput';
import { connect } from 'react-redux';

export const mapStateToProps = state => ({
  couponLoading: state.order.isCouponLoading,
  couponDetails: state.order.couponDetails,
  orderId: state.order.order.id
});

export default connect(mapStateToProps)(CouponInput);
