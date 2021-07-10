import { red } from '@material-ui/core/colors';
import { createMuiTheme,
Theme } from '@material-ui/core/styles';
// A custom theme for this app
const theme: Theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#6a1b9a',
      light: '#9c4dcc',
      dark: '#38006b',
    },
    secondary: {
      main: '#1565c0',
      light: '#5e92f3',
      dark: '#003c8f',
    },
    error: {
      main: red.A400,
    },
    background: {
      // default: '#282c34',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: '20px 10px',
        margin: '10px',
        // backgroundColor: '#fff', // 5d737e
      },
    },
    MuiButton: {
      root: {
        margin: '5px',
      },
    },
  },
});
export default theme;