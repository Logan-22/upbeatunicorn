const express = require("express");
const mongoose = require("mongoose");
const router = express.Router(); //Router function within Express
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator");
const config = require("config");
const request = require("request");

//* @route  GET api/profile/me
//* @desc   GET Own Profile
//* @access Private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await await Profile.findOne({ user: req.user.id });

    if (!profile) {
      res.status(400).json({ msg: "There is no Profile for your User" });
    } else {
      const profileUser = profile.populate("user", ["name", "avatar"]);
      res.json(profileUser);
    }
  } catch (err) {
    if (err) {
      console.error(err.message);
      res.status(500).send("Server Error - Profile");
    }
  }
});

//* @route  POST api/profile/
//* @desc  Create Or Update a User Profile
//* @access Private

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required").not().isEmpty(),
      check("status", "Status is Required").not().isEmpty(),
      check("skills", "Skills is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //Checking if there are any Errors
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      company,
      status,
      skills,
      bio,
      githubusername,
      youtube,
      facebook,
      instagram,
      twitter,
      linkedin,
    } = req.body;

    //*Build Profile Objects

    const profileFields = {};

    profileFields.user = req.user.id;
    if (name) profileFields.name = name;
    if (company) profileFields.company = company;
    if (status) profileFields.status = status;
    if (skills)
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;

    profileFields.social = {};

    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      var profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //* Update Existing Profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      } else {
        //*Create New Profile
        profile = new Profile(profileFields);
        await profile.save();

        return res.json(profile);
      }
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

//* @route  GET api/profile/
//* @desc  Get All Profiles
//* @access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//! @route  GET api/profile/user/:user_id .. user_id here is a Parameter
//* @desc  Get Profile by User Id
//* @access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile Not Found" });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({ msg: "Profile Not Found" });
    return res.status(500).send("Server Error");
  }
});

//* @route  DELETE api/profile/
//* @desc  Delete Profile, User and Post
//* @access Private

router.delete("/", auth, async (req, res) => {
  try {
    //TODO: REMOVE USER POSTS

    await Profile.findOneAndRemove({ user: req.user.id }); //* Remove Profile
    await User.findOneAndRemove({ _id: req.user.id }); //* Remove User
    return res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId")
      return res.status(400).json({ msg: "Profile Not Found" });
    return res.status(500).send("Server Error");
  }
});

//* @route  PUT api/profile/experience
//* @desc  Add profile experience
//* @access Private

router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is Required").not().isEmpty(),
      check("company", "Company is Required").not().isEmpty(),
      check("from", "From Date is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, from, to, current, description } = req.body;

    const newExp = {
      title,
      company,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp); //* Unshift pushes the element to the beginning instead of the end..
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

//* @route  DELETE api/profile/experience/:experience_id
//* @desc  Delete experience from profile
//* @access Private

router.delete("/experience/:experience_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //* Get Remove Index from the Experience Array
    const indexToBeRemoved = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.experience_id);
    profile.experience.splice(indexToBeRemoved, 1);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//* @route  PUT api/profile/education
//* @desc  Add profile education
//* @access Private

router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is Required").not().isEmpty(),
      check("degree", "Degree is Required").not().isEmpty(),
      check("fieldOfStudy", "Field Of Study is Required").not().isEmpty(),
      check("from", "From Date is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu); //* Unshift pushes the element to the beginning instead of the end..
      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

//* @route  DELETE api/profile/education/:education_id
//* @desc  Delete education from profile
//* @access Private

router.delete("/education/:education_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    //* Get Remove Index from the Education Array
    const indexToBeRemoved = profile.education
      .map((item) => item.id)
      .indexOf(req.params.education_id);
    profile.education.splice(indexToBeRemoved, 1);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//* @route  GET api/profile/github/:github_username
//* @desc  Get user name from GitHub
//* @access Public

router.get("/github/:github_username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.github_username
      }/repos?per_page=7&sort=created:asc&client_id=${config.get(
        "githubClientID"
      )}&client_secret=${config.get("githubSecret")}`,
      method: "GET",
      headers: {
        "user-agent": "node.js",
      },
    };
    console.log(options);
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200)
        return res.status(404).json({ msg: "No GitHub Profile Found" });
      return res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
