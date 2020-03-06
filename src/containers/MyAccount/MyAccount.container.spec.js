import { SET_CURRENT_USER } from 'redux/userProfile';
import { SET_CURRENT_PLAN } from 'redux/planDetails';
import { mapStateToProps, mapDispatchToProps } from './MyAccount.container';

const loaderMock = {
  isLoading: true
};

describe('<MyAccount/>', () => {
  describe('@container', () => {
    it('should show previously added value', () => {
      const initialState = {
        loader: loaderMock
      };
      expect(mapStateToProps(initialState).isLoading).toEqual(
        loaderMock.isLoading
      );
    });
    it('should dispatch SET_CURRENT_USER action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).setCurrentUser();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_CURRENT_USER });
    });
    it('should dispatch SET_CURRENT_PLAN action', () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).setCurrentPlan();
      expect(dispatch.mock.calls[0][0]).toEqual({ type: SET_CURRENT_PLAN });
    });
  });
});
