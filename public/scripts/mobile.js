const burgerBtnElement = document.getElementById("burger-btn");
const mobileMenuElement = document.getElementById("mobile-menu");

function toggleMobileMenu(){
    mobileMenuElement.classList.toggle("open");
}

burgerBtnElement.addEventListener("click",toggleMobileMenu);