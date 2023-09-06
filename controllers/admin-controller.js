const db = require("mongodb");
const Product = require("../models/product-model");

function getProducts(req, res) {
  res.render("admin/products/all-products");
}

function getAddProduct(req, res) {
  res.render("admin/products/new-product");
}

async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });
  try {
    await product.saveProduct();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/admin/products");
}

module.exports = {
  getAddProduct: getAddProduct,
  getProducts: getProducts,
  createNewProduct: createNewProduct,
};
