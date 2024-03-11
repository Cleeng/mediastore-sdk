/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser = createAction(SET_CURRENT_USER);

export const SET_USER_CAPTURE = 'SET_USER_CAPTURE';
export const setUserCapture = createAction(SET_USER_CAPTURE);

export const UPDATE_CAPTURE_OPTION = 'UPDATE_CAPTURE_OPTION';
export const updateCaptureOption = createAction(UPDATE_CAPTURE_OPTION);

export const SET_CONSENTS = 'SET_CONSENTS';
export const setConsents = createAction(SET_CONSENTS);

export const SET_CONSENTS_ERROR = 'SET_CONSENTS_ERROR';
export const setConsentsError = createAction(SET_CONSENTS_ERROR);

const initialState = {
  user: null,
  capture: null,
  consents: [],
  consentsError: '',
};

const userProfileReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setUserCapture, (state, action) => {
      state.capture = action.payload;
    })
    .addCase(updateCaptureOption, (state, action) => {
      const newState = {
        ...state.capture,
        settings: state.capture.settings.map((setting) => {
          if (setting.key === action.payload.key) {
            return { ...setting, answer: action.payload.value };
          }
          return setting;
        }),
      };
      state.capture = newState;
    })
    .addCase(setConsents, (state, action) => {
      state.consents = action.payload;
    })
    .addCase(setConsentsError, (state, action) => {
      state.consentsError = action.payload;
    });
});

export default userProfileReducer;
