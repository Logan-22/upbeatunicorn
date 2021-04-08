import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import theme from "./theme";

export default combineReducers({ alert, auth, profile, theme }); // Combines all the reducers into one.
