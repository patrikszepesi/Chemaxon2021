import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Link } from '../common';
import * as Links from '../../utils/links';



const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.common.white,
    display: 'flex',
    flex: '1 1 0%',
    flexDirection: 'column',
    height: '100vh',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1
  },
  wrapper: {
    alignContent: 'stretch',
    display: 'grid',
    gridTemplateColumns: '1fr 50%',
    gridTemplateRows: 'auto',
    height: '100vh',
    minHeight: '100%',
    width: '100vw',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '100vh 0px'
    }
  },
  content: {
    alignContent: 'stretch',
    display: 'grid',
    gridTemplateAreas: `
      'logo'
      'form'
      'bottomNav'
    `,
    gridTemplateColumns: '1fr',
    gridTemplateRows: '60px 1fr 60px'
  },
  topNav: {
    gridArea: 'logo',
    marginLeft: 60,
    marginTop: 48,

    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(4)
    }
  },
  form: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gridArea: 'form',
    justifyContent: 'center',
    padding: theme.spacing(0, 4)
  },
  formContent: {
    maxWidth: 440,
    width: '100%'
  },
  bottomNav: {
    gridArea: 'bottomNav',
    paddingLeft: 60,

    [theme.breakpoints.down('sm')]: {
      padding: 0,
      textAlign: 'center'
    }
  },
  illustration: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

const Layout = ({ children, backgroundImage, bottomNav, type = 'login' }) => {
  const classes = useStyles({ type });

  return (
    <main className={classes.container}>
      <section className={classes.wrapper}>
        <div className={classes.content}>
          <div className={classes.topNav}>
            <Typography>
              <Link to={Links.Public.home}>Vissza a főoldalra</Link>
            </Typography>
          </div>
          <div className={classes.form}>
            <section className={classes.formContent}>{children}</section>
          </div>
          <div className={classes.bottomNav}>{bottomNav}</div>
        </div>

        <div
          className={classes.illustration}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </section>
    </main>
  );
};

export default Layout;
