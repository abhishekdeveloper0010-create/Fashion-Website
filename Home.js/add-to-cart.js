document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".cart-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const product = {
                id: button.dataset.id,
                name: button.dataset.name,
                price: Number(button.dataset.price),
                image: button.dataset.image,
                quantity: 1
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const exist = cart.find(item => item.id === product.id);

            if (exist) {
                exist.quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));

            window.location.href = "../cart-pages/cart.html";

        });

    });

});