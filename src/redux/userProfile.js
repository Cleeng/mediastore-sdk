/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = createAction(SET_CURRENT_USER);

export const SET_CONSENTS = 'SET_CONSENTS';
export const setConsents = createAction(SET_CONSENTS);

export const SET_CONSENTS_ERROR = 'SET_CONSENTS_ERROR';
export const setConsentsError = createAction(SET_CONSENTS_ERROR);

const initialState = {
  user: null,
  consents: [],
  consentsError: ''
};

const userProfileReducer = createReducer(initialState, {
  SET_CURRENT_USER: (state, action) => {
    state.user = action.payload;
  },
  SET_CONSENTS: (state, action) => {
    state.consents = action.payload;
  },
  SET_CONSENTS_ERROR: (state, action) => {
    state.consentsError = action.payload;
  }
});

export default userProfileReducer;
