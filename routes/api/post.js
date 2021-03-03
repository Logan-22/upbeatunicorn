const express = require("express");
const router = express.Router(); //Router function within Express

// @route  GET api/post
// @desc   Test Route
// @access Public

router.get("/", (req, res) => {
  res.send("Post Route");
});

module.exports = router;
