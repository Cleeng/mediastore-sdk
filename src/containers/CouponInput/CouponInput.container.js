import { PureCouponInput } from 'components/CouponInput/CouponInput';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';

export const mapStateToProps = state => ({
  couponLoading: state.order.isCouponLoading,
  couponDetails: state.order.couponDetails,
  orderId: state.order.order.id
});

export default withTranslation()(
  labeling()(connect(mapStateToProps)(PureCouponInput))
);
