import React from 'react';
import { Route as RouteView, Redirect } from 'react-router-dom';
import UserContext from '../../contexts/User';

export default ({
  component: Component, unauthorized, authorized, ...rest
}) => {
  const { user } = UserContext();

  return (
    <RouteView
      {...rest}
      render={(props) => {
        if (unauthorized && user) {
          return <Redirect to="/" />;
        }

        if (authorized && !user) {
          return <Redirect to="/zaloguj" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};
