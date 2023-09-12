class Cart {
  constructor(items = [], totalQuantity = 0, totalPrice = 0) {
    this.items = items;
    this.totalQuantity = totalQuantity;
    this.totalPrice = totalPrice;
  }
  addItem(product) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === product.id) {
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
  updateItem(productId, newQuantity) {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      if (item.product.id === productId) {
        if (newQuantity > 0) {
          const cartItem = { ...item };
          cartItem.quantity = newQuantity;
          cartItem.totalPrice = newQuantity * cartItem.product.price;
          this.totalQuantity += cartItem.quantity - item.quantity;
          this.totalPrice += cartItem.totalPrice - item.totalPrice;
          this.items[i] = cartItem;
          return { itemTotalPrice: cartItem.totalPrice };
        } else {
          this.totalQuantity -= item.quantity;
          this.totalPrice -= item.totalPrice;
          this.items.splice(i, 1);
          return { itemTotalPrice: 0 };
        }
      }
    }
  }
}
module.exports = Cart;
