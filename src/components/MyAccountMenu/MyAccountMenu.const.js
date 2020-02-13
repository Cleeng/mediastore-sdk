import actionsIcon from './icons/q_actions.svg';
import planIcon from './icons/plan_details.svg';
import paymentIcon from './icons/payment.svg';
import updateIcon from './icons/update.svg';

export const MenuTitle = 'Category Shortcuts';

export const MenuItems = [
  {
    icon: actionsIcon,
    label: 'Quick Actions',
    link: 'quick-actions',
    visibleOnDesktop: false
  },
  {
    icon: planIcon,
    label: 'Plan Details',
    link: 'plan-details',
    visibleOnDesktop: true
  },
  {
    icon: paymentIcon,
    label: 'Payment Info',
    link: 'payment-info',
    visibleOnDesktop: true
  },
  {
    icon: updateIcon,
    label: 'Update Profile',
    link: 'update-profile',
    visibleOnDesktop: true
  }
];
