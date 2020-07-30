import {
	LOAD_MASTER_DATA_SUCCESS,
	LOAD_MASTER_DATA_FAIL,
	MASTER_DATA_CLEAR
} from "../actions/types";

const initialState = {
	ideaStatus: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_MASTER_DATA_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case LOAD_MASTER_DATA_FAIL:
			return {
				...state,
				...initialState
			};

		case MASTER_DATA_CLEAR:
			return {
				...state,
				...initialState
			};
		default:
			return state;
	}
};

export default reducer;
