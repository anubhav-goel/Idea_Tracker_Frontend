import { httpRequest } from "../../utils/httpRequest";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	MASTER_DATA_CLEAR,
	IDEA_CLEAR
} from "../actions/types";
import { setAlert } from "./index";
import { loadMasterData } from "./masterData";

export const register = (data, history) => async dispatch => {
	try {
		const response = await httpRequest("post", "/auth/register", { data });
		localStorage.setItem("token", response.token);
		dispatch({
			type: REGISTER_SUCCESS,
			payload: response
		});
		dispatch(loadMasterData());
		history.push("/ideas");
		// history.push("/ideasV2");
	} catch (error) {
		await dispatch({
			type: REGISTER_FAIL
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
		if (localStorage.token) {
			localStorage.removeItem("token");
		}
		history.push("/register");
	}
};

export const login = (data, history) => async dispatch => {
	try {
		const response = await httpRequest("post", "/auth/login", { data });
		localStorage.setItem("token", response.token);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: response
		});
		await dispatch(loadMasterData());
		// history.push("/ideasV2");
		history.push("/ideas");
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL
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
		if (localStorage.token) {
			localStorage.removeItem("token");
		}
		history.push("/login");
	}
};

export const loadUser = () => async dispatch => {
	try {
		const response = await httpRequest("get", "/api/validateToken", {});
		dispatch({
			type: LOAD_USER_SUCCESS,
			payload: response
		});
		await dispatch(loadMasterData());
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAIL
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
		if (localStorage.token) {
			localStorage.removeItem("token");
		}
		// history.push('/');
	}
};

export const logout = () => async dispatch => {
	try {
		if (localStorage.token) {
			localStorage.removeItem("token");
		}
		dispatch({
			type: LOGOUT
		});
		dispatch({
			type: MASTER_DATA_CLEAR
		});
		dispatch({
			type: IDEA_CLEAR
		});
	} catch (error) {
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
		if (localStorage.token) {
			localStorage.removeItem("token");
		}
	}
};
