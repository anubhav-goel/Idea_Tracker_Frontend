import { httpRequest } from "../../utils/httpRequest";
import {
	LOAD_MASTER_DATA_SUCCESS,
	LOAD_MASTER_DATA_FAIL
} from "../actions/types";
import { setAlert } from "./index";

export const loadMasterData = () => async dispatch => {
	try {
		const ideaStatus = await httpRequest("get", "/api/ideaStatus");
		dispatch({
			type: LOAD_MASTER_DATA_SUCCESS,
			payload: { ideaStatus }
		});
	} catch (error) {
		dispatch({
			type: LOAD_MASTER_DATA_FAIL
		});
		const errors =
			error &&
			error.response &&
			error.response.data &&
			error.response.data.errors;
		if (errors) {
			errors.forEach(err => {
				console.log(err.msg);
				dispatch(setAlert(err.msg, "FAILED"));
			});
		}
	}
};
