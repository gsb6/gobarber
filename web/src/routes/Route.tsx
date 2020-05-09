import React, { ComponentType } from 'react';
import { RouteProps, Redirect, Route as RRDRoute } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

interface Props extends RouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

const Route: React.FC<Props> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <RRDRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
