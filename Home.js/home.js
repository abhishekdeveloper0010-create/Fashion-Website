// ================= Slider =================

const slides = document.querySelectorAll(".slide");
let current = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
}

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn && prevBtn) {

    nextBtn.addEventListener("click", () => {
        current = (current + 1) % slides.length;
        showSlide(current);
    });

    prevBtn.addEventListener("click", () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    });

    setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 5000);
}

// ================= Wishlist =================

// ================= Wishlist =================

const wishlists = document.querySelectorAll(".wishlist");

wishlists.forEach(item => {

    const id = item.dataset.id;
    const icon = item.querySelector("i");

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Page load
    if (wishlist.find(product => product.id == id)) {
        item.classList.add("active");
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    }

    item.addEventListener("click", () => {

        let product;

        // Shop Page
        const card = item.closest(".product-card");

        if(card){

            product = {
                id:id,
                name:card.querySelector("h3").innerText,
                price:parseFloat(card.querySelector("p").innerText.replace("$","")),
                image:card.querySelector("img").src
            };

        }

        // Product Details Page
        else{

            product = {
                id:id,
                name:document.querySelector(".product-info h1").innerText,
                price:parseFloat(document.querySelector(".product-price").value),
                image:document.getElementById("mainImage").src
            };

        }

        wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const index = wishlist.findIndex(p=>p.id==id);

        if(index==-1){

            wishlist.push(product);

            item.classList.add("active");

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        }else{

            wishlist.splice(index,1);

            item.classList.remove("active");

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

        localStorage.setItem("wishlist",JSON.stringify(wishlist));

    });

});

// ================= Mobile Menu =================

const hamburger = document.getElementById("hamburger");

const navLinks = document.querySelector(".nav-links");
const searchBox = document.querySelector(".search-box");
const cart = document.querySelector(".cart");

hamburger.addEventListener("click", () => {

    navLinks.classList.toggle("active");
    searchBox.classList.toggle("active");
    cart.classList.toggle("active");

});

// T-shirt image   change karega

const colors = document.querySelectorAll(".color");
const mainImage = document.getElementById("mainImage");

colors.forEach(color => {

    color.addEventListener("click", function(){

        colors.forEach(c => c.classList.remove("active"));

        this.classList.add("active");

        mainImage.src = this.getAttribute("data-image");

    });

});

function changeImage(src){

    document.getElementById("mainImage").src = src;

}


// Quantity
document.querySelectorAll(".product").forEach(product => {

    const plus = product.querySelector(".plus");
    const minus = product.querySelector(".minus");
    const qty = product.querySelector(".qty");
    const price = product.querySelector(".price");
    const productPrice = Number(product.querySelector(".product-price").value);

    plus.addEventListener("click", () => {
        qty.value = Number(qty.value) + 1;
        price.textContent = (qty.value * productPrice).toFixed(2);
    });

    minus.addEventListener("click", () => {
        if (Number(qty.value) > 1) {
            qty.value = Number(qty.value) - 1;
            price.textContent = (qty.value * productPrice).toFixed(2);
        }
    });

});

// CartCount
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

updateCartCount();


// searchBtn
const products = [
    "women",
    "men",
    "kids",
    "shoes",
    "watch",
    "t shirt",
    "oversized cotton t-shirt",
    "linen blend blazer",
    "slim fit chino pants",
    "leather loafers",
    "minimal watch",
    "classic white sneakers"
];

document.getElementById("searchBtn").addEventListener("click", searchProduct);

document.getElementById("searchInput").addEventListener("keypress", function(e){

    if(e.key==="Enter"){
        searchProduct();
    }

});

function searchProduct(){

    const value = document
    .getElementById("searchInput")
    .value
    .toLowerCase()
    .trim();

    if(value===""){
        alert("Please enter a product name");
        return;
    }

    if (products.includes(value)) {

        if (value.includes("home")) {
            window.location.href = "../Homepage.html/home.html";
        }
    
        else if (value.includes("shop")) {
            window.location.href = "../Homepage.html/shop-page.html";
        }
    
        else if (value.includes("about")) {
            window.location.href = "../Homepage.html/about-page.html";
        }
    
        else if (value.includes("contact")) {
            window.location.href = "../Homepage.html/contact-page.html";
        }
    
        else if (value.includes("women")) {
            window.location.href = "../Homepage.html/women-products.html";
        }
    
        else if (value.includes("men")) {
            window.location.href = "../Homepage.html/men-products.html";
        }
    
        else if (value.includes("kids")) {
            window.location.href = "../Homepage.html/kids.html";
        }
    
        else if (value.includes("shoes")) {
            window.location.href = "../Homepage.html/shoes.html";
        }
    
        else if (value.includes("watch")) {
            window.location.href = "../Homepage.html/watch.html";
        }
    
        else if (value.includes("leather")) {
            window.location.href = "../Homepage.html/Leather-Loafers.html";
        }
    
        else if (value.includes("pant")) {
            window.location.href = "../Homepage.html/pant-product.html";
        }
    
        else {
            window.location.href = "../Homepage.html/shop-page.html";
        }
    
    } 
    else{

        window.location.href = "../404-page/404.html";

    }

}