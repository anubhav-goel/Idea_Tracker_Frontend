import React, { Component } from "react";
import { connect } from "react-redux";
import {
	updateIdea,
	getIdea,
	likeIdea,
	unlikeIdea,
	deleteIdea
} from "../../store/actions/index";
import validateForm from "../../utils/validateForm";
import TextInput from "../formInputs/TextInput";
import TextArea from "../formInputs/TextArea";
import Select from "../formInputs/Select";
import * as styles from "./ModifyIdea.module.css";
import ButtonIcon from "../formInputs/ButtonIcon";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import TableBodyButtonIcon from "./ideaTable/body/TableBodyButtonIcon";
import Modal from "../ui/modal/Modal";

class ModifyIdea extends Component {
	static propTypes = {};

	state = {
		loading: true,
		formIsValid: true,
		disableInput: true,
		editing: false,
		editable: false,
		formControls: {
			title: {
				value: "",
				placeholder: "Title",
				valid: true,
				validationRules: {
					isRequired: true
				},
				touched: true
			},
			description: {
				value: "",
				placeholder: "Idea's Description...",
				valid: true,
				validationRules: {
					isRequired: true
				},
				touched: true
			},
			ideaStatus: {
				value: "",
				placeholder: "Idea Status",
				valid: true,
				touched: true,
				validationRules: {
					isRequired: true
				}
			}
		},
		likes: [],
		modal: {
			show: false,
			content: "none"
		}
	};

	async componentDidMount() {
		await this.props.getIdea(this.props.match.params.id);
		let updatedFormControls = { ...this.state.formControls };
		updatedFormControls.title.value = this.props.selectedIdea.name;
		updatedFormControls.description.value = this.props.selectedIdea.description;
		updatedFormControls.ideaStatus.value = this.props.selectedIdea.ideaStatus.status;
		const editable = this.editable();
		this.setState({
			loading: false,
			formControls: updatedFormControls,
			editable,
			likes: this.props.selectedIdea.likes
		});
	}

	changeHandler = event => {
		const name = event.target.name;
		const value = event.target.value;

		const updatedControls = { ...this.state.formControls };
		const updatedFormElement = { ...updatedControls[name] };
		updatedFormElement.touched = true;
		updatedFormElement.value = value;
		updatedFormElement.valid = validateForm(
			value,
			updatedFormElement.validationRules
		);

		updatedControls[name] = updatedFormElement;
		let formIsValid = true;
		for (let inputIdentifier in updatedControls) {
			formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
		}
		this.setState({
			formControls: updatedControls,
			formIsValid: formIsValid
		});
	};

	formSubmitHandler = async event => {
		event.preventDefault();

		if (this.state.editable && !this.state.editing) {
			this.setState({
				disableInput: false,
				editing: true
			});
		} else {
			const formData = {};
			for (let formElementId in this.state.formControls) {
				formData[formElementId] = this.state.formControls[
					formElementId
				].value;
			}
			formData.ideaStatus = this.props.ideaStatus.find(
				el => el.status === formData.ideaStatus
			)._id;
			this.setState({ loading: true });
			await this.props.updateIdea(formData, this.props.selectedIdea._id);
			this.setState({
				loading: false,
				editing: false,
				disableInput: true
			});
		}
	};

	displayButtonOrNot = () =>
		this.props.selectedIdea.user._id === this.props.userId
			? ""
			: styles.displayNone;

	editable = () => this.props.selectedIdea.user._id === this.props.userId;

	getButtonText = () => (this.state.editing ? "Save" : "Edit Idea");

	cursorDisabled = () =>
		this.state.formIsValid ? "cursorPointer" : "cursorDisabled";

	renderLikeButton = idea => {
		const ideaLiked = idea.likes.find(
			like => like && like.user && like.user._id === this.props.userId
		);
		return (
			<ButtonIcon
				color="rgba(30, 50, 139)"
				icon={ideaLiked ? faThumbsUpSolid : faThumbsUpRegular}
				handleClick={() => this.likeUnlikeIdea(idea._id, ideaLiked)}
			/>
		);
	};

	renderNoOfLikesButton = noOfLikes => {
		return (
			<button
				className={`${styles.likeCount}`}
				onClick={() => this.showModal("likes")}
			>
				({noOfLikes} {noOfLikes > 1 ? "likes" : "like"})
			</button>
		);
	};

	likeUnlikeIdea = async (id, ideaLiked) => {
		ideaLiked
			? await this.props.unlikeIdea(id)
			: await this.props.likeIdea(id);
		this.setState({
			likes: this.props.selectedIdea.likes
		});
	};

	closeModal = () => {
		this.setState({
			modal: {
				show: false,
				content: "none"
			}
		});
	};

	renderModal = content => {
		switch (content) {
			case "none":
				return () => {};

			case "likes":
				return this.renderLikesModal();

			case "deleteIdea":
				return this.renderDeleteIdeaModal();

			default:
				return () => {};
		}
	};

	showModal = content => {
		this.setState({
			modal: {
				show: true,
				content
			}
		});
	};

	renderLikesModal = () => (
		<div className={`${styles.likesModal}`}>
			<h3>Total Likes: {this.state.likes.length}</h3>
			<ul className={`${styles.likesModalList}`}>
				{this.state.likes.map(like => {
					return (
						<li key={like._id}>
							<h4 className={`${styles.likedBy}`}>
								{like.user.name}
							</h4>
						</li>
					);
				})}
			</ul>
			<button
				className={`button button-bg-blue ${styles.likesModalClose}`}
				onClick={this.closeModal}
			>
				Close
			</button>
		</div>
	);

	deleteIdea = async () => {
		this.setState({ loading: true });
		await this.props.deleteIdea(this.props.selectedIdea._id);
		this.setState({
			modal: {
				show: false,
				content: "none",
				loading: false
			}
		});
		this.props.history.push("/ideas");
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

	render() {
		const noOfLikes =
			this.props.selectedIdea &&
			this.props.selectedIdea.likes &&
			this.props.selectedIdea.likes.length;
		return this.state.loading ? (
			<div className="loader" />
		) : (
			<section className={`mCustom1`}>
				<Modal
					show={this.state.modal.show}
					modalClosed={this.closeModal}
				>
					{this.renderModal(this.state.modal.content)}
				</Modal>
				<div className={`${styles.page}`}>
					<div className={`${styles.pageHeader}`}>
						<h1>Idea Information</h1>
						<div className={`${styles.likeUnlike}`}>
							{this.renderLikeButton(this.props.selectedIdea)}
							{noOfLikes
								? this.renderNoOfLikesButton(noOfLikes)
								: null}
						</div>
					</div>
					<form /* onSubmit={this.formSubmitHandler} */>
						<TextInput
							name="title"
							value={this.state.formControls.title.value}
							placeholder={
								this.state.formControls.title.placeholder
							}
							valid={this.state.formControls.title.valid}
							touched={this.state.formControls.title.touched}
							onChange={this.changeHandler}
							disabled={this.state.disableInput}
						/>
						<div className={`${styles.descriptionTextArea}`}>
							<TextArea
								name="description"
								value={
									this.state.formControls.description.value
								}
								placeholder={
									this.state.formControls.description
										.placeholder
								}
								valid={
									this.state.formControls.description.valid
								}
								touched={
									this.state.formControls.description.touched
								}
								onChange={this.changeHandler}
								disabled={this.state.disableInput}
							/>
						</div>
						<Select
							name="ideaStatus"
							value={this.state.formControls.ideaStatus.value}
							onChange={this.changeHandler}
							options={this.props.ideaStatus.map(el => {
								return {
									value: el.status,
									displayValue: el.status
								};
							})}
							touched={this.state.formControls.ideaStatus.touched}
							valid={this.state.formControls.ideaStatus.valid}
							disabled={this.state.disableInput}
						/>
						<div className={`${this.displayButtonOrNot()}`}>
							<button
								onClick={this.formSubmitHandler}
								className={`button button-bg-blue ${
									styles.submitBtn
								} ${this.cursorDisabled()}`}
								disabled={!this.state.formIsValid}
							>
								{this.getButtonText()}
							</button>
							<button
								type="button"
								className={`button button-bg-red ${
									styles.deleteBtn
								} ${this.cursorDisabled()}`}
								onClick={() => this.showModal("deleteIdea")}
							>
								Delete
							</button>
						</div>
					</form>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => ({
	ideaStatus: state.masterData.ideaStatus,
	selectedIdea: state.idea.selectedIdea,
	userId: state.auth.user.id || state.auth.user._id
});

export default connect(mapStateToProps, {
	updateIdea,
	getIdea,
	likeIdea,
	unlikeIdea,
	deleteIdea
})(ModifyIdea);
