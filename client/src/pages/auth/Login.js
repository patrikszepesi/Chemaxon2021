import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import { GoogleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import * as AuthService from '../../services/auth';
import * as Actions from '../../actions/user';
import { Button, Form, Input, Link } from '../../components/common';
import * as Links from '../../utils/links';
import * as Auth from '../../components/auth';
import LoginBg from '../../images/login-bg.jpeg';

const useStyles = makeStyles(theme => ({
  forgottenPasswordContainer: {
    marginBottom: theme.spacing(4.5),
    textAlign: 'right'
  },
  forgottenPassword: {
    color: theme.palette.secondary.main
  }
}));

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { user } = useSelector(state => ({ ...state }));

  const classes = useStyles();

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return; //none of the code executes after return
    } else {
      if (user && user.token) history.push(Links.Public.home);
    }//
  }, [user, history]);

  let dispatch = useDispatch();



  const handleSubmit = async () => {
    setLoading(true);
    // console.table(email, password);

    AuthService.signInWithEmailAndPassword(email, password)
      .then(res => {
        dispatch(Actions.userLoggedIn(res));

      })
      .catch(error => {
        console.log(error);
        if (error.message) {
          toast.error(error.message);
        }
      })
      .finally(() => setLoading(false));
  };

  const googleLogin = async () => {
    AuthService.signInWithGoogle()
      .then(res => {
        dispatch(Actions.userLoggedIn(res));

      })
      .catch(error => {
        console.log(error);
        if (error.message) {
          toast.error(error.message);
        }
      })
      .finally(() => setLoading(false));
  };

  const loginForm = () => (
    <Form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={value => setEmail(value)}
        label="E-mail"
        autoFocus
      />

      <Input
        type="password"
        value={password}
        onChange={value => setPassword(value)}
        label="Jelszó"
      />
      <div className={classes.forgottenPasswordContainer}>
        <Link
          to={Links.Auth.forgottenPassword}
          className={classes.forgottenPassword}
        >
          Forgot Password?
        </Link>
      </div>

      <Button
        color="primary"
        disabled={!email || password.length < 6}
        fullWidth
        onClick={handleSubmit}
        size="large"
      >
        Login
      </Button>
    </Form>
  );

  return (
    <Auth.Layout
      backgroundImage={LoginBg}
      bottomNav={
        <Typography>
          Don't have an account yet?{' '}
          <Link to={Links.Auth.register}>Join!</Link>
        </Typography>
      }
    >
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <>
          <h1>Login</h1>
          <h5><em>
            Provide your email to login if you have registered already, or use your Google Account to Login without prior registration
          </em></h5>

        </>
      )}
      {loginForm()}



      <Button
        color="danger"
        fullWidth
        onClick={googleLogin}
        size="large"
        startIcon={<GoogleOutlined />}
      >
        Login with Google Account
      </Button>
    </Auth.Layout>
  );
};

export default Login;
