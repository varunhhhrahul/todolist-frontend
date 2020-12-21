import setAuthToken from '../utils/setAuthToken';
import { createSlice } from '@reduxjs/toolkit';
import { setAlert } from './alertSlice';
import * as REQUESTS from '../api/authRequests';
// import { LOGIN } from '../constants/routes';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart(state) {
      state.loading = true;
      state.error = null;
    },
    setCurrentUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.loading = false;
    },
    setToken(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.loading = false;
    },
    authFailure(state, action) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload ? action.payload : 'Could not connect';
    },
    setLogout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    authComplete(state) {
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
  },
});

export const {
  authStart,
  setCurrentUser,
  authFailure,
  authComplete,
  setLoading,
  setToken,
  setLogout,
} = authSlice.actions;

export default authSlice.reducer;

// thunks

//load user
export const loadUser = () => async (dispatch: any) => {
  try {
    const data = await REQUESTS.getMe();
    const { success } = data;
    if (success) {
      dispatch(setCurrentUser(data));
    }
  } catch (err) {
    dispatch(authFailure(err.response.data.error));
  }
};

//register user
export const register = (formData: any, history: any) => async (
  dispatch: any
) => {
  try {
    dispatch(authStart());
    const data = await REQUESTS.register(formData);
    const { success } = data;
    if (success) {
      dispatch(setAlert('Registered Successfully', 'success'));
      dispatch(authComplete());
      // history.push(LOGIN);
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'error'));
    dispatch(authFailure(err.response.data.error));
  }
};

//login
export const login = (formData: any) => async (dispatch: any) => {
  try {
    dispatch(authStart());
    const data = await REQUESTS.login(formData);
    const { success, token } = data;
    if (success) {
      // Setting token to authorisation header in axios
      await setAuthToken(token);

      dispatch(loadUser());
      dispatch(setToken(token));

      dispatch(setAlert('Logged in Successfully', 'success'));
      dispatch(authComplete());
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'error'));
    dispatch(authFailure(err.response.data.error));
  }
};

// update user details
export const updateDetails = (formData: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading());

    const data = await REQUESTS.updateDetails(formData);
    const { success } = data;

    if (success) {
      dispatch(loadUser());
      dispatch(setAlert('Updated details successfully!', 'success'));
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'error'));
    dispatch(authFailure(err.response.data.error));
  }
};

// update user password
export const updatePassword = (formData: any) => async (dispatch: any) => {
  try {
    dispatch(setLoading());
    const data = await REQUESTS.updatePassword(formData);
    const { success } = data;

    if (success) {
      dispatch(loadUser());
      dispatch(setAlert('Updated password successfully!', 'success'));
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'error'));
    dispatch(authFailure(err.response.data.error));
  }
};

//logout
export const logout = () => async (dispatch: any) => {
  dispatch(setLogout());
  dispatch(setAlert('Logged out successfully', 'success'));
  await REQUESTS.logout();
};

// send email for reset password
export const sendEmail = (email: string) => async (dispatch: any) => {
  try {
    dispatch(setLoading());
    const data = await REQUESTS.forgotPassword(email);
    const { success } = data;

    if (success) {
      dispatch(setLoading());
      dispatch(setAlert('Email Sent!', 'success'));
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'error'));
  }
};

// reset password
export const resetPassword = (token: string, password: string) => async (
  dispatch: any
) => {
  try {
    dispatch(setLoading());
    const data = await REQUESTS.resetPassword(token, password);
    const { success } = data;

    if (success) {
      dispatch(setLoading());
      dispatch(setAlert('Password has been Changed', 'success'));
    }
  } catch (err) {
    dispatch(setAlert(err.response.data.error, 'error'));
  }
};
