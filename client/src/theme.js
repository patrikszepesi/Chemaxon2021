import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  // color
  palette: {
    type: 'light',
    primary: {
      main: '#E1C699',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#917255',
      contrastText: '#FFFFFF'
    },
    info: {
      main: '#90C9DF'
    },
    success: {
      main: '#00853E'
    },
    warning: {
      main: '#FFA524'
    },
    error: {
      main: '#D64B0D'
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
      neutral: '#F3E8DD',
      header: '#524F4A'
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#9E9E9E',
      hint: '#777777'
    },
    divider: '#C4C4C4'
  },

  // grabbed these from bootstrap: https://getbootstrap.com/docs/5.0/layout/breakpoints/
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400
    }
  },

  // typography
  typography: {
    fontFamily: '"Work-Sans", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontFamily: '"Roboto Condensed", sans-serif',
      fontSize: '4rem',
      fontWeight: 700
    },
    h2: {
      fontFamily: '"Roboto Condensed", sans-serif',
      fontSize: '2.2rem',
      fontWeight: 700
    },
    h3: {
      fontFamily: '"Roboto Condensed", sans-serif',
      fontSize: '1.5rem',
      fontWeight: 700
    },
    h4: {
      fontFamily: '"Roboto Condensed", sans-serif',
      fontWeight: 700
    },
    h5: {
      fontFamily: '"Roboto Condensed", sans-serif',
      fontWeight: 700
    },
    h6: {
      fontFamily: '"Roboto Condensed", sans-serif',
      fontWeight: 700
    },
    body1: {
      fontFamily: '"Work-Sans", sans-serif',
      fontWeight: 400
    },
    body2: {
      fontFamily: '"Work-Sans", sans-serif',
      fontWeight: 300
    },
    button: {
      fontFamily: '"Work-Sans", sans-serif',
      fontWeight: 700,
      textTransform: 'none'
    }
  },

  // shape
  shape: {
    borderRadius: 32
  }
});

// overrides
theme.overrides = {
  MuiButton: {
    root: {
      borderRadius: 50,
      padding: theme.spacing(1, 2)
    },
    containedPrimary: {
      '&:hover': {
        backgroundColor: theme.palette.primary.light
      }
    },
    containedSecondary: {
      '&:hover': {
        backgroundColor: theme.palette.secondary.light
      }
    },
    sizeLarge: {
      padding: theme.spacing(2, 4)
    }
  },
};

export default theme;
