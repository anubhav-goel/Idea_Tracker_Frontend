import moment from "moment";
import React from "react";

export const columns = [
	{
		Header: "Date",
		accessor: "date",
		Cell: ({ cell }) => {
			const { value } = cell;
			return <div>{moment(value).format("YYYY-MM-DD hh:mm:ss a")}</div>;
		},
		disableFilters: true
	},
	{
		Header: "UserName",
		accessor: "user.name"
	},
	{
		Header: "Email Id",
		accessor: "user.email"
	},
	{
		Header: "Idea Title",
		accessor: "name"
	},
	/* 	{
		Header: "Idea Description",
		accessor: "description"
	}, */
	{
		Header: "Status",
		accessor: "ideaStatus.status"
	}
];
