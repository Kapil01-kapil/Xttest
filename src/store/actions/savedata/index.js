import React from 'react';
import {Platform} from 'react-native';
import {
  SAVEDATA_CLEARDATA,
  SAVEDATA_FAILURE,
  SAVEDATA_FETCHING,
  SAVEDATA_SUCCESS,
} from '../../types';
import {checkNetwork} from '../../../utils';
import {url} from '../../../Api';
import axios from 'axios';

export const savedata = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        axios
          .post(url.SAVEDATA, request_data)
          .then(function (response) {
            console.log('orderhistory', JSON.stringify(response));

            if (response.data.status == 'success') {
              // update_user_token(dispatch, response.data.token)
              savedata_success(dispatch, response.data.orders);
            } else {
              // alert(response.data.msg)
              savedata_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log('API RESPONSE ERROR *******', JSON.stringify(error));
            savedata_failure(
              dispatch,
              'We apologize, a technical error has occurred.',
            );
          });
      } else {
        savedata_failure(dispatch, 'Your device is not connected to internet.');
      }
    });
  };
};

const savedata_success = (dispatch, data) => {
  dispatch({type: SAVEDATA_SUCCESS, payload: data});
};

const savedata_failure = (dispatch, error) => {
  dispatch({type: SAVEDATA_FAILURE, payload: error});
};

export const savedata_cleardata = () => {
  return (dispatch) => {
    dispatch({
      type: SAVEDATA_CLEARDATA,
      payload: '',
    });
  };
};
