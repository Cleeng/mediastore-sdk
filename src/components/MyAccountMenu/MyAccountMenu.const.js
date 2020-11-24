import { ReactComponent as PlanIcon } from './icons/plan_details.svg';
import { ReactComponent as PaymentIcon } from './icons/payment.svg';
import { ReactComponent as UpdateIcon } from './icons/update.svg';

// eslint-disable-next-line import/prefer-default-export
export const MenuItems = [
  {
    icon: PlanIcon,
    label: 'Plan Details',
    link: 'plan-details',
    visibleOnDesktop: true
  },
  {
    icon: PaymentIcon,
    label: 'Your Payments',
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
