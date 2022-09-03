const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Product name is required"]
    },
    company:{
        type:String,
        enum:{
            values:['ikea','liddy','caressa','marcos'],
            message:'{VALUE} is not supported'
        }
       // enum:['ikea','liddy','caressa','marcos']
    },
    price:{
        type: Number,
        required:[true, "Product price is required"]
    },
    featured:{
        type: Boolean,
        default:false
    },
    rating:{
        type: Number,
        default: 4.5
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema)