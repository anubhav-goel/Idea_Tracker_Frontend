import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT,
	LOGIN_SUCCESS,
	LOGIN_FAIL
} from "../actions/types";
const initialState = {
	isAuthenticated: false,
	token: null,
	user: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_USER_SUCCESS:
			return {
				...state,
				token: localStorage.getItem("token"),
				user: action.payload,
				isAuthenticated: true
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
				token: action.payload.token
			};
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case LOAD_USER_FAIL:
		case LOGOUT:
			return {
				...state,
				...initialState
				/* 		user: null,
						token: null,
						isAuthenticated: false */
			};
		default:
			return state;
	}
};

export default reducer;
