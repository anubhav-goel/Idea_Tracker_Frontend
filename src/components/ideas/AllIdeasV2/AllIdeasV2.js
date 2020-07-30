import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIdeas } from "../../../store/actions";
import { columns } from "../../../utils/react-table-meta-data/AllIdeasColumns";
import ReactTable from "./ReactTable";
import * as styles from "./AllIdeasV2.module.css";

const AllIdeasV2 = () => {
	const ideas = useSelector(state => state.idea.ideas);
	/* 
	const { ideas } = useSelector(state => state.idea);
	const ideas = useSelector(state => {
		return {
			ideas: state.idea.ideas
		};
	}); 
	*/

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getIdeas());
	}, []);
	return (
		<div className={`${styles.scrollY}`}>
			<section className={`mCustom1`}>
				<ReactTable
					columns={columns || []}
					data={(ideas && ideas.data) || []}
				/>
			</section>
		</div>
	);
};

export default AllIdeasV2;
