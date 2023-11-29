import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    name:{
    type: string,
    required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: string,
        required: true,
    },
},{
    timestamps: true,
});

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: string,
        required: true,
    },
    image: {
        type: string,
        required: true,
    },
    brand: {
        type: string,
        required: true,
    },
    category: {
        type: string,
        required: true,
    },
    description: {
        type: string,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});
const Product = mongoose.model("Product", productSchema);

export default Product;