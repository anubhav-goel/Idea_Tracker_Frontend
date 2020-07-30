import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

/* import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./store";
import { loadUser } from "./store/actions";

class Index extends React.Component {
	componentDidMount() {
		store.dispatch(loadUser());
	}
	render() {
		return (
			<App />
		)
	}
}

ReactDOM.render(
	<React.StrictMode>
		<Index />
	</React.StrictMode>,
	document.getElementById("root")
); */
