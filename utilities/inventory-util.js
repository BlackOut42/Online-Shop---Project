const mongodb = require("mongodb");
const db = require("../data/database");
const Inventory = require("../models/Inventory-model");


async function getUpdatedInventory(userId) {
  const userIdObject = await new mongodb.ObjectId(userId);
  let userInventory;
  try {
    const userDocument = await db
      .getDb()
      .collection("users")
      .findOne({ _id: userIdObject });
    if (userDocument.inventory) { // this should always be defined with how the system is connected
        userInventory = new Inventory(   //but some users on test time did not have inventory fields.
        userDocument.inventory.ownerId,
        userDocument.inventory.items,
        (+userDocument.inventory.credit).toFixed(2)//changed to number then called toFixed func
      );
    }
    return userInventory;
  } catch (error) {
    throw error;
  }
}

module.exports = getUpdatedInventory;
