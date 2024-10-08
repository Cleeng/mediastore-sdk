/* eslint-disable no-param-reassign */
import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from './types';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const setCurrentUser =
  createAction<UserProfile['user']>(SET_CURRENT_USER);

export const SET_USER_CAPTURE = 'SET_USER_CAPTURE';
export const setUserCapture =
  createAction<UserProfile['capture']>(SET_USER_CAPTURE);

export const UPDATE_CAPTURE_OPTION = 'UPDATE_CAPTURE_OPTION';
export const updateCaptureOption = createAction<{ key: string; value: string }>(
  UPDATE_CAPTURE_OPTION
);

export const SET_CONSENTS = 'SET_CONSENTS';
export const setConsents = createAction<UserProfile['consents']>(SET_CONSENTS);

export const SET_CONSENTS_ERROR = 'SET_CONSENTS_ERROR';
export const setConsentsError = createAction<string>(SET_CONSENTS_ERROR);

const initialState: UserProfile = {
  user: null,
  capture: null,
  consents: [],
  consentsError: ''
};

const userProfileReducer = createReducer(initialState, (builder) => {
  builder.addCase(
    setCurrentUser,
    (state, action: PayloadAction<UserProfile['user']>) => {
      state.user = action.payload;
    }
  );
  builder.addCase(
    setUserCapture,
    (state, action: PayloadAction<UserProfile['capture']>) => {
      state.capture = action.payload;
    }
  );
  builder.addCase(
    updateCaptureOption,
    (state, action: PayloadAction<{ key: string; value: string }>) => {
      const newState = {
        ...state.capture,
        settings: state.capture?.settings.map((setting) => {
          if (setting.key === action.payload.key) {
            return { ...setting, answer: action.payload.value };
          }
          return setting;
        }),
        isCaptureEnabled: state.capture?.isCaptureEnabled ?? false,
        shouldCaptureBeDisplayed:
          state.capture?.shouldCaptureBeDisplayed ?? false
      };
      state.capture = newState as UserProfile['capture'];
    }
  );
  builder.addCase(
    setConsents,
    (state, action: PayloadAction<UserProfile['consents']>) => {
      state.consents = action.payload;
    }
  );
  builder.addCase(setConsentsError, (state, action) => {
    state.consentsError = action.payload;
  });
});

export default userProfileReducer;
