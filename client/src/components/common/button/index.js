import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,

    '&:hover': {
      backgroundColor: theme.palette.success.light
    }
  },

  // we allow both 'error' and 'danger' colors
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,

    '&:hover': {
      backgroundColor: theme.palette.error.light
    }
  },
  danger: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,

    '&:hover': {
      backgroundColor: theme.palette.error.light
    }
  },

  fullWidth: {
    width: '100%'
  }
}));

const MyButton = ({
  children,
  className,
  color = 'default',
  disabled = false,
  endIcon,
  fullWidth,
  onClick,
  size,
  startIcon,
  submit,
  variant = 'contained'
}) => {
  const classes = useStyles();
  const classNames = [];
  const muiColors = ['primary', 'secondary', 'default'];

  if (color && !muiColors.includes(color)) {
    classNames.push(classes[color]);
  }

  if (className) {
    classNames.push(className);
  }

  if (fullWidth) {
    classNames.push(classes.fullWidth);
  }

  return (
    <Button
      className={classNames.join(' ')}
      color={color && muiColors.includes(color) ? color : undefined}
      disabled={disabled}
      endIcon={endIcon}
      onClick={onClick}
      size={size}
      startIcon={startIcon}
      type={submit ? 'submit' : 'button'}
      variant={variant}
    >
      {children}
    </Button>
  );
};

export default MyButton;
