import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from 'redux/myaccountSlice';
import { MenuItems } from './MyAccountMenu.const';

import {
  WrapStyled,
  ItemsStyled,
  ItemWrapStyled,
  ItemIconWrapStyled,
  ItemLabelStyled,
  ItemStyled
} from './MyAccountMenuStyled';

const MyAccountMenu = () => {
  const { activeTab } = useSelector(state => state.myaccount);
  const dispatch = useDispatch();
  const onMenuItemClick = id => {
    dispatch(setActiveTab(id));
  };
  const { t } = useTranslation();

  return (
    <WrapStyled>
      <ItemsStyled>
        {MenuItems.map(
          ({ icon, label, visibleOnDesktop, id, translationKey }) => {
            const IconComponent = icon || React.Fragment;
            return (
              <ItemWrapStyled
                key={label}
                $visibleOnDesktop={visibleOnDesktop}
                onClick={() => onMenuItemClick(id)}
              >
                <ItemStyled $isActive={activeTab === id}>
                  <ItemIconWrapStyled>
                    <IconComponent />
                  </ItemIconWrapStyled>
                  <ItemLabelStyled>{t(translationKey, label)}</ItemLabelStyled>
                </ItemStyled>
              </ItemWrapStyled>
            );
          }
        )}
      </ItemsStyled>
    </WrapStyled>
  );
};

export default MyAccountMenu;
