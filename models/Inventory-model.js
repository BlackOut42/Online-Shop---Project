const mongodb = require("mongodb");
const db = require("../data/database");

class Inventory {
  constructor(ownerId, items = [], credit = 100) {
    this.items = items;
    this.credit = credit;
    this.ownerId = ownerId;
  }

  async addToInventory(cart) {
    let responseData;
    const newCredit = this.credit - cart.totalPrice;
    if (newCredit >= 0) {
      for (let i = 0; i < cart.items.length; i++) {
        let cartItem = cart.items[i];
        let addedItem = false;
        for (let j = 0; j < this.items.length; j++) {
          const item = this.items[j];
          if (item.product.id === cartItem.product.id) {
            item.quantity += cartItem.quantity;
            this.items[j] = item;
            addedItem = true;
          }
        }
        if (!addedItem) {
          const inventoryItem = {
            product: cartItem.product,
            quantity: cartItem.quantity,
          };
          this.items.push(inventoryItem);
        }
      }
      this.credit = newCredit.toFixed(2);
      await this.updateDb();
      responseData = {inventory:this,sucess:true};
      return responseData;
    } //TODO: add error handling.
    responseData = {inventory:this,sucess:false};

    return responseData;
  }
  async sellItem(productId, quantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === productId) {
        const newQuantity = item.quantity - quantity;
        if (newQuantity > 0) {
          const inventoryItem = { ...item };
          inventoryItem.quantity = newQuantity;
          this.items[i] = inventoryItem;
          this.credit += inventoryItem.product.price * quantity;
          await this.updateDb();
          return;
        } else {
          this.credit += item.product.price * quantity;
          this.items.splice(i, 1);
          await this.updateDb();
          return;
        }
      }
    }
  }
  async updateDb() {
    const ownerID = await new mongodb.ObjectId(this.ownerId);
    try {
      await db
        .getDb()
        .collection("users")
        .updateOne({ _id: ownerID }, { $set: { inventory: this } });
      return;
    } catch (error) {
      console.log({
        message: "An error occured updating the inventory!",
        error: error,
      });
    }
  }
}
module.exports = Inventory;
