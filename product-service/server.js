const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/microservicesDB")
  .then(() => console.log("Product Service DB Connected"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  console.log("Product Service Received:", req.method, req.originalUrl);
  next();
});

app.use("/", require("./routes/productRoutes"));

app.listen(5001, () => console.log("Product Service running on port 5001"));
