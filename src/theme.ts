import { createMuiTheme } from '@material-ui/core/styles';

export const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#24323B',
    },
    secondary: {
      main: '#4EB189',
    },
  },
  typography: {
    fontFamily: [
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
