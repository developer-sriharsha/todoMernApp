import React from "react";
import { Route, Redirect } from "react-router";
import { checkSession, getCacheObject } from "../tools/helpers";
import config from "../tools/config";

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
  // check for user authentication status
  var isAuthenticated = checkSession();
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  let user = getCacheObject(config.SESSION_KEY_NAME);
  
  if (path == "/dashboard") {
    if (user && user.userRole[0].userRoleType == 1) {
      return <Redirect to="/admin-dashboard" />;
    }
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
