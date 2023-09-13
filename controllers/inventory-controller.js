const mongodb = require("mongodb");
const db = require("../data/database");
const inventoryUtil = require("../utilities/inventory-util");

async function buyCart(req, res, next) {
  const cart = res.locals.cart;
  try {
    const customerInventory = await inventoryUtil(req.session.uid);
    responseInventoryObject = await customerInventory.addToInventory(cart);
    req.session.inventory = responseInventoryObject.inventory;
    if (responseInventoryObject.sucess) {
      //   req.session.cart = null; causes problems
      res.redirect("/inventory");
    }
  } catch (error) {
    next(error);
    return;
  }
  res.redirect("/inventory");
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
