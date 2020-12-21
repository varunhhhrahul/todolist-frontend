import React, { useEffect } from 'react';
import logo from './logo.svg';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core';
import { MuiTheme } from './theme';
import { Provider } from 'react-redux';

import './App.css';
import store from './store';
import { loadUser } from './slices/authSlice';
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    (async () => {
      if (localStorage.token) {
        await setAuthToken(localStorage.token);
        store.dispatch(loadUser());
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={MuiTheme}>
        <></>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
