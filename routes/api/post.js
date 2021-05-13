const express = require("express");
const router = express.Router(); //*Router function within Express
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

//* @route  POST api/post
//* @desc   Create a Post
//* @access Private

router.post(
  "/",
  [
    auth,
    [
      check("question", "Question is Required").not().isEmpty(),
      check("optionsType", "Please Select Options Type").not().isEmpty(),
      check("options", "Please provide atleast two options").isLength({
        min: 2
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      question,
      codeText,
      codeType,
      optionsType,
      options,
      rating,
      explanation
    } = req.body;

    const postFields = {};

    postFields.user = req.user.id;

    postFields.content = {};
    if (question) postFields.content.question = question;
    if (codeText) postFields.content.codeText = codeText;
    if (codeType) postFields.content.codeType = codeType;
    if (optionsType) postFields.content.optionsType = optionsType;
    if (options) postFields.content.options = options;
    if (explanation) postFields.content.explanation = explanation;
    if (rating) postFields.content.rating = rating;

    try {
      const user = await User.findById(req.user.id).select("-password");
      const profile = await Profile.findOne({ user: req.user.id });
      postFields.name = profile.name;
      postFields.avatar = user.avatar;

      const newPost = new Post(postFields);
      const post = await newPost.save();
      return res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }
);

//* @route  GET api/post
//* @desc   Get all posts
//* @access Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    return res.json(posts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

//* @route  GET api/post/:id
//* @desc   Get post by Id
//* @access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    return res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    return res.status(500).send("Server Error");
  }
});

//* @route  DELETE api/post/:id
//* @desc   DELETE post by Id
//* @access Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }

    //* Check whether the user deleting the post is the user who posted the post
    if (post.user.toString() !== req.user.id) {
      //* post.user is a ObjectId Datatype and req.user.id would be a string..therefore convert post.user to string
      return res.status(401).json({ msg: "User not Authorized" });
    }
    await post.remove();
    return res.json({ msg: "Post Deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    return res.status(500).send("Server Error");
  }
});

//* @route  PUT api/post/like/:id
//* @desc   Like a Post
//* @access Private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //*Check if the user already liked this post

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post Already Liked" });
    }
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    return res.status(500).send("Server Error");
  }
});

//* @route  PUT api/post/unlike/:id
//* @desc   Unlike a Post
//* @access Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //*Check if the user already liked this post

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked yet" });
    }
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    //* Get remove Index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    return res.status(500).send("Server Error");
  }
});

//* @route  POST api/post/comment/:id
//* @desc   Comment a post
//* @access Private

router.post(
  "/comment/:id",
  [auth, [check("text", "Comment is Required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ msg: "Post Not Found" });
      }
      const profile = await Profile.findOne({ user: req.user.id });
      const newComment = {
        text: req.body.text,
        name: profile.name,
        avatar: user.avatar,
        user: req.user.id
      };
      post.comments.unshift(newComment);
      await post.save();
      return res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post Not Found" });
      }
      return res.status(500).send("Server Error");
    }
  }
);

//* @route  DELETE api/post/comment/:id/:comment_id
//* @desc   Delete a Comment
//* @access Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    ); //* Find is like for each oly..

    if (!comment) {
      return res.status(404).json({ msg: "Comment Not Found" });
    }
    //*Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not Authorized" });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    return res.status(500).send("Server Error");
  }
});
module.exports = router;
