import { combineReducers } from 'redux';
import authReducer from './authSlice';
import alertReducer from './alertSlice';

export default combineReducers({
  auth: authReducer,
  alert: alertReducer,
});
