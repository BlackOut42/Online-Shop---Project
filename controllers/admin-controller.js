const db = require("mongodb");
function getProducts(req, res) {
  res.render("admin/products/all-products");
}

function getAddProduct(req, res) {
  res.render("admin/products/new-product");
}

function createNewProduct(req, res) {
    //didn't add yet. Here req.body contains a file via req.body.file
  res.redirect("/admin/products");
}

module.exports = {
  getAddProduct: getAddProduct,
  getProducts: getProducts,
  createNewProduct: createNewProduct,
};
