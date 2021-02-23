import React from 'react';
import {Platform} from 'react-native';
import {
  GETDATA_CLEARDATA,
  GETDATA_FAILURE,
  GETDATA_FETCHING,
  GETDATA_SUCCESS,
} from '../../types';

const initialState = {
  is_success: false,
  is_fetching: false,
  error: false,
  getdata_data: [],
  msg: '',
};

export default function getdata(state = initialState, action) {
  switch (action.type) {
    case GETDATA_FETCHING:
      return {
        ...state,
        is_fetching: true,
        is_success: false,
        error: false,
      };
    case GETDATA_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        is_success: true,
        getdata_data: action.payload,
      };
    case GETDATA_FAILURE:
      return {
        ...state,
        is_fetching: false,
        is_success: false,
        error: true,
        msg: action.payload,
      };
    case GETDATA_CLEARDATA:
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
