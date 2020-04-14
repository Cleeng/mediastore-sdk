import { SET_CURRENT_USER } from 'redux/userProfile';
import { SET_CURRENT_PLAN } from 'redux/planDetails';
import { mapDispatchToProps } from './MyAccount.container';

describe('<MyAccount/>', () => {
  describe('@container', () => {
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
