import React from "react";

const Select = props => {
	let formControl = "form-control";

	if (props.touched && !props.valid) {
		formControl = "form-control control-error";
	}

	return (
		<div className="form-group">
			<select
				className={formControl}
				value={props.value}
				onChange={props.onChange}
				name={props.name}
				disabled={props.disabled || false}
			>
				{props.options.map(option => (
					<option value={option.value} key={option.value}>
						{option.displayValue}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;
