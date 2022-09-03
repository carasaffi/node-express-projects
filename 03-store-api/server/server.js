const connectDB = require("./config/database");
const express = require("express");
require("express-async-errors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

app.use(express.json());

const productsRoutes = require("./routes/products"); 
app.use("/api/v1/products", productsRoutes); 

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start= async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=>{
            console.log(`Server listening on port ${port}`)
        })
    } catch (error) {
        console.log(`DB connection error: ${error.message}`)
    }
}

start()
