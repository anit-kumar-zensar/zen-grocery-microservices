const mongoose = require("mongoose");
const Product = require("../models/Product");

const MONGO_URI = "mongodb://localhost:27017/microservicesDB";

const baseProducts = [
  { name: "iPhone 9", price: 549, category: "smartphones" },
  { name: "iPhone X", price: 899, category: "smartphones" },
  { name: "Samsung Universe 9", price: 1249, category: "smartphones" },
  { name: "OPPOF19", price: 280, category: "smartphones" },
  { name: "Huawei P30", price: 499, category: "smartphones" },
  { name: "MacBook Pro", price: 1749, category: "laptops" },
  { name: "Samsung Galaxy Book", price: 1499, category: "laptops" },
  { name: "Microsoft Surface Laptop 4", price: 1499, category: "laptops" },
  { name: "Infinix INBOOK", price: 1099, category: "laptops" },
  { name: "HP Pavilion 15-DK1056WM", price: 1099, category: "laptops" },
  { name: "Perfume Oil", price: 13, category: "fragrances" },
  { name: "Brown Perfume", price: 40, category: "fragrances" },
  { name: "Hyaluronic Acid Serum", price: 19, category: "skincare" },
  { name: "Oil Free Moisturizer 100ml", price: 40, category: "skincare" },
  { name: "Daal Masoor 500 grams", price: 20, category: "groceries" },
  { name: "Elbow Macaroni - 400 gm", price: 14, category: "groceries" },
  { name: "Plant Hanger For Home", price: 41, category: "home-decoration" },
  { name: "3D Embellishment Art Lamp", price: 20, category: "home-decoration" },
  // --- New Smartphones ---
  { name: "Google Pixel 7", price: 699, category: "smartphones" },
  { name: "OnePlus 11", price: 729, category: "smartphones" },
  { name: "Xiaomi Mi 12", price: 649, category: "smartphones" },
  { name: "Realme GT Neo 3", price: 599, category: "smartphones" },

  // --- New Laptops ---
  { name: "Dell XPS 13", price: 1399, category: "laptops" },
  { name: "Lenovo ThinkPad X1 Carbon", price: 1699, category: "laptops" },
  { name: "Asus ROG Zephyrus G14", price: 1599, category: "laptops" },
  { name: "Acer Aspire 5", price: 899, category: "laptops" },
  // --- New Skincare ---
  { name: "Vitamin C Brightening Serum", price: 29, category: "skincare" },
  { name: "Aloe Vera Soothing Gel", price: 15, category: "skincare" },
  { name: "SPF 50 Sunscreen Lotion", price: 22, category: "skincare" },

  // --- New Groceries ---
  { name: "Organic Basmati Rice 1kg", price: 18, category: "groceries" },
  { name: "Olive Oil Extra Virgin 500ml", price: 25, category: "groceries" },
  { name: "Peanut Butter 340g", price: 12, category: "groceries" },
  { name: "Green Tea 100 Bags", price: 10, category: "groceries" },

  // --- New Home Decoration ---
  { name: "Modern Wall Clock", price: 55, category: "home-decoration" },
  { name: "Decorative Throw Pillow", price: 30, category: "home-decoration" },
  { name: "Indoor LED String Lights", price: 18, category: "home-decoration" },
  { name: "Wooden Floating Shelves", price: 65, category: "home-decoration" },
  // --- Fruits ---
  { name: "Fresh Red Apples 1kg", price: 4, category: "Fruits" },
  { name: "Bananas 1 Dozen", price: 3, category: "Fruits" },
  { name: "Mangoes 1kg", price: 6, category: "Fruits" },
  { name: "Strawberries 500g", price: 5, category: "Fruits" },
  { name: "Watermelon Whole", price: 7, category: "Fruits" },

  // --- Vegetables ---
  { name: "Tomatoes 1kg", price: 3, category: "Vegetables" },
  { name: "Potatoes 2kg", price: 5, category: "Vegetables" },
  { name: "Onions 1kg", price: 2, category: "Vegetables" },
  { name: "Carrots 1kg", price: 3, category: "Vegetables" },
  { name: "Spinach Bundle", price: 2, category: "Vegetables" },
  // --- Dairy ---
  { name: "Fresh Milk 1L", price: 2, category: "Dairy" },
  { name: "Cheddar Cheese 200g", price: 4, category: "Dairy" },
  { name: "Plain Yogurt 500g", price: 3, category: "Dairy" },
  { name: "Butter 250g", price: 5, category: "Dairy" },
  { name: "Eggs Pack of 12", price: 4, category: "Dairy" },

  // --- Snacks ---
  { name: "Salted Potato Chips 150g", price: 2, category: "Snacks" },
  { name: "Chocolate Cookies 200g", price: 3, category: "Snacks" },
  { name: "Mixed Nuts 250g", price: 6, category: "Snacks" },
  { name: "Popcorn 100g", price: 2, category: "Snacks" },
  { name: "Energy Bar Pack", price: 5, category: "Snacks" },
];

const categoryColors = {
  smartphones: "1E90FF",
  laptops: "6A5ACD",
  fragrances: "FF69B4",
  skincare: "20B2AA",
  groceries: "32CD32",
  "home-decoration": "FF8C00",
  Fruits: "FF3B30",
  Vegetables: "228B22",
  Dairy: "8B5CF6",
  Snacks: "FFD700",
};

const products = baseProducts.map((p) => ({
  ...p,
  imageUrl: `https://dummyimage.com/400x400/${
    categoryColors[p.category]
  }/ffffff&text=${encodeURIComponent(p.name)}`,
}));

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await Product.deleteMany();
    console.log("Existing products removed");

    await Product.insertMany(products);
    console.log("Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
