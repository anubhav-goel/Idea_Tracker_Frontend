import React, { Component, Fragment } from "react";
import "./App.css";
import { Provider, connect } from "react-redux";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import store from "../store";
import Navbar from "./layout/Navbar";
import Routes from "./routing/Routes";
import Alert from "./Alert";
import { loadUser } from "../store/actions/index";

class App extends Component {
	async componentDidMount() {
		await store.dispatch(loadUser());
	}

	render() {
		return (
			<Provider store={store}>
				<BrowserRouter>
					<Fragment>
						<Navbar />
						<Alert />
						<Switch>
							<Route component={Routes} />
						</Switch>
					</Fragment>
				</BrowserRouter>
			</Provider>
		);
	}
}

export default App;
