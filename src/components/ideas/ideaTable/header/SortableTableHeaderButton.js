import React from "react";
import PropTypes from "prop-types";

const SortableTableHeaderButton = props => {
	return (
		<th key={props.headerName}>
			<button
				type="button"
				onClick={props.handleClick}
				className={props.sortClassName}
			>
				{props.headerName}
			</button>
		</th>
	);
};

SortableTableHeaderButton.propTypes = {};

export default SortableTableHeaderButton;
