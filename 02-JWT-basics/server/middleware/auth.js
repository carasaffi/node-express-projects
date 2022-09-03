const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require("../errors")

const authentication = async (req, res, next) =>{
    //send token from frontend in the headers if it is protected route
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError("No token provided");
    }

    const token = authHeader.split(' ')[1];
    //console.log(token);
    
    //verify if the token is valid
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //console.log(decoded)
        const {id, username} = decoded;
        req.user = {id, username};
        next();
    } catch (error) {
        throw new UnauthenticatedError("Not authorized to access this route");
    } 
}

module.exports = authentication