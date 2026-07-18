const container = document.querySelector(".wishlist-container");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function loadWishlist() {

    container.innerHTML = "";

    if (wishlist.length === 0) {
        container.innerHTML = `
        <h2 style="text-align:center;padding:40px;">
        Your Wishlist is Empty ❤️
        </h2>
        `;
        return;
    }

    wishlist.forEach((item,index)=>{

        container.innerHTML +=`

        <div class="wishlist-card">

            <div class="wishlist-img">
                <img src="${item.image}">
            </div>

            <div class="wishlist-info">

                <h2>${item.name}</h2>

                <div class="price">
                    ${item.price}
                </div>

                <div class="buttons">

                    <button class="cart-btn"
                    onclick="addToCart(${index})">

                        <i class="fa-solid fa-cart-shopping"></i>

                        Add To Cart

                    </button>

                    <button class="remove-btn"
                    onclick="removeWishlist(${index})">

                        <i class="fa-solid fa-trash"></i>

                        Remove

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

function removeWishlist(index){

    wishlist.splice(index,1);

    localStorage.setItem("wishlist",JSON.stringify(wishlist));

    loadWishlist();

}

function addToCart(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const product = wishlist[index];

    const exist = cart.find(item=>item.id===product.id);

    if(exist){

        exist.quantity++;

    }else{

        cart.push({

            ...product,

            price:Number(product.price.replace("$","")),

            quantity:1

        });

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    window.location.href="../cart-pages/cart.html";

}

loadWishlist();