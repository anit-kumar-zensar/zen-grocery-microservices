const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://localhost:27017/microservicesDB")
  .then(() => console.log("Cart Service DB Connected"))
  .catch((err) => console.log(err));

app.use("/", require("./routes/cartRoutes"));

app.listen(5002, () => console.log("Cart Service running on port 5002"));
