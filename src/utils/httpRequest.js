import axios from "axios";

export const httpRequest = async (method, url, request = {}) => {
	try {
		const baseUrl = "http://localhost:9090";
		if (url.startsWith("/api")) {
			request.headers = {
				...request.headers,
				Authorization: localStorage.getItem("token")
			};
		}
		const reponse = await axios({
			method,
			url: baseUrl + url,
			...request
		});
		return reponse.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const get = (url, request) => {
	return httpRequest("get", url, request);
};

export const deleteHttpCall = (url, request) => {
	return httpRequest("delete", url, request);
};

export const post = (url, request) => {
	return httpRequest("post", url, request);
};

export const put = (url, request) => {
	return httpRequest("put", url, request);
};

export const patch = (url, request) => {
	return httpRequest("patch", url, request);
};
