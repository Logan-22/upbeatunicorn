const express = require("express");
const router = express.Router(); //Router function within Express
const { check, validationResult } = require("express-validator"); //From Express Validator documentation.
const User = require("../../models/User"); //Importing User Model
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route  POST api/users
// @desc   Register User
// @access Public

router.post(
  "/",
  [
    check("name", "Name is Required").not().isEmpty(), //"name" from the post request should not be empty. If it is empty then the "Name is required error message" is sent.
    check("email", "Please include a valid Email").isEmail(),
    check(
      "password",
      "Please Enter a valid Password with 6 or more Characters"
    ).isLength({ min: 6 }),
  ], //Second Parameter of this post route is Express validator check within ARRAY
  async (req, res) => {
    //* Async here,since findOne method returns a promise
    const errors = validationResult(req); //Check for errors by using the validation result of the Request.
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); //Send a 400 Status Response along with JSON with {errors: <error messages array>}
    }

    const { name, email, password } = req.body; //Destructuring Req.body

    //Registering User to Database if there are no Errors in Validation:
    try {
      //* Check if User Exists
      let user = await User.findOne({ email }); //Instead of {email:email} , Since in the object email's(key) value is email variable.
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User Already Present" }] });
      }

      //* Get Gravatar from Email:
      const avatar = gravatar.url(email, {
        s: "200", //Default Size
        r: "pg", //Rating - PG
        d: "mm", //Default Image when the user image is not present
      });
      user = new User({ name, email, avatar, password }); //Similar to {name:name,email:email,avatar:avatar,password:password}
      //* Encrypt Password:
      const salt = await bcrypt.genSalt(10); //Returns Promise .. Recommended 10 Rounds
      user.password = await bcrypt.hash(password, salt);

      await user.save(); //save returns a Promise and saves the user to database.

      //* Return JSON WEB TOKEN: When user is registered,they are logged in right away.To facilitate this return JSON WEB TOKEN.
      const payload = {
        //Visit jwt.io
        user: {
          id: user.id, //Since mongoose , we can use id instead of "_id" from mongoDB
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
      ); //Place the JWT token
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
