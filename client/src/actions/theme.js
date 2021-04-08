import { SET_THEME } from "./types";

export const setTheme = (mode) => {
  return {
    type: SET_THEME,
    payload: mode,
  };
};
