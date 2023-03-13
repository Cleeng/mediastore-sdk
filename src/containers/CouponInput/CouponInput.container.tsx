import { PureCouponInput } from 'components/CouponInput/CouponInput';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { RootState } from 'redux/rootReducer';

export const mapStateToProps = (state: RootState) => ({
  couponLoading: state.order.isCouponLoading,
  couponDetails: state.order.couponDetails,
  orderId: state.order.order.id
});

export default withTranslation()(
  labeling()(connect(mapStateToProps)(PureCouponInput))
);
