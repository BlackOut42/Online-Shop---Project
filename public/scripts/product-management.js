const productDeleteButtonElemetnts = document.querySelectorAll(
  ".product-item button"
);

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  const csrfToken = buttonElement.dataset.csrf;

  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );
  if(!response.ok){
    alert("Something went wrong!");
    return;
  }
  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();//removing list item parent containing product-item.
}

for (const button of productDeleteButtonElemetnts) {
  button.addEventListener("click", deleteProduct);
}
