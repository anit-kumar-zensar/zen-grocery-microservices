const express = require("express");
const Cart = require("../models/cart");
const router = express.Router();

// Get cart items
router.get("/", async (req, res) => {
  console.log("Received get cart items request", req.query);
  try {
    const cart = await Cart.findOne(); // assuming single cart
    console.log("Cart found:", cart);
    res.json({ products: cart ? cart.products : [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to cart
router.post("/", async (req, res) => {
  console.log("Received add to cart request:", req.body);
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "productId is required" });
  }

  try {
    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart({ products: [] });
    }

    const existingItem = cart?.products?.find(
      (i) => i?.productId?.toString() === productId?.toString(),
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // Use new subdocument explicitly
      cart.products.push({
        productId: productId, // string is fine, mongoose casts it
        quantity: 1,
      });
    }

    await cart.save();
    res.json(cart.products);
  } catch (err) {
    console.error("Cart POST error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Remove from cart
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne();
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    // Match by productId (string comparison)
    const existingItem = cart.products.find(
      (i) => i.productId.toString() === productId,
    );

    if (existingItem) {
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1; // decrement quantity
      } else {
        // remove completely if quantity is 1
        cart.products = cart.products.filter(
          (i) => i.productId.toString() !== productId,
        );
      }

      await cart.save();
    }

    console.log("Updated cart after deletion:", cart);
    return res.json(cart.products);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
