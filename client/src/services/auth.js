import axios from 'axios';
import * as FireBaseService from '../firebase';
import * as StoreService from './store';

const firebaseAuthConfig = {
  url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
  handleCodeInApp: true
};


const firebaseAuthConfigRegister = {
  url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
  handleCodeInApp: true
};

export const EMAIL_FOR_REGISTRATION = 'emailForRegistration';

export const createOrUpdateUser = async authtoken => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken
      }
    }
  );
};

export const currentUser = async authtoken => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken
      }
    }
  );
};



export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const result = await FireBaseService.auth.signInWithEmailAndPassword(
      email,
      password
    );
    const { user } = result;
    const { token } = await user.getIdTokenResult();

    const userFromDb = await createOrUpdateUser(token);
    return { ...userFromDb.data, token };
  } catch (err) {
    throw Error(err);
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await FireBaseService.auth.signInWithPopup(
      FireBaseService.googleAuthProvider
    );
    const { user } = result;
    const { token } = await user.getIdTokenResult();

    console.log(token)

    const userFromDb = await createOrUpdateUser(token);
    //add token to user
    return { ...userFromDb.data, token };
  } catch (err) {
    throw Error(err);
  }
};

export const sendPasswordResetEmail = email =>
  FireBaseService.auth.sendPasswordResetEmail(email, firebaseAuthConfig);

export const register = email =>
  FireBaseService.auth.sendSignInLinkToEmail(email, firebaseAuthConfigRegister);

export const completeRegistration = async (email, password, location) => {
  try {
    const result = await FireBaseService.auth.signInWithEmailLink(
      email,
      location
    );

    if (result.user.emailVerified) {
      // remove user email fom local storage
      StoreService.remove(EMAIL_FOR_REGISTRATION);

      // get user id token
      let user = FireBaseService.auth.currentUser;
      await user.updatePassword(password);
      const { token } = await user.getIdTokenResult();

      const userFromDb = await createOrUpdateUser(token);
      return { ...userFromDb.data, token };
    }

    throw Error('User email not verified');
  } catch (err) {
    throw Error(err);
  }
};

export const logout = () => {
  FireBaseService.auth.signOut();
};
