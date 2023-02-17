// import React from 'react';
// import { render } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { Provider } from 'react-redux';
// import configureStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
// import PaymentInfo from 'containers/PaymentInfo';

// const pastDate = 16762771;

// const store = (displayGracePeriodError = true) => ({
//   paymentDetails: {
//     paymentDetails: [],
//     activeOrBoundPaymentDetails: [],
//     loading: true,
//     error: []
//   },
//   transactions: {
//     transactionsList: [],
//     transactionsError: [],
//     showToggleButton: false,
//     isTransactionsSectionLoading: false,
//     isTransactionListExpanded: false
//   },
//   publisherConfig: {
//     displayGracePeriodError,
//     adyenConfiguration: null,
//     t: k => k
//   },
//   popupManager: {
//     paymentDetails: {
//       isOpen: false,
//       isLoading: false
//     }
//   },
//   plan: {
//     currentPlan: [
//       {
//         status: 'active',
//         expiresAt: pastDate
//       }
//     ]
//   }
// });

// const middleware = [thunk];
// const mockStore = configureStore(middleware);

// describe('PaymentInfo component', () => {
//   test('should render', async () => {
//     const { getByTestId } = render(
//       <Provider store={mockStore(store)}>
//         <PaymentInfo />
//       </Provider>
//     );

//     getByTestId('payment-info');
//   });
//   test('should render', async () => {
//     render(
//       <Provider store={mockStore(store)}>
//         <PaymentInfo />
//       </Provider>
//     );

//     expect(screen.getByTestId('payment-info')).toBeInTheDocument();
//   });
// });
