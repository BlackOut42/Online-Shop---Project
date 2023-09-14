const mongodb = require("mongodb");
const db = require("../data/database");
const inventoryUtil = require("../utilities/inventory-util");
const  flashToSession  = require("../utilities/session-flash");

async function buyCart(req, res, next) {
  const cart = res.locals.cart;
  try {
    const customerInventory = await inventoryUtil(req.session.uid);
    responseInventoryObject = await customerInventory.addToInventory(cart);
    req.session.inventory = responseInventoryObject.inventory;
    if (responseInventoryObject.sucess) {
        req.session.cart.items = [];
        req.session.cart.totalQuantity = 0  
        req.session.cart.totalPrice = 0
      return res.redirect("/inventory");
    }
    else{
        return flashToSession.flashDataToSession(
            req,
            {
                errorMessage:"If you wish to purchase the contents of this cart please Add more credits!"
            },
            function(){
                res.redirect("/cart");
            }
        );
    }
  } catch (error) {
    next(error);
    return;
  }
}
async function getInventory(req, res) {
  const customerInventory = await inventoryUtil(req.session.uid);
  res.render("customer/inventory/inventory", {
    inventory: customerInventory,
  });
}

module.exports = {
  buyCart: buyCart,
  getInventory: getInventory,
};
