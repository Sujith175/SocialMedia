const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const requireLogin = require("../Middleware/requireLogin");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const { JWT_SECRET } = require("../keys");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!email || !password || !name) {
    return res.status(422).json({ error: "Please add all the fields" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User Already exits with that email" });
      }

      bcrypt.hash(password, 13).then((hashedpassword) => {
        const user = new User({
          email,
          password: hashedpassword,
          name,
          pic,
        });
        user
          .save()
          .then((user) => {
            transporter.sendMail({
              to: user.email,
              from: "anandhust@gmail.com",
              subject: "SuccessFully Signed Up",
              html: "<h1>Welcome to Our world</h1>",
            });
            res.json({ message: "Signed Up Successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })

    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "Please Provide email or password" });
  }
  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invaild Credentials" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          const { _id, name, email, followers, following, pic } = savedUser;
          res.json({
            token,
            user: { _id, name, email, followers, following, pic },
          });
        } else {
          return res.status(422).json({ error: "Invaild Credentials" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
