import React, { useState, useEffect } from 'react';
import toast  from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import * as AuthService from '../../services/auth';
import * as StoreService from '../../services/store';
import * as Links from '../../utils/links';
import { Button, Form, Input, Link } from '../../components/common';
import * as Auth from '../../components/auth';
import BackgroundImage from '../../images/registration.jpeg';

const useStyles = makeStyles(theme => ({
  submitButton: {
    marginTop: theme.spacing(4.5)
  }
}));

const Register = ({ history }) => {
  const [email, setEmail] = useState('');

  const { user } = useSelector(state => ({ ...state }));

  const classes = useStyles();

  useEffect(() => {
    if (user && user.token) history.push(Links.Public.home);
  }, [user, history]);

  const handleSubmit = async () => {
    try {
      //comment out next line when testing design of toast, in order to avoid sending unneccessary emails.
      await AuthService.register(email);
      toast.success('Successful registration, email sent to your account', {
         duration: 4000,
  style: {
    border: '5px solid #E1C699',
    padding: '16px',
    color: '#713200',
    minWidth:'1450px',
    marginTop:'70px',
  },
  iconTheme: {
    primary: '#713200',
    secondary: '#FFFAEE',
  },
});

      // save user email in local storage
      StoreService.set(AuthService.EMAIL_FOR_REGISTRATION, email);
      // clear state
      setEmail('');
    } catch (err) {
      toast.error(
        err.message ||
          'Error.'
      );
    }
  };


  return (
    <Auth.Layout
      backgroundImage={BackgroundImage}
      bottomNav={
        <Typography>
          Already have an account, or want to use Google to authenticate? <Link to={Links.Auth.login}>Click here</Link>
        </Typography>
      }
    >
      <h1>Join</h1>
      <h5>
      <em>
        Provide your email here or use your Google Account to authenticate on the login page
      </em>
      </h5>

      <Form onSubmit={handleSubmit} className={classes.form}>
        <Input
          type="email"
          label="E-mail"
          name="email"
          value={email}
          onChange={value => setEmail(value)}
          autoFocus
        />

        <Button
          className={classes.submitButton}
          color="primary"
          disabled={!email.length}
          fullWidth
          size="large"
          submit
        >
          Registration
        </Button>


      </Form>
    </Auth.Layout>
  );
};

export default Register;
