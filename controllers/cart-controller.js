const Product = require("../models/product-model");
const sessionFlash = require("../utilities/session-flash");

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

function getCart(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
  if (!sessionData) {
    sessionData = {};
  }
  res.render("customer/cart/cart", { sessionData: sessionData });
}

function updateCartItem(req, res) {
  const cart = res.locals.cart;
  const updatedItemPrice = cart.updateItem(
    req.body.productId,
    +req.body.quantity
  );

  req.session.cart = cart;
  res.json({
    message: "Cart updated!",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      newItemPrice: updatedItemPrice.itemTotalPrice,
      newTotalBalance:
        req.session.inventory.credit - cart.totalPrice,
    },
  });
}

module.exports = {
  addCartItem: addCartItem,
  getCart: getCart,
  updateCartItem: updateCartItem,
};
