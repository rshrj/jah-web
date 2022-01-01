import { createTheme, lighten } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#ff5722'
    },
    secondary: {
      main: '#9c27b0',
      contrastText: 'rgba(255,255,255,0.9)'
    },
    background: {
      default: '#fafafa'
    }
  },
  typography: {
    fontFamily: '"Sen",  sans-serif'
  }
});

export default theme;
