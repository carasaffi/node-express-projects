const Task = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require("../errors/custom-error");

exports.createTask = asyncWrapper(async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json("Task created successfully"); 
  } catch (error) {
    console.log(error)
    res.status(400).json({msg: error})
  }
});

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({tasks});
  } catch (error) {
    console.log(error)
    res.status(400).json({msg: error})
  }
};

exports.getTask = asyncWrapper(async (req, res, next) => {
    const {id: taskId} = req.params;
    const task = await Task.findById({_id:taskId}).exec();
    if(!task){
      // const error = new Error("Not found")
      // error.status = 404;
      // return next(error)
      return next(createCustomError(`No task with id ${taskId}`, 404));
    }
    res.status(200).json({task});
});

exports.updateTask = async (req, res) => {
  try {
    const {id: taskId} = req.params;
    const task = await Task.findOneAndUpdate({_id:taskId}, req.body,{
      //always return new value
      new:true,
      runValidators: true});
    if(!task){
      return res.status(404).json({msg: `No task with id ${taskId} `});
    }
    res.status(200).json("Task updated successfully");
  } catch (error) {
    console.log(error)
    res.status(400).json({msg: error})
  }
  
};

exports.deleteTask = async (req, res) => {
  try {
    const {id: taskId} = req.params;
    const task = await Task.findOneAndDelete({_id:taskId})
    if(!task){
      return res.status(404).json({msg: `No task with id ${taskId} `})
    }
    res.status(200).json("Task deleted successfully")
  } catch (error) {
    console.log(error)
    res.status(400).json({msg: error})
  }
};
