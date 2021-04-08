import { SET_THEME } from "../actions/types";

const initialState = {
  theme: "light",
};

const themeReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case SET_THEME:
      return { ...state, theme: payload ? "dark" : "light" };
    default:
      return state;
  }
};

export default themeReducer;
