import * as ActionTypes from '../action-types/user';


//removed image
export const userLoggedIn = ({ name, email, token, _id }) => ({
  type: ActionTypes.LOGGED_IN_USER,
  payload: {
    name,
    email,
    token,
    _id,
  }
});

export const logout = () => ({
  type: ActionTypes.LOGOUT,
  payload: null
});
