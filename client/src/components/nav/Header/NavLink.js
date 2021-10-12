import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  base: {
    color: theme.palette.common.white,
    fontSize: theme.typography.body1.fontSize,

    '&:hover': {
      color: theme.palette.primary.main,
      textDecoration: 'none'
    }
  },
  active: {
    color: theme.palette.primary.main
  }
}));

const MyNavLink = ({ children, className, to }) => {
  const classes = useStyles();

  const classNames = [classes.base];
  if (className) {
    classNames.push(className);
  }

  return (
    <Link
      component={NavLink}
      to={to}
      className={classNames.join(' ')}
      activeClassName={classes.active}
      exact
    >
      {children}
    </Link>
  );
};

export default MyNavLink;
