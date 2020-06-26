import { ReactComponent as ActionsIcon } from './icons/q_actions.svg';
import { ReactComponent as PlanIcon } from './icons/plan_details.svg';
import { ReactComponent as PaymentIcon } from './icons/payment.svg';
import { ReactComponent as UpdateIcon } from './icons/update.svg';

// eslint-disable-next-line import/prefer-default-export
export const MenuItems = [
  {
    icon: ActionsIcon,
    label: 'Quick Actions',
    link: 'quick-actions',
    visibleOnDesktop: false
  },
  {
    icon: PlanIcon,
    label: 'Plan Details',
    link: 'plan-details',
    visibleOnDesktop: true
  },
  {
    icon: PaymentIcon,
    label: 'Payment Info',
    link: 'payment-info',
    visibleOnDesktop: true
  },
  {
    icon: UpdateIcon,
    label: 'Update Profile',
    link: 'update-profile',
    visibleOnDesktop: true
  }
];
