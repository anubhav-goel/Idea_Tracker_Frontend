import {
	faThumbsUp as faThumbsUpRegular,
	faTrashAlt
} from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
	deleteIdea,
	getIdeas,
	getUser,
	likeIdea,
	unlikeIdea
} from "../../store/actions";
import ButtonIcon from "../formInputs/ButtonIcon";
import TextInput from "../formInputs/TextInput";
import Modal from "../ui/modal/Modal";
import * as styles from "./AllIdeas.module.css";
import TableBodyButtonText from "./ideaTable/body/TableBodyButtonText";
import TableBodyText from "./ideaTable/body/TableBodyText";
import SortableTableHeaderButton from "./ideaTable/header/SortableTableHeaderButton";
import TableHeaderText from "./ideaTable/header/TableHeaderText";

export class AllIdeas extends Component {
	static propTypes = {};

	state = {
		loading: true,
		loadingModal: true,
		ideas: [],
		showModal: false,
		modalContent: () => {},
		deleteIdeaId: null,
		paginationInfo: {
			limit: 5,
			page: 1,
			totalPages: null
		},
		sortConfig: {
			key: null,
			direction: null
		},
		ideaSearch: ""
	};
	async componentDidMount() {
		await this.getIdeasWithPagination();
		this.setIdeasAndPaginationInfo();
	}

	getIdeasWithPagination = async (limit, page) => {
		limit = limit || this.state.paginationInfo.limit;
		page = page || this.state.paginationInfo.page;
		await this.props.getIdeas(
			limit,
			page,
			this.state.sortConfig,
			this.state.ideaSearch
		);
	};

	setIdeasAndPaginationInfo = () => {
		this.setState(prevState => {
			return {
				ideas: this.props.ideas,
				paginationInfo: {
					...prevState.paginationInfo,
					...this.props.paginationInfo
				},
				loading: false
			};
		});
	};

	getSortClassName = key => {
		let classes = [styles.sortableButton];
		if (this.state.sortConfig.key === key) {
			this.state.sortConfig.direction === 1
				? classes.push(styles.ascending)
				: classes.push(styles.descending);
		} else {
			classes.push(styles.upDownSort);
		}
		return classes.join(" ");
	};

	renderHeader = () => {
		return (
			<Fragment>
				<TableHeaderText headerName="Id" />
				<TableHeaderText headerName="User" />
				<SortableTableHeaderButton
					headerName="Idea Title"
					handleClick={() => this.sortTable("nameSort")}
					sortClassName={this.getSortClassName("nameSort")}
				/>
				<TableHeaderText headerName="Status" />
				<SortableTableHeaderButton
					headerName="Date"
					handleClick={() => this.sortTable("dateSort")}
					sortClassName={this.getSortClassName("dateSort")}
				/>
				<TableHeaderText headerName="Operation" />
			</Fragment>
		);
	};

	renderBody = () => {
		return (
			this.state.ideas &&
			this.state.ideas.map((idea, index) => (
				<tr key={idea._id}>
					<TableBodyText
						text={
							(this.state.paginationInfo.page - 1) *
								this.state.paginationInfo.limit +
							index +
							1
						}
						cellWidth="5%"
					/>
					<TableBodyButtonText
						text={idea.user.name}
						cellWidth="15%"
						handleClick={() =>
							this.setViewUserInfoModal(idea.user._id)
						}
					/>
					<TableBodyButtonText
						text={idea.name}
						cellWidth="40%"
						handleClick={() => this.handleViewIdea(idea._id)}
					/>
					<TableBodyText
						text={idea.ideaStatus.status}
						cellWidth="10%"
					/>
					<TableBodyText
						text={moment(idea.date).format("YYYY-MM-DD hh:mm:ss a")}
						cellWidth="15%"
					/>
					{idea.user._id === this.props.loggedInUser ? (
						<td className={`${styles.tableDataOperation}`}>
							<div className={`${styles.operationsContainer}`}>
								{this.renderDeleteButton(idea)}
								{this.renderLikeButton(idea)}
							</div>
						</td>
					) : (
						<td className={`${styles.tableDataOperation}`}>
							{this.renderLikeButton(idea)}
						</td>
					)}
				</tr>
			))
		);
	};

	closeModal = () => {
		this.setState({
			showModal: false,
			modalContent: () => {},
			deleteIdeaId: null
		});
	};

	handleViewIdea = id => {
		this.props.history.push(`/ideas/${id}`);
	};

	setViewUserInfoModal = async id => {
		this.setState({
			loadingModal: true,
			modalContent: this.renderViewUserInfoModal,
			showModal: true
		});
		await this.props.getUser(id);
		this.setState({
			loadingModal: false
		});
	};

	renderViewUserInfoModal = () =>
		this.state.loadingModal ? (
			<div>Loading...</div>
		) : (
			<div className={`${styles.userInfoModal}`}>
				<div className={`${styles.userInfo} ${styles.displayInline}`}>
					<h2>Name : </h2>
					<h2 className={`${styles.fontStyleItaliac}`}>
						{this.props.user.name}
					</h2>
					<br />
					<h2>Email : </h2>
					<h2 className={`${styles.fontStyleItaliac}`}>
						{this.props.user.email}
					</h2>
				</div>
				<button
					className={`button button-bg-blue`}
					onClick={this.closeModal}
				>
					Close
				</button>
			</div>
		);

	setDeleteIdeaModal = id => {
		this.setState({
			showModal: true,
			modalContent: this.renderDeleteIdeaModal,
			deleteIdeaId: id
		});
	};

	renderDeleteIdeaModal = () => (
		<div className={`${styles.deleteIdeaModal}`}>
			<h3>Are you sure you want to delete this Idea?</h3>
			<button
				className={`button button-bg-blue`}
				onClick={this.deleteIdea}
			>
				Yes
			</button>
			<button
				className={`button button-bg-red`}
				onClick={this.closeModal}
			>
				No
			</button>
		</div>
	);

	deleteIdea = async () => {
		this.setState({ loading: true });
		await this.props.deleteIdea(this.state.deleteIdeaId);
		await this.getIdeasWithPagination();
		this.setState(prevState => {
			return {
				loading: false,
				deleteIdeaId: null,
				showModal: false,
				modalContent: () => {},
				ideas: this.props.ideas,
				paginationInfo: {
					...prevState.paginationInfo,
					...this.props.paginationInfo
				},
				sortConfig: {
					key: null,
					direction: null
				}
			};
		});
		// this.props.history.push('/ideas');
	};

	onClickPageHandler = async page => {
		await this.getIdeasWithPagination(
			this.state.paginationInfo.limit,
			page
		);
		this.setIdeasAndPaginationInfo();
	};

	renderPages = () => {
		const pages = [];
		pages.push(
			<button
				className={`${styles.pages}`}
				key="first"
				onClick={() => this.onClickPageHandler(1)}
			>
				&laquo;
			</button>
		);
		for (
			let page = 1;
			page <= this.state.paginationInfo.totalPages;
			page++
		) {
			let classes = [`${styles.pages}`];
			if (this.state.paginationInfo.page === page) {
				classes.push(styles.active);
			}
			if (
				page === 1 ||
				page === this.state.paginationInfo.totalPages ||
				(page >= this.state.paginationInfo.page - 2 &&
					page <= this.state.paginationInfo.page + 2)
			) {
				pages.push(
					<button
						className={classes.join(" ")}
						key={page}
						onClick={() => this.onClickPageHandler(page)}
					>
						{page}
					</button>
				);
			}
		}
		pages.push(
			<button
				className={`${styles.pages}`}
				key="last"
				onClick={() =>
					this.onClickPageHandler(
						this.state.paginationInfo.totalPages
					)
				}
			>
				&raquo;
			</button>
		);

		return pages;
	};

	sortTable = key => {
		let currentSortKey = this.state.sortConfig.key;
		let currentSortDirection = this.state.sortConfig.direction;
		let modifiedSortConfig = {};
		if (currentSortKey === key) {
			modifiedSortConfig.key = key;
			modifiedSortConfig.direction = currentSortDirection * -1;
		} else {
			modifiedSortConfig.key = key;
			modifiedSortConfig.direction = 1;
		}

		this.setState(
			{
				sortConfig: modifiedSortConfig,
				loading: true
			},
			async () => {
				await this.getIdeasWithPagination();
				this.setState({
					loading: false,
					ideas: this.props.ideas
				});
			}
		);
	};

	ideaSearchChangeHandler = e => {
		this.setState({
			ideaSearch: e.target.value
		});
	};

	cursorDisabled = () =>
		this.state.ideaSearch ? "cursorPointer" : "cursorDisabled";

	searchIdeaClickHandler = () => {
		this.setState(
			prevState => {
				return {
					paginationInfo: {
						...prevState.paginationInfo,
						page: 1
					},
					loading: true
				};
			},
			async () => {
				await this.getIdeasWithPagination();
				this.setIdeasAndPaginationInfo();
			}
		);
	};

	searchIdeaEnterHandler = event => {
		// if (event.key === "Enter") {
		if (event.charCode === 13) {
			this.setState(
				prevState => {
					return {
						paginationInfo: {
							...prevState.paginationInfo,
							page: 1
						},
						loading: true
					};
				},
				async () => {
					await this.getIdeasWithPagination();
					this.setIdeasAndPaginationInfo();
				}
			);
		}
	};

	clear = () => {
		this.setState(
			prevState => {
				return {
					ideaSearch: "",
					sortConfig: {
						key: null,
						direction: null,
						loading: true
					},
					paginationInfo: {
						...prevState.paginationInfo,
						page: 1
					},
					loading: true
				};
			},
			async () => {
				await this.getIdeasWithPagination();
				this.setIdeasAndPaginationInfo();
			}
		);
	};

	renderSearchForm = () => (
		<div className={styles.searchForm}>
			<TextInput
				name="ideaSearch"
				value={this.state.ideaSearch}
				placeholder="Search Idea"
				onChange={this.ideaSearchChangeHandler}
				onKeyPress={this.searchIdeaEnterHandler}
			/>
			<button
				className={`button button-bg-blue cursorPointer`}
				onClick={this.searchIdeaClickHandler}
			>
				Search
			</button>
			<button
				className={`button button-bg-red cursorPointer`}
				onClick={this.clear}
			>
				Clear
			</button>
		</div>
	);

	renderLikeButton = idea => {
		const ideaLiked = idea.likes.find(
			like =>
				like && like.user && like.user._id === this.props.loggedInUser
		);
		return (
			<ButtonIcon
				cellWidth="15%"
				color="rgba(30, 50, 139)"
				icon={ideaLiked ? faThumbsUpSolid : faThumbsUpRegular}
				handleClick={() => this.likeUnlikeIdea(idea._id, ideaLiked)}
			/>
		);
	};

	renderDeleteButton = idea => {
		return (
			<ButtonIcon
				cellWidth="15%"
				icon={faTrashAlt}
				color="red"
				handleClick={() => this.setDeleteIdeaModal(idea._id)}
			/>
		);
	};

	likeUnlikeIdea = async (id, ideaLiked) => {
		ideaLiked
			? await this.props.unlikeIdea(id)
			: await this.props.likeIdea(id);
		this.setState({
			ideas: this.props.ideas
		});
	};

	render() {
		return this.state.loading ? (
			<div className="loader" />
		) : (
			<Fragment>
				<Modal
					show={this.state.showModal}
					modalClosed={this.closeModal}
				>
					{this.state.modalContent()}
				</Modal>
				<div className={`${styles.allIdeasPage}`}>
					<div className={`${styles.allIdeas}`}>
						{this.renderSearchForm()}
						<table className={`${styles.ideas}`}>
							<thead>
								<tr>{this.renderHeader()}</tr>
							</thead>
							<tbody>{this.renderBody()}</tbody>
						</table>
					</div>
					<div className={`${styles.pagination}`}>
						{this.renderPages()}
					</div>
				</div>
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		ideas: state.idea.ideas.data,
		user: state.idea.selectedUser,
		loggedInUser: state.auth.user.id || state.auth.user._id,
		paginationInfo: {
			page: state.idea.ideas.page,
			totalPages: state.idea.ideas.totalPages
		}
	};
};
export default connect(mapStateToProps, {
	getIdeas,
	getUser,
	deleteIdea,
	likeIdea,
	unlikeIdea
})(AllIdeas);
