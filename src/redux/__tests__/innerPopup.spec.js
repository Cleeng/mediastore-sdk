import innerPopupReducer, {
  SHOW_INNER_POPUP,
  HIDE_INNER_POPUP
} from 'redux/innerPopupReducer';

describe('InnerPopup reducer', () => {
  it('should correctly call showInnerPopup action', () => {
    const action = {
      type: SHOW_INNER_POPUP,
      payload: { type: 'updateSubscription', data: { mock: 'mock' } }
    };
    const expectedState = {
      isOpen: true,
      type: 'updateSubscription',
      data: { mock: 'mock' }
    };

    expect(innerPopupReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call hideInnerPopup action', () => {
    const action = { type: HIDE_INNER_POPUP };
    const expectedState = { isOpen: false, type: '', data: {} };

    expect(innerPopupReducer(undefined, action)).toMatchObject(expectedState);
  });
});
