const mongoose = require("mongoose");

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to DB")
    })
    .catch((error) => {
        console.log("DB error", error)
    })
}

module.exports = connectDB;