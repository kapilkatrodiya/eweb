const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

//create product--Admin
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success:true,
        product
    })
})

//get all product
exports.getAllProducts = async(req,res)=>{
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const products = await apiFeatures.query;

    res.status(200).json({
        success:true,
        products
    })   
}

//Get product details
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }

    res.status(200).json({
        success:true,
        product,
        productCount,
    })
})

// //get product details
// exports.getProductDetails = async(req,res,next)=>{
//     const product = await Product.findById(req.params.id);
// //if product found
//     if(!product){
//         return res.status(500).json({
//             success:false,
//             message:"Product not found"
//             })
//         } 
// //if product found
//     res.status(200).json({
//         success:true,
//         product 
//     })
// }



//update product --admin route
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{
    let product = await Product.findById(req.params.id);
//if product not found
    if(!product){
        return next(new ErrorHander("Product not found",404));
    }
//if product found then
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product
    })
})

//Delete product
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
//if product found
    if(!product){
        return next(new ErrorHander("Product not found",404));
    }  
    await product.remove();
//if product found
    res.status(200).json({
        success:true,
        message:"Product Delete Successfully"
    })                                                         
})