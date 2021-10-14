import React from 'react';
import { Redirect, useLocation, Route } from 'react-router-dom';
import { useAuth } from '../apiCalls/useAuth';
const Publicroute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth()
  const location = useLocation()
  if (isLoggedIn) return <Redirect to={{ pathname: !!location.state && !!location.state.from ? location.state.from : '/feed', }} />
  return <Route {...rest} render={props => <Component {...props} />} />
}

export default Publicroute;
