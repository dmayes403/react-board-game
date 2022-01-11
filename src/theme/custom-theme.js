import { createTheme } from '@mui/material';

const primaryColor = '#116466';
const secondaryColor = '#184746';
const backgroundColor = '#2C3531';
const iconColor = '#D9B08C';
const iconColor2 = '#FFCB9A';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    // background: {
    //   default: backgroundColor
    // },
    icons: {
      main: iconColor
    }
  },
  spacing: 8,
  fonts: {
      technical: "'Roboto Mono', monospace",
      body: "'Roboto', sans-serif",
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#184746'
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: iconColor
        }
      }
    }
  }
})

export default defaultTheme;
