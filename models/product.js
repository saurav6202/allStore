const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    description: String,
    image: String,
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
    },
})

const Product = mongoose.model("Product", productSchema);
module.exports = Product;