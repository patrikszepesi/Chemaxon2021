import * as ActionTypes from '../action-types/user';

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case ActionTypes.LOGGED_IN_USER:
      return action.payload;
    case ActionTypes.LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
