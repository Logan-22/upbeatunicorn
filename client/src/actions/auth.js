import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

//*Load User  -> Each Time Main component is rendered , the user is validated using the JSON Web Token

export const loadUser = () => async (dispatch) => {
  //* If there is a token present in the local storage, then set it in the global header..
  if (localStorage.token) {
    //* This will only check the first time the user loads..hence same is applied to App.js , so that each render checks for valid token
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data, //* User is returned from api/auth backend
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//*Register User

export const register = ({ email, password }) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users",
        body,
        config
      );
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch(loadUser());
    } catch (err) {
      console.error(err);
      const errors = err.response.data.errors;
      console.error(errors);
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({ type: REGISTER_FAIL });
    }
  };
};

//*Login User

export const login = (email, password) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth",
        body,
        config
      );
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({ type: LOGIN_FAIL });
    }
  };
};

//*Logout / Clear Profile

export const logout = () => (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
