import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// By default, let's redirect to the login page
const defaultRedirectPath = "/login";
const PrivateRoute = ({ children, ...rest }) => {
  // Get login state from Auth0
  const { isAuthenticated, user } = useAuth0();
  // isUser indicates whether or not we are logged in
  const isUser = isAuthenticated && user;

  return (
    <Route
      {...rest}
      render={() => {
        // If we are logged in, continue on to the child route
        // if we are NOT logged int, redirect to the defaultRedirectPath
        return isUser ? children : <Redirect to={defaultRedirectPath} />;
      }}
    ></Route>
  );
};
export default PrivateRoute;
