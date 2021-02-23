import base64 from 'react-native-base64';
export const BASE_URL = 'http://dev1.xicom.us/xttest/';
const qs = require('qs');
export const url = {
  GETDATA: BASE_URL + 'getdata.php',
  SAVEDATA: BASE_URL + 'savedata.php',
};
export const data = {
  grant_type: 'client_credentials',
};
export const options = {
  method: 'post',
  headers: new Headers({
    // Authorization: `Basic ${basicAuth}`,
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Credentials': true,
  }),
  body: qs.stringify(data),
};
export const http_methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELET',
  HEAD: 'HEAD',
  PATCH: 'PATCH',
};
