import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
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

const MyAccountMenu = ({ t }) => {
  const { activeTab } = useSelector(state => state.myaccount);
  const dispatch = useDispatch();
  const onMenuItemClick = id => {
    dispatch(setActiveTab(id));
  };

  return (
    <WrapStyled>
      <ItemsStyled>
        {MenuItems.map(({ icon, label, visibleOnDesktop, id }) => {
          const IconComponent = icon || React.Fragment;
          return (
            <ItemWrapStyled
              key={label}
              visibleOnDesktop={visibleOnDesktop}
              onClick={() => onMenuItemClick(id)}
            >
              <ItemStyled isActive={activeTab === id}>
                <ItemIconWrapStyled>
                  <IconComponent />
                </ItemIconWrapStyled>
                <ItemLabelStyled>{t(label)}</ItemLabelStyled>
              </ItemStyled>
            </ItemWrapStyled>
          );
        })}
      </ItemsStyled>
    </WrapStyled>
  );
};

MyAccountMenu.propTypes = {
  t: PropTypes.func
};

MyAccountMenu.defaultProps = {
  t: k => k
};

export default withTranslation()(labeling()(MyAccountMenu));
