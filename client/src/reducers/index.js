import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import theme from "./theme";
import post from "./post";

export default combineReducers({ alert, auth, profile, theme, post }); // Combines all the reducers into one.
