import firebase from 'firebase';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: 'AIzaSyDmX0gLpg6MGbynPn6cdN_irUmvykcsw0E',
  authDomain: 'housingappproject.firebaseapp.com',
  projectId: 'housingappproject',
  storageBucket: 'housingappproject.appspot.com',
  messagingSenderId: '20210916403',
  appId: '1:20210916403:web:48ed0fd2d99c6269cd9746',
  measurementId: 'G-H6WWYEH6M8'
};
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(config);
  firebase.analytics();
}


export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
