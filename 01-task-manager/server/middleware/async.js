//middleware function that wrap the controllers and take controller as an argument
const asyncWrapper = (fn) =>{
    return async(req, res, next)=>{
        try {
            await fn(req, res, next)
        } catch (error) {
           next(error) 
        }
    }
}

module.exports= asyncWrapper