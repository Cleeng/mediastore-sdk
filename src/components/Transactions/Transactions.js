/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from 'redux/store';
import {
  POPUP_TYPES,
  hidePopup,
  selectPopupDetails,
  showPopup
} from 'redux/popupSlice';
import Card from 'components/Card';
import { dateFormat } from 'util/planHelper';
import MyAccountError from 'components/MyAccountError';
import InnerPopupWrapper from 'components/InnerPopupWrapper';
import RecipientForm from 'components/DeliveryDetails/RecipientForm';
import Button from 'components/Button';
import { ReactComponent as noTransactionsIcon } from 'assets/images/errors/transaction_icon.svg';
import SkeletonWrapper from 'components/SkeletonWrapper';
import EditDeliveryDetailsPopup from 'components/EditDeliveryDetailsPopup';
import { logos, readablePaymentMethodNames } from 'util/paymentMethodHelper';
import {
  DEFAULT_TRANSACTIONS_NUMBER,
  fetchListCustomerTransactions,
  toggleTransactionList,
  removePausedTransactions
} from 'redux/transactionsSlice';
import {
  WrapStyled,
  InsideWrapperStyled,
  LeftBoxStyled,
  TitleStyled,
  SubTitleStyled,
  RightBoxStyled,
  IdStyled,
  DateStyled,
  ButtonTextStyled,
  TransactionListStyled,
  LogoWrapStyled,
  InfoStyled,
  TransactionDataStyled,
  DotStyled,
  EditGiftStyled
} from './TransactionsStyled';

const TransactionsSkeleton = () => (
  <Card withBorder>
    {[...Array(3)].map((_, k) => (
      // eslint-disable-next-line react/no-array-index-key
      <InsideWrapperStyled key={`skeleton-item-${k}`} length={3}>
        <LeftBoxStyled>
          <SkeletonWrapper height={40} width={40} />
          <InfoStyled>
            <TitleStyled>
              <SkeletonWrapper width={260} />
            </TitleStyled>
            <SubTitleStyled>
              <SkeletonWrapper width={100} />
            </SubTitleStyled>
          </InfoStyled>
        </LeftBoxStyled>
        <RightBoxStyled>
          <IdStyled>
            <SkeletonWrapper width={80} />
          </IdStyled>
          <DateStyled>
            <SkeletonWrapper width={80} />
          </DateStyled>
        </RightBoxStyled>
      </InsideWrapperStyled>
    ))}
  </Card>
);

const Transactions = () => {
  const {
    transactions,
    showToggleButton,
    error,
    loading,
    isListExpanded
  } = useSelector(state => state.transactions);
  const { pauseOffersIDs } = useSelector(state => state.offers);
  const { isOpen, currentType } = useAppSelector(selectPopupDetails);

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const transactionsToShow = isListExpanded
    ? transactions
    : transactions.slice(0, DEFAULT_TRANSACTIONS_NUMBER);

  useEffect(() => {
    if (transactions?.length === 0) {
      dispatch(fetchListCustomerTransactions()).then(() => {
        dispatch(removePausedTransactions(pauseOffersIDs));
      });
    }

    return () => {
      // maybe change to hideEditDeliveryDetailsPopup ?

      if (currentType === POPUP_TYPES.EDIT_DELIVERY_DETAILS_POPUP) {
        dispatch(hidePopup());
      }
    };
  }, []);

  if (loading) return <TransactionsSkeleton />;

  if (error.length !== 0) {
    return (
      <WrapStyled>
        <MyAccountError generalError />
      </WrapStyled>
    );
  }

  if (transactions.length === 0) {
    return (
      <WrapStyled>
        <MyAccountError
          icon={noTransactionsIcon}
          title={t(
            'transactions.no-transactions.title',
            'No transactions found!'
          )}
          subtitle={t(
            'transactions.no-transactions.subtitle',
            'The section will show you recent transactions history after first payment'
          )}
        />
      </WrapStyled>
    );
  }

  // const transactionsMock = [
  //   {
  //     paymentMethod: 'card',
  //     transactionId: 'T278908407',
  //     offerTitle: 'Monthly subscription',
  //     offerId: 'S333919956_PL',
  //     transactionDate: 1628085830,
  //     targetType: 'subscriptionId'
  //   },
  //   {
  //     paymentMethod: 'applepay',
  //     transactionId: 'T278908408',
  //     offerTitle: 'Monthly subscription gift',
  //     offerId: 'S333919956_PL',
  //     transactionDate: 1628114400,
  //     targetType: 'giftId',
  //     targetId: '2'
  //   },
  //   {
  //     paymentMethod: 'googlepay',
  //     transactionId: 'T278908409',
  //     offerTitle: 'Monthly subscription gift',
  //     offerId: 'S333919956_PL',
  //     transactionDate: 1628114400,
  //     targetType: 'giftId',
  //     targetId: '3'
  //   }
  // ];

  if (isOpen && currentType === POPUP_TYPES.EDIT_DELIVERY_DETAILS_POPUP) {
    return <EditDeliveryDetailsPopup />;
  }

  return (
    <WrapStyled>
      <Card withBorder>
        <TransactionListStyled
          isExpanded={isListExpanded}
          // length={transactionsToShow.length}
        >
          {transactionsToShow.map(
            ({
              paymentMethod,
              transactionId,
              offerId,
              offerTitle,
              transactionDate,
              targetType,
              targetId
            }) => {
              const LogoComponent = logos[paymentMethod] || logos.card;
              return (
                <InsideWrapperStyled
                  key={transactionId}
                  // length={transactionsToShow.length}
                >
                  <LeftBoxStyled>
                    <LogoWrapStyled>
                      <LogoComponent />
                    </LogoWrapStyled>
                    <InfoStyled>
                      <TitleStyled>
                        {t(`offer-title-${offerId}`, offerTitle)}
                      </TitleStyled>
                      <TransactionDataStyled>
                        <SubTitleStyled>
                          {/* {t('transactions.paid-with', `Paid with`)}{' '} */}
                          {t(
                            `paymentmethod.${paymentMethod}`,
                            readablePaymentMethodNames[paymentMethod]
                          )}
                        </SubTitleStyled>
                        <DotStyled>·</DotStyled>
                        <IdStyled>{transactionId}</IdStyled>
                        <DotStyled>·</DotStyled>
                        <DateStyled datetime={dateFormat(transactionDate)}>
                          {dateFormat(transactionDate)}
                        </DateStyled>
                      </TransactionDataStyled>
                    </InfoStyled>
                  </LeftBoxStyled>
                  <RightBoxStyled>
                    {targetType === 'giftId' && (
                      // add translation
                      <EditGiftStyled
                        onClick={() => {
                          dispatch(
                            showPopup({
                              type: POPUP_TYPES.EDIT_DELIVERY_DETAILS_POPUP,
                              data: {
                                action: 'editDeliveryDetails',
                                giftId: targetId
                              }
                            })
                          );
                        }}
                        role="button"
                      >
                        Edit gift delivery details
                      </EditGiftStyled>
                    )}
                    {/* <IdStyled>{transactionId}</IdStyled>
                    <DateStyled datetime={dateFormat(transactionDate)}>
                      {dateFormat(transactionDate)}
                    </DateStyled> */}
                  </RightBoxStyled>
                </InsideWrapperStyled>
              );
            }
          )}
        </TransactionListStyled>
        {showToggleButton && (
          <Button
            theme="primary"
            margin="20px 0 0 auto"
            width="unset"
            label={
              isListExpanded
                ? t('transactions.show-less', 'Show less')
                : t('transactions.show-more', 'Show more')
            }
            onClickFn={() => dispatch(toggleTransactionList())}
            padding="12px 33px 12px 20px"
          >
            <ButtonTextStyled isExpanded={isListExpanded}>
              {isListExpanded
                ? t('transactions.show-less', 'Show less')
                : t('transactions.show-more', 'Show more')}
            </ButtonTextStyled>
          </Button>
        )}
      </Card>
    </WrapStyled>
  );
};

export default Transactions;
