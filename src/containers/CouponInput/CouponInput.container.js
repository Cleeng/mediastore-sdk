import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { PureCouponInput } from 'components/CouponInput/CouponInput';

export const mapStateToProps = state => ({
  couponLoading: state.order.isCouponLoading,
  couponDetails: state.order.couponDetails,
  orderId: state.order.order.id
});

export default withTranslation()(connect(mapStateToProps)(PureCouponInput));
