const express = require("express");
const router = express.Router(); //Router function within Express

// @route  GET api/profile
// @desc   Test Route
// @access Public

router.get("/", (req, res) => {
  res.send("Profile Route");
});

module.exports = router;
