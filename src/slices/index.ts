import { combineReducers } from 'redux';
import authReducer from './authSlice';
import alertReducer from './alertSlice';
import todoReducer from './todoSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
