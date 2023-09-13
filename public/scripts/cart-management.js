const addToCartButtonElement = document.querySelector("#product-information button");
const cartBadgeElement = document.querySelector(".nav-items .badge");


async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf; //This is a must, request won't go through without it!
  let response;
  try {
    response = await fetch("/cart/items", {
      method: "post",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        //this tells the backend to parse this requst with the approptiate json middleware.
        "content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }
  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.totalItems;
  
  cartBadgeElement.textContent = newTotalQuantity;
  
}

addToCartButtonElement.addEventListener("click", addToCart);
