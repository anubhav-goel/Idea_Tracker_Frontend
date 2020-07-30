import { v4 } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";
export const setAlert = (msg, alertType) => async dispatch => {
	let id = v4();
	await dispatch({
		type: SET_ALERT,
		payload: { msg, alertType, id }
	});

	setTimeout(() => {
		dispatch({
			type: REMOVE_ALERT,
			payload: { id }
		});
	}, 3000);
};
