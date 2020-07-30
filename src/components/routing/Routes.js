import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../auth/Login";
import Logout from "../auth/Logout";
import Register from "../auth/Register";
import AllIdeas from "../ideas/AllIdeas";
import CreateIdea from "../ideas/CreateIdea";
import ModifyIdea from "../ideas/ModifyIdea";
import Landing from "../layout/Landing";
import PrivateRoutes from "./PrivateRoutes";
import AllIdeasV2 from "../ideas/AllIdeasV2/AllIdeasV2";

const Routes = props => {
	return (
		<Switch>
			<Route exact path="/login" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/logout" component={Logout} />
			<PrivateRoutes exact path="/ideas/:id" component={ModifyIdea} />
			<PrivateRoutes exact path="/ideas" component={AllIdeas} />
			<PrivateRoutes exact path="/ideasV2" component={AllIdeasV2} />
			<PrivateRoutes exact path="/create" component={CreateIdea} />
			<Route exact path="/" component={Landing} />
		</Switch>
	);
};

Routes.propTypes = {};

export default Routes;
