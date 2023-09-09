const db = require("mongodb");
const Product = require("../models/product-model");

async function getProducts(req, res, next) {
  try {
    const products = await Product.findAll();
    res.render("admin/products/all-products", { products: products });
  } catch (error) {
    next(error);
    return;
  }
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

async function getProductUpdate(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/products/update-product", { product: product });
  } catch (error) {
    next(error);
    return;
  }
}
async function updateProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }
  try {
    await product.saveProduct();
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/admin/products");
}
async function deleteProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.delete();
  } catch (error) {
    return next(error);
  }
  res.json({
    message: "Product deleted.",
  });
}

module.exports = {
  getAddProduct: getAddProduct,
  getProducts: getProducts,
  createNewProduct: createNewProduct,
  getProductUpdate: getProductUpdate,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
