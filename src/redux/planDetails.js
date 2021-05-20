/* eslint-disable no-param-reassign */
import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_CURRENT_PLAN = 'SET_CURRENT_PLAN';
export const setCurrentPlan = createAction(SET_CURRENT_PLAN);

export const UPDATE_LIST = 'UPDATE_LIST';
export const updateList = createAction(UPDATE_LIST);

export const SET_OFFER_TO_SWITCH = 'SET_OFFER_TO_SWITCH';
export const setOfferToSwitch = createAction(SET_OFFER_TO_SWITCH);

export const SET_SWITCH_SETTINGS = 'SET_SWITCH_SETTINGS';
export const setSwitchSettings = createAction(SET_SWITCH_SETTINGS);

const initialState = {
  currentPlan: [],
  updateList: false,
  offerToSwitch: {},
  switchSettings: {}
};

const paymentDetailsReducer = createReducer(initialState, {
  SET_CURRENT_PLAN: (state, action) => {
    state.currentPlan = action.payload;
  },
  UPDATE_LIST: state => {
    state.updateList = !state.updateList;
  },
  SET_OFFER_TO_SWITCH: (state, action) => {
    state.offerToSwitch = action.payload;
  },
  SET_SWITCH_SETTINGS: (state, action) => {
    state.switchSettings[action.payload.offerId] = action.payload.settings;
  }
});

export default paymentDetailsReducer;
