import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import * as Actions from '../../actions/user';
import * as AuthService from '../../services/auth';
import * as StoreService from '../../services/store';
import { Button, Form, Input } from '../../components/common';
import * as Links from '../../utils/links';
import * as Auth from '../../components/auth';
import BackgroundImage from '../../images/registration.jpeg';

const useStyles = makeStyles(theme => ({
  submitButton: {
    marginTop: theme.spacing(4.5)
  }
}));

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(StoreService.get(AuthService.EMAIL_FOR_REGISTRATION));
  }, [history]);

  const handleSubmit = async () => {
    // validation
    if (!email || !password) {
      toast.error('Email and password required');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    AuthService.completeRegistration(email, password, window.location.href)
      .then(res => {
        dispatch(Actions.userLoggedIn(res));

        // redirect
        history.push(Links.Public.home);
      })
      .catch(error => {
        console.log(error);
        toast.error(
          error.message ||
            'Error'
        );
      });
  };

  const completeRegistrationForm = () => (
    <Form onSubmit={handleSubmit}>
      <Input type="email" label="E-mail" value={email} disabled />

      <Input
        type="password"
        label="Jelszó"
        value={password}
        onChange={value => setPassword(value)}
        autoFocus
      />

      <Button
        className={classes.submitButton}
        color="primary"
        disabled={!password.length}
        fullWidth
        size="large"
        submit
      >
        Account validation
      </Button>
    </Form>
  );

  return (
    <Auth.Layout backgroundImage={BackgroundImage}>
      <h1>Complete Registration</h1>
      <h5>
        <em>Provide a password to complete the process.</em>
      </h5>


      {completeRegistrationForm()}
    </Auth.Layout>
  );
};

export default RegisterComplete;
