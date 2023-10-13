const express = require("express");
const Errmiddleware = require("./middleware/error");
const app = express();
app.use(express.json());
//route imports
const product = require("./routes/productRoutes");
app.use("/api/v1", product);
app.use(Errmiddleware);

module.exports = app;
