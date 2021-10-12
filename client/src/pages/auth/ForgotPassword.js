import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import * as AuthService from '../../services/auth';
import * as Links from '../../utils/links';
import { Button, Form, Input, Link } from '../../components/common';
import * as Auth from '../../components/auth';
import BackgroundImage from '../../images/login-bg.jpeg';

const useStyles = makeStyles(theme => ({
  submitButton: {
    marginTop: theme.spacing(4.5)
  }
}));

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => ({ ...state }));

  const classes = useStyles();

  useEffect(() => {
    if (user && user.token) history.push('/');
  }, [user, history]);

  const handleSubmit = async () => {
    setLoading(true);

    await AuthService.sendPasswordResetEmail(email)
      .then(() => {
        setEmail('');
        toast.success('Link sent to email');
      })
      .catch(error => {
        toast.error(error.message);
        console.log('ERROR MSG IN FORGOT PASSWORD', error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Auth.Layout
      backgroundImage={BackgroundImage}
      bottomNav={
        <Typography>
          <Link to={Links.Auth.login}>Back to Login</Link>
        </Typography>
      }
    >
      {loading ? (
        <Typography>Loading</Typography>
      ) : (
        <>
          <h1>Forgot your password?</h1>
          <h5>
              <em>
              Provide your email and we will help you.
              </em>
          </h5>

        </>
      )}

      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={value => setEmail(value)}
          label="E-mail"
          autoFocus
        />
        <Button
          disabled={!email}
          fullWidth
          size="large"
          className={classes.submitButton}
          color="primary"
          submit
        >
          Reset Password
        </Button>
      </Form>
    </Auth.Layout>
  );
};

export default ForgotPassword;
