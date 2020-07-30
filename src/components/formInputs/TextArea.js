import React from "react";

const TextArea = props => {
	let formControl = "form-control";

	if (props.touched && !props.valid) {
		formControl = "form-control control-error";
	}

	return (
		<div className="form-group">
			<textarea
				rows={10}
				{...props}
				className={formControl}
				disabled={props.disabled || false}
			/>
		</div>
	);
};

export default TextArea;
