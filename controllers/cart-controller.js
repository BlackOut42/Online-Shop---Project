const Product = require("../models/product-model");

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }
  const cart = res.locals.cart;
  cart.addItem(product); //updating local Cart object.
  
  req.session.cart = cart; //overwrite session cart with the updated cart.

  res.json({
    message: "Cart updated!",
    totalItems: cart.totalQuantity,
  });
}

module.exports = {
  addCartItem: addCartItem,
};
