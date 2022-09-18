const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Post = mongoose.model("post");

const requireLogin = require("../Middleware/requireLogin");
const { route } = require("./auth");
router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, url } = req.body;

  if (!title || !body || !url) {
    return res.status(422).json({ error: "Please add all the Feilds" });
  }
  req.user.password = undefined;

  const post = new Post({
    title,
    body,
    photo: url,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all posts
router.get("/allposts", requireLogin, (req, res) => {
  Post.find()

    .populate("postedBy", "_id name")

    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

//list all post created by user
router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
