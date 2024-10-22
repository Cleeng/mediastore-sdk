import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import NoSubscriptionsIcon from 'assets/images/errors/sad_coupon.svg';
import { getData } from 'util/appConfigHelper';
import {
  WrapStyled as ErrorWrapStyled,
  TitleStyled,
  SubTitleStyled,
  IconStyled
} from 'components/MyAccountError/MyAccountErrorStyled';
import { WrapStyled } from './CurrentPlanStyled';

const EmptyPlanView = () => {
  const { t } = useTranslation();

  return (
    <WrapStyled>
      <ErrorWrapStyled>
        <IconStyled>
          <NoSubscriptionsIcon />
        </IconStyled>
        <TitleStyled>
          {t('currentplan.no-offers-title', 'No offers yet!')}
        </TitleStyled>
        <SubTitleStyled>
          {getData('CLEENG_OFFER_SELECTION_URL') ? (
            <Trans i18nKey='currentplan.no-offers-text-withlink'>
              If you{' '}
              <a
                href={getData('CLEENG_OFFER_SELECTION_URL')}
                target='_blank'
                rel='noreferrer'
              >
                choose your plan
              </a>
              , you will be able to manage your offers here.
            </Trans>
          ) : (
            t(
              'currentplan.no-offers-text',
              'If you choose your plan, you will be able to manage your offers here.'
            )
          )}
        </SubTitleStyled>
      </ErrorWrapStyled>
    </WrapStyled>
  );
};

export default EmptyPlanView;
