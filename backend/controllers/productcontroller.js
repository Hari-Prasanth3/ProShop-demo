import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products)

});

const  getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    
    if (product) {
        return res.json(product)
    } else {
        res.status(404)
        throw new Error('Resource not found')

    }
});
//description create products

const createProduct = asyncHandler(async (req, res) => {
   const  product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",

   })

   const createdProduct = await product.save();
   res.status(201).json(createdProduct);

});

// description update a product
const updateProduct = asyncHandler(async (req, res) => {
    const{name, price, description, image, brand, category, countInStock} = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updateProduct = await product.save();
        res.json(updateProduct);

    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
   

});
// description delete product 
const deleteProduct = asyncHandler(async (req, res) => {
   

    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({_id: product._id})
      res.status(200).json({message: 'Product deleted'});

    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
   

});

export {getProducts, getProductById, createProduct, updateProduct, deleteProduct}