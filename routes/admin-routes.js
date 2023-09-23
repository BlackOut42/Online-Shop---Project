const express = require("express");
const adminController = require("../controllers/admin-controller");
const imageUploadMW = require("../middleware/image-upload")

const router = express.Router();

router.get("/admin/products",adminController.getProducts);

router.get("/admin/products/add",adminController.getAddProduct);

router.post("/admin/products/add",imageUploadMW,adminController.createNewProduct);//execution is from left to right hence my custom 
                                                                        //filename handling middleware is being used on each file uploaded.

router.get("/admin/products/:id/edit",imageUploadMW,adminController.getProductUpdate);//I have to add the custom multer middleware here, otherwise it will nullify
router.post("/admin/products/:id/edit",imageUploadMW,adminController.updateProduct);//all the data of the product object.

router.delete("/admin/products/:id",adminController.deleteProduct);

module.exports = router;