const mongoose = require("mongoose");

//database connection
const connectDB = (url) =>{
    return mongoose.connect(url)
}

module.exports = connectDB