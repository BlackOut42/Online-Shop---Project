class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }
  addItem(product) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (this.items[i].product.id === product.id) {
        item.quantity++;
        item.totalPrice += product.price;
        this.totalQuantity++;
        this.totalPrice += product.price;
        return;
      }
    }
    const cartItem = {
      product: product,
      quantity: 1,
      totalPrice: product.price,
    };
    this.items.push(cartItem);
    this.totalQuantity++;
    this.totalPrice += product.price;
  }
}
module.exports = Cart;
