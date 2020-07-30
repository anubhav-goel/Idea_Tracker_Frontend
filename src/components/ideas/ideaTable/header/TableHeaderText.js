import React from "react";
import PropTypes from "prop-types";

const TableHeaderText = props => {
	return <th key={props.headerName}>{props.headerName}</th>;
};

TableHeaderText.propTypes = {};

export default TableHeaderText;
