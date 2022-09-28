const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  cart: [{ type: ObjectId, ref: "Products" }],
});

mongoose.model("Products", productSchema);
