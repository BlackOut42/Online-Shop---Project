const Cart = require("../models/cart-model");

/*
This is a middleware for cart initialization between request cycles.
*/
function initializeCart(req, res, next) {
  let cart;
  let sessionCart = req.session.cart;
  if (!sessionCart) {
    cart = new Cart();
  } else {
    cart = new Cart(sessionCart.items,sessionCart.totalQuantity,sessionCart.totalPrice);
  }
  res.locals.cart = cart;
  next();
}

module.exports = initializeCart;
