import {combineReducers} from 'redux';
import getdata from '../getdata';
import saveData from '../savedata';
export default combineReducers({
  saveData: saveData,
  getdata: getdata,
});
