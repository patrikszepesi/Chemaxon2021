import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { auth } from './firebase';
import { useDispatch } from 'react-redux';
import { currentUser } from './services/auth';

import { Loader } from './components/common';
import { Links } from './utils';
import theme from './theme';

// using lazy
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const Home = lazy(() => import('./pages/Home'));
const Header = lazy(() => import('./components/nav/Header'));
const Footer = lazy(() => import('./components/footer/Footer'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const UserRoute = lazy(() => import('./components/routes/UserRoute'));
const DocumentCreate = lazy(() => import('./pages/documents/document/DocumentCreate'));
const ListMyDocuments = lazy(() => import('./pages/documents/document/AllDocuments'));



const App = () => {
  const dispatch = useDispatch();

  // to check firebase auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        //get user even after page is refreshed, because each time the component re renders this runs and we get the currentUser
        currentUser(idTokenResult.token)
          .then(res => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                _id: res.data._id
              }
            });
          })
          .catch(err => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          <Loader />
        </div>
      }
      >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Toaster />
        <Switch>
          <Route exact path={Links.Public.home} component={Home} />
          <Route exact path={Links.Auth.login} component={Login} />
          <Route exact path={Links.Auth.register} component={Register} />
          <Route exact path={Links.Auth.registerComplete} component={RegisterComplete} />
          <Route exact path={Links.Auth.forgottenPassword} component={ForgotPassword} />
          <UserRoute exact path={Links.Private.myDocs} component={ListMyDocuments} />
          <UserRoute exact path={Links.Private.upload} component={DocumentCreate} />
        </Switch>
        <Footer />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
