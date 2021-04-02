const express = require("express");
const router = express.Router(); //Router function within Express
const auth = require("../../middleware/auth"); //Auth Middleware
const User = require("../../models/User");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//* @route  GET api/auth
//* @desc   To Verify User
//* @access Public

router.get("/", auth, async (req, res) => {
  //*To Use Middleware use it as the second parameter.auth
  //*To Verify the JWT which comes in from the client(Front End)
  try {
    const user = await User.findById(req.user.id).select("-password"); //Finding the user fields from Mongo DB, but not selecting the password.
    res.json(user);
  } catch (err) {
    return res.status(500).json({ msg: "Mongo DB Server Error" });
  }
});

//* @route  POST api/auth
//* @desc   Authenticate User and Get Token
//* @access Public

router.post(
  "/",
  [
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Password is Required").exists(),
  ],
  async (req, res) => {
    //* Async here,since findOne method returns a promise
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //* Check if No User Exists
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //*Compare Password with Encrypted Password
      const isMatch = await bcrypt.compare(password, user.password); //password -> Text Password from Client and user.password is encrypted Password
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      //TODO: Change the Expires In to 3600
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          else {
            res.json({ token });
          }
        }
      ); //*Place the JWT token
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
