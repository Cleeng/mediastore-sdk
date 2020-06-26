/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_CURRENT_PLAN = 'SET_CURRENT_PLAN';
export const setCurrentPlan = createAction(SET_CURRENT_PLAN);

export const SHOW_SURVEY = 'SHOW_SURVEY';
export const showSurvey = createAction(SHOW_SURVEY);

export const HIDE_SURVEY = 'HIDE_SURVEY';
export const hideSurvey = createAction(HIDE_SURVEY);

export const UPDATE_LIST = 'UPDATE_LIST';
export const updateList = createAction(UPDATE_LIST);

export const SET_UPDATE_ACTION = 'SET_UPDATE_ACTION';
export const setUpdateAction = createAction(SET_UPDATE_ACTION);

const initialState = {
  currentPlan: [],
  isSurveyShown: false,
  offerToUpdate: { offerId: '', expiresAt: null, price: null },
  updateAction: '',
  updateList: false
};

const paymentDetailsReducer = createReducer(initialState, {
  SET_CURRENT_PLAN: (state, action) => {
    state.currentPlan = action.payload;
  },
  SHOW_SURVEY: (state, action) => {
    state.isSurveyShown = true;
    state.offerToUpdate = action.payload;
  },
  HIDE_SURVEY: state => {
    state.isSurveyShown = false;
    state.offerToUpdate = { offerId: '', expiresAt: null, price: null };
  },
  UPDATE_LIST: state => {
    state.updateList = !state.updateList;
  },
  SET_UPDATE_ACTION: (state, action) => {
    state.updateAction = action.payload;
  }
});

export default paymentDetailsReducer;
