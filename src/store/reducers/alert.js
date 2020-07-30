import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

// const initialState = [];
const initialState = {
	alerts: [],
	show: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_ALERT:
			return {
				...state,
				show: true,
				alerts: state.alerts.concat(action.payload)
			};
		// return [...state, action.payload];
		case REMOVE_ALERT:
			return {
				show: false,
				alerts: state.alerts.filter(
					alert => alert.id !== action.payload.id
				)
			};
		// return state.filter(alert => alert.id !== action.payload.id);
		default:
			return state;
	}
};

export default reducer;
