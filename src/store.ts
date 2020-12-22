import thunk, { ThunkAction } from 'redux-thunk';
import rootReducer from './slices/index';
import { configureStore, Action } from '@reduxjs/toolkit';
import setAuthToken from './utils/setAuthToken';
import { RootState } from './slices/index';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

// set up a store subscription listener
// to store the users token in localStorage

// initialize current state from redux store for subscription comparison
// preventing undefined error
export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

let currentState = store.getState();

store.subscribe(async () => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    await setAuthToken(token);
  }
});

export default store;
