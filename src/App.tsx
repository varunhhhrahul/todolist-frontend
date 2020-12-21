import React from 'react';
import logo from './logo.svg';
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core';
import { MuiTheme } from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={MuiTheme}>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
