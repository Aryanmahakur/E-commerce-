document.addEventListener("DOMContentLoaded", function() {
    let productcontainer = document.getElementById("product-list-container");
    let productcontainer1 = document.getElementById("product-list-container1");
    let productcontainer2 = document.getElementById("product-list-container2");
    let productcontainer3 = document.getElementById("product-list-container3");
    let loginbtn = document.getElementById("login-btn");
    let arrowexit = document.getElementById("arrow-exit");
    let logincontainer = document.getElementById("login-container");
    let cartContainer = document.getElementById("cart-product-container");
    let cartSectionMain = document.getElementById("cart-section-main");

    // Event listener for login
    loginbtn.addEventListener("click", () => {
        logincontainer.style.display = "block";
    });
    arrowexit.addEventListener("click", () => {
        logincontainer.style.display = "none";
    });

    // Function to render products
    function renderProducts(products) {
        return `
        <div class="product-container" id="${products.id}">
            <img src="${products.mainimage}" alt="mainimages">
            <p class="name">${products.name}</p>
            <p class="quantity">500ml</p>
            <p class="price">MRP ${products.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        </div>`;
    }

    // Using a loop that will bring data from products array
    products.forEach((product) => {
        if (product.category == "Dairy Product") {
            productcontainer.innerHTML += renderProducts(product);
        } else if (product.category == "Snacks") {
            productcontainer1.innerHTML += renderProducts(product);
        } else if (product.category == "Chips") {
            productcontainer2.innerHTML += renderProducts(product);
        } else if (product.category == "Tea") {
            productcontainer3.innerHTML += renderProducts(product);
        }
    });

    // Event listener for product container to redirect
    document.querySelectorAll(".product-container").forEach((item) => {
        item.addEventListener('click', (event) => {
            if (!event.target.classList.contains("add-to-cart")) {
                const productid = item.getAttribute('id');
                window.location.href = `product-details.html?id=${productid}`;
            }
        });
    });

    // Event listener for the add to cart button to stop propagation
    document.querySelectorAll(".add-to-cart").forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation(); // Stop the click event from propagating to the parent

            // Get the product ID from the parent element
            const productid = btn.parentElement.getAttribute('id');
            // Find the product in the products array
            const product = products.find(p => p.id === productid);

            // Retrieve existing cart data from local storage or initialize an empty array
            let cartdata = JSON.parse(localStorage.getItem("cart")) || [];

            // Push the selected product into the cart data array
            cartdata.push(product);

            // Update local storage with the new cart data
            localStorage.setItem("cart", JSON.stringify(cartdata));

            // Retrieve and display the cart items
            displayCartItems();
        });
    });

    // Function to retrieve and display the cart items
    function displayCartItems() {
        let cartoutput = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("cartoutput:", cartoutput);

        cartContainer.innerHTML = ''; // Clear existing content

        cartoutput.forEach((item) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.mainimage}" alt="mainimage" id="cart-item-image">
                <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">MRP ${item.price}</p>
                <p class="quantity">500ml</p>
                </div>
                
        <div class="product-quantity" id="product-quantity">
            <p class="quantity-decrease" id="quantity-decrease">-</p>
            <p class="quantity-number" id="quantity-number">1</p>
            <p class="quantity-increase" id="quantity-i">+</p>
        </div>
            `;
       

            cartContainer.appendChild(cartItem);
        });
    }

    // Initialize cart display on page load
    displayCartItems();

    // Toggle cart visibility
    document.getElementById("cart-btn").addEventListener("click", () => {
        cartSectionMain.classList.toggle("active");
    });

    document.getElementById("exit-cart").addEventListener("click", () => {
        cartSectionMain.classList.remove("active");
    });
});
