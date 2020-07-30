import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const PrivateRoute = ({ auth, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props =>
				auth && !auth.isAuthenticated ? (
					<Redirect to="/" />
				) : (
					<Component {...props} />
				)
			}
		/>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(PrivateRoute);
