import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middleware = [thunk]; //Only Middle ware we have to use here is thunk

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
); //* Create Globalized State Store with reducers , initial State and hook it up to Redux Dev Tools in browser.

export default store;
