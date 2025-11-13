const express = require("express");
const router = express.Router();
const Owner = require("../models/owner");
const Product = require("../models/product");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage setup
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "allsStore_store", // folder in Cloudinary
        format: async (req, file) => "png", // convert all uploads to png
        public_id: (req, file) => Date.now() + "-" + file.originalname,
    },
});
const upload = multer({ storage });

const productStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "allsStore_product", // folder in Cloudinary
        format: async (req, file) => "png", // convert all uploads to png
        public_id: (req, file) => Date.now() + "-" + file.originalname,
    },
});
const productUpload = multer({ storage });


router.post("/store", upload.single("logo"), async (req, res) => {
  const { storeName, category, description, locationt, openingHours, phone } = req.body;
  const newOwner = await new Owner({
    name: null,
    email: null,
    password: null,
    phone,
    storeName,
    category,
    description,
    locationt,
    openingHours,
  });
   // Handle logo upload if provided
    if (req.file) {
      newOwner.logo = req.file.path; // multer stores path
    }
  const response = await newOwner.save();
  console.log("new owner cerated: ", response);
  return res.redirect("/");
});


router.post("/product", productUpload.single("image"), async (req, res) => {
    const { name, price, category, description } = req.body; 
    const newProduct = await new Product({
        name,
        price,
        category,
        description,
    });
     if (req.file) {
        console.log("req.file = ", req.file)
      newProduct.image = req.file.path; // multer stores path
    }
    const response = await newProduct.save();
    console.log("new Product = ", response);
    return res.redirect("/");
})

router.post("/updateProfile", async (req, res) => {
    const { name, email } = req.body;
    // const updatedOwner = await Owner.findByIdAndUpdate(
    //   req.user.id,
    //   {name, email},
    //   {
    //     new: true,
    //     runValidators: true,
    //     new: true,
    //   }
    // );
    //  console.log(
    //   "✅ Updated User:",
    //   updatedOwner?.name || "User Updated",
    //   updatedOwner
    // );
    return res.redirect("/");
})

module.exports = router;