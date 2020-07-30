import {
	GET_IDEAS,
	GET_IDEA,
	CREATE_IDEA,
	UPDATE_IDEA,
	DELETE_IDEA,
	IDEA_ERROR,
	LOAD_TRUE,
	GET_USER,
	IDEA_CLEAR,
	UPDATE_LIKES
} from "../actions/types";

const initialState = {
	ideas: {},
	selectedIdea: {},
	loading: true,
	selectedUser: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_IDEAS:
			return {
				...state,
				ideas: action.payload,
				loading: false
			};

		case GET_IDEA:
			return {
				...state,
				selectedIdea: action.payload,
				loading: false
			};

		case CREATE_IDEA:
			return {
				...state,
				loading: false
			};
		case UPDATE_IDEA:
			return {
				...state,
				loading: false
			};

		case IDEA_ERROR:
			return {
				...state,
				loading: false
			};

		case DELETE_IDEA:
			return {
				...state,
				loading: false
			};

		case LOAD_TRUE:
			return {
				...state,
				loading: true
			};

		case GET_USER:
			return {
				...state,
				selectedUser: action.payload,
				loading: false
			};
		case IDEA_CLEAR:
			return {
				...state,
				...initialState
			};

		case UPDATE_LIKES:
			return {
				...state,
				loading: false,
				ideas: {
					...state.ideas,
					data: state.ideas.data.map(idea => {
						return idea._id !== action.payload.id
							? idea
							: { ...idea, likes: action.payload.likes };
					})
				},
				selectedIdea: Object.keys(state.selectedIdea).length
					? {
							...state.selectedIdea,
							likes: action.payload.likes
					  }
					: {}
			};
		default:
			return state;
	}
};

export default reducer;
