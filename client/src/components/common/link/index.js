import React from 'react';
import { Link as L } from 'react-router-dom';
import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    ...theme.overrides.MuiButton.root,
    display: 'inline-block',
    textAlign: 'center',

    '&:hover': {
      textDecoration: 'none'
    }
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.primary.contrastText} !important`,

    '&:hover': {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText
    }
  }
}));

const MyLink = ({
  children,
  to,
  className,
  color,
  external = false,
  onClick,
  variant
}) => {
  const classes = useStyles();

  const classNames = [];
  if (className) {
    classNames.push(className);
  }

  if (variant === 'button') {
    classNames.push(classes.button);
  }

  if (color === 'primary') {
    classNames.push(classes.primary);
  }

  if (external) {
    return (
      <Link
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames.join(' ')}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      component={L}
      to={to}
      className={classNames.join(' ')}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default MyLink;
