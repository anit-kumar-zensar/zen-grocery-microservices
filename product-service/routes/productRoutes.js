const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products
// Optional Query: ?category=smartphones
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      const allowedCategories = [
        "home-decoration",
        "groceries",
        "skincare",
        "fragrances",
        "laptops",
        "smartphones",
      ];

      if (!allowedCategories.includes(category)) {
        return res.status(400).json({
          message: "Invalid category",
          allowedCategories,
        });
      }

      filter.category = category;
    }

    const products = await Product.find(filter);

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
