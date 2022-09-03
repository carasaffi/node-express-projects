//check username, password in post(login) request
//if it exists, create new jwt
//send back to front-end

//set up authentication, so only request with JWT can access the dashboard
const jwt = require('jsonwebtoken');
const {BadRequestError} = require("../errors");

exports.login = async (req, res)=>{
    const {username, password}= req.body;
    console.log(username, password);
  
    if(!username || !password){
       throw new BadRequestError("Please provide email and password");
    }
    const id = new Date().getDate();
    //try to keep payload small, better experience for the user
    //create a new token 
    //jwt.sign({payload}, jwtSecret,{options})
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d'});
    //send token to frontend
    res.status(200).json({msg:"User Created", token});
}

exports.dashboard = async (req, res)=>{
    //console.log(req.user.username)
    const luckyNumber = Math.floor(Math.random()*100);
    res.status(200).json({msg: `Hello, ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`});      
}