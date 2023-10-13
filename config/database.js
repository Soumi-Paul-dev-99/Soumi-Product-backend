const mongoose = require("mongoose");
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      UseNewUrlParser: true,
      UseUnifiedTopology: true,
    })
    .then(() => {
      console.log("connection successfull");
    })

};
module.exports = connectDatabase;
