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
];

const categoryColors = {
  smartphones: "1E90FF",
  laptops: "6A5ACD",
  fragrances: "FF69B4",
  skincare: "20B2AA",
  groceries: "32CD32",
  "home-decoration": "FF8C00",
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
