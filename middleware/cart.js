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
    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice
    );
  }
  res.locals.cart = cart;
  if (req.session.uid) {
    res.locals.credit = req.session.inventory.credit; //adding this for credit in views
  }
  next();
}

module.exports = initializeCart;
