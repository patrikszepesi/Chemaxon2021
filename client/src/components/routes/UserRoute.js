import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector(state => ({ ...state }));
  //if we have it use render props to return the children or whatever was passed into it with the props, this is taken from react router dom site: see below
  return user && user.token ? <Route {...rest} /> : <LoadingToRedirect />; // if user and token return Route and pass in all the props you might have else redirect them from page
}; //in app.js we use UserRoute as a way to see if user has token and is loggged in, if yes then the route with the rest of its props such as exact path and component will be shown

export default UserRoute;
