import React from "react";
import PropTypes from "prop-types";
import styles from "./Landing.module.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
const Landing = props => {
	if (props.auth && props.auth.isAuthenticated) {
		// return <Redirect to="/ideasV2" />;
		return <Redirect to="/ideas" />;
		// return <Redirect to="/ideas/5ed3ec3d4f32dc742c2c1f08" />
	}

	return (
		<section className={styles.landing}>
			<div className={`${styles.landingContent}`}>
				<h1>Idea Tracker</h1>
				<p>Track your ideas. Create, Update and Delete them.</p>
				<div className={styles.shiftRight}>
					<Link className={`button button-bg-blue`} to="/login">
						Login
					</Link>
					<Link className={`button button-bg-blue`} to="/register">
						Register
					</Link>
				</div>
			</div>
		</section>
	);
};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

Landing.propTypes = {};

export default connect(mapStateToProps)(Landing);
