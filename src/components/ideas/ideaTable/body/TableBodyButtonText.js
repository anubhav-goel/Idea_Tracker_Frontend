import React from "react";
import PropTypes from "prop-types";
import * as styles from "./TableBodyButtonText.module.css";

const TableBodyButtonText = props => {
	return (
		<td style={{ width: props.cellWidth }}>
			<button className="button-text" onClick={props.handleClick}>
				{props.text}
			</button>
		</td>
	);
};

TableBodyButtonText.propTypes = {};

export default TableBodyButtonText;
