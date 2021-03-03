const jwt = require("jsonwebtoken");
const config = require("config");

//Middleware function - next is callback , so that when we are done it moves on to the next middleware
module.exports = function (req, res, next) {
  //* Get Token from Header. Need to send the token within the header when accessing protected routes.
  const token = req.header("x-auth-token"); //"x-auth-token" is the header Key where we would send the token in.

  //* Check if no Token
  if (!token) {
    return res.status(401).json({ msg: "No Token, Authorization Denied" });
  }
  //*Verify Token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")); //Decode the token
    req.user = decoded.user; //Assigning the user to the user from the token.
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is Not Valid" });
  }
};
