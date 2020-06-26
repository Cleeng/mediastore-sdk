import popupReducer, { SHOW_POPUP, HIDE_POPUP } from 'redux/popup';

describe('Popup reducer', () => {
  it('should correctly call showPopup action', () => {
    const action = {
      type: SHOW_POPUP,
      payload: { type: 'termsNotAccepted', consents: [{ name: 'terms' }] }
    };
    const expectedState = {
      isPopupShown: true,
      popupType: 'termsNotAccepted',
      consents: [{ name: 'terms' }]
    };

    expect(popupReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call hidePopup action', () => {
    const action = { type: HIDE_POPUP };
    const expectedState = { isPopupShown: false, popupType: '', consents: [] };

    expect(popupReducer(undefined, action)).toMatchObject(expectedState);
  });
});
