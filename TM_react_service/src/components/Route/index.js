import React from 'react';
import { Redirect } from '@reach/router';
import { useUser } from '../../contexts/User';

const Route = ({
  component: Component, unauthorized, authorized, ...rest
}) => {
  const { user } = useUser();

  if (unauthorized && user) {
    return <Redirect to="/" noThrow />;
  }

  if (authorized && !user) {
    return <Redirect to="/zaloguj" noThrow />;
  }

  return <Component {...rest} />;
};

export default Route;
