/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = createAction(SET_CURRENT_USER);

const initialState = {
  user: null
};

const userProfileReducer = createReducer(initialState, {
  SET_CURRENT_USER: (state, action) => {
    state.user = action.payload;
  }
});

export default userProfileReducer;
