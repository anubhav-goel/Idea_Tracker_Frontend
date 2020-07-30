import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Modal from "./ui/modal/Modal";

const Alert = props => {
	return (
		<Modal show={props.show} alert>
			<div style={{ padding: "0.15rem" }}>
				{props.alerts &&
					props.alerts.length > 0 &&
					props.alerts.map(alert => {
						return (
							<div
								key={alert.id}
								className={`alert alert-${alert.alertType}`}
							>
								{alert.msg}
							</div>
						);
					})}
			</div>
		</Modal>
	);
};

Alert.propTypes = {};

const mapStateToProps = state => {
	return {
		alerts: state.alert.alerts,
		show: state.alert.show
	};
};

export default connect(mapStateToProps)(Alert);
