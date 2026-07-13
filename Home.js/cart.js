document.addEventListener("DOMContentLoaded", () => {

    const cartContainer = document.getElementById("cart-items-list");
    const totalElement = document.getElementById("cart-total");

    if (!cartContainer) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {

        cartContainer.innerHTML = "";

        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <h2 style="text-align:center; padding:30px;">
                    Your Cart is Empty
                </h2>
            `;

            if (totalElement) {
                totalElement.textContent = "$0.00";
            }

            return;
        }

        let total = 0;

        cart.forEach((item, index) => {

            total += item.price * item.quantity;

            cartContainer.innerHTML += `

            <div class="cart-item">

                <div class="product">

                    <img src="${item.image}" alt="${item.name}" width="120">

                    <div>
                        <h3>${item.name}</h3>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>

                </div>

                <div class="quantity">

                    <button class="minus" data-index="${index}">-</button>

                    <span>${item.quantity}</span>

                    <button class="plus" data-index="${index}">+</button>

                </div>

                <h3>$${(item.price * item.quantity).toFixed(2)}</h3>

                <button class="remove" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

            `;

        });

        if (totalElement) {
            totalElement.textContent = "$" + total.toFixed(2);
        }

        document.querySelectorAll(".plus").forEach(btn => {
            btn.addEventListener("click", () => {

                const index = btn.dataset.index;

                cart[index].quantity++;

                localStorage.setItem("cart", JSON.stringify(cart));

                renderCart();

            });
        });

        document.querySelectorAll(".minus").forEach(btn => {
            btn.addEventListener("click", () => {

                const index = btn.dataset.index;

                if (cart[index].quantity > 1) {
                    cart[index].quantity--;
                }

                localStorage.setItem("cart", JSON.stringify(cart));

                renderCart();

            });
        });

        document.querySelectorAll(".remove").forEach(btn => {
            btn.addEventListener("click", () => {

                const index = btn.dataset.index;

                cart.splice(index, 1);

                localStorage.setItem("cart", JSON.stringify(cart));

                renderCart();

            });
        });

    }

    renderCart();

});
const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const totalElement = document.getElementById("cart-total");

let subtotal = total;          // Products total
let deliveryCharge = 50;       // Fixed delivery charge
let finalTotal = subtotal + deliveryCharge;

if (subtotalElement) {
    subtotalElement.textContent = "$" + subtotal.toFixed(2);
}

if (deliveryElement) {
    deliveryElement.textContent = "$" + deliveryCharge.toFixed(2);
}

if (totalElement) {
    totalElement.textContent = "$" + finalTotal.toFixed(2);
}