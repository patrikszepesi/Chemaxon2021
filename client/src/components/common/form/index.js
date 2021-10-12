import React from 'react';

const Form = ({ children, className, onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {children}
    </form>
  );
};

export default Form;
