import { combineReducers } from 'redux';
import authReducer from './authSlice';
import alertReducer from './alertSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
