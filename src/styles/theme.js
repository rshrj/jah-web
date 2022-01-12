import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ac8c2b',
    },
    secondary: {
      main: '#2b4bac',
      contrastText: 'rgba(255,255,255,0.9)',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: '"Sen",  sans-serif',
  },
});

export default theme;
