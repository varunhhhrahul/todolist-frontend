import { createSlice, ThunkDispatch } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { DispatchProp } from 'react-redux';
import * as REQUESTS from '../api/todoRequests';
import { setAlert } from './alertSlice';

const initialState = {
  todos: null,
  todo: null,
  updatedTodo: null,
  deletedTodo: null,
  createdTodo: null,
  loading: false,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
      state.loading = false;
    },
    setTodo(state, action) {
      state.todo = action.payload;
      state.loading = false;
    },
    setCreatedTodo(state, action) {
      state.createdTodo = action.payload;
      state.loading = false;
    },
    setUpdatedTodo(state, action) {
      state.updatedTodo = action.payload;
      state.loading = false;
    },
    setDeletedTodo(state, action) {
      state.deletedTodo = action.payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const {
  setCreatedTodo,
  setDeletedTodo,
  setLoading,
  setTodo,
  setTodos,
  setUpdatedTodo,
} = todoSlice.actions;

export default todoSlice.reducer;

export const getAllTodos = () => async (dispatch: any) => {
  try {
    dispatch(setLoading());
    const resData = await REQUESTS.getTodos();
    const { success, data } = resData;
    if (success) {
      dispatch(setTodos(data));
    }
  } catch (err) {
    dispatch(setLoading());
    dispatch(setAlert(err.response.data.error, 'error'));
  }
};

export const getTodo = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading());
    const resData = await REQUESTS.getTodo(id);

    const { success, data } = resData;
    if (success) {
      dispatch(setTodo(data));
    }
  } catch (err) {
    dispatch(setLoading());
    dispatch(setAlert(err.response.data.error, 'error'));
  }
};

export const createTodo = (formData: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading());
    const resData = await REQUESTS.createTodo(formData);

    const { success, data } = resData;
    if (success) {
      dispatch(setCreatedTodo(data));
      dispatch(setAlert('Todo created!', 'success'));
      // history.push(DASHBOARD);
    }
  } catch (err) {
    dispatch(setLoading());
    dispatch(setAlert(err.response.data.error, 'error'));
  }
};

export const updateTodo = (id: string, formData: any, history: any) => async (
  dispatch: any
) => {
  try {
    dispatch(setLoading());
    const resData = await REQUESTS.updateTodo(id, formData);

    const { success, data } = resData;
    if (success) {
      dispatch(setUpdatedTodo(data));
      dispatch(setAlert('Todo updated!', 'success'));
      // history.push(DASHBOARD);
    }
  } catch (err) {
    dispatch(setLoading());
    dispatch(setAlert(err.response.data.error, 'error'));
  }
};

export const deleteTodo = (id: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading());
    const resData = await REQUESTS.deleteTodo(id);

    const { success, data } = resData;
    if (success) {
      dispatch(setDeletedTodo(data));
      dispatch(setAlert('Todo deleted!', 'success'));
      // history.push(DASHBOARD);
    }
  } catch (err) {
    dispatch(setLoading());
    dispatch(setAlert(err.response.data.error, 'error'));
  }
};
