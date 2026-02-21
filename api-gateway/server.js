const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("Gateway working");
});

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

app.listen(4000, () => console.log("API Gateway running on port 4000"));
