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

const wishlists = document.querySelectorAll(".wishlist");

wishlists.forEach(item => {

    const id = item.dataset.id;
    const icon = item.querySelector("i");

    if (localStorage.getItem("wishlist_" + id) === "true") {
        item.classList.add("active");
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
    }

    item.addEventListener("click", () => {

        item.classList.toggle("active");

        if (item.classList.contains("active")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            localStorage.setItem("wishlist_" + id, "true");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            localStorage.removeItem("wishlist_" + id);
        }

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
 