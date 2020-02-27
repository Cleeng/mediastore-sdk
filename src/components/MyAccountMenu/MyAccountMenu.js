import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MenuItems, MenuTitle } from './MyAccountMenu.const';

import {
  WrapStyled,
  HeadingStyled,
  ItemsStyled,
  ItemWrapStyled,
  ItemLinkStyled,
  ItemIconWrapStyled,
  // ItemIconStyled,
  ItemLabelStyled
} from './MyAccountMenuStyled';

class MyAccountMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      routeMatch: { url }
    } = this.props;

    return (
      <WrapStyled>
        <HeadingStyled>{MenuTitle}</HeadingStyled>
        <ItemsStyled>
          {MenuItems.map(menuItem => (
            <ItemWrapStyled
              key={menuItem.label}
              visibleOnDesktop={menuItem.visibleOnDesktop}
            >
              <ItemLinkStyled to={`${url}/${menuItem.link}`}>
                <ItemIconWrapStyled>
                  {menuItem.icon ? menuItem.icon.render() : null}
                </ItemIconWrapStyled>
                <ItemLabelStyled>{menuItem.label}</ItemLabelStyled>
              </ItemLinkStyled>
            </ItemWrapStyled>
          ))}
        </ItemsStyled>
      </WrapStyled>
    );
  }
}

export default MyAccountMenu;

MyAccountMenu.propTypes = {
  routeMatch: PropTypes.objectOf(PropTypes.any)
};

MyAccountMenu.defaultProps = {
  routeMatch: {}
};
