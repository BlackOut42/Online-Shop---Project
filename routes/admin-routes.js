const express = require("express");
const adminController = require("../controllers/admin-controller");
const imageUploadMW = require("../middleware/image-upload")

const router = express.Router();

router.get("/products",adminController.getProducts);

router.get("/products/add",adminController.getAddProduct);

router.post("/products/add",imageUploadMW,adminController.createNewProduct);//execution is from left to right hence my custom 
                                                                        //filename handling middleware is being used on each file uploaded.

router.get("/products/:id",imageUploadMW,adminController.getProductUpdate);//I have to add the custom multer middleware here, otherwise it will nullify
router.post("/products/:id",imageUploadMW,adminController.updateProduct);//all the data of the product object.

module.exports = router;