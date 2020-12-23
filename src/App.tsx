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
import { DASHBOARD, HOME, REGISTER, UPDATE_TODO } from './constants/routes';
import { Login } from './views/auth/Login/Login';
import { Register } from './views/auth/Register/Register';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import MainForm from './views/auth/MainForm';
import PrivateRoute from './components/PrivateRoute';
import { Todos } from './views/Todos/Todos';
import { CreateOrUpdateTodo } from './views/Todos/CreateOrUpdateTodo/CreateOrUpdateTodo';

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

            <PrivateRoute exact path={DASHBOARD}>
              <Todos />
            </PrivateRoute>
            <PrivateRoute exact path={UPDATE_TODO}>
              <CreateOrUpdateTodo />
            </PrivateRoute>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
