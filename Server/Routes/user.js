const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Post = mongoose.model("post");
const User = mongoose.model("User");
const requireLogin = require("../Middleware/requireLogin");
const { route } = require("./auth");

router.get("/user/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "user not found" });
    });
});

module.exports = router;
