// WHOLE FILE TO BE DELETED? - let me know in code review if this planDetails.js is needed

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

export const POPULATE_SWITCH_TITLE = 'POPULATE_SWITCH_TITLE';
export const populateSwitchTitle = createAction(POPULATE_SWITCH_TITLE);

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
    const { details, type } = action.payload;
    if (type === 'delete') {
      delete state.switchDetails[details.pendingSwitchId];
    } else {
      state.switchDetails = Object.assign(state.switchDetails, details);
    }
  },
  SET_SWITCH_SETTINGS: (state, action) => {
    state.switchSettings[action.payload.offerId] = action.payload.settings;
  },
  POPULATE_SWITCH_TITLE: state => {
    const switchesToFulfill = [];
    Object.keys(state.switchDetails).forEach(pendingSwitchId => {
      if (!state.switchDetails[pendingSwitchId].title) {
        switchesToFulfill.push(pendingSwitchId);
      }
    });
    if (switchesToFulfill.length && state.switchSettings) {
      switchesToFulfill.forEach(pendingSwitchId => {
        Object.keys(state.switchSettings).forEach(offerId => {
          const switchSettingsDetails = state.switchSettings[
            offerId
          ].available.find(
            item =>
              item.toOfferId === state.switchDetails[pendingSwitchId].toOfferId
          );
          if (switchSettingsDetails) {
            const { title } = switchSettingsDetails;
            state.switchDetails[pendingSwitchId] = {
              ...state.switchDetails[pendingSwitchId],
              title
            };
          }
        });
      });
    }
  }
});

export default paymentDetailsReducer;
