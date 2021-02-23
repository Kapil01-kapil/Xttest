import React from 'react';
import {Platform} from 'react-native';
import {
  SAVEDATA_CLEARDATA,
  SAVEDATA_FAILURE,
  SAVEDATA_FETCHING,
  SAVEDATA_SUCCESS,
} from '../../types';

const initialState = {
  is_success: false,
  is_fetching: false,
  error: false,
  savedata_data: [],
  msg: '',
};

export default function savedata(state = initialState, action) {
  switch (action.type) {
    case SAVEDATA_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case SAVEDATA_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        savedata_data: action.payload,
      };
    case SAVEDATA_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case SAVEDATA_CLEARDATA:
      return {
        ...state,
        is_success: false,
        error: false,
        msg: '',
      };

    default:
      return state;
  }
}
