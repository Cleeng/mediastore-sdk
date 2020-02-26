/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const showLoader = createAction(SHOW_LOADER);
export const hideLoader = createAction(HIDE_LOADER);

const initialState = {
  isLoading: false
};

const loaderReducer = createReducer(initialState, {
  SHOW_LOADER: state => {
    state.isLoading = true;
  },
  HIDE_LOADER: state => {
    state.isLoading = false;
  }
});

export default loaderReducer;
