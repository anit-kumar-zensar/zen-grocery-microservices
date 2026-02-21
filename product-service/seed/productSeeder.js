const mongoose = require("mongoose");
const Product = require("../models/Product");

const MONGO_URI = "mongodb://localhost:27017/microservicesDB";

const products = [
  // Smartphones
  {
    name: "iPhone 9",
    price: 549,
    category: "smartphones",
    imageUrl: "https://store.storeimages.cdn-apple.com/iphone.jpg",
  },
  {
    name: "iPhone X",
    price: 899,
    category: "smartphones",
    imageUrl: "https://store.storeimages.cdn-apple.com/iphone-x.jpg",
  },
  {
    name: "Samsung Universe 9",
    price: 1249,
    category: "smartphones",
    imageUrl: "https://images.samsung.com/galaxy.jpg",
  },
  {
    name: "OPPOF19",
    price: 280,
    category: "smartphones",
    imageUrl: "https://image.oppo.com/oppo-f19.jpg",
  },
  {
    name: "Huawei P30",
    price: 499,
    category: "smartphones",
    imageUrl: "https://consumer.huawei.com/p30.jpg",
  },

  // Laptops
  {
    name: "MacBook Pro",
    price: 1749,
    category: "laptops",
    imageUrl: "https://store.storeimages.cdn-apple.com/macbook-pro.jpg",
  },
  {
    name: "Samsung Galaxy Book",
    price: 1499,
    category: "laptops",
    imageUrl: "https://images.samsung.com/galaxy-book.jpg",
  },
  {
    name: "Microsoft Surface Laptop 4",
    price: 1499,
    category: "laptops",
    imageUrl: "https://microsoft.com/surface-laptop.jpg",
  },
  {
    name: "Infinix INBOOK",
    price: 1099,
    category: "laptops",
    imageUrl: "https://infinixmobility.com/inbook.jpg",
  },
  {
    name: "HP Pavilion 15-DK1056WM",
    price: 1099,
    category: "laptops",
    imageUrl: "https://hp.com/pavilion.jpg",
  },

  // Fragrances
  {
    name: "Perfume Oil",
    price: 13,
    category: "fragrances",
    imageUrl: "https://images.unsplash.com/photo-1594035910387-fea47794261f",
  },
  {
    name: "Brown Perfume",
    price: 40,
    category: "fragrances",
    imageUrl: "https://images.unsplash.com/photo-1615634260167-c8cdede054de",
  },

  // Skincare
  {
    name: "Hyaluronic Acid Serum",
    price: 19,
    category: "skincare",
    imageUrl: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc",
  },
  {
    name: "Oil Free Moisturizer 100ml",
    price: 40,
    category: "skincare",
    imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6",
  },

  // Groceries
  {
    name: "Daal Masoor 500 grams",
    price: 20,
    category: "groceries",
    imageUrl: "https://images.unsplash.com/photo-1603048297172-c92544798d5a",
  },
  {
    name: "Elbow Macaroni - 400 gm",
    price: 14,
    category: "groceries",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
  },

  // Home Decoration
  {
    name: "Plant Hanger For Home",
    price: 41,
    category: "home-decoration",
    imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013",
  },
  {
    name: "3D Embellishment Art Lamp",
    price: 20,
    category: "home-decoration",
    imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
];

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
