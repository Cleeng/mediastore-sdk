/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = createAction(SET_CURRENT_USER);

export const SET_CONSENTS = 'SET_CONSENTS';
export const setConsents = createAction(SET_CONSENTS);

export const SET_CONSENTS_ERROR = 'SET_CONSENTS_ERROR';
export const setConsentsError = createAction(SET_CONSENTS_ERROR);

export const SHOW_RESET_PASSWORD = 'SHOW_RESET_PASSWORD';
export const showResetPassword = createAction(SHOW_RESET_PASSWORD);

export const HIDE_RESET_PASSWORD = 'HIDE_RESET_PASSWORD';
export const hideResetPassword = createAction(HIDE_RESET_PASSWORD);

const initialState = {
  user: null,
  consents: [],
  consentsError: '',
  isResetPasswordShown: false
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
  },
  SHOW_RESET_PASSWORD: state => {
    state.isResetPasswordShown = true;
  },
  HIDE_RESET_PASSWORD: state => {
    state.isResetPasswordShown = false;
  }
});

export default userProfileReducer;
