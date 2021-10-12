import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const StyledInput = withStyles(theme => ({
  root: {
    marginBottom: theme.spacing(1.5)
  }
}))(TextField);

const MyInput = ({
  autoComplete,
  autoFocus,
  className,
  disabled,
  id,
  label,
  name,
  onChange,
  placeholder,
  type = 'text',
  value
}) => {
  const handleChange = e => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <StyledInput
      autoComplete={autoComplete || name}
      autoFocus={autoFocus}
      className={className}
      disabled={disabled}
      id={id || name}
      label={label}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      type={type}
      value={value}
      fullWidth
    />
  );
};

export default MyInput;
