const Product = require("../models/product-model");

async function addCartItem(req, res, next) {
  let product;
  try {
    product = new Product(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  let cart = res.locals.cart;
  cart.addCartItem(product); //updating local Cart object.
  res.session.cart = cart; //overwrite session cart with the updated cart.

  res.json({
    message: "Cart updated!",
    TotalItems: cart.totalQuantity,
  });
}

module.exports = {
  addCartItem: addCartItem,
};
