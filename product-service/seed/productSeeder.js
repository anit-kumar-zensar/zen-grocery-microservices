const mongoose = require("mongoose");
const Product = require("../models/Product");

const MONGO_URI = "mongodb://localhost:27017/microservicesDB";

const baseProducts = [
  {
    name: "Apple",
    price: 220,
    category: "fruits",
    imageUrl: "http://localhost:5001/assets/apple.jpg",
    ratingCount: 210,
    stock: 85,
  },
  {
    name: "Banana",
    price: 60,
    category: "fruits",
    imageUrl: "http://localhost:5001/assets/banana.jpg",
    ratingCount: 185,
    stock: 120,
  },
  {
    name: "Lemon",
    price: 50,
    category: "fruits",
    imageUrl: "http://localhost:5001/assets/lemon.jpg",
    ratingCount: 95,
    stock: 60,
  },
  {
    name: "Pear",
    price: 130,
    category: "fruits",
    imageUrl: "http://localhost:5001/assets/pears.jpg",
    ratingCount: 110,
    stock: 70,
  },
  {
    name: "Pomegranate",
    price: 210,
    category: "fruits",
    imageUrl: "http://localhost:5001/assets/Pomegranate.jpg",
    ratingCount: 160,
    stock: 75,
  },
  {
    name: "Almonds",
    price: 450,
    category: "snacks",
    imageUrl: "http://localhost:5001/assets/almonds.jpg",
    ratingCount: 130,
    stock: 50,
  },
  {
    name: "Walnuts",
    price: 500,
    category: "snacks",
    imageUrl: "http://localhost:5001/assets/walnuts.jpg",
    ratingCount: 125,
    stock: 45,
  },
  {
    name: "Cashews",
    price: 550,
    category: "snacks",
    imageUrl: "http://localhost:5001/assets/cashew.jpg",
    ratingCount: 140,
    stock: 55,
  },
  {
    name: "Honey",
    price: 320,
    category: "essentials",
    imageUrl: "http://localhost:5001/assets/honey.jpg",
    ratingCount: 180,
    stock: 65,
  },
  {
    name: "Tea Leaves",
    price: 280,
    category: "beverages",
    imageUrl: "http://localhost:5001/assets/tea_leave.jpg",
    ratingCount: 155,
    stock: 80,
  },
  {
    name: "Coffee Beans",
    price: 350,
    category: "beverages",
    imageUrl: "http://localhost:5001/assets/coffee_beans.jpg",
    ratingCount: 170,
    stock: 70,
  },
  {
    name: "Coconut",
    price: 80,
    category: "fruits",
    imageUrl: "http://localhost:5001/assets/coconut.jpg",
    ratingCount: 115,
    stock: 90,
  },
  {
    name: "Avocado",
    price: 250,
    category: "fruits",
    imageUrl: "http://localhost:5001/assets/avocado.jpg",
    ratingCount: 135,
    stock: 55,
  },
  {
    name: "Ginger",
    price: 70,
    category: "essentials",
    imageUrl: "http://localhost:5001/assets/ginger.jpg",
    ratingCount: 145,
    stock: 100,
  },
  {
    name: "Garlic",
    price: 60,
    category: "essentials",
    imageUrl: "http://localhost:5001/assets/garlic.jpg",
    ratingCount: 150,
    stock: 110,
  },
  {
    name: "Lettuce",
    price: 90,
    category: "vegetables",
    imageUrl: "http://localhost:5001/assets/lettuce.jpg",
    ratingCount: 100,
    stock: 75,
  },
  {
    name: "Cucumber",
    price: 70,
    category: "vegetables",
    imageUrl: "http://localhost:5001/assets/cucumber.jpg",
    ratingCount: 105,
    stock: 80,
  },
  {
    name: "Zucchini",
    price: 95,
    category: "vegetables",
    imageUrl: "http://localhost:5001/assets/zucchini.jpg",
    ratingCount: 85,
    stock: 60,
  },
  {
    name: "Avocado Oil",
    price: 450,
    category: "essentials",
    imageUrl: "http://localhost:5001/assets/avocado_oil.jpg",
    ratingCount: 120,
    stock: 50,
  },
  {
    name: "Maple Syrup",
    price: 380,
    category: "essentials",
    imageUrl: "http://localhost:5001/assets/maple_syrup.jpg",
    ratingCount: 110,
    stock: 45,
  },
  {
    name: "Pasta",
    price: 140,
    category: "grains",
    imageUrl: "http://localhost:5001/assets/pasta.jpg",
    ratingCount: 190,
    stock: 95,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    await Product.deleteMany();
    console.log("Existing products removed");

    await Product.insertMany(baseProducts);
    console.log("Products seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
