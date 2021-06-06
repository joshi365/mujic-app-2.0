import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import propTypes from "prop-types";

const PrivateRoutes = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      auth === true ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

PrivateRoutes.propTypes = {
  auth: propTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoutes);
