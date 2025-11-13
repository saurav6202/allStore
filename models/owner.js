const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    storeName: String,
    category: String,
    description: String,
    locationt: String,
    openingHours: String,
    logo: String,
})

const Owner = mongoose.model("Owner", ownerSchema);
module.exports = Owner;