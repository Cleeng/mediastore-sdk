/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'redux/store';
import {
  POPUP_TYPES,
  hidePopup,
  selectPopupDetails,
  showPopup
} from 'redux/popupSlice';
import { selectOffers } from 'redux/offersSlice';
import {
  DEFAULT_TRANSACTIONS_NUMBER,
  fetchListCustomerTransactions,
  toggleTransactionList,
  removePausedTransactions
} from 'redux/transactionsSlice';
import { dateFormat } from 'util/planHelper';
import { logos, readablePaymentMethodNames } from 'util/paymentMethodHelper';
import Card from 'components/Card';
import MyAccountError from 'components/MyAccountError';
import Button from 'components/Button';
import SkeletonWrapper from 'components/SkeletonWrapper';
import EditDeliveryDetailsPopup from 'components/EditDeliveryDetailsPopup';
import { ReactComponent as noTransactionsIcon } from 'assets/images/errors/transaction_icon.svg';
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
      <InsideWrapperStyled key={`skeleton-item-${k}`}>
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
  } = useAppSelector(state => state.transactions);
  const { pauseOffersIDs } = useAppSelector(selectOffers);
  const { isOpen, currentType } = useAppSelector(selectPopupDetails);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

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

  if (isOpen && currentType === POPUP_TYPES.EDIT_DELIVERY_DETAILS_POPUP) {
    return <EditDeliveryDetailsPopup />;
  }

  return (
    <WrapStyled>
      <Card withBorder>
        <TransactionListStyled>
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
              const LogoComponent: React.FC = logos[paymentMethod];

              return (
                <InsideWrapperStyled key={transactionId}>
                  <LeftBoxStyled>
                    <LogoWrapStyled>
                      {LogoComponent && <LogoComponent />}
                    </LogoWrapStyled>
                    <InfoStyled>
                      <TitleStyled>
                        {t(`offer-title-${offerId}`, offerTitle)}
                      </TitleStyled>
                      <TransactionDataStyled>
                        <SubTitleStyled>
                          {t(
                            `paymentmethod.${paymentMethod}`,
                            readablePaymentMethodNames[paymentMethod]
                          )}
                        </SubTitleStyled>
                        <DotStyled>·</DotStyled>
                        <IdStyled>{transactionId}</IdStyled>
                        <DotStyled>·</DotStyled>
                        <DateStyled dateTime={dateFormat(transactionDate)}>
                          {dateFormat(transactionDate)}
                        </DateStyled>
                      </TransactionDataStyled>
                    </InfoStyled>
                  </LeftBoxStyled>
                  <RightBoxStyled>
                    {targetType === 'giftId' && (
                      <EditGiftStyled
                        onClick={() => {
                          dispatch(
                            showPopup({
                              type: POPUP_TYPES.EDIT_DELIVERY_DETAILS_POPUP,
                              data: {
                                action: 'editDeliveryDetails',
                                giftId: targetId,
                                offerId,
                                offerTitle
                              }
                            })
                          );
                        }}
                        role="button"
                      >
                        {t(
                          'transactions.edit-gift-delivery-details',
                          'Edit gift delivery details'
                        )}
                      </EditGiftStyled>
                    )}
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
