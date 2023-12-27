const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: String,
    rating: Number,
    price: Number,
    description: String,
    quantity: Number,
});

const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;