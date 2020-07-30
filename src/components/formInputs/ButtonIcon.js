import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ButtonIcon = props => {
	return (
		<button
			onClick={props.handleClick}
			style={{
				border: "none",
				background: "#fff",
				cursor: "pointer",
				outline: "none"
			}}
		>
			<FontAwesomeIcon
				icon={props.icon}
				style={{ color: props.color }}
				size="2x"
			/>
		</button>
	);
};

export default ButtonIcon;
