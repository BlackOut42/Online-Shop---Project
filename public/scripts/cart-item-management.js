const cartItemUpdateFormElements = document.querySelectorAll(".cart-item-management form");
const cartBadgeElement = document.querySelectorAll(".nav-items .badge"); // there are 2 badges on each page Mobile & Desktop menu
const totalCartPriceElement = document.querySelector("#cart-total span");

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;
  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.querySelector("input").value;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong updating the cart!");
    return;
  }
  if (!response.ok) {
    console.log(response);
    return;
  }
  const responseData = await response.json();
  if(responseData.updatedCartData.newItemPrice === 0){
    const cartItemElement = form.parentElement.parentElement.parentElement;
    cartItemElement.remove();
  }else{
      const totalItemPriceElement = form.parentElement.querySelector(".cart-item-price");
      totalItemPriceElement.textContent = responseData.updatedCartData.newItemPrice.toFixed(2);
  }

  totalCartPriceElement.textContent = responseData.updatedCartData.newTotalPrice.toFixed(2) + " Credits";

  for (const badge of cartBadgeElement) {
    badge.textContent = responseData.updatedCartData.newTotalQuantity;
  }
}

for (const form of cartItemUpdateFormElements) {
  form.addEventListener("submit", updateCartItem);
}
