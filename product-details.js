document.addEventListener("DOMContentLoaded", function () {
    // Get the container for displaying cart products
    let cartContainer = document.getElementById("cart-product-container");
    // Get the element for displaying total price
    let totalprice = document.getElementById("total-price");
    // Get the element for displaying handling charges
    let handlingcharges = document.getElementById("Handling-charges");
    // Get the element for displaying final price
    let finalprice = document.getElementById("final-price");
    // Get the element for displaying cart count
    let cartcount = document.getElementById("cart-count");

    // Function to get URL parameter by name
    function geturlparameter(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    // Retrieve the 'id' parameter from the URL
    const productsid = geturlparameter('id');
    console.log("id: " + productsid);

    // Find the product with the matching 'id'
    const product = products.find(p => p.id === productsid);
    console.log("product id: ", product);

    // If product is found, display its details
    if (product) {
        document.getElementById("product-image").src = product.mainimage;
        document.getElementById("product-name").textContent = product.name;
        document.getElementById("product-price").textContent = `MRP ${product.price}`;
        document.getElementById("quantity").textContent = product.quantity;
        document.getElementById("selflife-span").textContent = product.selflife;
        document.getElementById("selflife-description").textContent = product.description;
        document.getElementById("selflife-brand").textContent = product.company;
        document.getElementById("selflife-quantity").textContent = product.quantity;

        // Check and hide the ingredients section if it is empty or undefined
        if (!product.ingredient) {
            document.getElementById("ingredient-heading").style.display = 'none';
        } else {
            document.getElementById("selflife-ingredients").textContent = product.ingredient;
        }

        // Check and hide the key features section if it is empty or undefined
        if (!product.keyfeature) {
            document.getElementById("keyfeatures-heading").style.display = 'none';
        } else {
            document.getElementById("selflife-keyfeatures").textContent = product.keyfeature;
        }

        // Display subimages for the product
        let subimages = document.getElementById("sub-images");
        console.log("subimage:" + product.subimage);
        product.subimage.forEach((image, index) => {
            const imgelement = document.createElement("img");
            imgelement.src = image;
            imgelement.alt = `subimage ${index + 1}`;
            imgelement.classList.add("sub-image");
            imgelement.id = `subimage-${index + 1}`;
            subimages.appendChild(imgelement);
        });

        // Allow changing main image by clicking on subimages
        const mainimage = document.getElementById("product-image");
        const subimagesa = document.querySelectorAll("#sub-images .sub-image");

        subimagesa.forEach((subimage, index) => {
            subimage.addEventListener("click", () => {
                const tempcsrc = mainimage.src;
                mainimage.src = subimage.src;
            });
        });
    }

    // Event listener for the add-to-cart button to stop propagation
    document.getElementById("add-to-cart").addEventListener("click", (event) => {
        event.stopPropagation();

        // Retrieve existing cart data from local storage or initialize an empty array
        let cartdata = JSON.parse(localStorage.getItem("cart")) || [];

        // Push the selected product into the cart data array
        cartdata.push(product);

        // Update local storage with the new cart data
        localStorage.setItem("cart", JSON.stringify(cartdata));

        // Retrieve and display the cart items
        displayCartItems();
    });

    // Function to retrieve and display the cart items
    function displayCartItems() {
        let cartoutput = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("cartoutput:", cartoutput);

        cartContainer.innerHTML = ''; // Clear existing content
        let totalproductprice = 0;
        let cartcountcontainer = 0; // Reset cart count

        cartoutput.forEach((item) => {
            cartcountcontainer++;
            cartcount.innerHTML = cartcountcontainer;
            let price = parseFloat(item.price);
            totalproductprice += price;

            totalprice.innerHTML = totalproductprice.toFixed(2);
            handlingcharges.innerHTML = "20";
            finalprice.innerHTML = (totalproductprice + parseFloat(handlingcharges.innerHTML)).toFixed(2);
            document.getElementById("final-amt").innerHTML = finalprice.innerHTML;

            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="remove-item-all" id="remove-item-${item.id}" data-id="${item.id}">
                    <i class="fas fa-times" id="exit-icon-all"></i>
                </div>
                <img src="${item.mainimage}" alt="mainimage" id="cart-item-image">
                <div class="cart-item-details">
                    <p class="cart-item-name">${item.name}</p>
                    <p class="quantity">${item.quantity}</p>
                    <p class="cart-item-price"><i class="fas fa-rupee-sign" id="rupee-icon"></i> ${item.price}</p>
                </div>
                <div class="product-quantity" id="product-quantity">
                    <p class="quantity-decrease" id="quantity-decrease-${item.id}">-</p>
                    <p class="quantity-number" id="quantity-number-${item.id}">1</p>
                    <p class="quantity-increase" id="quantity-increase-${item.id}">+</p>
                </div>
            `;

            cartContainer.appendChild(cartItem);

            // Event listener for decreasing quantity
            document.getElementById(`quantity-decrease-${item.id}`).addEventListener('click', () => {
                let quantityElement = document.getElementById(`quantity-number-${item.id}`);
                if (quantityElement.innerHTML > 1) {
                    quantityElement.innerHTML--;
                }
            });

            // Event listener for increasing quantity
            document.getElementById(`quantity-increase-${item.id}`).addEventListener('click', () => {
                let quantityElement = document.getElementById(`quantity-number-${item.id}`);
                if (quantityElement.innerHTML < 10) {
                    quantityElement.innerHTML++;
                }
            });

            // Event listener for removing an item from the cart
            document.getElementById(`remove-item-${item.id}`).addEventListener('click', () => {
                let productid = item.id;
                let cartdata = JSON.parse(localStorage.getItem("cart")) || [];

                // Remove the item with the matching id from the cart data
                cartdata = cartdata.filter(cartItem => cartItem.id !== productid);
                localStorage.setItem("cart", JSON.stringify(cartdata));

                // Remove the item from the cart display
                document.getElementById(`remove-item-${item.id}`).closest('.cart-item').remove();

                cartcountcontainer--;
                cartcount.innerHTML = cartcountcontainer;

                totalproductprice -= parseFloat(item.price);
                totalprice.innerHTML = totalproductprice.toFixed(2);
                finalprice.innerHTML = (totalproductprice + parseFloat(handlingcharges.innerHTML)).toFixed(2);
                document.getElementById("final-amt").innerHTML = finalprice.innerHTML;
            });
        });

        console.log("Final price:", finalprice.innerHTML);
    }

    // Initialize cart display on page load
    console.log("Cart data on page load:", JSON.parse(localStorage.getItem("cart")));
    displayCartItems();

    // Toggle cart visibility
    document.getElementById("cart-btnn").addEventListener("click", () => {
        document.getElementById("cart-section-main").classList.toggle("active");
        console.log("Cart section toggled");
    });

    document.getElementById("exit-cart").addEventListener("click", () => {
        document.getElementById("cart-section-main").classList.remove("active");
        console.log("Cart section hidden");
    });
});
