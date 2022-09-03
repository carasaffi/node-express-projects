const connectDB = require("./config/database");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

//middlewares
app.use(express.json()); 

const tasksRoutes = require("./routes/tasks"); 
app.use("/api/v1/tasks", tasksRoutes); 

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 8000;

//only if the connection to the database is successful, then we spin up the server
const start =async()=>{
  try {
   await connectDB(process.env.MONGO_URI);
   app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
});
  } catch (error) {
    console.log(`DB connection error: ${error.message}`)
  }
}

start()