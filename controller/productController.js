const Product = require("../models/productModels");
const ErrorHandeler = require("../utils/errorHandeler");
const catchAsyncError =require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
//Create Product -- Admin
exports.createProduct = catchAsyncError( async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all Product
exports.getAllProducts = catchAsyncError(async (req, res) => {
  new ApiFeatures(Product.find(),req.query.keyword)

  const products = await Product.find();
  res.status(200).json({ success: true, products });
});

//get product details
exports.getProductDetails =catchAsyncError( async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    console.log("product not found");
    return next(new ErrorHandeler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//update product -- Admin
exports.updateProduct =catchAsyncError( async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "Product not found" });
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
});
