const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("Gateway working");
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests
  message: "Too many requests from this IP, please try again later.",
});

// app.use(limiter);

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.originalUrl);
  next();
});

app.use(
  "/api/products",
  createProxyMiddleware({
    target: "http://localhost:5001",
    changeOrigin: true,
    pathRewrite: (path, req) => path,
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log("Forwarding to Product Service...");
      },
      error: (err, req, res) => {
        console.error("Proxy error:", err);
      },
    },
  }),
);

app.use(
  "/api/cart",
  createProxyMiddleware({
    target: "http://localhost:5002",
    changeOrigin: true,
    pathRewrite: (path, req) => path,
    on: {
      proxyReq: (proxyReq, req, res) => {
        console.log("Forwarding to Cart Service...");
      },
      error: (err, req, res) => {
        console.error("Proxy error:", err);
      },
    },
  }),
);

app.get("/api/cart-details", async (req, res) => {
  try {
    const cartResponse = await axios.get("http://localhost:5002/");
    console.log("Cart service OK");
    const productsResponse = await axios.get("http://localhost:5001");

    console.log("Product service OK");
    const cartItems = cartResponse?.data?.products || [];
    const products = productsResponse?.data?.products || [];

    if (!cartItems) {
      return res.status(404).json({ message: "Cart not found" });
    }
    console.log("Cart items:", cartItems);
    console.log("Products:", products);
    const mergedCart = cartItems
      .map((cartItem) => {
        const product = products?.find(
          (p) => p._id.toString() === cartItem?.productId?.toString(),
        );

        if (!product) return null;

        return {
          productId: product._id,
          name: product.name,
          price: product.price,
          category: product.category,
          imageUrl: product.imageUrl,
          quantity: cartItem.quantity,
          totalPrice: product.price * cartItem.quantity,
        };
      })
      .filter(Boolean);

    return res.json(mergedCart); // ✅ return here
  } catch (error) {
    console.error("Aggregation error:", error.message);
    console.error("FULL ERROR:", error.response?.status);
    console.error("URL:", error.config?.url);
    return res.status(500).json({ message: "Failed to fetch cart details" }); // ✅ return here
  }
});

app.listen(4000, () => console.log("API Gateway running on port 4000"));
