import React, { Component, Fragment } from "react";
import * as styles from "./Modal.module.css";
import BackDrop from "../backdrop/Backdrop";

class Modal extends Component {
	/* shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    } */

	componentWillUpdate() {}

	render() {
		return (
			<Fragment>
				<BackDrop
					show={this.props.show}
					clicked={this.props.modalClosed}
				/>

				<div
					className={styles.Modal}
					style={{
						// transform: this.props.show ? 'translateY(0)' : 'translateY(-100vH)',
						// opacity: this.props.show ? '1' : '0'
						display: this.props.show ? "block" : "none",
						top: this.props.alert ? "13%" : "30%"
					}}
				>
					{this.props.children}
				</div>
			</Fragment>
		);
	}
}

export default Modal;
