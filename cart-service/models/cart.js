const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema({
  products: [CartItemSchema],
});

module.exports = mongoose.model("Cart", CartSchema);
