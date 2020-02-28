import React from 'react';
import { mount } from 'enzyme';
import MyAccountHeading from 'components/MyAccountHeading/MyAccountHeading';
import ProfileDetails from 'components/ProfileDetails';
import Password from 'components/Password';
import UpdateProfile from './UpdateProfile.component';

const setCurrentUserMock = jest.fn();
const showLoaderMock = jest.fn();
const hideLoaderMock = jest.fn();

describe('<UpdateProfile/>', () => {
  const wrapper = mount(
    <UpdateProfile
      setCurrentUser={setCurrentUserMock}
      showLoader={showLoaderMock}
      hideLoader={hideLoaderMock}
      isLoading={false}
    />
  );

  describe('@renders', () => {
    it('should render initial state', () => {
      expect(wrapper.find(MyAccountHeading)).toHaveLength(2);
      expect(wrapper.find(ProfileDetails)).toHaveLength(1);
      expect(wrapper.find(Password)).toHaveLength(1);
    });
  });
});
