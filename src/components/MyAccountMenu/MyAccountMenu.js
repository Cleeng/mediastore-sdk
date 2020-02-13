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
  ItemIconStyled,
  ItemLabelStyled
} from './MyAccountMenuStyled';

class MyAccountMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { match } = this.props;
    const { url } = match;
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
                  <ItemIconStyled src={menuItem.icon} />
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
  match: PropTypes.objectOf(PropTypes.any)
};

MyAccountMenu.defaultProps = {
  match: {}
};
