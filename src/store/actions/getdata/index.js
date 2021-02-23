import React from 'react';
import {Platform} from 'react-native';
import {
  GETDATA_CLEARDATA,
  GETDATA_FAILURE,
  GETDATA_FETCHING,
  GETDATA_SUCCESS,
} from '../../types';
import {checkNetwork} from '../../../utils';
import {url} from '../../../Api';
import axios from 'axios';

export const getdata = (request_data) => {
  return (dispatch) => {
    checkNetwork().then((state) => {
      if (state.isConnected == true) {
        axios
          .post(url.GETDATA, request_data)
          .then(function (response) {
            console.log('getdata', JSON.stringify(response));

            if (response.data.status == 'success') {
              // update_user_token(dispatch, response.data.token)
              getdata_success(dispatch, response.data);
            } else {
              // alert(response.data.msg)
              getdata_failure(dispatch, response.data.msg);
            }
          })
          .catch(function (error) {
            console.log('API RESPONSE ERROR *******', JSON.stringify(error));
            getdata_failure(
              dispatch,
              'We apologize, a technical error has occurred.',
            );
          });
      } else {
        getdata_failure(dispatch, 'Your device is not connected to internet.');
      }
    });
  };
};

const getdata_success = (dispatch, data) => {
  dispatch({type: GETDATA_SUCCESS, payload: data});
};

const getdata_failure = (dispatch, error) => {
  dispatch({type: GETDATA_FAILURE, payload: error});
};

export const getdata_cleardata = () => {
  return (dispatch) => {
    dispatch({
      type: GETDATA_CLEARDATA,
      payload: '',
    });
  };
};
