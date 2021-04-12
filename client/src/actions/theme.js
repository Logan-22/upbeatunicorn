import { SET_THEME } from "./types";

export const setTheme = (mode) => {
  localStorage.setItem("darkmode", mode);
  return {
    type: SET_THEME,
    payload: mode,
  };
};

export const loadTheme = () => {
  var mode;
  mode = localStorage.getItem("darkmode");
  mode = mode === "true";
  return {
    type: SET_THEME,
    payload: mode,
  };
};
