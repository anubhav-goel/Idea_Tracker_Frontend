import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Register.module.css";
import Email from "../formInputs/Email";
import TextInput from "../formInputs/TextInput";
import Password from "../formInputs/Password";
import validateForm from "../../utils/validateForm";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../store/actions";

export class Register extends Component {
	static propTypes = {};

	state = {
		formIsValid: false,
		formControls: {
			name: {
				value: "",
				placeholder: "Your Name.",
				valid: false,
				validationRules: {
					isRequired: true
				},
				touched: false
			},
			password: {
				value: "",
				placeholder: "Your Password.",
				valid: false,
				validationRules: {
					isRequired: true,
					minLength: 6
				},
				touched: false
			},
			confirmPassword: {
				value: "",
				placeholder: "Re-enter Your Password.",
				valid: false,
				validationRules: {
					isRequired: true,
					minLength: 6
				},
				touched: false
			},
			email: {
				value: "",
				placeholder: "Your Email.",
				valid: false,
				validationRules: {
					isRequired: true,
					isEmail: true
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
		/* if (this.state.formControls.password.value !== this.state.formControls.confirmPassword.value) {
			console.log("Passwords do not match");
		}
		else { */
		const formData = {};
		for (let formElementId in this.state.formControls) {
			formData[formElementId] = this.state.formControls[
				formElementId
			].value;
		}
		await this.props.register(formData, this.props.history);
		this.setState({
			formIsValid: false,
			formControls: {
				name: {
					value: "",
					placeholder: "Your Name.",
					valid: false,
					validationRules: {
						isRequired: true
					},
					touched: false
				},
				password: {
					value: "",
					placeholder: "Your Password.",
					valid: false,
					validationRules: {
						isRequired: true,
						minLength: 6
					},
					touched: false
				},
				confirmPassword: {
					value: "",
					placeholder: "Re-enter Your Password.",
					valid: false,
					validationRules: {
						isRequired: true,
						minLength: 6
					},
					touched: false
				},
				email: {
					value: "",
					placeholder: "Your Email.",
					valid: false,
					validationRules: {
						isRequired: true
						// isEmail: true
					},
					touched: false
				}
			}
		});
		// }
	};

	cursorDisabled = () =>
		this.state.formIsValid ? "cursorPointer" : "cursorDisabled";

	render() {
		if (this.props.auth.isAuthenticated) {
			return <Redirect to="/ideas" />;
		}
		return (
			<section className={`${styles.registerPage}`}>
				<div className={styles.container}>
					<h1 className="">Sign Up</h1>
					<p className="">Create Your Account</p>
					<form
						className={styles.form}
						onSubmit={this.formSubmitHandler}
					>
						<TextInput
							name="name"
							value={this.state.formControls.name.value}
							placeholder={
								this.state.formControls.name.placeholder
							}
							valid={this.state.formControls.name.valid}
							touched={this.state.formControls.name.touched}
							onChange={this.changeHandler}
						/>
						<Password
							name="password"
							value={this.state.formControls.password.value}
							placeholder={
								this.state.formControls.password.placeholder
							}
							valid={this.state.formControls.password.valid}
							touched={this.state.formControls.password.touched}
							onChange={this.changeHandler}
						/>
						<Password
							name="confirmPassword"
							value={
								this.state.formControls.confirmPassword.value
							}
							placeholder={
								this.state.formControls.confirmPassword
									.placeholder
							}
							valid={
								this.state.formControls.confirmPassword.valid
							}
							touched={
								this.state.formControls.confirmPassword.touched
							}
							onChange={this.changeHandler}
						/>
						<Email
							name="email"
							value={this.state.formControls.email.value}
							placeholder={
								this.state.formControls.email.placeholder
							}
							valid={this.state.formControls.email.valid}
							touched={this.state.formControls.email.touched}
							onChange={this.changeHandler}
						/>
						<button
							className={`button button-bg-blue ${this.cursorDisabled()}`}
							disabled={!this.state.formIsValid}
						>
							Submit
						</button>
					</form>
				</div>
			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		auth: state.auth
	};
};

export default connect(mapStateToProps, {
	register
})(Register);
