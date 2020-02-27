import { mapStateToProps } from './MyAccount.container';

const loaderMock = {
  isLoading: true
};

describe('<PaymentInfo/>', () => {
  it('should show previously added value', () => {
    const initialState = {
      loader: loaderMock
    };
    expect(mapStateToProps(initialState).isLoading).toEqual(
      loaderMock.isLoading
    );
  });
});
