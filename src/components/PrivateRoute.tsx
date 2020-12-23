import React, { ReactChild } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector, shallowEqual, RootStateOrAny } from 'react-redux';
import { HOME } from '../constants/routes';
import Loader from './Loader/Loader';

interface PrivateRouteProps {
  children: ReactChild;
  exact?: boolean;
  path?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  ...rest
}) => {
  const {
    auth: { isAuthenticated, loading, user },
  } = useSelector((state: RootStateOrAny) => {
    return {
      auth: state.auth,
    };
  }, shallowEqual);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to={HOME} />
        ) : (
          <>{user === null ? <Loader /> : children}</>
        )
      }
    />
  );
};

export default PrivateRoute;
