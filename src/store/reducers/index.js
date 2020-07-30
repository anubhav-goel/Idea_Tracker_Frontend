import { combineReducers } from "redux";

import auth from "./auth";
import idea from "./idea";
import alert from "./alert";
import masterData from "./masterData";

export default combineReducers({ auth, idea, alert, masterData });
