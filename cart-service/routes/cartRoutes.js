const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

// GET /api/cart → Fetch cart items
router.get("/", async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/cart → Add item to cart
router.post("/", async (req, res) => {
  try {
    const newItem = new Cart(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/cart/:id → Remove item
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
