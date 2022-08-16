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

export const SET_SWITCH_DETAILS = 'SET_SWITCH_DETAILS';
export const setSwitchDetails = createAction(SET_SWITCH_DETAILS);

const initialState = {
  currentPlan: [],
  updateList: false,
  offerToSwitch: {},
  switchSettings: {},
  switchDetails: {}
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
  SET_SWITCH_DETAILS: (state, action) => {
    if (state.switchSettings.available) {
      const { title } = state.switchSettings.available.find(
        item => item.toOfferId === action.payload.toOfferId
      );
      // save offer title in switchDetails object
      state.switchDetails = {
        ...state.switchDetails,
        [action.payload.switchId]: {
          ...action.payload.switchDetails,
          title
        }
      };
    } else {
      state.switchDetails = {
        ...state.switchDetails,
        [action.payload.switchId]: action.payload.switchDetails
      };
    }
  },

  SET_SWITCH_SETTINGS: (state, action) => {
    state.switchSettings[action.payload.offerId] = action.payload.settings;

    // save offer title in switchDetails object
    Object.keys(state.switchDetails).forEach(pendingSwitchId => {
      const switchDetailsFormSwitchSettings = action.payload.settings.available.find(
        item =>
          item.toOfferId === state.switchDetails[pendingSwitchId].toOfferId
      );
      state.switchDetails[pendingSwitchId].title =
        switchDetailsFormSwitchSettings.title;
    });
  }
});

export default paymentDetailsReducer;
