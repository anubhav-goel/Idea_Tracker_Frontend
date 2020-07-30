import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";

const authLinks = () => {
	return (
		<ul className={styles.navbarRight}>
			<li className={styles.navItem}>
				<Link to="/ideas">Ideas</Link>
			</li>
			<li className={styles.navItem}>
				<Link to="/ideasV2">Ideas V2</Link>
			</li>
			<li className={styles.navItem}>
				<Link to="/create">New Idea</Link>
			</li>
			<li className={styles.navItem}>
				<Link to="/logout">Logout</Link>
			</li>
		</ul>
	);
};

const guestLinks = (
	<ul className={styles.navbarRight}>
		<li className={styles.navItem}>
			<Link to="/login">Login</Link>
		</li>
		<li className={styles.navItem}>
			<Link to="/register">Register</Link>
		</li>
	</ul>
);

const Navbar = props => {
	return (
		<nav className={`${styles.navbar}`}>
			<div className={styles.navbarLeft}>
				<h1>
					<Link to="/ideas">IdeaTracker</Link>
				</h1>
				<FontAwesomeIcon icon={faLightbulb} size="2x" />
			</div>
			{props.auth && props.auth.isAuthenticated
				? authLinks()
				: guestLinks}
		</nav>
	);
};

Navbar.propTypes = {};

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps)(Navbar);
