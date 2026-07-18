document.addEventListener("DOMContentLoaded", () => {

    const cartContainer = document.getElementById("cart-items-list");

    const subtotal = document.getElementById("subtotal");
    const delivery = document.getElementById("delivery");
    const total = document.getElementById("cart-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCart() {

        cartContainer.innerHTML = "";

        if (cart.length === 0) {

            cartContainer.innerHTML = `
                <h2 style="text-align:center;padding:30px;">
                    Your Cart is Empty
                </h2>
            `;

            subtotal.innerText = "$0.00";
            delivery.innerText = "$50.00";
            total.innerText = "$50.00";

            return;
        }

        let subTotal = 0;

        cart.forEach((item, index) => {

            const price = Number(item.price);

            subTotal += price * item.quantity;

            cartContainer.innerHTML += `

            <div class="cart-item">

                <div class="product">

                    <img src="${item.image}" width="120">

                    <div>
                        <h3>${item.name}</h3>
                        <p>$${price.toFixed(2)}</p>
                    </div>

                </div>

                <div class="quantity">

                    <button onclick="decrease(${index})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increase(${index})">+</button>

                </div>

                <h3>$${(price * item.quantity).toFixed(2)}</h3>

                <button onclick="removeProduct(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

            `;

        });

        const deliveryCharge = 50;
        const finalTotal = subTotal + deliveryCharge;

        subtotal.innerText = "$" + subTotal.toFixed(2);
        delivery.innerText = "$" + deliveryCharge.toFixed(2);
        total.innerText = "$" + finalTotal.toFixed(2);

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.increase = function(index){

        cart[index].quantity++;
        renderCart();

    }

    window.decrease = function(index){

        if(cart[index].quantity > 1){
            cart[index].quantity--;
        }

        renderCart();

    }

    window.removeProduct = function(index){

        cart.splice(index,1);

        renderCart();

    }

    renderCart();

});