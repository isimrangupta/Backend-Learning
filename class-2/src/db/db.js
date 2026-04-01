const mongoose = require("mongoose");

// We will write the database connection in the db.js file so that the server can connect to the database

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://zsimrangupta:CLhgEfFIBnSuj8Ou@cluster0.fcfnesq.mongodb.net/cluster0",
    )
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((error) => {
      console.log("Error connecting to DB", err);
    });
}

module.exports = connectToDB;
