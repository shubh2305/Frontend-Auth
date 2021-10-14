import React from 'react';
import { useAuth } from '../apiCalls/useAuth';
import { Redirect, Route, useLocation } from 'react-router-dom';
const Privateroute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth()
  console.log(isLoggedIn);
  const location = useLocation()
  if (isLoggedIn) return <Route {...rest} render={props => <Component {...props} />} />;
  return <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
}

export default Privateroute;
