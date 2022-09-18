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

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { likes: req.user._id },
    },
    { new: true } //we always need updated record if we dont give this mongo db will return old record
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.status(200).json(result);
    }
  });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id },
    },
    { new: true } //we always need updated record if we dont give this mongo db will return old record
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.status(200).json(result);
    }
  });
});

module.exports = router;
