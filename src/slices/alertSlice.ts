import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = <any>[];

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlertInReducer(state, action) {
      return [...state, action.payload];
    },
    removeAlertInReducer(state, action) {
      return state.filter((alert: any) => alert.id !== action.payload);
    },
  },
});

export const { setAlertInReducer, removeAlertInReducer } = alertSlice.actions;

export default alertSlice.reducer;

// Thunk
export const setAlert = (msg: string, alertType: string) => async (
  dispatch: any
) => {
  const id = uuid();
  dispatch(setAlertInReducer({ msg, alertType, id }));

  setTimeout(() => {
    dispatch(removeAlertInReducer(id));
  }, 4000);
};
