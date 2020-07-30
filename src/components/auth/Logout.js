import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../store/actions";
import { Redirect } from "react-router-dom";
const Logout = props => {
	props.logout();

	return <Redirect to="/" />;
};

Logout.propTypes = {};

export default connect(null, {
	logout
})(Logout);
