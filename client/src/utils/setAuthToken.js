//* Function that takes in a token , if the token is there then , this function will add it to the headers and if it is not , this function will delete it from the header
//* Since JWT is stateless

import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
