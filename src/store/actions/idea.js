import { httpRequest } from "../../utils/httpRequest";
import {
	GET_IDEA,
	GET_IDEAS,
	CREATE_IDEA,
	UPDATE_IDEA,
	DELETE_IDEA,
	IDEA_ERROR,
	LOAD_TRUE,
	GET_USER,
	UPDATE_LIKES
} from "../actions/types";
import { setAlert } from "./index";

export const getIdeas = (
	limit,
	page,
	sortConfig,
	filterIdeaName
) => async dispatch => {
	try {
		const params = {
			limit,
			page
		};
		if (
			sortConfig &&
			sortConfig.key &&
			(sortConfig.direction === 1 || sortConfig.direction === -1)
		) {
			params[sortConfig.key] = sortConfig.direction;
		}
		if (filterIdeaName) {
			params.filterIdeaName = filterIdeaName;
		}
		const ideas = await httpRequest("get", "/api/idea", { params });
		dispatch({
			type: GET_IDEAS,
			payload: ideas
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: IDEA_ERROR
		});
	}
};

export const getIdea = id => async dispatch => {
	try {
		const ideas = await httpRequest("get", `/api/idea/${id}`);
		dispatch({
			type: GET_IDEA,
			payload: ideas
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: IDEA_ERROR
		});
	}
};

export const ideaCreate = (formData, history) => async dispatch => {
	try {
		const data = {
			name: formData.title,
			description: formData.description
		};
		await httpRequest("post", "/api/idea", { data });
		dispatch({
			type: CREATE_IDEA
		});
		dispatch(setAlert("Idea created succesfully", "SUCCESS"));
		history.push("/ideas");
	} catch (error) {
		console.log(error);
		dispatch({
			type: IDEA_ERROR
		});
	}
};

export const updateIdea = (formData, id) => async dispatch => {
	try {
		const data = {
			name: formData.title,
			description: formData.description,
			ideaStatus: formData.ideaStatus
		};
		await httpRequest("put", `/api/idea/${id}`, { data });
		dispatch({
			type: UPDATE_IDEA
		});
		dispatch(setAlert("Idea modified succesfully", "SUCCESS"));
	} catch (error) {
		console.log(error);
		dispatch({
			type: IDEA_ERROR
		});
	}
};

export const deleteIdea = id => async dispatch => {
	try {
		await httpRequest("delete", `/api/idea/${id}`);
		dispatch({
			type: DELETE_IDEA
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: IDEA_ERROR
		});
	}
};

export const getUser = id => async dispatch => {
	try {
		const user = await httpRequest("get", `/api/user/${id}`);
		dispatch({
			type: GET_USER,
			payload: user
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: IDEA_ERROR
		});
	}
};

export const likeIdea = id => async dispatch => {
	try {
		const likes = await httpRequest("put", `/api/idea/${id}/like`);
		dispatch({
			type: UPDATE_LIKES,
			payload: {
				id,
				likes
			}
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: IDEA_ERROR
		});
	}
};

export const unlikeIdea = id => async dispatch => {
	try {
		const likes = await httpRequest("put", `/api/idea/${id}/unlike`);
		dispatch({
			type: UPDATE_LIKES,
			payload: {
				id,
				likes
			}
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: IDEA_ERROR
		});
	}
};
