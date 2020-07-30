import React, { Component } from "react";
import PropTypes from "prop-types";
import { ideaCreate } from "../../store/actions/index";
import * as styles from "./CreateIdea.module.css";
import TextArea from "../formInputs/TextArea";
import TextInput from "../formInputs/TextInput";
import { connect } from "react-redux";

import validateForm from "../../utils/validateForm";
import { Redirect } from "react-router-dom";

class CreateIdea extends Component {
	static propTypes = {};

	state = {
		// loading: true,
		formIsValid: false,
		formControls: {
			title: {
				value: "",
				placeholder: "Title",
				valid: false,
				validationRules: {
					isRequired: true
				},
				touched: false
			},
			description: {
				value: "",
				placeholder: "Idea's Description...",
				valid: false,
				validationRules: {
					isRequired: true
				},
				touched: false
			}
		}
	};

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
		const formData = {};
		for (let formElementId in this.state.formControls) {
			formData[formElementId] = this.state.formControls[
				formElementId
			].value;
		}
		await this.props.ideaCreate(formData, this.props.history);
	};

	cursorDisabled = () =>
		this.state.formIsValid ? "cursorPointer" : "cursorDisabled";

	render() {
		return (
			<section className={`mCustom1`}>
				<div className={`${styles.page}`}>
					<h1>Have an amazing idea??</h1>
					<p>Submit to our portal.</p>
					<form onSubmit={this.formSubmitHandler}>
						<TextInput
							name="title"
							value={this.state.formControls.title.value}
							placeholder={
								this.state.formControls.title.placeholder
							}
							valid={this.state.formControls.title.valid}
							touched={this.state.formControls.title.touched}
							onChange={this.changeHandler}
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
							/>
						</div>
						<button
							className={`button button-bg-blue ${
								styles.submitBtn
							} ${this.cursorDisabled()}`}
							disabled={!this.state.formIsValid}
						>
							Submit Idea
						</button>
					</form>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		ideas: state.idea
	};
};

export default connect(mapStateToProps, { ideaCreate })(CreateIdea);
