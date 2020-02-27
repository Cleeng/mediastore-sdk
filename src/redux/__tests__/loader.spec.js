import { SHOW_LOADER, HIDE_LOADER } from 'redux/loader';
import loaderReducer from '../loader';

describe('Loader Reducer', () => {
  it('should correctly call showLoader action', () => {
    const action = { type: SHOW_LOADER };
    const expectedState = { isLoading: true };

    expect(loaderReducer(undefined, action)).toMatchObject(expectedState);
  });
  it('should correctly call hideLoader action', () => {
    const action = { type: HIDE_LOADER };
    const expectedState = { isLoading: false };

    expect(loaderReducer(undefined, action)).toMatchObject(expectedState);
  });
});
