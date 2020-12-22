import React, { useEffect } from 'react';
import logo from './logo.svg';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core';
import { MuiTheme } from './theme';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import store from './store';
import { loadUser } from './slices/authSlice';
import setAuthToken from './utils/setAuthToken';
import { Alert } from '@material-ui/lab';
import MyAlert from './components/Alert';
import { HOME, REGISTER } from './constants/routes';
import { Login } from './views/auth/Login/Login';
import { Register } from './views/auth/Register/Register';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import MainForm from './views/auth/MainForm';

const App = () => {
  // useEffect(() => {
  //   (async () => {
  //     if (localStorage.token) {
  //       await setAuthToken(localStorage.token);
  //       store.dispatch(loadUser());
  //     }
  //   })();
  // }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={MuiTheme}>
        <Router>
          <MyAlert />
          {/* Add Suspense */}
          <Switch>
            <Route exact path={HOME}>
              <MainForm />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
