const Product = require("../models/products");

exports.getAllProductsStatic = async (req, res)=>{
    // const search= "a"
    // const products = await Product.find({name: { $regex: search, $options:'i' }}) //i - case insensitive
    // const products = await Product.find({}).sort('-name price')
    const products = await Product.find({price:{$gt:30}}).sort('price').select('name price').limit(5).skip(1);
    res.status(200).json({products, nbHits : products.length});
}

exports.getAllProducts = async (req, res)=>{
    const {name, company, featured, sort, fields, numericFilters}= req.query;
    
    //filter
    const queryObject = {};

    if(featured){ 
        //set up new property in the queryObject by the name of featured
        queryObject.featured = featured === "true" ? true : false;
    }
    if(company){
        queryObject.company = company;
    }
    if(name){
        queryObject.name = { $regex: name, $options:'i' }; //query operators
    }
    if(numericFilters){
        //operatorMap
        const operatorMap ={
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        //regEx
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;

        let filters = numericFilters.replace(
        regEx,
        //replace whatever matches with the query operators that mongoose understands
        (match) => 
        `-${operatorMap[match]}-`
        );
        
        const options = ['price','rating'];

        filters = filters.split(',').forEach((item)=>
        {
            const [field, operator, value ]= item.split('-');
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)};
            }
        }
        )
        
    }

    //sort
    let result = Product.find(queryObject);
    if(sort){
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    }else{
        result = result.sort('createdAt');
    }

    //select
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList);
    }
   
    //pagination functionality
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
     
    result = result.skip(skip).limit(limit);

    const products = await result; //set up await when we get the complete result

    res.status(200).json({products, nbHits : products.length});
}

