import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";

export default combineReducers({ alert,auth }); // Combines all the reducers into one.
