const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products
// Optional Query: ?category=smartphones

router.get("/", async (req, res) => {
  try {
    let { category } = req.query;
    let filter = {};

    const allowedCategories = [
      "grains",
      "groceries",
      "beverages",
      "essentials",
      "fruits",
      "vegetables",
      "dairy",
      "snacks",
    ];

    if (category) {
      // Convert to array (supports comma-separated or repeated query params)
      let categories = [];

      if (Array.isArray(category)) {
        categories = category;
      } else {
        categories = category.split(",");
      }

      // Remove duplicates & trim spaces
      categories = [...new Set(categories.map((c) => c.trim()))];

      // Validate categories
      const invalidCategories = categories.filter(
        (c) => !allowedCategories.includes(c),
      );

      if (invalidCategories.length > 0) {
        return res.status(400).json({
          message: "Invalid category",
          invalidCategories,
          allowedCategories,
        });
      }

      // Use $in for multi-category filtering
      filter.category = { $in: categories };
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
