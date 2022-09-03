const mongoose = require("mongoose")

//a schema provides structure to the document
const taskSchema = new mongoose.Schema({
  //only the properties set in the schema will be passed on to the database
  name:{
    type:String,
    //add validators
    required: [true,"Must provide a task name"],
    trim: true,
    maxlength:[20,"Task name cannot be more than 20 charaters"]
  },
  completed:{
    type:Boolean,
    default:false
  }
})

module.exports = mongoose.model("Task", taskSchema)