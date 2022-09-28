const express = require("express");
const mongoose = require("mongoose");
const requireLogin = require("../Middleware/requireLogin");
const router = express.Router();

const Product = mongoose.model("Products");

router.post("/addproduct", requireLogin, (req, res) => {
  const { name, price } = req.body;
  const product = new Product({
    name,
    price,
  });
  product
    .save()
    .then((result) => {
      res.json({ product: result });
    })
    .catch((err) => {
      console.group(err);
    });
});

router.put("/addcart", requireLogin, (req, res) => {
  Product.findByIdAndUpdate(
    req.body.productId,

    {
      $push: { cart: req.body.productId },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.status(200).json(result);
    }
  });
});

router.put("/removecart", requireLogin, (req, res) => {
  Product.findByIdAndUpdate(
    req.body.productId,
    {
      $pull: { cart: req.body.productId },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.status(200).json(result);
    }
  });
});
router.get("/allproduct", (req, res) => {
  Product.find()
    .then((products) => {
      res.json({ products });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
