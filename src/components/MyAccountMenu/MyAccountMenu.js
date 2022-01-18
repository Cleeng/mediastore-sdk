import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import labeling from 'containers/labeling';
import { MenuItems } from './MyAccountMenu.const';

import {
  WrapStyled,
  ItemsStyled,
  ItemWrapStyled,
  ItemIconWrapStyled,
  ItemLabelStyled,
  ItemStyled
} from './MyAccountMenuStyled';

class MyAccountMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onMenuItemClick = id => {
    const { goToPage } = this.props;
    goToPage(id);
  };

  render() {
    const { currentPage, t } = this.props;
    return (
      <WrapStyled>
        <ItemsStyled>
          {MenuItems.map(menuItem => {
            const IconComponent = menuItem.icon
              ? menuItem.icon
              : React.Fragment;
            return (
              <ItemWrapStyled
                key={menuItem.label}
                visibleOnDesktop={menuItem.visibleOnDesktop}
                onClick={() => this.onMenuItemClick(menuItem.id)}
              >
                <ItemStyled isActive={currentPage === menuItem.id}>
                  <ItemIconWrapStyled>
                    <IconComponent />
                  </ItemIconWrapStyled>
                  <ItemLabelStyled>{t(menuItem.label)}</ItemLabelStyled>
                </ItemStyled>
              </ItemWrapStyled>
            );
          })}
        </ItemsStyled>
      </WrapStyled>
    );
  }
}

MyAccountMenu.propTypes = {
  currentPage: PropTypes.string,
  goToPage: PropTypes.func,
  t: PropTypes.func
};

MyAccountMenu.defaultProps = {
  currentPage: '',
  goToPage: () => {},
  t: k => k
};

export { MyAccountMenu as PureMyAccountMenu };

export default withTranslation()(labeling()(MyAccountMenu));
